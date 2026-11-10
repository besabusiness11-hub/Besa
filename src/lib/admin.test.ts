import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import keystatic from "../../keystatic.config";
import { buildCopy } from "./copy";
import { legalLine, whatsappNumber } from "./contacts";
import { FEATURES } from "./features";
import { CHECKOUT, PRICING } from "./offer";
import { anchorOn, SECTION_DEFS, SECTION_KEYS, SECTIONS, type SectionState } from "./sections";

const root = resolve(import.meta.dirname, "../..");
const json = (name: string) => JSON.parse(readFileSync(resolve(root, `src/data/site/${name}.json`), "utf8"));
const singletons = keystatic.singletons!;
const allOn = Object.fromEntries(SECTION_KEYS.map((k) => [k, true])) as SectionState;

describe("pannello /keystatic", () => {
  it("ogni singleton scrive un file che il sito legge", () => {
    for (const [name, s] of Object.entries(singletons)) {
      expect(s.path).toBe(`src/data/site/${name}`);
      expect(() => json(name)).not.toThrow();
    }
  });

  it("gli interruttori del pannello sono quelli di features.ts", () => {
    const keys = Object.keys(singletons.switches.schema).filter((k) => k !== "offerMode");
    expect(keys.sort()).toEqual(Object.keys(FEATURES).sort());
  });

  it("le sezioni del pannello sono quelle di sections.ts", () => {
    expect(Object.keys(singletons.sections.schema)).toEqual([...SECTION_KEYS]);
    expect(Object.keys(json("sections")).sort()).toEqual([...SECTION_KEYS].sort());
  });

  it("i prezzi del pannello sono quelli di PRICING", () => {
    const prices = singletons.offer.schema.prices as { fields: Record<string, unknown> };
    expect(Object.keys(prices.fields).sort()).toEqual(Object.keys(PRICING).sort());
  });

  it("in produzione salva su GitHub, nel repo del sito", () => {
    // vitest runs with DEV = true, so the config resolves to local mode here; the GitHub branch is
    // checked by reading the source.
    const src = readFileSync(resolve(root, "keystatic.config.ts"), "utf8");
    expect(src).toContain('owner: "besabusiness11-hub", name: "Besa"');
    expect(src).toMatch(/env\.DEV \? "local" : "github"/);
  });
});

describe("sezioni", () => {
  it("una sezione spenta sparisce dal menu", () => {
    const off = { ...allOn, faq: false, chiSiamo: false };
    const hrefs = buildCopy("validation", { sections: off }).nav.links.map((l) => l.href);
    expect(hrefs).not.toContain("#faq");
    expect(hrefs).not.toContain("#chi-siamo");
    expect(hrefs).toContain("#piani");
  });

  it("i link del menu puntano solo a sezioni dichiarate", () => {
    const anchors = SECTION_KEYS.map((k) => SECTION_DEFS[k].anchor).filter(Boolean);
    for (const l of buildCopy("validation", { sections: allOn }).nav.links) expect(anchors).toContain(l.href);
  });

  it("#contatto resta sempre raggiungibile", () => {
    const none = Object.fromEntries(SECTION_KEYS.map((k) => [k, false])) as SectionState;
    expect(anchorOn("#contatto", none)).toBe(true);
  });

  it("la scheda tecnica non cita FAQPage se le FAQ sono spente", () => {
    const text = JSON.stringify(buildCopy("validation", { sections: { ...allOn, faq: false } }).proof);
    expect(text).not.toContain("FAQPage");
  });

  it("lo stato attuale è valido", () => {
    for (const k of SECTION_KEYS) expect(typeof SECTIONS[k]).toBe("boolean");
  });
});

describe("contatti e offerta", () => {
  it("il numero WhatsApp tiene solo le cifre e preferisce quello del pannello", () => {
    expect(whatsappNumber("+39 333 123 4567", "")).toBe("393331234567");
    expect(whatsappNumber("", "39 333 765 4321")).toBe("393337654321");
    expect(whatsappNumber("393331234567", "390000000000")).toBe("393331234567");
    expect(whatsappNumber("", "")).toBe("");
    expect(whatsappNumber(null, null)).toBe("");
  });

  it("la riga legale mostra solo i dati che esistono", () => {
    expect(legalLine({ name: "", vat: "", address: "" })).toBe("besaweb · info@besaweb.com");
    expect(legalLine({ name: "BESA srl", vat: "01234567890", address: "Via Roma 1, Treviso" })).toBe(
      "besaweb · BESA srl · P.IVA 01234567890 · Via Roma 1, Treviso · info@besaweb.com",
    );
  });

  it("i link di pagamento sono solo https o vuoti", () => {
    for (const v of Object.values(CHECKOUT)) expect(v === "" || v.startsWith("https://")).toBe(true);
  });

  it("i prezzi sono interi positivi", () => {
    for (const v of Object.values(PRICING)) expect(Number.isInteger(v) && v > 0).toBe(true);
  });
});
