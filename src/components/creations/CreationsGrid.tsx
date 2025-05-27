"use client";

import { CloudinaryImage } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface CreationGalleryProps {
  creations: CloudinaryImage[];
  initialAnimation?: boolean;
}

export default function CreationsGrid({ creations }: CreationGalleryProps) {
  const router = useRouter();

  const imagesWithSpans = useMemo(() => {
    return creations.map((image) => {
      const aspectRatio = image.aspect_ratio;

      let gridSpan;

      if (aspectRatio > 1.0) {
        gridSpan = [2, 1]; //horizontal square
      } else if (aspectRatio > 0.75) {
        gridSpan = [2, 2]; //large square
      } else if (aspectRatio > 0.5) {
        gridSpan = [1, 2]; //vertical rectangle
      } else {
        gridSpan = [1, 1]; //small square
      }

      return {
        ...image,
        colSpan: gridSpan[0],
        rowSpan: gridSpan[1],
      };
    });
  }, [creations]);

  return (
    <div className="grid-masonry-gallery mx-auto px-4 sm:px-6 lg:px-8">
      {imagesWithSpans.map((image) => {
        return (
          <div
            key={image.public_id}
            className={`col-span-${image.colSpan} row-span-${image.rowSpan} rounded-lg overflow-hidden cursor-crosshair`}
            style={{
              gridColumn: `span ${image.colSpan}`,
              gridRow: `span ${image.rowSpan}`,
            }}
            onClick={() => router.push(`/creations/${image.public_id}`)}
          >
            <CldImage
              src={image.public_id}
              alt={image.display_name}
              width={image.width}
              height={image.height}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        );
      })}
    </div>
  );
}
