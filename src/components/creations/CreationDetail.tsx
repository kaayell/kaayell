"use client";

import { useRef, useState } from "react";
import { CloudinaryImage } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";

interface CreationDetailPageProps {
  creation: CloudinaryImage;
}

export default function CreationDetailPage({
  creation,
}: CreationDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage>(creation);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const mainImageElementRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const handleThumbnailClick = (image: CloudinaryImage, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const relatedAssets = creation.related_assets
    ? [...[creation], ...creation.related_assets]
    : [creation];

  return (
    <div
      ref={contentRef}
      className="w-full h-full max-w-[1800px] max-h-screen flex flex-col md:flex-row"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left Side */}
      <div
        ref={mainImageRef}
        className="w-full md:w-3/5 h-1/2 md:h-full bg-neutral-900 relative flex items-center justify-center"
      >
        <div className="w-full h-full max-h-screen relative">
          <CldImage
            ref={mainImageElementRef}
            src={selectedImage.public_id}
            width={"500"}
            height={"700"}
            alt={creation.display_name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Right Side */}
      <div
        ref={infoRef}
        className="w-full md:w-2/5 h-1/2 md:h-full bg-neutral-800 overflow-y-auto p-6 md:p-8 text-white"
      >
        <div className="max-w-lg mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {creation.display_name}
            </h2>
          </div>

          <div className="mt-10">
            <div ref={thumbnailsRef} className="grid grid-cols-2 gap-4">
              {relatedAssets.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${selectedImageIndex === index ? "ring-2 ring-primary-500 scale-[0.96]" : "hover:opacity-90"}`}
                  onClick={() => handleThumbnailClick(image, index)}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
