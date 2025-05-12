'use client';

import {useState, useRef} from 'react';
import {CloudinaryImage} from '@/lib/cloudinary';
import CreationDetail from "@/components/creations/CreationDetail";

interface CreationGalleryProps {
	creations: CloudinaryImage[];
	initialAnimation?: boolean;
}

export default function CreationsGrid({creations}: CreationGalleryProps) {
	const [selectedCreation, setSelectedCreation] = useState<CloudinaryImage | null>(null);
	const galleryRef = useRef<HTMLDivElement>(null);

	const openDetail = (creation: CloudinaryImage) => {
		setSelectedCreation(creation);
	};

	const closeDetail = () => {
		setSelectedCreation(null);
	};

	if (creations.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-lg text-neutral-500">No artworks found.</p>
			</div>
		);
	}

	return (
		<div className="relative" ref={galleryRef}>
			<div className="grid-masonry-gallery">
				{creations.map((artwork, index) => {
					return (
						<div
							key={artwork.id}
							className={`artwork-image w-full rounded-lg overflow-hidden cursor-pointer`}
							onClick={() => openDetail(artwork)}
						>
							<img
								src={artwork.imageUrl}
								alt={artwork.title}
							/>
						</div>
					);
				})}
			</div>

			{selectedCreation && (
				<CreationDetail
					creation={selectedCreation}
					onClose={closeDetail}
				/>
			)}
		</div>
	);
}