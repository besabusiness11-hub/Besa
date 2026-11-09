// Interruttori del sito: l'unico posto dove si legge cosa è acceso, cosa è spento e perché.
// Si cambia questo file e si ripubblica (Coolify, pochi minuti); la storia resta in git.
// Solo dati, nessun import: lo leggono Astro, i test e `pnpm features` (Node con rimozione dei tipi).
//
// OFFER_MODE non è un on/off ma uno stato a tre valori:
//   "validation"  sezione offerta senza prezzi, nessun importo in tutto il copy. Fase di validazione (ora).
//   "launch"      una landing a prezzo di lancio (PRICING.launch), abbonamento proposto solo nel modulo.
//   "full"        Abbonamento, Una tantum, Su misura + cursore preventivo.

export type OfferMode = "validation" | "launch" | "full";

export const OFFER_MODES: readonly OfferMode[] = ["validation", "launch", "full"];

export interface Feature {
  label: string;
  enabled: boolean;
  /** Obbligatorio se enabled = false. */
  whyOff?: string;
  /** Obbligatorio se enabled = false: cosa serve prima di riaccenderlo. */
  reEnable?: string[];
  /** File che l'interruttore tocca (promemoria per chi sviluppa). */
  touches: string[];
  /** Data di spegnimento, ISO. */
  offSince?: string;
}

export const OFFER_MODE: OfferMode = "validation";

export const FEATURES = {
  leadForm: {
    label: "Modulo dinamico (anteprima live, ricevuta, Turnstile, invio server)",
    enabled: false,
    offSince: "2026-11-02",
    whyOff: "Fase di validazione: i contatti arrivano per email a info@besaweb.com, nessun setup.",
    reEnable: [
      "SMTP Brevo: SMTP_USER e SMTP_PASS nell'ambiente Coolify",
      "TURNSTILE_SECRET nell'ambiente e hostname del sito nel widget Turnstile",
      "DKIM Brevo + SPF + DMARC su besaweb.com",
      "Backup dei contatti (file, Airtable o webhook) con notifica a Leo",
      "Test di invio end-to-end dal sito pubblicato",
      "Aggiornare privacy e cookie policy (tornano i paragrafi su Brevo e Turnstile: sono già nel codice)",
    ],
    touches: [
      "src/pages/index.astro",
      "src/components/ContactForm.astro",
      "src/components/ContactMail.astro",
      "src/components/LinkCatcher.astro",
      "src/pages/api/lead.ts",
      "src/pages/privacy-policy.astro",
      "src/pages/cookie-policy.astro",
      "src/middleware.ts",
      "server.mjs",
    ],
  },
  onlinePayment: {
    label: "Pagamento online (link di pagamento nei piani)",
    enabled: false,
    whyOff: "Nessun link di pagamento.",
    reEnable: [
      "Stripe Payment Link (o simile) in copy.offer.plans[].checkout",
      "P.IVA attiva",
      "Termini approvati dal commercialista",
    ],
    touches: ["src/lib/copy.ts", "src/components/Offer.astro"],
  },
  whatsappButton: {
    label: "Pulsante WhatsApp flottante",
    enabled: false,
    whyOff: "Numero non deciso.",
    reEnable: ["Impostare PUBLIC_WHATSAPP_NUMBER (formato 393331234567) e portare enabled a true"],
    touches: ["src/components/WhatsAppButton.astro"],
  },
} satisfies Record<string, Feature>;

export type FeatureKey = keyof typeof FEATURES;

/** Previsti, non costruiti: promemoria perché non si perdano. Non scrivere testi sul sito finché non sono definiti. */
export const PLANNED = {
  resultsMode: {
    label: 'OFFER_MODE = "results": bozza gratis o a circa 10 €, poi paghi solo per i risultati in più',
    implemented: false,
    toDecide: [
      "Come si misura il risultato «in più» (situazione di partenza)",
      "Soglia oltre la quale si paga",
      "Prezzo fisso o percentuale",
      "Durata",
      "Chi tiene i dati",
    ],
  },
} as const;
