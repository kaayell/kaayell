import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryImage, CloudinaryCategory} from "@/lib/types";

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
				name: 'crochet',
				description: '',
			},
			{
				id: 'weavings',
				name: 'weavings',
				description: '',
			},
			{
				id: 'tapestries',
				name: 'tapestries',
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
	const publicId = resource.public_id;

	// Extract category from the folder structure or context
	const folderParts = resource.asset_folder.split('/');
	const categoryFromFolder = folderParts.length > 1 ? folderParts[1] : 'uncategorized';

	return {
		id: publicId,
		title: resource.display_name,
		description: resource.description || '',
		category: categoryFromFolder,
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
	};
}


