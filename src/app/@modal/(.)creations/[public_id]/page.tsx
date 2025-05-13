import {getImageWithRelatedAssets} from "@/lib/cloudinary";
import {Suspense} from "react";
import CreationDetailPage from "@/components/creations/CreationDetail";
import {CreationModal} from "@/components/creations/CreationModal";

export default async function Page(props: {params: Promise<{public_id: string}>}) {
	const publicId = (await props.params).public_id
	const creation = await getImageWithRelatedAssets(publicId);

	return (
		<CreationModal>
			{/*<div className="py-12">*/}
			{/*	<div className="container-custom">*/}
					<Suspense fallback={<div className="text-center py-10">Loading creations...</div>}>
						<CreationDetailPage creation={creation}/>
					</Suspense>
				{/*</div>*/}
			{/*</div>*/}
		</CreationModal>
	);
}