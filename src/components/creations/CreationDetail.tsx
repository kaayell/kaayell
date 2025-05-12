'use client';

import {useEffect, useRef, useState} from 'react';
import {CloudinaryImage} from '@/lib/cloudinary';

interface CreationDetailProps {
	creation: CloudinaryImage;
	onClose: () => void;
}

export default function CreationDetail({creation, onClose}: CreationDetailProps) {
	const [selectedImage, setSelectedImage] = useState<string>(creation.imageUrl);
	const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

	const detailRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const mainImageRef = useRef<HTMLDivElement>(null);
	const mainImageElementRef = useRef<HTMLImageElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const thumbnailsRef = useRef<HTMLDivElement>(null);

	// TODO: get images from cloudinary
	const additionalImages = [
		creation.imageUrl,
		creation.imageUrl.replace(/v\d+\//, 'v1625124401/'), // Mock different version
		creation.imageUrl.replace(/v\d+\//, 'v1625124402/'), // Mock different version
		creation.imageUrl.replace(/v\d+\//, 'v1625124403/'), // Mock different version
		creation.imageUrl.replace(/v\d+\//, 'v1625124404/'), // Mock different version
	];

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		window.addEventListener('keydown', handleEscapeKey);

		return () => {
			window.removeEventListener('keydown', handleEscapeKey);
		};
	}, [onClose, selectedImageIndex]);

	const handleThumbnailClick = (image: string, index: number) => {
		setSelectedImage(image);
		setSelectedImageIndex(index);
	};

	return (
		<div
			ref={detailRef}
			className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
			onClick={onClose}
		>
			<div
				ref={contentRef}
				className="w-full h-full max-w-[1800px] max-h-screen flex flex-col md:flex-row"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button (floating in corner) */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors z-10"
					aria-label="Close detail view"
				>
					<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
					</svg>
				</button>

				{/* Left Side */}
				<div
					ref={mainImageRef}
					className="w-full md:w-3/5 h-1/2 md:h-full bg-neutral-900 relative flex items-center justify-center"
				>
					<div className="w-full h-full max-h-screen relative">
						<img
							ref={mainImageElementRef}
							src={selectedImage}
							alt={creation.title}
							className="w-full h-full object-contain"
						/>
					</div>
				</div>

				{/* Right Side */}
				<div
					ref={infoRef}
					className="w-full md:w-2/5 h-1/2 md:h-full bg-neutral-800 overflow-y-auto p-6 md:p-8 text-white"
				>
					<div className="max-w-lg mx-auto">
						<div className="mb-8">
							<h2 className="text-3xl md:text-4xl font-bold mb-2">{creation.title}</h2>
						</div>

						<div className="mt-10">
							<div ref={thumbnailsRef} className="grid grid-cols-2 gap-4">
								{additionalImages.map((image, index) => (
									<div
										key={index}
										className={`aspect-square rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${selectedImageIndex === index ? 'ring-2 ring-primary-500 scale-[0.96]' : 'hover:opacity-90'}`}
										onClick={() => handleThumbnailClick(image, index)}
									>
										<div className="w-full h-full overflow-hidden">
											<img
												src={image}
												alt={`${creation.title} - View ${index + 1}`}
												className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
											/>
										</div>
									</div>
								))}
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}