"use client";

import { CloudinaryImage } from "@/lib/cloudinary";
import { use } from "react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { AnimatePresence, motion } from "motion/react";
import {
  createStaggerItem,
  fadeInUp,
  scaleOnHover,
  staggerContainer,
  swingAnimation,
} from "@/lib/animations";
import Pegboard from "@/components/ui/Pegboard";

interface CreationsGridProps {
  creations: Promise<CloudinaryImage[]>;
}

export default function CreationsGrid({ creations }: CreationsGridProps) {
  const router = useRouter();
  const allCreations = use(creations);
  const allCreationsWithSpans = allCreations.map((image) => {
    const aspectRatio = image.width / image.height;
    let gridSpan = { col: 3, row: 4 };
    if (aspectRatio > 1.5) {
      gridSpan = { col: 5, row: 3 }; // wide images
    } else if (aspectRatio < 0.7) {
      gridSpan = { col: 3, row: 5 }; // tall images
    }

    return {
      ...image,
      gridSpan,
      totalFootprint: gridSpan.col * gridSpan.row,
    };
  });
  const holeCount = _.sumBy(
    allCreationsWithSpans,
    (creation) => creation.totalFootprint + 1,
  );

  return (
    <div className="w-full h-full pt-14 pb-5 px-5 md:pt-6 md:mt-0 md:pl-0 md:pr-18">
      <Pegboard holeCount={holeCount}>
        <AnimatePresence>
          <motion.div
            className="pegboard-grid absolute inset-0"
            variants={staggerContainer}
            initial={"initial"}
            animate={"animate"}
          >
            {allCreationsWithSpans.map((image, index) => (
              <motion.div
                key={image.public_id}
                className="group cursor-pointer relative mt-5 md:mt-10"
                style={{
                  gridColumn: `span ${image.gridSpan.col}`,
                  gridRow: `span ${image.gridSpan.row}`,
                }}
                variants={createStaggerItem(fadeInUp)}
                onClick={() => router.push(`/creations/${image.public_id}`)}
              >
                <div className="peg" />
                <div className="creation-tag creation-label">
                  {image.display_name}
                </div>

                <motion.div
                  className="w-full h-full"
                  {...swingAnimation(index)}
                  style={{ transformOrigin: "center top" }}
                >
                  <div className="hanging-string" />
                  <motion.div
                    className="relative w-full h-full pt-10 z-10"
                    {...scaleOnHover}
                  >
                    <CldImage
                      key={`${image.public_id}-${index}`}
                      src={image.public_id}
                      alt={image.display_name}
                      width={image.width}
                      height={image.height}
                      className="w-full h-full object-contain"
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
        </AnimatePresence>
      </Pegboard>
    </div>
  );
}
