import type { APIRoute } from "astro";
import { SITE } from "../lib/site";

export const prerender = true;

export const GET: APIRoute = () => {
  const body = SITE.noindex
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\n\nSitemap: ${SITE.url}/sitemap.xml\n`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
};
