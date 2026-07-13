import type { NextConfig } from "next";
import path from "node:path";

// Domaine personnalisé (local.enzoprat.fr) → le site est servi à la racine,
// donc plus de basePath même sur GitHub Pages.
const basePath = "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
