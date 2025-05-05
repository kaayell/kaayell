import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ['res.cloudinary.com'],
		formats: ['image/avif', 'image/webp'],
	},
	reactStrictMode: true,
};

export default nextConfig;
