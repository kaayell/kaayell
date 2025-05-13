import {getImageWithRelatedAssets} from "@/lib/cloudinary";
import {Suspense} from "react";
import CreationDetailPage from "@/components/creations/CreationDetail";

export default async function Page(props: { params: Promise<{ public_id: string }> }) {
	const publicId = (await props.params).public_id
	const creation = await getImageWithRelatedAssets(publicId);

	return (
		<Suspense fallback={<div className="text-center py-10">Loading creations...</div>}>
			<CreationDetailPage creation={creation}/>
		</Suspense>
	);
}