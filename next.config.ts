import type { NextConfig } from "next";

const isTauriBuild = !!process.env.TAURI_BUILD;

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  ...(isTauriBuild && { output: "export" }),
};

export default nextConfig;
