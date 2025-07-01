"use client";

import { CloudinaryImage } from "@/lib/cloudinary";
import { use } from "react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { motion } from "motion/react";
import {
  createStaggerItem,
  fadeInUp,
  scaleOnHover,
  staggerContainer,
  swingAnimation,
} from "@/lib/animations";

interface CreationsGridProps {
  creations: Promise<CloudinaryImage[]>;
}

export default function CreationsGrid({ creations }: CreationsGridProps) {
  const router = useRouter();
  const allCreations = use(creations);
  const allCreationsWithSpans = allCreations.map((image) => ({
    ...image,
    gridSpan: { col: 3, row: 4 },
    totalFootprint: 3 * 4,
  }));
  const holeCount = _.sumBy(
    allCreationsWithSpans,
    (creation) => creation.totalFootprint,
  );

  return (
    <div className="h-full pt-24 px-8 md:px-18 lg:px-26">
      <div className="relative min-h-screen w-full p-5 md:p-10 rounded-2xl pegboard">
        <div className="screw top-2 left-2 md:top-5 md:left-5" />
        <div className="screw top-2 right-2 md:top-5 md:right-5" />
        <div className="screw bottom-2 left-2 md:bottom-5 md:left-5" />
        <div className="screw bottom-2 right-2 md:bottom-5 md:right-5" />

        <div className="relative w-full h-full">
          <div className="w-full h-full pegboard-grid">
            {[...new Array(holeCount)].map((_, index) => {
              return <div key={`peg-${index}`} className="pegboard-hole" />;
            })}
          </div>

          <motion.div
            className="pegboard-grid absolute inset-0"
            variants={staggerContainer}
            initial={"initial"}
            animate={"animate"}
          >
            {allCreationsWithSpans.map((image, index) => (
              <motion.div
                key={image.public_id}
                className="group cursor-pointer relative creation"
                style={{
                  gridColumn: `span ${image.gridSpan.col}`,
                  gridRow: `span ${image.gridSpan.row}`,
                }}
                variants={createStaggerItem(fadeInUp)}
                onClick={() => router.push(`/creations/${image.public_id}`)}
              >
                <div className="peg" />
                <div className="creation-tag">{image.display_name}</div>

                <motion.div
                  className="w-full h-full"
                  {...swingAnimation(index)}
                  style={{ transformOrigin: "center top" }}
                >
                  <div className="hanging-string" />
                  <motion.div className="w-full h-full pt-10" {...scaleOnHover}>
                    <CldImage
                      key={`${image.public_id}-${index}`}
                      src={image.public_id}
                      alt={image.display_name}
                      width={image.width}
                      height={image.height}
                      className="w-full h-full object-contain z-10"
                      style={{
                        filter:
                          "drop-shadow(3px 4px 12px rgba(0, 0, 0, 0.50)) drop-shadow(1px 2px 6px rgba(0, 0, 0, 0.20))",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
