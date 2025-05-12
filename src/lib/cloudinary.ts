import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_CLOUDINARY_API_KEY,
	api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export interface CloudinaryImage {
	id: string;
	description?: string;
	folder: string;
	title: string;
	imageUrl: string;
	highResImageUrl: string;
}

export async function getAllShowcaseImages(): Promise<CloudinaryImage[]> {
	try {
		const result = await cloudinary.search
			.expression('folder:fiber-art/* AND tags=showcase')
			.sort_by('created_at', 'desc')
			.max_results(100)
			.execute();

		return result.resources.map(mapResourceToArtwork);
	} catch (error) {
		console.error('Error fetching artworks from Cloudinary:', error);
		return [];
	}
}
export async function getImagesByFolderAndTag(folder: string, tag: string): Promise<CloudinaryImage[]> {
	try {
		const result = await cloudinary.search
			.expression(`folder:${folder} AND tags=${tag}`)
			.sort_by('created_at', 'desc')
			.max_results(100)
			.execute();

		return result.resources.map(mapResourceToArtwork);
	} catch (error) {
		console.error('Error fetching artworks from Cloudinary:', error);
		return [];
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapResourceToArtwork(resource: any): CloudinaryImage {
	const publicId = resource.public_id;

	return {
		id: publicId,
		title: resource.display_name,
		description: resource.description || '',
		folder: resource.asset_folder,
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


