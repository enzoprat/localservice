import type { NextConfig } from "next";
import path from "node:path";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isGithubPages ? "/localservice" : undefined,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
