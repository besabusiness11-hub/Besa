import { describe, expect, it, vi } from "vitest";
import { buildEmail, createRateLimiter, escapeHtml, parseLead, verifyTurnstile } from "./lead";

const base = { nome: "Mario Rossi", contatto: "mario@example.com", annuncio: "https://facebook.com/ads/1", privacy: "on" };

describe("parseLead", () => {
  it("accepts a valid lead", () => {
    expect(parseLead(base).kind).toBe("ok");
  });
  it("accepts optional obiettivo and calcolo", () => {
    const r = parseLead({ ...base, obiettivo: "preventivo", calcolo: "300 € al mese, 0,50 € a click, 6 messaggi" });
    expect(r.kind).toBe("ok");
    if (r.kind === "ok") expect(r.lead.obiettivo).toBe("preventivo");
  });
  it("accepts a known plan and rejects others", () => {
    expect(parseLead({ ...base, piano: "abbonamento" }).kind).toBe("ok");
    expect(parseLead({ ...base, piano: "gratis" }).kind).toBe("error");
  });
  it("accepts the optional context answers and caps their length", () => {
    const r = parseLead({ ...base, attivita: "Palestra", offerta: "Prima lezione gratis", zona: "Treviso", sito: "centroestetico.it", tono: "amichevole", note: "Aperti fino alle 22" });
    expect(r.kind).toBe("ok");
    expect(parseLead({ ...base, note: "x".repeat(1001) }).kind).toBe("error");
    expect(parseLead({ ...base, tono: "urlato" }).kind).toBe("error");
  });
  it("treats empty obiettivo as not given and rejects unknown values", () => {
    expect(parseLead({ ...base, obiettivo: "" }).kind).toBe("ok");
    expect(parseLead({ ...base, obiettivo: "spam" }).kind).toBe("error");
  });
  it("rejects an overlong calcolo", () => {
    expect(parseLead({ ...base, calcolo: "x".repeat(161) }).kind).toBe("error");
  });
  it("normalizes an Instagram handle server-side", () => {
    const r = parseLead({ ...base, annuncio: "@pizzeria.mario" });
    expect(r.kind === "ok" && r.lead.annuncio).toBe("https://www.instagram.com/pizzeria.mario/");
  });
  it("annuncio is optional", () => {
    expect(parseLead({ ...base, annuncio: "" }).kind).toBe("ok");
  });
  it("rejects bad annuncio link", () => {
    expect(parseLead({ ...base, annuncio: "non un link" }).kind).toBe("error");
  });
  it("requires privacy", () => {
    const r = parseLead({ ...base, privacy: undefined });
    expect(r.kind).toBe("error");
    expect(parseLead({ ...base, privacy: "false" }).kind).toBe("error");
  });
  it("accepts JSON boolean privacy", () => {
    expect(parseLead({ ...base, privacy: true }).kind).toBe("ok");
  });
  it("rejects missing nome", () => {
    expect(parseLead({ ...base, nome: "" }).kind).toBe("error");
  });
  it("detects honeypot before validation", () => {
    expect(parseLead({ website: "http://spam", nome: "" }).kind).toBe("honeypot");
  });
});

describe("rate limit", () => {
  it("allows 5 then blocks, per ip, and resets after window", () => {
    const rl = createRateLimiter(5, 1000);
    for (let i = 0; i < 5; i++) expect(rl.check("1.1.1.1", 0)).toBe(true);
    expect(rl.check("1.1.1.1", 10)).toBe(false);
    expect(rl.check("2.2.2.2", 10)).toBe(true);
    expect(rl.check("1.1.1.1", 1001)).toBe(true);
  });
});

describe("email", () => {
  it("escapes html and strips newlines", () => {
    const lead = { ...base, nome: "<script>x</script>\nBcc: a@b.c" } as never;
    const m = buildEmail(lead);
    expect(m.html).not.toContain("<script>");
    expect(m.html).toContain("&lt;script&gt;");
    expect(m.subject).not.toMatch(/[\r\n]/);
    expect(escapeHtml(`"'&`)).toBe("&quot;&#39;&amp;");
  });
  it("includes goal and escaped calculator line", () => {
    const m = buildEmail({ ...base, privacy: true, obiettivo: "chiamata", calcolo: "<b>300</b>\nX" } as never);
    expect(m.text).toContain("Obiettivo della pagina: chiamata");
    expect(m.html).toContain("&lt;b&gt;300&lt;/b&gt; X");
  });
});

describe("verifyTurnstile", () => {
  it("skips in dev without secret, fails in production", async () => {
    expect(await verifyTurnstile(undefined, undefined, { nodeEnv: "development" })).toBe(true);
    expect(await verifyTurnstile(undefined, undefined, { nodeEnv: "production" })).toBe(false);
  });
  it("calls siteverify with secret", async () => {
    const f = vi.fn().mockResolvedValue({ json: async () => ({ success: true }) });
    expect(await verifyTurnstile("tok", "1.1.1.1", { secret: "s", nodeEnv: "production" }, f as never)).toBe(true);
    expect(f.mock.calls[0][0]).toContain("siteverify");
    expect(await verifyTurnstile(undefined, undefined, { secret: "s" }, f as never)).toBe(false);
  });
});

import { clientIp, createRateLimiter as mkLimiter, readBody as rb } from "./lead";

describe("hardening", () => {
  it("ignores forwarded headers unless a trusted proxy is configured", () => {
    const h = new Headers({ "x-forwarded-for": "1.1.1.1", "cf-connecting-ip": "2.2.2.2" });
    expect(clientIp(h, "9.9.9.9", undefined)).toBe("9.9.9.9");
    expect(clientIp(h, "9.9.9.9", "cloudflare")).toBe("2.2.2.2");
    const x = new Headers({ "x-forwarded-for": "6.6.6.6, 3.3.3.3" });
    expect(clientIp(x, "9.9.9.9", "xff-last")).toBe("3.3.3.3");
  });
  it("keeps the limiter bounded under many distinct keys", () => {
    const l = mkLimiter(5, 60_000, 100);
    for (let i = 0; i < 1000; i++) l.check(`ip${i}`, 1);
    expect(l.size).toBeLessThanOrEqual(100);
  });
  it("rejects oversized bodies, with and without content-length", async () => {
    const big = "a=" + "x".repeat(20_000);
    const r1 = new Request("http://x/", { method: "POST", body: big, headers: { "content-type": "application/x-www-form-urlencoded" } });
    expect(await rb(r1)).toBeNull();
    const stream = new ReadableStream({ start(c) { c.enqueue(new TextEncoder().encode(big)); c.close(); } });
    const r2 = new Request("http://x/", { method: "POST", body: stream, duplex: "half", headers: { "content-type": "application/x-www-form-urlencoded" } } as RequestInit);
    expect(await rb(r2)).toBeNull();
    const ok = new Request("http://x/", { method: "POST", body: "a=1", headers: { "content-type": "application/x-www-form-urlencoded" } });
    expect(await rb(ok)).toEqual({ a: "1" });
  });
});
