import { describe, expect, it } from "vitest";
import { buildCopy, copy } from "./copy";
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
  // Frasi che parlano della spesa del visitatore su Meta o della sua offerta, non del prezzo di BESA.
  const ALLOWED = new Set([
    "Immagina un cartellone che porta gente dentro la tua attività, e ogni persona che entra la paghi tu. Appena dentro, però, trova un corridoio con dieci porte e nessuna indicazione chiara: molti si perdono e tornano indietro. Eppure quella persona l’hai già pagata, perché il cartellone te la portasse dentro. BESA risolve proprio questo: dice a chi entra cosa fare e quale porta aprire.",
    "click che paghi",
    "Quanti click paghi",
    "Meta ti fa pagare ogni click, che poi ti scrivano o no. Metti i tuoi numeri: ti mostriamo quanto spendi per click che non portano a niente.",
    "Quanto paghi ogni click (circa)",
    "Paghi affinché il tuo annuncio venga cliccato, ma poi mandi le persone sul tuo profilo social o su un sito generico. Lì non capiscono cosa fare né come contattarti e, se non sono davvero motivate, se ne vanno. Tu hai pagato il click e non hai ottenuto niente.",
    "Il risultato vero dipende da offerta, prezzo e annuncio. Una buona pagina toglie un ostacolo, non fa miracoli.",
    "Es. prima lezione gratis, sconto sul primo ordine",
  ]);
  const BANNED = /€|gratis|prezzo|abbonament|una tantum|paghi|pagare/i;

  for (const leadForm of [true, false]) {
    it(`nessun importo né parola sul prezzo nel copy (modulo ${leadForm ? "acceso" : "spento"})`, () => {
      const c = buildCopy("validation", { leadForm });
      expect(strings(c).filter((s) => BANNED.test(s) && !ALLOWED.has(s))).toEqual([]);
    });
  }

  it("la lista dei permessi resta minima: ogni frase permessa esiste ancora", () => {
    const all = new Set(strings(buildCopy("validation")));
    expect([...ALLOWED].filter((s) => !all.has(s))).toEqual([]);
  });

  it("i blocchi con i prezzi mancano del tutto", () => {
    const c = buildCopy("validation");
    expect(c.offer).toBeUndefined();
    expect(c.form.payment).toBeUndefined();
    expect(c.problem.results.payback).toBeUndefined();
  });

  it("descrizione (anche JSON-LD) e FAQ senza prezzi", () => {
    const c = buildCopy("validation");
    expect(c.meta.description).not.toMatch(BANNED);
    expect(c.faq.items.filter((it) => BANNED.test(it.q) || BANNED.test(it.a))).toEqual([]);
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
