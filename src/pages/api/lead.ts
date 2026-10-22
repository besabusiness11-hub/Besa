import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
import { buildEmail, clientIp, createRateLimiter, MSG, parseLead, readBody, replyToOf, verifyTurnstile } from "../../lib/lead";

export const prerender = false;

const limiter = createRateLimiter(5, 10 * 60 * 1000);

const jsonRes = (status: number, body: { ok: true } | { ok: false; error: string }) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

/** Plain browser form posts (no JS) send Accept: text/html; the fetch() path sends application/json. */
const wantsHtml = (request: Request) => {
  const a = request.headers.get("accept") ?? "";
  return a.includes("text/html") && !a.includes("application/json");
};

const redirect = (to: string) =>
  new Response(null, { status: 303, headers: { location: to, "cache-control": "no-store" } });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const html = wantsHtml(request);
  const json = (status: number, body: { ok: true } | { ok: false; error: string }) =>
    html ? redirect(body.ok ? "/grazie" : "/?invio=errore#contatto") : jsonRes(status, body);
  const rid = crypto.randomUUID().slice(0, 8);
  let ip = "unknown";
  try {
    ip = clientIp(request.headers, clientAddress);
  } catch {}

  if (!limiter.check(ip)) return json(429, { ok: false, error: MSG.rate });

  const raw = await readBody(request);
  if (!raw) return json(400, { ok: false, error: MSG.body });

  const parsed = parseLead(raw);
  if (parsed.kind === "honeypot") return json(200, { ok: true });
  if (parsed.kind === "error") return json(400, { ok: false, error: parsed.error });

  const nodeEnv = process.env.NODE_ENV;
  const human = await verifyTurnstile(parsed.lead["cf-turnstile-response"], ip, {
    secret: process.env.TURNSTILE_SECRET,
    nodeEnv,
  });
  if (!human) return json(400, { ok: false, error: MSG.turnstile });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const to = process.env.MAIL_TO || "info@besaweb.com";
  const from = process.env.MAIL_FROM || SMTP_USER || "info@besaweb.com";

  if (!SMTP_HOST) {
    console.error(`[lead ${rid}] SMTP non configurato`);
    if (nodeEnv === "production") return json(500, { ok: false, error: MSG.server });
    console.warn(`[lead ${rid}] dev: SMTP assente, email non inviata`);
    return json(200, { ok: true });
  }

  try {
    const port = Number(SMTP_PORT) || 587;
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 15000,
    });
    const mail = buildEmail(parsed.lead);
    await transport.sendMail({ from, to, replyTo: replyToOf(parsed.lead), subject: mail.subject, text: mail.text, html: mail.html });
    console.info(`[lead ${rid}] inviata`);
    return json(200, { ok: true });
  } catch (err) {
    console.error(`[lead ${rid}] invio fallito: ${err instanceof Error ? err.name : "errore"}`);
    return json(500, { ok: false, error: MSG.server });
  }
};

export const ALL: APIRoute = () => jsonRes(405, { ok: false, error: MSG.body });
