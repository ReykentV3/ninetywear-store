import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Replace with your WooCommerce domain for production
      },
    ],
  },
  experimental: {
    // optimizeCss: true, // Uncomment if you add critters
  },
};

export default nextConfig;
