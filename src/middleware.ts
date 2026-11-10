import { defineMiddleware } from "astro:middleware";
import { FEATURES } from "./lib/features";

// Keep in sync with server.mjs.
const UMAMI = "https://umami.besaweb.com";
// Turnstile origins only while the dynamic form is on (FEATURES.leadForm).
const TURNSTILE = FEATURES.leadForm.enabled ? " https://challenges.cloudflare.com" : "";

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${UMAMI}${TURNSTILE}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  `connect-src 'self' ${UMAMI}${TURNSTILE}`,
  TURNSTILE ? `frame-src${TURNSTILE}` : "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

// Admin panel (/keystatic) and its API: the Keystatic UI talks to GitHub from the browser (GraphQL,
// raw file contents, avatars) and runs a blob worker. Only these routes get the wider policy.
const ADMIN = /^\/(keystatic|api\/keystatic)(\/|$)/;
const ADMIN_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://avatars.githubusercontent.com https://raw.githubusercontent.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.github.com https://raw.githubusercontent.com",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://github.com",
  "frame-ancestors 'none'",
].join("; ");

const NOINDEX_ALL = ["true", "1"].includes(String(process.env.PUBLIC_NOINDEX ?? ""));

export const onRequest = defineMiddleware(async (ctx, next) => {
  const res = await next();
  const h = res.headers;
  const admin = ADMIN.test(ctx.url.pathname);
  h.set("Content-Security-Policy", admin ? ADMIN_CSP : CSP);
  if (admin) h.set("Cache-Control", "no-store");
  h.set("X-Content-Type-Options", "nosniff");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  h.set("X-Frame-Options", "DENY");
  if (NOINDEX_ALL || admin || ctx.url.pathname.startsWith("/api/")) h.set("X-Robots-Tag", "noindex, nofollow");
  return res;
});
