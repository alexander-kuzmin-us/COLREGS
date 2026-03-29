/** Canonical site origin for SEO, JSON-LD, and Open Graph. Set `VITE_PUBLIC_SITE_URL` when deploying to a custom domain. */
const envUrl = import.meta.env.VITE_PUBLIC_SITE_URL;
export const SITE_ORIGIN =
  typeof envUrl === "string" && envUrl.trim().length > 0
    ? envUrl.trim().replace(/\/$/, "")
    : "https://colregs-academy.replit.app";

export const siteUrl = (path = "") =>
  `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
