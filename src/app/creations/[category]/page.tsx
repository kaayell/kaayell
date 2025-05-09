import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getImagesByCategory, getCategories } from '@/lib/cloudinary';
import Link from "next/link";
import CreationsGrid from "@/components/creations/CreationsGrid";

type CategoryPageProps = Promise<{category: string}>

export async function generateMetadata(props: { params: CategoryPageProps }) {
	const categories = await getCategories();
	const params = await props.params
	const category = categories.find((cat) => cat.id === params.category);

	if (!category) {
		return {
			title: 'Category Not Found',
		};
	}

	return {
		title: `${category.name} | kaayell`,
		description: `Explore ${category.name} fiber art creations`,
	};
}

export async function generateStaticParams() {
	const categories = await getCategories();

	return categories.map((category) => ({
		category: category.id,
	}));
}

export default async function CategoryPage(props: { params: CategoryPageProps }) {
	const categories = await getCategories();
	const params = await props.params
	const category = categories.find((cat) => cat.id === params.category);

	if (!category) {
		notFound();
	}

	const images = await getImagesByCategory(params.category);

	return (
		<div className="py-12">
			<div className="container-custom">
				<div className="flex flex-wrap justify-center gap-2 mb-10">
					<Link href="/creations"
						className="px-4 py-2 text-sm hover:underline hover:underline-offset-8 hover:text-neutral-500"
					>
						all
					</Link>
					{categories.map((cat) => (
						<Link
							key={cat.id}
							href={`/creations/${cat.id}`}
							className={`px-4 py-2 text-sm font-medium
                ${cat.id === params.category ? 'text-white' : 'hover:underline hover:underline-offset-8 hover:text-neutral-500'}`}
						>
							{cat.name}
						</Link>
					))}
				</div>

				<Suspense fallback={<div className="text-center py-10">Loading creations...</div>}>
					<CreationsGrid creations={images} />
				</Suspense>
			</div>
		</div>
	);
}