"use client";

import { CloudinaryImage } from "@/lib/cloudinary";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { staggerContainer } from "@/lib/animations";
import CreationGridItem from "@/components/creations/CreationGridItem";

interface CreationsGridProps {
  creations: CloudinaryImage[];
}

export default function CreationsGrid({ creations }: CreationsGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
        gridSpan: { col: gridSpan[1], row: gridSpan[0] },
      };
    });
  }, [creations]);

  return (
    <div className="h-full pt-24 px-8 md:px-18 lg:px-26">
      <motion.div
        className="grid-gallery"
        variants={staggerContainer}
        initial={"initial"}
        animate={"animate"}
      >
        {creationsWithSpans.map((image, index) => (
          <CreationGridItem
            key={index}
            image={image}
            gridSpan={image.gridSpan}
            index={index}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </motion.div>
    </div>
  );
}
