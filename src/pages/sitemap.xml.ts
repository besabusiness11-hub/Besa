import type { APIRoute } from "astro";
import { VALIDATION } from "../lib/offer";
import { SITE } from "../lib/site";

export const prerender = true;

// Solo URL indicizzabili. Esclusi: /grazie, /404, /api/*. Su staging (PUBLIC_NOINDEX) nessun URL.
// In "validation" /termini è solo un segnaposto (noindex): fuori dalla sitemap.
const PATHS = ["/", "/privacy-policy", "/cookie-policy", ...(VALIDATION ? [] : ["/termini"])];
const lastmod = new Date().toISOString().slice(0, 10); // data di build

export const GET: APIRoute = () => {
  const paths = SITE.noindex ? [] : PATHS;
  const urls = paths
    .map((p) => `  <url><loc>${SITE.url}${p === "/" ? "/" : p}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
};
