import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/alex-svidersky",
  output: "export",
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
};

export default nextConfig;
