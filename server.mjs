// Production entry. The @astrojs/node static handler serves prerendered files
// BEFORE Astro middleware runs, so security headers are applied here at the
// HTTP layer for every response (static + dynamic). Keep in sync with src/middleware.ts.
import http from "node:http";
import zlib from "node:zlib";

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

// Compressible text types. The adapter does not compress; Cloudflare does in
// front, but Coolify/direct access would otherwise ship raw bytes.
const COMPRESSIBLE = /^(text\/|application\/(json|javascript|xml|manifest\+json|ld\+json)|image\/svg\+xml)/i;

function applyCache(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") return;
  const url = (req.url ?? "").split("?")[0];
  const writeHead = res.writeHead.bind(res);
  // The static handler sets its own Cache-Control at writeHead time, so
  // override right before headers are flushed.
  res.writeHead = (status, ...rest) => {
    if (status === 200 || status === 304) {
      if (url.startsWith("/_astro/")) {
        // Hashed build output: cache forever.
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (!url.startsWith("/api/") && /^(text\/html)/i.test(String(res.getHeader("Content-Type") ?? ""))) {
        res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
      } else if (/\.(png|svg|webp|avif|jpg|woff2)$/.test(url)) {
        res.setHeader("Cache-Control", "public, max-age=86400");
      }
    }
    return writeHead(status, ...rest);
  };
}

function compress(req, res) {
  if (req.method === "HEAD") return;
  const accept = String(req.headers["accept-encoding"] ?? "");
  const enc = /\bbr\b/.test(accept) ? "br" : /\bgzip\b/.test(accept) ? "gzip" : null;
  if (!enc) return;
  const write = res.write.bind(res);
  const end = res.end.bind(res);
  let stream = null;
  let decided = false;
  const decide = () => {
    decided = true;
    const type = String(res.getHeader("Content-Type") ?? "");
    if (res.statusCode === 206 || res.statusCode === 204 || res.statusCode === 304 || res.getHeader("Content-Encoding") || !COMPRESSIBLE.test(type)) return;
    stream = enc === "br" ? zlib.createBrotliCompress({ params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } }) : zlib.createGzip({ level: 6 });
    res.setHeader("Content-Encoding", enc);
    res.removeHeader("Content-Length");
    res.removeHeader("Accept-Ranges");
    const etag = res.getHeader("ETag");
    if (etag) res.setHeader("ETag", String(etag).replace(/"$/, `-${enc}"`));
    stream.on("data", (c) => write(c));
    stream.on("end", () => end());
  };
  res.setHeader("Vary", "Accept-Encoding");
  res.write = (chunk, ...a) => {
    if (!decided) decide();
    if (!stream) return write(chunk, ...a);
    stream.write(chunk, ...a);
    return true; // never signal backpressure: 'drain' would be emitted by the zlib stream, not res
  };
  res.end = (chunk, ...a) => {
    if (!decided) decide();
    if (!stream) return end(chunk, ...a);
    if (typeof chunk === "function") { chunk = undefined; }
    if (chunk != null && typeof chunk !== "function") stream.end(chunk);
    else stream.end();
    return res;
  };
}

const origCreateServer = http.createServer;
http.createServer = (...args) => {
  const i = args.findIndex((a) => typeof a === "function");
  if (i >= 0) {
    const listener = args[i];
    args[i] = (req, res) => {
      for (const [k, v] of Object.entries(HEADERS)) res.setHeader(k, v);
      applyCache(req, res);
      compress(req, res);
      return listener(req, res);
    };
  }
  return origCreateServer.apply(http, args);
};

await import(process.env.DIST_ENTRY ?? "./dist/server/entry.mjs");
