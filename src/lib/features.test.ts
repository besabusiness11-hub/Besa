import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { FEATURES, type Feature, OFFER_MODE, OFFER_MODES } from "./features";

const root = resolve(import.meta.dirname, "../..");
const entries = Object.entries(FEATURES) as [string, Feature][];

describe("registro degli interruttori", () => {
  it("OFFER_MODE è una delle modalità previste", () => {
    expect(OFFER_MODES).toContain(OFFER_MODE);
  });

  it.each(entries)("%s: se è spento dice perché e come riaccenderlo", (_key, f) => {
    expect(f.label.trim()).not.toBe("");
    if (f.enabled) return;
    expect(f.whyOff?.trim()).toBeTruthy();
    expect(f.reEnable?.length).toBeGreaterThan(0);
    expect(f.reEnable?.every((s) => s.trim().length > 0)).toBe(true);
    if (f.offSince) expect(f.offSince).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it.each(entries)("%s: i file indicati esistono", (_key, f) => {
    expect(f.touches.length).toBeGreaterThan(0);
    expect(f.touches.filter((p) => !existsSync(resolve(root, p)))).toEqual([]);
  });

  it("nessuna variabile PUBLIC_OFFER_MODE: la modalità si legge solo qui", async () => {
    const { readFileSync } = await import("node:fs");
    for (const file of ["src/lib/offer.ts", ".env.example"]) {
      expect(readFileSync(resolve(root, file), "utf8")).not.toContain("PUBLIC_OFFER_MODE");
    }
  });
});
