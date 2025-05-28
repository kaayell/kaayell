"use client";

import { CloudinaryImage } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

interface CreationGalleryProps {
  creations: CloudinaryImage[];
  initialAnimation?: boolean;
}

export default function CreationsGrid({ creations }: CreationGalleryProps) {
  const router = useRouter();

  return (
    <div className="grid-gallery mx-auto p-10 sm:px-16">
      {creations.map((image) => {
        return (
          <div
            key={image.public_id}
            className={`grid-image shadow-xl transition-transform duration-500 hover:scale-110`}
            onClick={() => router.push(`/creations/${image.public_id}`)}
          >
            <CldImage
              src={image.public_id}
              alt={image.display_name}
              width={image.width}
              height={image.height}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
