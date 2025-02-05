import path from "path";
import { NextConfig } from "next";
import withMDX from "@next/mdx";

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  basePath: "/alex-svidersky",
  output: "export",
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDXConfig(nextConfig);
