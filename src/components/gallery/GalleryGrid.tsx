'use client';

import { useState } from 'react';
import ImageCard from './ImageCard';
import { CloudinaryImage } from '@/types/cloudinary';
import ImageModal from "@/components/gallery/ImageModal";

type GalleryGridProps = {
	images: CloudinaryImage[];
};

export default function GalleryGrid({ images }: GalleryGridProps) {
	const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null);

	const openModal = (image: CloudinaryImage) => {
		setSelectedImage(image);
		document.body.style.overflow = 'hidden';
	};

	const closeModal = () => {
		setSelectedImage(null);
		document.body.style.overflow = 'auto';
	};

	if (images.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-lg text-neutral-500">No artworks found in this category.</p>
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{images.map((img) => (
					<ImageCard
						key={img.id}
						image={img}
						onClick={() => openModal(img)}
					/>
				))}
			</div>

			{selectedImage && (
				<ImageModal
					image={selectedImage}
					onClose={closeModal}
				/>
			)}
		</>
	);
}