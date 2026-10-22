import { describe, expect, it } from "vitest";
import { copy } from "./copy";
import { FULL, OFFER_MODE } from "./offer";

const strings = (v: unknown, out: string[] = []): string[] => {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) for (const x of v) strings(x, out);
  else if (v && typeof v === "object") for (const x of Object.values(v)) strings(x, out);
  return out;
};

describe("copy", () => {
  const all = strings(copy);

  it("nessun segnaposto [TODO] rimasto", () => {
    expect(all.filter((s) => /TODO/i.test(s))).toEqual([]);
  });

  it("nessun dato che non deve comparire (indirizzo H-FARM, telefono vecchio, social vuoti)", () => {
    const text = all.join("\n");
    expect(text).not.toMatch(/Olivetti|Roncade|351\s?2338575|instagram\.com|facebook\.com/i);
  });

  it("prezzi di riscatto del codice solo nei Termini, mai nel copy di marketing", () => {
    expect(all.join("\n")).not.toMatch(/€\s?(899|749)|riscatt?o del codice/i);
  });

  it("promesse di consegna coerenti: la bozza è in 48 ore, 1 giorno è solo la risposta", () => {
    expect(all.filter((s) => /(bozza|pagina di prova|consegna):? entro 1 giorno/i.test(s))).toEqual([]);
  });

  it(`fase di lancio: l'abbonamento non compare nel copy visibile (modalità: ${OFFER_MODE})`, () => {
    if (FULL) return;
    const visible = strings({ ...copy, form: { ...copy.form, payment: undefined }, offer: { ...copy.offer, plans: undefined, quote: undefined } });
    expect(visible.filter((s) => /abbonament/i.test(s))).toEqual([]);
  });
});
