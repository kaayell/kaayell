"use client";

import { useState } from "react";
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

  const handleThumbnailClick = (image: CloudinaryImage, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const relatedAssets = creation.related_assets
    ? [...[creation], ...creation.related_assets]
    : [creation];

  return (
    <div
      className="flex flex-col gap-4 md:flex-row w-full h-screen max-h-[90vh] px-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left Side */}
      <div className="w-full h-[50vh] max-h-[90vh] md:h-screen flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full max-w-3xl max-h-[90vh] overflow-hidden">
            <CldImage
              src={selectedImage.public_id}
              width={creation.width}
              height={creation.height}
              alt={creation.display_name}
              className="w-full h-full object-contain transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full h-full max-w-lg max-h-[90vh] md:h-screen overflow-y-auto mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {creation.display_name}
        </h2>

        {/* Mobile */}
        <div className="md:hidden w-full overflow-x-auto">
          <div className="flex space-x-4 min-w-max">
            {relatedAssets.map((image, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-40 h-40 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedImageIndex === index
                    ? "ring-2 ring-primary-500 scale-[0.96]"
                    : "hover:opacity-90"
                }`}
                onClick={() => handleThumbnailClick(image, index)}
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
              </div>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-2 gap-4">
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
  );
}
