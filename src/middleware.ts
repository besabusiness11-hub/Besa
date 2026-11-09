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

const NOINDEX_ALL = ["true", "1"].includes(String(process.env.PUBLIC_NOINDEX ?? ""));

export const onRequest = defineMiddleware(async (ctx, next) => {
  const res = await next();
  const h = res.headers;
  h.set("Content-Security-Policy", CSP);
  h.set("X-Content-Type-Options", "nosniff");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  h.set("X-Frame-Options", "DENY");
  if (NOINDEX_ALL || ctx.url.pathname.startsWith("/api/")) h.set("X-Robots-Tag", "noindex, nofollow");
  return res;
});
