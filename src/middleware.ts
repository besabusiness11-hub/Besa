import { defineMiddleware } from "astro:middleware";

const UMAMI = "https://umami.besaweb.com";
const TURNSTILE = "https://challenges.cloudflare.com";

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${UMAMI} ${TURNSTILE}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  `connect-src 'self' ${UMAMI} ${TURNSTILE}`,
  `frame-src ${TURNSTILE}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

export const onRequest = defineMiddleware(async (_ctx, next) => {
  const res = await next();
  const h = res.headers;
  h.set("Content-Security-Policy", CSP);
  h.set("X-Content-Type-Options", "nosniff");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  h.set("X-Frame-Options", "DENY");
  return res;
});
