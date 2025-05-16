"use client";

import Link from "next/link";
import { CloudinaryImage } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";

interface CreationGalleryProps {
  creations: CloudinaryImage[];
  initialAnimation?: boolean;
}

export default function CreationsGrid({ creations }: CreationGalleryProps) {
  if (creations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-neutral-500">No artworks found.</p>
      </div>
    );
  }

  return (
    <div className="grid-masonry-gallery">
      {creations.map((image) => {
        return (
          <div
            key={image.asset_id}
            className="rounded-lg overflow-hidden cursor-pointer"
          >
            <Link href={`/creations/${image.public_id}`}>
              <CldImage
                src={image.public_id}
                alt={image.display_name}
                width={image.width}
                height={image.height}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
