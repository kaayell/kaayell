"use client";

import { CloudinaryImage } from "@/lib/cloudinary";
import { motion } from "motion/react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";

interface CreationGalleryProps {
  creations: CloudinaryImage[];
  initialAnimation?: boolean;
}

export default function CreationsGrid({ creations }: CreationGalleryProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const creationsWithSpans = useMemo(() => {
    return creations.map((image) => {
      const aspectRatio = image.width / image.height;

      let gridSpan = [1, 1];
      if (aspectRatio > 1.5) {
        gridSpan = [1, 2]; // wide images
      } else if (aspectRatio < 0.7) {
        gridSpan = [2, 1]; // tall images
      }

      return {
        ...image,
        colSpan: gridSpan[1],
        rowSpan: gridSpan[0],
      };
    });
  }, [creations]);

  return (
    <div
      ref={containerRef}
      className="px-8 h-[calc(100vh-100px)] overflow-x-auto overflow-y-hidden scroll-smooth"
    >
      <div className="grid-gallery">
        {creationsWithSpans.map((image, index) => {
          return (
            <motion.div
              key={image.public_id}
              className="drop-shadow-xl cursor-pointer"
              style={{
                gridColumn: `span ${image.colSpan}`,
                gridRow: `span ${image.rowSpan}`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeIn",
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3, ease: "easeIn" },
              }}
              onClick={() => router.push(`/creations/${image.public_id}`)}
            >
              <CldImage
                src={image.public_id}
                alt={image.display_name}
                width={image.width}
                height={image.height}
                className="w-full h-full object-contain"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
