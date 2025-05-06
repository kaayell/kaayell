import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getImagesByCategory, getCategories } from '@/lib/cloudinary';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Link from "next/link";

type CategoryPageProps = Promise<{category: string}>

export async function generateMetadata(props: { params: CategoryPageProps }) {
	const categories = await getCategories();
	const params = await props.params
	const category = categories.find((cat) => cat.slug === params.category);

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
		category: category.slug,
	}));
}

export default async function CategoryPage(props: { params: CategoryPageProps }) {
	const categories = await getCategories();
	const params = await props.params
	const category = categories.find((cat) => cat.slug === params.category);

	if (!category) {
		notFound();
	}

	const artworks = await getImagesByCategory(params.category);

	return (
		<div className="py-12">
			<div className="container-custom">
				<h1 className="text-4xl font-bold text-center mb-2">{category.name}</h1>
				<p className="text-neutral-600 text-center mb-10 max-w-2xl mx-auto">
					{category.description || `Browse my collection of ${category.name.toLowerCase()} fiber art pieces.`}
				</p>

				{/* Category Filters */}
				<div className="flex flex-wrap justify-center gap-2 mb-10">
					<Link href="/gallery"
						className="px-4 py-2 rounded-full bg-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-300 transition-colors"
					>
						All
					</Link>
					{categories.map((cat) => (
						<Link
							key={cat.slug}
							href={`/gallery/${cat.slug}`}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${cat.slug === params.category
								? 'text-white'
								: 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}
						>
							{cat.name}
						</Link>
					))}
				</div>

				{/* Gallery Grid */}
				<Suspense fallback={<div className="text-center py-10">Loading gallery...</div>}>
					<GalleryGrid images={artworks} />
				</Suspense>
			</div>
		</div>
	);
}