import { Suspense } from 'react';
import { getAllImages, getCategories } from '@/lib/cloudinary';
import Link from 'next/link';
import CreationsGrid from "@/components/creations/CreationsGrid";

export const metadata = {
	title: 'Creations | kaayell',
	description: '',
};

export default async function CreationsPage() {
	const creations = await getAllImages();
	const categories = await getCategories();

	return (
		<div className="py-12">
			<div className="container-custom">
				<div className="flex flex-wrap justify-center gap-2 mb-10">
					<Link
						href="/creations"
						className={`px-4 py-2 text-sm font-medium hover:underline hover:underline-offset-8 hover:text-neutral-500`}
					>
						all
					</Link>
					{categories.map((category) => (
						<Link
							key={category.id}
							href={`/creations/${category.id}`}
							className="px-4 py-2 text-sm font-medium hover:underline hover:underline-offset-8 hover:text-neutral-500"
						>
							{category.name}
						</Link>
					))}
				</div>

				<Suspense fallback={<div className="text-center py-10">Loading creations...</div>}>
					<CreationsGrid creations={creations} />
				</Suspense>
			</div>
		</div>
	);
}