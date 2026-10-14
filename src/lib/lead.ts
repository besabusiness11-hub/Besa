import { z } from "zod";

export const MSG = {
  invalid: "Controlla i campi del modulo e riprova.",
  privacy: "Devi accettare l'informativa privacy.",
  annuncio: "Inserisci un link valido (https://...).",
  rate: "Troppe richieste. Riprova tra qualche minuto.",
  turnstile: "Verifica anti-spam non riuscita. Ricarica la pagina e riprova.",
  server: "Non siamo riusciti a inviare la richiesta. Scrivici a info@besaweb.com.",
  body: "Richiesta non valida.",
} as const;

const truthy = z.preprocess(
  (v) => v === true || v === "on" || v === "true" || v === "1" || v === "yes",
  z.boolean(),
);

export const leadSchema = z.object({
  nome: z.string().trim().min(2, "Inserisci il tuo nome.").max(100),
  contatto: z.string().trim().min(5, "Inserisci email o telefono.").max(200),
  annuncio: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine(
      (v) => {
        if (!v) return true;
        try {
          const u = new URL(v);
          return u.protocol === "https:" || u.protocol === "http:";
        } catch {
          return false;
        }
      },
      { message: MSG.annuncio },
    ),
  privacy: truthy.refine((v) => v === true, { message: MSG.privacy }),
  website: z.string().optional(),
  "cf-turnstile-response": z.string().optional(),
});

export type Lead = z.infer<typeof leadSchema>;

export type ParseResult =
  | { kind: "honeypot" }
  | { kind: "error"; error: string }
  | { kind: "ok"; lead: Lead };

/** Validate a raw key/value object. Honeypot is checked first. */
export function parseLead(raw: Record<string, unknown>): ParseResult {
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return { kind: "honeypot" };
  }
  const r = leadSchema.safeParse(raw);
  if (!r.success) {
    return { kind: "error", error: r.error.issues[0]?.message ?? MSG.invalid };
  }
  return { kind: "ok", lead: r.data };
}

/** Read a Request body (form or JSON) into a plain object; null if unsupported. */
export async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  const type = request.headers.get("content-type") ?? "";
  try {
    if (type.includes("application/json")) {
      const j = await request.json();
      return j && typeof j === "object" && !Array.isArray(j) ? (j as Record<string, unknown>) : null;
    }
    if (type.includes("multipart/form-data") || type.includes("application/x-www-form-urlencoded")) {
      const fd = await request.formData();
      const out: Record<string, unknown> = {};
      for (const [k, v] of fd.entries()) if (typeof v === "string") out[k] = v;
      return out;
    }
  } catch {
    return null;
  }
  return null;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF so user input can never inject mail headers. */
export function oneLine(s: string): string {
  return s.replace(/[\r\n]+/g, " ").trim();
}

export function buildEmail(lead: Lead): { subject: string; text: string; html: string } {
  const nome = oneLine(lead.nome);
  const rows: [string, string][] = [
    ["Nome", nome],
    ["Contatto", oneLine(lead.contatto)],
    ["Annuncio", lead.annuncio ? oneLine(lead.annuncio) : "(non indicato)"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    `<table>` +
    rows.map(([k, v]) => `<tr><th align="left">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("") +
    `</table>`;
  return { subject: `Nuova richiesta dal sito: ${nome.slice(0, 60)}`, text, html };
}

/** Fixed-window in-memory rate limiter. */
export function createRateLimiter(limit = 5, windowMs = 10 * 60 * 1000) {
  const hits = new Map<string, { count: number; reset: number }>();
  return {
    /** Returns true if the request is allowed. */
    check(key: string, now = Date.now()): boolean {
      if (hits.size > 5000) {
        for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
      }
      const e = hits.get(key);
      if (!e || e.reset <= now) {
        hits.set(key, { count: 1, reset: now + windowMs });
        return true;
      }
      e.count += 1;
      return e.count <= limit;
    },
  };
}

export type TurnstileEnv = { secret?: string; nodeEnv?: string };

export async function verifyTurnstile(
  token: string | undefined,
  ip: string | undefined,
  env: TurnstileEnv,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  if (!env.secret) return env.nodeEnv !== "production"; // skip only in dev w/o secret
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret: env.secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
    });
    const j = (await res.json()) as { success?: boolean };
    return j.success === true;
  } catch {
    return false;
  }
}
