'use client';

import Image from 'next/image';
import { CloudinaryImage } from '@/types/cloudinary';

type ImageCardProps = {
	image: CloudinaryImage;
	onClick: () => void;
};

export default function ImageCard({ image, onClick }: ImageCardProps) {
	return (
		<div
			className="card group cursor-pointer hover:translate-y-[-4px] transition-all duration-300"
			onClick={onClick}
		>
			<div className="relative aspect-square overflow-hidden">
				<Image
					src={image.imageUrl}
					alt={image.title}
					fill
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</div>
			<div className="p-4">
				<h3 className="text-xl font-semibold">{image.title}</h3>
				<p className="text-neutral-600 mt-1">{image.category}</p>
			</div>
		</div>
	);
}