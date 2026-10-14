import { describe, expect, it, vi } from "vitest";
import { buildEmail, createRateLimiter, escapeHtml, parseLead, verifyTurnstile } from "./lead";

const base = { nome: "Mario Rossi", contatto: "mario@example.com", annuncio: "https://facebook.com/ads/1", privacy: "on" };

describe("parseLead", () => {
  it("accepts a valid lead", () => {
    expect(parseLead(base).kind).toBe("ok");
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
