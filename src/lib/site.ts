import { copy } from "./copy";

const env = (import.meta as { env?: Record<string, string | undefined> }).env ?? {};
const origin = (env.PUBLIC_SITE_URL || "https://besaweb.com").replace(/\/+$/, "");

export const SITE = {
  name: "BESA",
  /** Origin used for canonical, og:url, sitemap and JSON-LD. Set PUBLIC_SITE_URL at build time. */
  url: origin,
  email: "info@besaweb.com",
  locale: "it_IT",
  // Single source of truth: same strings as the homepage <title>/<meta description>.
  title: copy.meta.title,
  description: copy.meta.description,
  legalLine: copy.footer.legalLine,
  /** PUBLIC_NOINDEX=true (staging): noindex meta, X-Robots-Tag, robots.txt Disallow. */
  noindex: env.PUBLIC_NOINDEX === "true" || env.PUBLIC_NOINDEX === "1",
} as const;
