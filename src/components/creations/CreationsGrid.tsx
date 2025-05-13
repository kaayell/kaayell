'use client';

import Link from "next/link";
import {CloudinaryImage} from '@/lib/cloudinary';
import {CldImage} from "next-cloudinary";

interface CreationGalleryProps {
	creations: CloudinaryImage[];
	initialAnimation?: boolean;
}

export default function CreationsGrid({creations}: CreationGalleryProps) {
	if (creations.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-lg text-neutral-500">No artworks found.</p>
			</div>
		);
	}

	return (
		<div className="relative">
			<div className="grid-masonry-gallery">
				{creations.map((image) => {
					return (
						<div
							key={image.asset_id}
							className={`artwork-image w-full rounded-lg overflow-hidden cursor-pointer`}
						>
							<Link
								href={`/creations/${image.public_id}`}
							>
								<CldImage
									src={image.public_id}
									alt={image.display_name}
									width={"500"}
									height={"700"}
								/>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
}