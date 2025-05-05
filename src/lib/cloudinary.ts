import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryImage, CloudinaryCategory} from "@/types/cloudinary";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_CLOUDINARY_API_KEY,
	api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export async function getAllImages(): Promise<CloudinaryImage[]> {
	try {
		const result = await cloudinary.search
			.expression('folder:fiber-art/*')
			.sort_by('created_at', 'desc')
			.max_results(100)
			.execute();

		return result.resources.map(mapResourceToArtwork);
	} catch (error) {
		console.error('Error fetching artworks from Cloudinary:', error);
		return [];
	}
}

export async function getImagesByCategory(categorySlug: string): Promise<CloudinaryImage[]> {
	try {
		const result = await cloudinary.search
			.expression(`folder:fiber-art/* AND tags=${categorySlug}`)
			.sort_by('created_at', 'desc')
			.max_results(100)
			.execute();

		return result.resources.map(mapResourceToArtwork);
	} catch (error) {
		console.error(`Error fetching artworks for category ${categorySlug}:`, error);
		return [];
	}
}

export async function getCategories(): Promise<CloudinaryCategory[]> {
	try {
		//TODO: take categories from folders
		return [
			{
				id: 'crochet',
				name: 'Crochet',
				slug: 'crochet',
				description: '',
			},
			{
				id: 'weavings',
				name: 'Weavings',
				slug: 'weavings',
				description: '',
			},
			{
				id: 'tapestries',
				name: 'Tapestries',
				slug: 'tapestries',
				description: '',
			},
		];
	} catch (error) {
		console.error('Error fetching categories:', error);
		return [];
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapResourceToArtwork(resource: any): CloudinaryImage {
	const context = resource.context || {};
	const publicId = resource.public_id;

	// Extract category from the folder structure or context
	const folderParts = publicId.split('/');
	const categoryFromFolder = folderParts.length > 1 ? folderParts[1] : 'uncategorized';

	// Default values for testing/development - in production these would come from Cloudinary context
	const defaultTitle = publicId.split('/').pop()?.replace(/-/g, ' ') || 'Untitled';
	const defaultSlug = publicId.split('/').pop() || 'untitled';

	return {
		id: resource.public_id,
		title: context.title || defaultTitle,
		slug: context.slug || defaultSlug,
		description: context.description || '',
		category: context.category || categoryFromFolder,
		categorySlug: context.category_slug || categoryFromFolder.toLowerCase().replace(/\s+/g, '-'),
		imageUrl: cloudinary.url(publicId, {
			width: 800,
			height: 800,
			crop: 'fill',
			quality: 'auto',
			fetch_format: 'auto',
		}),
		highResImageUrl: cloudinary.url(publicId, {
			quality: 'auto',
			fetch_format: 'auto',
		}),
		year: context.year ? parseInt(context.year) : undefined,
		tags: resource.tags || [],
		isFeatured: resource.tags?.includes('featured') || false,
	};
}


