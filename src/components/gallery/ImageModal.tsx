'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { CloudinaryImage } from '@/types/cloudinary';

type ImageModalProps = {
	image: CloudinaryImage;
	onClose: () => void;
};

export default function ImageModal({ image, onClose }: ImageModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	// Close modal when clicking outside of content
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, [onClose]);

	const optimizedImageUrl = image.highResImageUrl || image.imageUrl;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
			<div
				ref={modalRef}
				className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
			>
				{/* Header */}
				<div className="p-4 flex justify-between items-center border-b">
					<h3 className="text-xl font-semibold">{image.title}</h3>
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-neutral-200 transition-colors"
						aria-label="Close modal"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Image */}
				<div className="relative flex-grow overflow-auto p-4">
					<div className="relative w-full h-auto min-h-[300px]">
						<Image
							src={optimizedImageUrl}
							alt={image.title}
							className="object-contain"
							fill
							sizes="(max-width: 1024px) 90vw, 70vw"
						/>
					</div>
				</div>

				{/* Details */}
				<div className="p-4 border-t bg-neutral-50">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<p className="text-neutral-600">
								<span className="font-semibold">Category:</span> {image.category}
							</p>
						</div>
						<div>
							{image.year && (
								<p className="text-neutral-600">
									<span className="font-semibold">Year:</span> {image.year}
								</p>
							)}
						</div>
					</div>
					{image.description && (
						<p className="mt-4 text-neutral-700">{image.description}</p>
					)}
				</div>
			</div>
		</div>
	);
}