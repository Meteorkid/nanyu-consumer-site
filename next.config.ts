import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@google/model-viewer"],
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
