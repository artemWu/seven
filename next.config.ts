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
  // vinext 1.0.0-beta.5 prerender requests omit the trailing slash. Using
  // false during export avoids its 308 response being treated as a failure;
  // Apache keeps serving the public slash URLs from the normalized folders.
  trailingSlash: siteTarget === "production" ? false : true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
