import { Suspense } from 'react';
import { getAllImages, getCategories } from '@/lib/cloudinary';
import CreationsGrid from '@/components/creations/CreationsGrid';
import Link from 'next/link';

export const metadata = {
	title: 'Creations | kaayell',
	description: '',
};

export default async function CreationsPage() {
	const artworks = await getAllImages();
	const categories = await getCategories();

	return (
		<div className="py-12">
			<div className="container-custom">
				<h1 className="text-4xl font-bold text-center mb-2">Creations</h1>

				<div className="flex flex-wrap justify-center gap-2 mb-10">
					<Link
						href="/creations"
						className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${!categories ? 'text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}
					>
						All
					</Link>
					{categories.map((category) => (
						<Link
							key={category.slug}
							href={`/creations/${category.slug}`}
							className="px-4 py-2 rounded-full bg-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-300 transition-colors"
						>
							{category.name}
						</Link>
					))}
				</div>

				<Suspense fallback={<div className="text-center py-10">Loading creations...</div>}>
					<CreationsGrid images={artworks} />
				</Suspense>
			</div>
		</div>
	);
}