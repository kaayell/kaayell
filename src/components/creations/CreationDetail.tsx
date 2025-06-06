"use client";

import { useState, useEffect } from "react";
import { CloudinaryImage } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";
import Loading from "@/components/ui/Loading";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

interface CreationDetailPageProps {
  creation: CloudinaryImage;
}

export default function CreationDetailPage({
  creation,
}: CreationDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage>(creation);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(true);
  const router = useRouter();

  const handleThumbnailClick = (image: CloudinaryImage, index: number) => {
    if (selectedImageIndex !== index) {
      setIsLoading(true);
      setIsImageLoaded(false);
      setSelectedImage(image);
      setSelectedImageIndex(index);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setIsImageLoaded(true);
  };

  const handleBackClick = () => {
    router.back();
  };

  const relatedAssets = creation.related_assets
    ? [...[creation], ...creation.related_assets]
    : [creation];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && selectedImageIndex > 0) {
        handleThumbnailClick(
          relatedAssets[selectedImageIndex - 1],
          selectedImageIndex - 1,
        );
      } else if (
        e.key === "ArrowRight" &&
        selectedImageIndex < relatedAssets.length - 1
      ) {
        handleThumbnailClick(
          relatedAssets[selectedImageIndex + 1],
          selectedImageIndex + 1,
        );
      } else if (e.key === "Escape") {
        handleBackClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImageIndex, relatedAssets]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="h-screen bg-neutral-900 flex flex-col"
    >
      {/* heading */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="flex-shrink-0 pt-24 pb-6 px-8 md:px-16 lg:px-24"
      >
        <div className="flex items-center justify-between">
          <motion.button
            onClick={handleBackClick}
            className="inline-flex items-center text-neutral-500 hover:text-neutral-100 transition-colors duration-300"
            whileHover={{ x: -3 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-lg mr-2">←</span>
            <span className="text-sm">Back</span>
          </motion.button>

          <h1 className="text-right text-xl md:text-2xl font-light text-neutral-100">
            {creation.display_name}
          </h1>
        </div>
      </motion.div>

      {/* main content */}
      <div className="flex-1 min-h-0 px-8 md:px-16 lg:px-24">
        <div className="h-full flex flex-col md:flex-row gap-6">
          <motion.div
            className="flex-1 min-h-0"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <div className="relative w-full h-full bg-neutral-800/20 border border-neutral-700/30 overflow-hidden">
              {isLoading && <Loading />}

              {/* showcase image */}
              <motion.div
                className="relative w-full h-full"
                layoutId={`image-${selectedImage.public_id}`}
                key={selectedImage.public_id}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{
                    scale: isImageLoaded ? 1 : 0.95,
                    opacity: isImageLoaded ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="w-full h-full p-6 md:p-8 lg:p-12"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={(event, info) => {
                    const threshold = 50;
                    if (info.offset.x > threshold && selectedImageIndex > 0) {
                      // Swipe right - go to previous image
                      handleThumbnailClick(
                        relatedAssets[selectedImageIndex - 1],
                        selectedImageIndex - 1,
                      );
                    } else if (
                      info.offset.x < -threshold &&
                      selectedImageIndex < relatedAssets.length - 1
                    ) {
                      // Swipe left - go to next image
                      handleThumbnailClick(
                        relatedAssets[selectedImageIndex + 1],
                        selectedImageIndex + 1,
                      );
                    }
                  }}
                  style={{ x: 0 }} // Reset position after drag
                  whileDrag={{ scale: 0.98 }}
                >
                  <CldImage
                    src={selectedImage.public_id}
                    width={creation.width}
                    height={creation.height}
                    alt={creation.display_name}
                    className="w-full h-full object-contain pointer-events-none md:pointer-events-auto"
                    onLoad={handleImageLoad}
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* desktop sidebar */}
          {relatedAssets.length > 1 && (
            <motion.div
              className="hidden md:flex flex-col w-32 lg:w-40 min-h-0"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <div className="flex-1 min-h-0 overflow-y-auto space-y-3">
                {relatedAssets.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`relative aspect-square cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "border-neutral-100 bg-neutral-800/50"
                        : "border-neutral-600/50 bg-neutral-800/20 hover:border-neutral-500"
                    }`}
                    onClick={() => handleThumbnailClick(image, index)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.05,
                      duration: 0.4,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                    whileHover={{
                      scale: selectedImageIndex === index ? 0.95 : 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-full h-full p-2">
                      <CldImage
                        src={image.public_id}
                        width={150}
                        height={150}
                        alt={`${creation.display_name} - View ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Selected indicator */}
                    {selectedImageIndex === index && (
                      <motion.div
                        className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"
                        layoutId="selectedIndicatorDesktop"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Index number */}
                    <div className="absolute bottom-1 left-1 text-xs font-mono text-neutral-400">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* mobile thumbnails */}
      {relatedAssets.length > 1 && (
        <motion.div
          className="flex-shrink-0 p-4 px-8 md:hidden"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {relatedAssets.map((image, index) => (
              <motion.div
                key={index}
                className={`relative flex-shrink-0 w-16 h-16 cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                  selectedImageIndex === index
                    ? "border-neutral-100 bg-neutral-800/50"
                    : "border-neutral-600/50 bg-neutral-800/20 hover:border-neutral-500"
                }`}
                onClick={() => handleThumbnailClick(image, index)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.6 + index * 0.05,
                  duration: 0.4,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                whileHover={{
                  scale: selectedImageIndex === index ? 0.95 : 1.1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-full h-full p-1.5">
                  <CldImage
                    src={image.public_id}
                    width={100}
                    height={100}
                    alt={`${creation.display_name} - View ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Selected indicator */}
                {selectedImageIndex === index && (
                  <motion.div
                    className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full"
                    layoutId="selectedIndicatorMobile"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
