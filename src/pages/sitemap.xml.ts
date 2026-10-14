import type { APIRoute } from "astro";
import { SITE } from "../lib/site";

export const prerender = true;

// Solo URL indicizzabili. Esclusi: /grazie, /404, /api/*.
const PATHS = ["/", "/privacy-policy", "/cookie-policy"];

export const GET: APIRoute = () => {
  const urls = PATHS.map((p) => `  <url><loc>${SITE.url}${p === "/" ? "" : p}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8" } });
};
