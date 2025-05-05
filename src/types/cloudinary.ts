export interface CloudinaryImage {
	id: string;
	description?: string;
	slug: string;
	categorySlug: string;
	year?: number;
	category: string;
	title: string;
	imageUrl: string;
	highResImageUrl: string;
	tags?: string[];
	isFeatured: boolean;
}

export interface CloudinaryCategory {
	id: string;
	name: string;
	slug: string;
	description?: string;
	imageUrl?: string;
	count?: number;
}