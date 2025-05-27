import { Suspense } from "react";
import { getAllShowcaseImages } from "@/lib/cloudinary";
import CreationsGrid from "@/components/creations/CreationsGrid";
import Loading from "@/components/ui/Loading";

export const metadata = {
  title: "Creations | kaayell",
  description: "",
};

export default async function Page() {
  const creations = await getAllShowcaseImages();

  return (
    <Suspense fallback={<Loading />}>
      <CreationsGrid creations={creations} />
    </Suspense>
  );
}
