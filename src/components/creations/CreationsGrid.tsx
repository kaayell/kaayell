"use client";

import { CloudinaryImage } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CreationGalleryProps {
  creations: CloudinaryImage[];
  initialAnimation?: boolean;
}

export default function CreationsGrid({ creations }: CreationGalleryProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const x = useTransform(scrollXProgress, [0, 1], [0, -100]);

  const creationsWithSpans = useMemo(() => {
    return creations.map((image) => {
      const aspectRatio = image.width / image.height;

      let gridSpan = [1, 1]; // default span

      if (aspectRatio > 1.5) {
        gridSpan = [1, 2]; // wide images
      } else if (aspectRatio < 0.7) {
        gridSpan = [2, 1]; // tall images
      }

      return {
        ...image,
        colSpan: gridSpan[1],
        rowSpan: gridSpan[0],
        aspectRatio,
      };
    });
  }, [creations]);

  return (
    <div
      ref={containerRef}
      className="px-8 will-change-transform h-[calc(100vh-100px)] overflow-x-auto overflow-y-hidden"
    >
      <motion.div
        className="grid-gallery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {creationsWithSpans.map((image, index) => {
          return (
            <motion.div
              key={image.public_id}
              className="drop-shadow-xl hover:grayscale hover:scale-105 transition-all duration-700 ease-in-out cursor-pointer"
              style={{
                gridColumn: `span ${image.colSpan}`,
                gridRow: `span ${image.rowSpan}`,
                x,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
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
      </motion.div>
    </div>
  );
}
