"use client";

import { CloudinaryImage } from "@/lib/cloudinary";
import { motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import {
  arrowAnimation,
  createDelayedAnimation,
  fadeIn,
  staggerContainer,
} from "@/lib/animations";
import CreationGridItem from "@/components/creations/CreationGridItem";

interface CreationsGridProps {
  creations: CloudinaryImage[];
}

export default function CreationsGrid({ creations }: CreationsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
    <div ref={containerRef} className="h-screen flex flex-col">
      <div className="flex-1 pt-24 min-h-0">
        <div className="h-full px-8 md:px-18 lg:px-26 flex flex-col">
          <motion.div
            className="flex-1 overflow-x-auto overflow-y-hidden min-h-0"
            {...createDelayedAnimation(0.2, fadeIn)}
          >
            <motion.div
              className="gallery-track h-full w-full min-w-full max-h-full overflow-y-hidden scrollbar-hide"
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
          </motion.div>

          <motion.div
            className="flex-shrink-0 py-4"
            {...createDelayedAnimation(1, fadeIn)}
          >
            <div className="flex items-center text-neutral-500 text-sm font-mono">
              <motion.div className="mr-3" {...arrowAnimation}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </motion.div>
              <span>scroll</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
