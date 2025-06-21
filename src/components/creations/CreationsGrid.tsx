"use client";

import { CloudinaryImage } from "@/lib/cloudinary";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  createStaggerItem,
  fadeInUp,
  staggerContainer,
} from "@/lib/animations";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

interface CreationsGridProps {
  creations: CloudinaryImage[];
}

export default function CreationsGrid({ creations }: CreationsGridProps) {
  const router = useRouter();
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 });
  const SPACING = 100;

  useEffect(() => {
    const updateSize = () => {
      const container = document.getElementById("holes-grid");
      if (container) {
        const rect = container.getBoundingClientRect();
        setGridSize({
          cols: Math.floor(rect.width / SPACING),
          rows: Math.floor(rect.height / SPACING),
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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

  const { pegHoles } = useMemo(() => {
    if (gridSize.cols === 0 || gridSize.rows === 0) {
      return { pegHoles: [] };
    }
    const holeCount = gridSize.cols * gridSize.rows;
    const allPegHoles = [];
    for (let i = 0; i < holeCount; i++) {
      allPegHoles.push({ id: `peg-${i}` });
    }
    return { pegHoles: [...allPegHoles] };
  }, [gridSize]);

  return (
    <div className="h-full pt-24 px-8 md:px-18 lg:px-26">
      <div className="relative w-full h-full rounded-2xl pegboard">
        <div className="screw top-5 left-5" />
        <div className="screw top-5 right-5" />
        <div className="screw bottom-5 left-5" />
        <div className="screw bottom-5 right-5" />

        <div
          id="holes-grid"
          className="absolute inset-[32px] holes-grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
          }}
        >
          {pegHoles.map((hole) => (
            <div key={hole.id} className="peg-hole" />
          ))}
        </div>

        <motion.div
          className="grid-gallery pt-20 px-10"
          variants={staggerContainer}
          initial={"initial"}
          animate={"animate"}
        >
          {creationsWithSpans.map((image, index) => (
            <motion.div
              key={image.public_id}
              layoutId={`image-${image.public_id}`}
              className="group cursor-pointer relative"
              style={{
                gridColumn: `span ${image.gridSpan.col}`,
                gridRow: `span ${image.gridSpan.row}`,
              }}
              variants={createStaggerItem(fadeInUp)}
              onClick={() => router.push(`/creations/${image.public_id}`)}
            >
              <div className="hanging-string" />
              <CldImage
                key={index}
                src={image.public_id}
                alt={image.display_name}
                width={image.width}
                height={image.height}
                className="w-full h-full object-contain p-4 relative z-3 creation-shadow"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
