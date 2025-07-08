"use client";

import { use, useState } from "react";
import { CloudinaryImage } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";
import Loading from "@/components/ui/Loading";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  createDelayedAnimation,
  createStaggerItem,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  staggerContainer,
} from "@/lib/animations";
import Pegboard from "@/components/ui/Pegboard";

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

  return (
    <div className="h-screen w-full max-w-screen max-h-screen pt-14 pb-5 px-5 md:pl-0 md:pr-18">
      <Pegboard>
        <div className="flex items-center justify-between py-4 md:p-4">
          <motion.div {...createDelayedAnimation(0.4, slideInFromLeft)}>
            <motion.button
              onClick={handleBackClick}
              className="creation-label inline-flex items-center transition-colors duration-300"
              whileHover={{ x: -3 }}
            >
              <span className="text-sm md:text-lg mr-2">←</span>
              <span className="text-sm md:text-lg">Back</span>
            </motion.button>
          </motion.div>

          <motion.h1
            className="creation-label text-right text-xl md:text-3xl"
            {...createDelayedAnimation(0.4, slideInFromRight)}
          >
            {creationDetail.display_name}
          </motion.h1>
        </div>

        <div className="h-[90%] px-2 md:px-4 flex flex-col md:flex-row">
          {relatedAssets.length > 1 && (
            <div className="h-20 w-full overflow-x-auto md:h-full md:w-1/5 md:overflow-y-auto md:overflow-x-visible">
              <motion.div
                className="flex flex-row gap-2 h-full md:flex-col md:space-y-2 md:gap-0"
                variants={staggerContainer}
                initial={"initial"}
                animate={"animate"}
              >
                {relatedAssets.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`relative aspect-square cursor-pointer overflow-hidden border-2 flex-shrink-0 w-16 h-16 md:w-auto md:h-auto ${
                      selectedImageIndex === index
                        ? "border-neutral-100 bg-neutral-800/50"
                        : "border-neutral-600/50 bg-neutral-800/20 hover:border-neutral-500"
                    }`}
                    variants={createStaggerItem(slideInFromBottom)}
                    onClick={() => handleThumbnailClick(image, index)}
                  >
                    <CldImage
                      src={image.public_id}
                      width={150}
                      height={150}
                      alt={`${creationDetail.display_name} - View ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          <motion.div className="flex-1 min-h-0" {...slideInFromBottom}>
            <div className="w-full h-full">
              {isLoading && <Loading />}

              <motion.div
                className="w-full h-full p-2 md:p-4"
                layoutId={`image-${selectedImage.public_id}`}
                key={selectedImage.public_id}
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
            </div>
          </motion.div>
        </div>
      </Pegboard>
    </div>
  );
}
