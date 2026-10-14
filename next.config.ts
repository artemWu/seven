import type { NextConfig } from "next";

const siteTarget = process.env.SITE_TARGET ?? (process.env.GITHUB_ACTIONS === "true" ? "github-pages" : "production");
const isGithubPages = siteTarget === "github-pages";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? "/seven" : "",
  assetPrefix: isGithubPages ? "/seven/" : undefined,
  env: {
    NEXT_PUBLIC_SITE_TARGET: siteTarget,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
