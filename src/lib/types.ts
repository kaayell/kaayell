export interface CloudinaryImage {
	id: string;
	description?: string;
	folder: string;
	title: string;
	imageUrl: string;
	highResImageUrl: string;
}

export interface CloudinaryCategory {
	id: string;
	name: string;
	description?: string;
	imageUrl?: string;
	count?: number;
}