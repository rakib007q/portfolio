import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the 3D bundle out of the first paint: it is dynamic-imported (ssr:false).
  // Compress responses; images are already optimised via next/image.
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap", "three"],
  },
};

export default nextConfig;
