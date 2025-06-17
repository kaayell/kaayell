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
  const isHovered = hoveredIndex === index;

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
      <div className="relative w-full h-full bg-neutral-800/30">
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.2 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <CldImage
            src={image.public_id}
            alt={image.display_name}
            width={image.width}
            height={image.height}
            className="w-full h-full object-contain p-4"
          />
        </motion.div>

        <div className="absolute top-4 right-4 text-xs text-neutral-500/30">
          {(index + 1).toString().padStart(2, "0")}
        </div>

        {/* hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-neutral-400 font-medium text-sm mb-1"
            >
              {image.display_name}
            </motion.h3>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
