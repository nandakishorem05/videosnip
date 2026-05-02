import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["fluent-ffmpeg"],
  },
  api: {
    bodyParser: false,
  },
};

export default nextConfig;
