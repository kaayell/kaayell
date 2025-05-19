"use client";

import Link from "next/link";
import { CloudinaryImage } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

interface CreationGalleryProps {
  creations: CloudinaryImage[];
  initialAnimation?: boolean;
}

export default function CreationsGrid({ creations }: CreationGalleryProps) {
  const router = useRouter();
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
          <motion.div
            layout
            layoutId={`creation-${image.public_id}`}
            key={image.public_id}
            transition={{ type: "spring" }}
            className="rounded-lg overflow-hidden cursor-crosshair"
            onClick={() => router.push(`/creations/${image.public_id}`)}
          >
            <CldImage
              src={image.public_id}
              alt={image.display_name}
              width={image.width}
              height={image.height}
              className="h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
