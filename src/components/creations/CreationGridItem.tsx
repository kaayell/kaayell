import { CloudinaryImage } from "@/lib/cloudinary";
import { motion } from "motion/react";
import { createStaggerItem, fadeInUp } from "@/lib/animations";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

interface CreationGridItemProps {
  image: CloudinaryImage;
  gridSpan: { col: number; row: number };
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (value: number | null) => void;
}

export default function CreationGridItem({
  image,
  gridSpan,
  index,
  hoveredIndex,
  setHoveredIndex,
}: CreationGridItemProps) {
  const router = useRouter();

  const handleImageClick = (image: CloudinaryImage) => {
    router.push(`/creations/${image.public_id}`);
  };

  return (
    <motion.div
      key={image.public_id}
      layoutId={`image-${image.public_id}`}
      className="gallery-item group cursor-pointer"
      style={{
        gridColumn: `span ${gridSpan.col}`,
        gridRow: `span ${gridSpan.row}`,
      }}
      variants={createStaggerItem(fadeInUp)}
      onClick={() => handleImageClick(image)}
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
    >
      <div className="relative w-full h-full bg-neutral-800/30 overflow-hidden">
        <CldImage
          src={image.public_id}
          alt={image.display_name}
          width={image.width}
          height={image.height}
          className="w-full h-full object-contain p-4"
        />

        <div className="absolute top-4 right-4 text-xs text-neutral-500/30">
          {(index + 1).toString().padStart(2, "0")}
        </div>

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
      </div>
    </motion.div>
  );
}
