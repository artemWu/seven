const GITHUB_PAGES_BASE_PATH = "/seven";

export function sitePath(path: string) {
  if (!path.startsWith("/")) return path;
  if (process.env.NEXT_PUBLIC_SITE_TARGET !== "github-pages") return path;
  if (path === GITHUB_PAGES_BASE_PATH || path.startsWith(`${GITHUB_PAGES_BASE_PATH}/`)) return path;
  return `${GITHUB_PAGES_BASE_PATH}${path}`;
}
