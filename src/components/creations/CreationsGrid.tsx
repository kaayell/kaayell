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

  // Calculate row spans based on image aspect ratios
  const creationsWithSpans = useMemo(() => {
    return creations.map((image) => {
      const aspectRatio = image.width / image.height;

      let gridSpan = [1, 1];
      if (aspectRatio > 1.5) {
        gridSpan = [2, 1]; //horizontal rectangle
      } else if (aspectRatio > 0.9) {
        gridSpan = [2, 2]; // large square
      } else if (aspectRatio < 0.7) {
        gridSpan = [1, 2]; //vertical rectangle
      }

      return {
        ...image,
        colSpan: gridSpan[0],
        rowSpan: gridSpan[1],
        aspectRatio,
      };
    });
  }, [creations]);

  return (
    <div className="grid-gallery mx-auto px-16">
      {creationsWithSpans.map((image) => {
        return (
          <div
            key={image.public_id}
            className={`hover:grayscale transition-all duration-700 ease-in-out`}
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
              removeBackground
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
