import { getImageWithRelatedAssets } from "@/lib/cloudinary";
import CreationDetailPage from "@/components/creations/CreationDetail";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default async function Page(props: {
  params: Promise<{ public_id: string }>;
}) {
  const publicId = (await props.params).public_id;
  const creation = await getImageWithRelatedAssets(publicId);

  return (
    <Suspense fallback={<Loading />}>
      <CreationDetailPage creation={creation} />;
    </Suspense>
  );
}
