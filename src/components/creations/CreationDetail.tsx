"use client";

import { use, useEffect, useState } from "react";
import { CloudinaryImage } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";
import Loading from "@/components/ui/Loading";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  createDelayedAnimation,
  createStaggerItem,
  dragAnimation,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  staggerContainer,
} from "@/lib/animations";

interface CreationDetailPageProps {
  creation: Promise<CloudinaryImage>;
}

export default function CreationDetailPage({
  creation,
}: CreationDetailPageProps) {
  const creationDetail = use(creation);
  const [selectedImage, setSelectedImage] =
    useState<CloudinaryImage>(creationDetail);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleThumbnailClick = (image: CloudinaryImage, index: number) => {
    if (selectedImageIndex !== index) {
      setIsLoading(true);
      setSelectedImage(image);
      setSelectedImageIndex(index);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleBackClick = () => {
    router.back();
  };

  const relatedAssets = creationDetail.related_assets
    ? [...[creationDetail], ...creationDetail.related_assets]
    : [creationDetail];

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
    <div className="h-screen flex flex-col">
      {/* heading */}
      <div className="flex-shrink-0 pt-24 pb-6 px-8 md:px-16 lg:px-24">
        <div className="flex items-center justify-between">
          <motion.div {...createDelayedAnimation(0.4, slideInFromLeft)}>
            <motion.button
              onClick={handleBackClick}
              className="inline-flex items-center text-neutral-500 hover:text-neutral-100 transition-colors duration-300"
              whileHover={{ x: -3 }}
            >
              <span className="text-lg mr-2">←</span>
              <span className="text-sm">Back</span>
            </motion.button>
          </motion.div>

          <motion.h1
            className="text-right text-xl md:text-2xl font-light text-neutral-500"
            {...createDelayedAnimation(0.4, slideInFromRight)}
          >
            {creationDetail.display_name}
          </motion.h1>
        </div>
      </div>

      {/* main content */}
      <div className="flex-1 min-h-0 px-8 md:px-18 lg:px-26 mb-8">
        <div className="h-full flex flex-col md:flex-row gap-6">
          <motion.div className="flex-1 min-h-0" {...slideInFromBottom}>
            <div className="relative w-full h-full bg-neutral-800/20 border border-neutral-700/30 overflow-hidden">
              {isLoading && <Loading />}

              {/* showcase image */}
              <motion.div
                className="relative w-full h-full"
                layoutId={`image-${selectedImage.public_id}`}
                key={selectedImage.public_id}
              >
                <motion.div
                  className="w-full h-full p-6 md:p-8 lg:p-12"
                  {...dragAnimation}
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
                >
                  <CldImage
                    src={selectedImage.public_id}
                    width={creationDetail.width}
                    height={creationDetail.height}
                    alt={creationDetail.display_name}
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
            <div className="hidden md:flex flex-col w-32 lg:w-40 min-h-0">
              <motion.div
                className="flex-1 min-h-0 overflow-y-auto scrollbar-hide space-y-3"
                variants={staggerContainer}
                initial={"initial"}
                animate={"animate"}
              >
                {relatedAssets.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`relative aspect-square cursor-pointer overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? "border-neutral-100 bg-neutral-800/50"
                        : "border-neutral-600/50 bg-neutral-800/20 hover:border-neutral-500"
                    }`}
                    variants={createStaggerItem(slideInFromBottom)}
                    onClick={() => handleThumbnailClick(image, index)}
                  >
                    <div className="w-full h-full p-2">
                      <CldImage
                        src={image.public_id}
                        width={150}
                        height={150}
                        alt={`${creationDetail.display_name} - View ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/*mobile thumbnails*/}
      {relatedAssets.length > 1 && (
        <div className="flex-shrink-0 p-4 px-8 md:hidden">
          <motion.div
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
            variants={staggerContainer}
            initial={"initial"}
            animate={"animate"}
          >
            {relatedAssets.map((image, index) => (
              <motion.div
                key={index}
                className={`relative flex-shrink-0 w-16 h-16 cursor-pointer overflow-hidden border-2 ${
                  selectedImageIndex === index
                    ? "border-neutral-100 bg-neutral-800/50"
                    : "border-neutral-600/50 bg-neutral-800/20 hover:border-neutral-500"
                }`}
                variants={createStaggerItem(slideInFromBottom)}
                onClick={() => handleThumbnailClick(image, index)}
              >
                <div className="w-full h-full p-1.5">
                  <CldImage
                    src={image.public_id}
                    width={100}
                    height={100}
                    alt={`${creationDetail.display_name} - View ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
