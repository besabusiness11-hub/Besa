// Old address of the admin panel: Keystatic's default route. Everything lives at /admin now
// (patches/@keystatic__core@0.6.9.patch); keep the old links and bookmarks working.
import type { APIRoute } from "astro";

export const prerender = false;

export const ALL: APIRoute = ({ params, url, redirect }) =>
  redirect(`/admin${params.params ? `/${params.params}` : ""}${url.search}`, 301);
