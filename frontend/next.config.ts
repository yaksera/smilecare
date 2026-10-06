import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 keeps photos crisp (the default 75 visibly softens them). WebP only: AVIF at the
    // same setting compresses these photos much harder and smears fine detail.
    qualities: [75, 90],
  },
};

export default nextConfig;
