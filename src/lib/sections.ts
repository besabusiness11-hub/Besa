// Home page sections that can be hidden from the /admin panel (src/data/site/sections.json).
// Hero and the contact section (#contatto) are always on: every CTA on the page points at #contatto.
// A hidden section also loses its entry in the dock, the footer "Pagina" column, the cross-links
// pointing at it, and (FAQ) its structured data.
import state from "../data/site/sections.json" with { type: "json" };

export const SECTION_KEYS = ["problema", "fix", "comeFunziona", "servizio", "cosaInclude", "piani", "proof", "chiSiamo", "faq"] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];
export type SectionState = Record<SectionKey, boolean>;

/** Admin label and the anchor the nav and cross-links reach each section by (null = nothing links to it). */
export const SECTION_DEFS: Record<SectionKey, { label: string; anchor: string | null }> = {
  problema: { label: "Fai due conti (calcolatore dello spreco)", anchor: "#problema" },
  fix: { label: "Un annuncio = una pagina = un’azione", anchor: null },
  comeFunziona: { label: "Come funziona", anchor: "#come-funziona" },
  servizio: { label: "Tutto quello che serve (griglia del servizio)", anchor: null },
  cosaInclude: { label: "Cosa c’è dentro la pagina", anchor: "#cosa-include" },
  piani: { label: "Offerta / Piani", anchor: "#piani" },
  proof: { label: "Questo sito è la nostra prova", anchor: null },
  chiSiamo: { label: "Chi siamo", anchor: "#chi-siamo" },
  faq: { label: "Domande frequenti", anchor: "#faq" },
};

const raw = state as unknown as Record<string, unknown>;
for (const k of SECTION_KEYS) {
  if (typeof raw[k] !== "boolean") throw new Error(`sections.json: ${k} deve essere true o false`);
}

/** Current section switches. */
export const SECTIONS = Object.fromEntries(SECTION_KEYS.map((k) => [k, raw[k] as boolean])) as SectionState;

/** False only when the anchor belongs to a hidden section; anchors outside the list (e.g. #contatto) stay on. */
export function anchorOn(href: string, sections: SectionState = SECTIONS): boolean {
  const key = SECTION_KEYS.find((k) => SECTION_DEFS[k].anchor === href);
  return key ? sections[key] : true;
}
