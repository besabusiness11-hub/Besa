// Admin panel (/keystatic): edits the JSON files in src/data/site/. Every save is a commit on `main`
// in GitHub mode, so Coolify rebuilds and publishes the site in a few minutes.
// - Dev (`pnpm dev`): local mode, saves write the files on disk and the site in the other tab reloads.
// - Production: GitHub mode. Only GitHub accounts with write access to the repo can save.
// PUBLIC_KEYSTATIC_STORAGE=github|local overrides the default (e.g. to try GitHub mode locally).
import { config, fields, singleton } from "@keystatic/core";
import { createElement } from "react";
import { FEATURES, type FeatureKey, OFFER_MODES } from "./src/lib/features";
import { SECTION_DEFS, SECTION_KEYS } from "./src/lib/sections";

export const REPO = { owner: "besabusiness11-hub", name: "Besa" } as const;

const env = (import.meta as { env?: Record<string, string | boolean | undefined> }).env ?? {};
const storageKind = env.PUBLIC_KEYSTATIC_STORAGE === "github" || env.PUBLIC_KEYSTATIC_STORAGE === "local"
  ? env.PUBLIC_KEYSTATIC_STORAGE
  : env.DEV ? "local" : "github";

const MODE_LABELS: Record<(typeof OFFER_MODES)[number], string> = {
  validation: "Validazione: nessun prezzo, offerta su invito",
  launch: "Lancio: una landing a prezzo di lancio",
  full: "Completa: tre piani e cursore preventivo",
};

/** The help text under each switch: why it is off and what must be ready before switching it on. */
function featureHelp(key: FeatureKey): string {
  const f = FEATURES[key];
  const why = "whyOff" in f && f.whyOff ? `Perché è spento: ${f.whyOff} ` : "";
  const steps = "reEnable" in f && f.reEnable?.length ? `Prima di accenderlo: ${f.reEnable.map((s, i) => `(${i + 1}) ${s}`).join("; ")}.` : "";
  return `${why}${steps}`.trim();
}

const featureField = (key: FeatureKey) =>
  fields.object(
    {
      enabled: fields.checkbox({ label: "Acceso", description: featureHelp(key) }),
      offSince: fields.date({ label: "Spento dal", description: "Facoltativo: quando l’hai spento, per ricordartelo." }),
    },
    { label: FEATURES[key].label },
  );

const price = (label: string, description?: string) =>
  fields.integer({ label, description, validation: { isRequired: true, min: 1 } });

const checkout = (label: string) =>
  fields.url({ label, description: "Link di pagamento (https://…), per esempio uno Stripe Payment Link. Si vede solo con «Pagamento online» acceso e fuori dalla modalità Validazione." });

const BrandMark = () => createElement("img", { src: "/favicon.svg", alt: "", width: 24, height: 24, style: { display: "block", borderRadius: 6 } });

export default config({
  storage: storageKind === "local" ? { kind: "local" } : { kind: "github", repo: REPO, branchPrefix: "admin/" },
  locale: "it-IT",
  ui: {
    brand: { name: "BESA · Pannello", mark: BrandMark },
    navigation: {
      Sito: ["switches", "sections"],
      Contenuti: ["offer", "contacts"],
    },
  },
  singletons: {
    switches: singleton({
      label: "Modalità e funzioni",
      path: "src/data/site/switches",
      format: { data: "json" },
      schema: {
        offerMode: fields.select({
          label: "Modalità dell’offerta",
          description: "Validazione nasconde ogni prezzo. Lancio e Completa mostrano i prezzi della pagina «Offerta e prezzi» e la pagina /termini con i prezzi di disdetta e pausa.",
          options: OFFER_MODES.map((value) => ({ value, label: MODE_LABELS[value] })),
          defaultValue: "validation",
        }),
        leadForm: featureField("leadForm"),
        onlinePayment: featureField("onlinePayment"),
        whatsappButton: featureField("whatsappButton"),
      },
    }),
    sections: singleton({
      label: "Sezioni della home",
      path: "src/data/site/sections",
      format: { data: "json" },
      schema: Object.fromEntries(
        SECTION_KEYS.map((k) => [
          k,
          fields.checkbox({
            label: SECTION_DEFS[k].label,
            defaultValue: true,
            description: SECTION_DEFS[k].anchor ? `Spenta: sparisce anche dal menu delle sezioni e dal footer (${SECTION_DEFS[k].anchor}).` : undefined,
          }),
        ]),
      ) as Record<(typeof SECTION_KEYS)[number], ReturnType<typeof fields.checkbox>>,
    }),
    offer: singleton({
      label: "Offerta e prezzi",
      path: "src/data/site/offer",
      format: { data: "json" },
      schema: {
        prices: fields.object(
          {
            launch: price("Landing, prezzo di lancio (€)", "Modalità Lancio."),
            oneTime: price("Una tantum, prezzo pieno (€)", "Modalità Completa."),
            monthly: price("Abbonamento, al mese (€)"),
            paused: price("Abbonamento in pausa, al mese (€)", "Solo nei Termini e nelle FAQ."),
            hostingYear: price("Hosting dopo il primo anno, all’anno (€)"),
            customFrom: price("Su misura, a partire da, al mese (€)"),
            customIncluded: price("Su misura, landing incluse nel prezzo base", "Numero di pagine, non euro."),
            customExtra: price("Su misura, ogni landing in più, al mese (€)"),
          },
          { label: "Prezzi", description: "In modalità Validazione nessun prezzo compare sul sito." },
        ),
        checkout: fields.object(
          {
            launch: checkout("Landing (modalità Lancio)"),
            abbonamento: checkout("Abbonamento"),
            unaTantum: checkout("Una tantum"),
            suMisura: checkout("Su misura"),
          },
          { label: "Link di pagamento" },
        ),
      },
    }),
    contacts: singleton({
      label: "Contatti e dati aziendali",
      path: "src/data/site/contacts",
      format: { data: "json" },
      schema: {
        whatsappNumber: fields.text({
          label: "Numero WhatsApp",
          description: "Solo cifre con il prefisso, senza + né spazi: 393331234567. Il pulsante compare solo con «Pulsante WhatsApp» acceso.",
          validation: { length: { max: 15 }, pattern: { regex: /^(\d{8,15})?$/, message: "Solo cifre, da 8 a 15, prefisso incluso (393331234567)." } },
        }),
        company: fields.object(
          {
            name: fields.text({ label: "Ragione sociale" }),
            vat: fields.text({ label: "Partita IVA", validation: { pattern: { regex: /^(\d{11})?$/, message: "11 cifre, senza IT davanti." } } }),
            address: fields.text({ label: "Sede legale" }),
          },
          {
            label: "Dati aziendali",
            description: "Compaiono nella riga legale del footer. Lascia vuoto ciò che non esiste ancora. Privacy e Termini vanno aggiornati a mano quando arriva la P.IVA.",
          },
        ),
      },
    }),
  },
});
