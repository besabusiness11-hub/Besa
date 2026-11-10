import { describe, expect, it } from "vitest";
import { buildCopy, copy, SETUP_PRICE } from "./copy";
import { FEATURES, OFFER_MODE, OFFER_MODES } from "./features";
import { SECTION_KEYS, type SectionState } from "./sections";

// Every section on, so the checks cover all the copy whatever the panel currently hides.
const allOn = Object.fromEntries(SECTION_KEYS.map((k) => [k, true])) as SectionState;

const strings = (v: unknown, out: string[] = []): string[] => {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) for (const x of v) strings(x, out);
  else if (v && typeof v === "object") for (const x of Object.values(v)) strings(x, out);
  return out;
};

// Every mode, with the form on and off: the invariants hold for all of them.
const variants = OFFER_MODES.flatMap((mode) => [true, false].map((leadForm) => ({ mode, leadForm, c: buildCopy(mode, { leadForm, sections: allOn }) })));

describe.each(variants)("copy ($mode, modulo $leadForm)", ({ c }) => {
  const all = strings(c);

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

  it("niente trattini lunghi", () => {
    expect(all.filter((s) => /—/.test(s))).toEqual([]);
  });

  it("la promessa dei 3 consigli resta sempre accesa", () => {
    expect(c.finalCta.hook).toMatch(/3 consigli/);
  });
});

describe("fase di lancio (launch)", () => {
  it("l'abbonamento non compare nel copy visibile", () => {
    const c = buildCopy("launch");
    const visible = strings({ ...c, form: { ...c.form, payment: undefined }, offer: { ...c.offer, plans: undefined, quote: undefined } });
    expect(visible.filter((s) => /abbonament/i.test(s))).toEqual([]);
  });
});

describe("fase di validazione (validation)", () => {
  // Dal 2026-11-10 la validazione mostra un solo importo, il costo di partenza (SETUP_PRICE): il titolare vuole che
  // chi visita sappia quanto spende oltre a Meta. Nessun altro importo, niente «gratis», niente piani a listino;
  // i costi di gestione restano senza cifre (si propongono dopo il primo mese, solo se la pagina porta più contatti).
  const SETUP = `€${SETUP_PRICE}`;
  const amounts = (s: string) => s.match(/€\s?\d+(?:[.,]\d+)*/g) ?? [];
  // Frasi sull’offerta del visitatore, non su quella di BESA.
  const ALLOWED = new Set(["Es. prima lezione gratis, sconto sul primo ordine"]);
  const BANNED = /gratis|abbonament|una tantum/i;

  for (const leadForm of [true, false]) {
    it(`l’unico importo è il costo di partenza (modulo ${leadForm ? "acceso" : "spento"})`, () => {
      const all = strings(buildCopy("validation", { leadForm }));
      expect(all.flatMap(amounts).filter((m) => m !== SETUP)).toEqual([]);
      expect(all.filter((s) => BANNED.test(s) && !ALLOWED.has(s))).toEqual([]);
    });
  }

  it("la lista dei permessi resta minima: ogni frase permessa esiste ancora", () => {
    const all = new Set(strings(buildCopy("validation")));
    expect([...ALLOWED].filter((s) => !all.has(s))).toEqual([]);
  });

  it("il costo di partenza è spiegato nell’offerta e nella FAQ sul prezzo", () => {
    const c = buildCopy("validation");
    expect(strings(c.offerValidation).join("\n")).toContain(SETUP);
    expect(c.faq.items.find((it) => it.q === "Quanto costa?")?.a).toContain(SETUP);
  });

  it("i blocchi con il listino mancano del tutto", () => {
    const c = buildCopy("validation");
    expect(c.offer).toBeUndefined();
    expect(c.form.payment).toBeUndefined();
    expect(c.problem.results.payback).toBeUndefined();
  });

  it("descrizione (anche JSON-LD) senza importi; FAQ con il solo costo di partenza", () => {
    const c = buildCopy("validation");
    expect(amounts(c.meta.description)).toEqual([]);
    expect(c.meta.description).not.toMatch(BANNED);
    expect(c.faq.items.flatMap((it) => [...amounts(it.q), ...amounts(it.a)]).filter((m) => m !== SETUP)).toEqual([]);
    expect(c.faq.items.filter((it) => BANNED.test(it.q) || BANNED.test(it.a))).toEqual([]);
  });

  it("nelle altre modalità il costo di partenza non compare", () => {
    for (const mode of OFFER_MODES.filter((m) => m !== "validation")) {
      // offerValidation esiste in ogni modalità ma si mostra solo in "validation".
      expect(strings({ ...buildCopy(mode), offerValidation: undefined }).filter((s) => s.includes(SETUP))).toEqual([]);
    }
  });

  it("voce di menu «Offerta» al posto di «Piani»", () => {
    expect(buildCopy("validation", { sections: allOn }).nav.links.map((l) => l.label)).toContain("Offerta");
    expect(buildCopy("launch", { sections: allOn }).nav.links.map((l) => l.label)).toContain("Piani");
  });

  it("con il modulo spento nessuna frase rimanda al «modulo» del sito", () => {
    const c = buildCopy("validation", { leadForm: false });
    // form e catcher.added servono solo col modulo acceso; inside e la riga del Pixel parlano delle pagine dei clienti.
    const visible = strings({ ...c, form: undefined, catcher: { ...c.catcher, added: undefined }, inside: undefined });
    const clientPages = (s: string) => /^Pixel di Meta|nessun modulo/i.test(s);
    expect(visible.filter((s) => /\bmodulo\b/i.test(s) && !clientPages(s))).toEqual([]);
  });
});

it("la costante copy è costruita con gli interruttori attuali", () => {
  expect(copy).toEqual(buildCopy(OFFER_MODE, { leadForm: FEATURES.leadForm.enabled }));
});
