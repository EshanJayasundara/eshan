import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/eshan",
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
};

export default nextConfig;
