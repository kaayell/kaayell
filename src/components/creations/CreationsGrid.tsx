"use client";

import { CloudinaryImage } from "@/lib/cloudinary";
import { motion } from "motion/react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

interface CreationGalleryProps {
  creations: CloudinaryImage[];
}

export default function CreationsGrid({ creations }: CreationGalleryProps) {
  const router = useRouter();
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
        colSpan: gridSpan[1],
        rowSpan: gridSpan[0],
      };
    });
  }, [creations]);

  const handleImageClick = (image: CloudinaryImage) => {
    router.push(`/creations/${image.public_id}`);
  };

  return (
    <div ref={containerRef} className="h-screen flex flex-col">
      <div className="flex-1 pt-24 min-h-0">
        <div className="h-full px-8 md:px-16 lg:px-24 flex flex-col">
          <motion.div
            className="flex-1 overflow-x-auto overflow-y-hidden min-h-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="gallery-track h-full w-full min-w-full max-h-full overflow-y-hidden">
              {creationsWithSpans.map((image, index) => (
                <motion.div
                  key={image.public_id}
                  layoutId={`image-${image.public_id}`}
                  className="gallery-item group cursor-pointer"
                  style={{
                    gridColumn: `span ${image.colSpan}`,
                    gridRow: `span ${image.rowSpan}`,
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
                  }}
                  onClick={() => handleImageClick(image)}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div className="relative w-full h-full bg-neutral-800/30 border border-neutral-700/50 overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <CldImage
                        src={image.public_id}
                        alt={image.display_name}
                        width={image.width}
                        height={image.height}
                        className="w-full h-full object-contain p-4"
                      />
                    </motion.div>

                    {/* hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <motion.h3
                          initial={{ y: 20, opacity: 0 }}
                          animate={{
                            y: hoveredIndex === index ? 0 : 20,
                            opacity: hoveredIndex === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="text-white font-medium text-lg mb-1"
                        >
                          {image.display_name}
                        </motion.h3>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{
                            y: hoveredIndex === index ? 0 : 20,
                            opacity: hoveredIndex === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="flex items-center text-neutral-300 text-sm"
                        >
                          <span className="mr-2">View details</span>
                          <motion.svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ x: hoveredIndex === index ? 4 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute top-4 right-4 text-xs font-mono text-neutral-500"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0.3 }}
                      transition={{ duration: 0.3 }}
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex-shrink-0 py-4"
          >
            <div className="flex items-center text-neutral-500 text-sm font-mono">
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mr-3"
              >
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
