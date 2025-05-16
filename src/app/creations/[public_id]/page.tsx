import { getImageWithRelatedAssets } from "@/lib/cloudinary";
import CreationDetailPage from "@/components/creations/CreationDetail";

export default async function Page(props: {
  params: Promise<{ public_id: string }>;
}) {
  const publicId = (await props.params).public_id;
  const creation = await getImageWithRelatedAssets(publicId);

  return <CreationDetailPage creation={creation} />;
}
