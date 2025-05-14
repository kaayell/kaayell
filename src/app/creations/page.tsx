import { Suspense } from "react";
import { getAllShowcaseImages } from "@/lib/cloudinary";
import CreationsGrid from "@/components/creations/CreationsGrid";

export const metadata = {
  title: "Creations | kaayell",
  description: "",
};

export default async function Page() {
  const creations = await getAllShowcaseImages();

  return (
    <div className="py-12">
      <div className="container-custom">
        <Suspense
          fallback={
            <div className="text-center py-10">Loading creations...</div>
          }
        >
          <CreationsGrid creations={creations} />
        </Suspense>
      </div>
    </div>
  );
}
