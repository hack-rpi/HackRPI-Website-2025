/** @type {import('next').NextConfig} */
const nextConfig = {
	// Enable small, safe production optimizations
	swcMinify: true,
	productionBrowserSourceMaps: false,
	eslint: {
		// Ignore ESLint during builds to avoid blocking developers,
		// but consider setting up a separate CI workflow to catch these
		ignoreDuringBuilds: process.env.CI !== "true",
		dirs: ["app", "components", "utils", "types", "data"],
	},
	typescript: {
		// Ignore TypeScript errors during builds to avoid blocking developers,
		// but consider setting up a separate CI workflow to catch these
		ignoreBuildErrors: process.env.CI !== "true",
	},
};

module.exports = nextConfig;
