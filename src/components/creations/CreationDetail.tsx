"use client";

import { useState } from "react";
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

  const relatedAssets = creation.related_assets
    ? [...[creation], ...creation.related_assets]
    : [creation];

  return (
    <div className="w-full h-screen flex flex-row justify-center px-4">
      <div className="flex flex-col gap-2 items-center md:items-start">
        <motion.button
          onClick={handleBackClick}
          className="flex items-center gap-2 text-neutral-300 hover:text-neutral-100 cursor-pointer transition-colors group"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm font-medium">Back to Gallery</span>
        </motion.button>
        <div className="mb-4">
          <motion.h2
            className="text-3xl md:text-4xl font-light mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {creation.display_name}
          </motion.h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-neutral-400 to-transparent"></div>
        </div>

        <div
          className="flex flex-col gap-4 md:flex-row w-full max-w-7xl h-screen max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Side */}
          <motion.div
            className="w-full h-[50vh] md:h-screen flex items-center justify-center relative"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                className="relative w-full h-full max-w-3xl max-h-[90vh] overflow-hidden"
                layoutId={
                  selectedImageIndex === 0
                    ? `image-${selectedImage.public_id}`
                    : undefined
                }
              >
                {/* Loading Indicator */}
                {isLoading && <Loading />}

                <CldImage
                  src={selectedImage.public_id}
                  width={creation.width}
                  height={creation.height}
                  alt={creation.display_name}
                  className={`w-full h-full object-contain transition-opacity duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={handleImageLoad}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="w-full h-full max-w-lg max-h-[90vh] md:h-screen overflow-y-auto mx-auto"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Mobile */}
            <motion.div
              className="md:hidden w-full overflow-x-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex space-x-4 min-w-max">
                {relatedAssets.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`flex-shrink-0 w-40 h-40 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "ring-2 ring-primary-500 scale-[0.96]"
                        : "hover:opacity-90"
                    } ${isLoading && selectedImageIndex === index ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={() => handleThumbnailClick(image, index)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-full h-full overflow-hidden">
                      <CldImage
                        src={image.public_id}
                        width={160}
                        height={160}
                        alt={`${creation.display_name} - View ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Desktop */}
            <motion.div
              className="hidden md:grid grid-cols-2 gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {relatedAssets.map((image, index) => (
                <motion.div
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedImageIndex === index
                      ? "ring-2 ring-primary-500 scale-[0.96]"
                      : "hover:opacity-90"
                  } ${isLoading && selectedImageIndex === index ? "opacity-50 pointer-events-none" : ""}`}
                  onClick={() => handleThumbnailClick(image, index)}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-full h-full overflow-hidden">
                    <CldImage
                      src={image.public_id}
                      width={"500"}
                      height={"700"}
                      alt={`${creation.display_name} - View ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
