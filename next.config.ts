import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "helldivers.wiki.gg",
				pathname: "/**"
			}
		]
	}
};

export default nextConfig;
