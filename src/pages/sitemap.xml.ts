import type { APIRoute } from "astro";
import { SITE } from "../lib/site";

export const prerender = true;

// Solo URL indicizzabili. Esclusi: /grazie, /404, /api/*. Su staging (PUBLIC_NOINDEX) nessun URL.
const PATHS = ["/", "/privacy-policy", "/cookie-policy", "/termini"];
const lastmod = new Date().toISOString().slice(0, 10); // data di build

export const GET: APIRoute = () => {
  const paths = SITE.noindex ? [] : PATHS;
  const urls = paths
    .map((p) => `  <url><loc>${SITE.url}${p === "/" ? "/" : p}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
};
