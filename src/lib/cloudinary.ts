import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export interface CloudinaryImage {
  asset_id: string;
  asset_folder: string;
  public_id: string;
  display_name: string;
  related_assets?: CloudinaryImage[];
  width: number;
  height: number;
  aspect_ratio: number;
}

export async function getAllShowcaseImages(): Promise<CloudinaryImage[]> {
  try {
    const result = await cloudinary.search
      .expression("folder:fiber-art/* AND tags=showcase")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();
    return result.resources as CloudinaryImage[];
  } catch (error) {
    console.error("Error fetching artworks from Cloudinary:", error);
    return [];
  }
}

export async function getImageWithRelatedAssets(
  public_id: string,
): Promise<CloudinaryImage> {
  try {
    return await cloudinary.api
      .resource(public_id, { related: true })
      .then((r) => r as CloudinaryImage);
  } catch (error) {
    console.error("Error fetching artworks from Cloudinary:", error);
    throw error;
  }
}
