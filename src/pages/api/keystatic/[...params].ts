// Keystatic API: GitHub OAuth (login, token refresh) and, in local mode, reading/writing src/data/site.
// Secrets come from the runtime environment (Coolify): KEYSTATIC_GITHUB_CLIENT_ID,
// KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET.
import { makeHandler } from "@keystatic/astro/api";
import type { APIRoute } from "astro";
import config from "../../../../keystatic.config";

export const prerender = false;

const handler = makeHandler({ config });
const json = (status: number, error: string) =>
  new Response(JSON.stringify({ error }), { status, headers: { "content-type": "application/json; charset=utf-8" } });

export const ALL: APIRoute = (ctx) => {
  // Local mode writes files on the machine running the server: allowed only in `pnpm dev`.
  if (config.storage.kind === "local" && !import.meta.env.DEV) return json(404, "Not found");
  if (config.storage.kind === "github" && !(process.env.KEYSTATIC_GITHUB_CLIENT_ID && process.env.KEYSTATIC_GITHUB_CLIENT_SECRET && process.env.KEYSTATIC_SECRET)) {
    // In dev Keystatic itself walks you through creating the GitHub App, so let it through.
    if (!import.meta.env.DEV) return json(503, "Pannello non configurato: mancano KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET e KEYSTATIC_SECRET nell'ambiente.");
  }
  return handler(ctx);
};
