// Production entry. The @astrojs/node static handler serves prerendered files
// BEFORE Astro middleware runs, so security headers are applied here at the
// HTTP layer for every response (static + dynamic). Keep in sync with src/middleware.ts.
import http from "node:http";

const UMAMI = "https://umami.besaweb.com";
const TURNSTILE = "https://challenges.cloudflare.com";
const HEADERS = {
  "Content-Security-Policy": [
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
  ].join("; "),
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "X-Frame-Options": "DENY",
};

const origCreateServer = http.createServer;
http.createServer = (...args) => {
  const i = args.findIndex((a) => typeof a === "function");
  if (i >= 0) {
    const listener = args[i];
    args[i] = (req, res) => {
      for (const [k, v] of Object.entries(HEADERS)) res.setHeader(k, v);
      return listener(req, res);
    };
  }
  return origCreateServer.apply(http, args);
};

await import("./dist/server/entry.mjs");
