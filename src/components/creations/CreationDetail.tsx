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
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const relatedAssets = creationDetail.related_assets
    ? [...[creationDetail], ...creationDetail.related_assets]
    : [creationDetail];
  const creationType = creationDetail.asset_folder.split("/")[1];

  const handleThumbnailClick = (image: CloudinaryImage, index: number) => {
    if (selectedImageIndex !== index) {
      setIsLoading(true);
      setSelectedImage(image);
      setSelectedImageIndex(index);
    }
  };

  return (
    <div className="h-screen w-full max-w-screen max-h-screen pt-14 pb-5 px-5 md:pt-8 md:pl-0 md:pr-18">
      <Pegboard>
        <div className="flex items-center justify-between py-4 md:p-4">
          <motion.div {...createDelayedAnimation(0.4, slideInFromLeft)}>
            <motion.button
              onClick={() => router.back()}
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
            <div className="h-1/8 w-full overflow-x-auto scrollbar-hide md:h-full md:w-1/5 md:overflow-y-auto md:overflow-x-visible">
              <motion.div
                className="flex flex-row gap-2 h-full md:flex-col md:space-y-2 md:gap-0"
                variants={staggerContainer}
                initial={"initial"}
                animate={"animate"}
              >
                {relatedAssets.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`creation-detail-image`}
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
            <div
              className={`md:hidden ${creationType}-sticker absolute left-0`}
            />
            <div className="w-full h-full">
              <motion.div
                className="w-full h-full md:p-4"
                layoutId={`image-${selectedImage.public_id}`}
                key={selectedImage.public_id}
              >
                {isLoading && <Loading />}

                <CldImage
                  src={selectedImage.public_id}
                  width={creationDetail.width}
                  height={creationDetail.height}
                  alt={creationDetail.display_name}
                  className="w-full h-full object-contain pointer-events-none md:pointer-events-auto"
                  onLoad={() => setIsLoading(false)}
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="hidden md:flex flex-col items-center md:h-full md:w-1/5">
            <div className={`${creationType}-sticker`} />
          </div>
        </div>
      </Pegboard>
    </div>
  );
}
