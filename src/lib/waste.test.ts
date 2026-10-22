import { describe, expect, it } from "vitest";
import { describe as strings, fill, paybackSpan, waste } from "./waste";

const base = { budget: 300, cpc: 0.5, msgs: 6, target: 5 };

describe("waste", () => {
  it("example numbers: 600 clicks, 6 messages today, 30 at 5%", () => {
    const w = waste(base);
    expect(w.clicks).toBe(600);
    expect(w.rate).toBeCloseTo(1, 5);
    expect(w.potential).toBe(30);
    expect(w.missing).toBe(24);
    expect(w.perNow).toBe(50);
    expect(w.perTarget).toBe(10);
    expect(w.wasted).toBeCloseTo(240, 5);
    expect(w.year).toBeCloseTo(2880, 5);
    expect(w.above).toBe(false);
  });

  it("wasted = budget minus what the same messages would cost at the target rate", () => {
    const w = waste({ budget: 1000, cpc: 0.8, msgs: 10, target: 4 });
    expect(w.wasted).toBeCloseTo(1000 - 10 * (1000 / w.potential), 5);
  });

  it("no waste when today's rate already reaches the target", () => {
    const w = waste({ budget: 300, cpc: 0.5, msgs: 40, target: 5 });
    expect(w.above).toBe(true);
    expect(w.missing).toBe(0);
    expect(w.wasted).toBe(0);
  });

  it("zero messages: the whole potential is missing, no cost per message today", () => {
    const w = waste({ ...base, msgs: 0 });
    expect(w.perNow).toBeNull();
    expect(w.missing).toBe(30);
    expect(w.wasted).toBeCloseTo(300, 5);
  });

  it("messages cannot exceed clicks", () => {
    expect(waste({ budget: 50, cpc: 1, msgs: 150, target: 5 }).msgs).toBe(50);
  });

  it("never divides by zero", () => {
    const w = waste({ budget: 100, cpc: 0, msgs: 3, target: 5 });
    expect(w.clicks).toBe(0);
    expect(w.wasted).toBe(0);
    expect(Number.isFinite(w.rate)).toBe(true);
  });

  it("payback is expressed in days, then in months", () => {
    expect(paybackSpan(390, 240)).toBe("49 giorni");
    expect(paybackSpan(390, 100)).toMatch(/mesi$/);
    expect(paybackSpan(390, 0)).toBeNull();
  });

  it("fill replaces known placeholders only", () => {
    const w = waste(base);
    const v = strings(base, w, 390);
    expect(fill("{clicks} click, {wasted} al mese, {nope}", v)).toContain("600 click");
    expect(fill("{nope}", v)).toBe("{nope}");
  });
});
