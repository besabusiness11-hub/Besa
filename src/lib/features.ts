// Interruttori del sito: cosa è acceso, cosa è spento e perché.
// Lo STATO (modalità, acceso/spento, data di spegnimento) sta in src/data/site/switches.json, che si
// modifica dal pannello /admin (ogni salvataggio è un commit su main, Coolify ripubblica) o a mano.
// Qui restano le spiegazioni: etichette, motivo, checklist per riaccendere, file toccati.
// Nessun import tranne quel JSON: lo leggono Astro, i test, `pnpm features` e server.mjs (Node con
// rimozione dei tipi; il Dockerfile copia questo file e il JSON accanto a server.mjs).
//
// OFFER_MODE non è un on/off ma uno stato a tre valori:
//   "validation"  sezione offerta senza prezzi, nessun importo in tutto il copy. Fase di validazione (ora).
//   "launch"      una landing a prezzo di lancio (PRICING.launch), abbonamento proposto solo nel modulo.
//   "full"        Abbonamento, Una tantum, Su misura + cursore preventivo.

import state from "../data/site/switches.json" with { type: "json" };

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

/** Stato salvato dal pannello. `offSince` è null quando non c'è una data. */
type SwitchState = { enabled: boolean; offSince?: string | null };
type State = { offerMode: string; leadForm: SwitchState; onlinePayment: SwitchState; whatsappButton: SwitchState };
const S = state as unknown as State;

// Un valore sbagliato nel JSON ferma la build (e Coolify tiene online la versione precedente).
if (!(OFFER_MODES as readonly string[]).includes(S.offerMode)) {
  throw new Error(`switches.json: offerMode "${S.offerMode}" non valido (possibili: ${OFFER_MODES.join(", ")})`);
}
for (const key of ["leadForm", "onlinePayment", "whatsappButton"] as const) {
  if (typeof S[key]?.enabled !== "boolean") throw new Error(`switches.json: ${key}.enabled deve essere true o false`);
}
const on = (key: "leadForm" | "onlinePayment" | "whatsappButton") => S[key].enabled;
const since = (key: "leadForm" | "onlinePayment" | "whatsappButton") => S[key].offSince || undefined;

export const OFFER_MODE = S.offerMode as OfferMode;

export const FEATURES = {
  leadForm: {
    label: "Modulo dinamico (anteprima live, ricevuta, Turnstile, invio server)",
    enabled: on("leadForm"),
    offSince: since("leadForm"),
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
    enabled: on("onlinePayment"),
    offSince: since("onlinePayment"),
    whyOff: "Nessun link di pagamento.",
    reEnable: [
      "Stripe Payment Link (o simile) nel pannello, Offerta e prezzi > Link di pagamento",
      "P.IVA attiva",
      "Termini approvati dal commercialista",
    ],
    touches: ["src/lib/copy.ts", "src/components/Offer.astro", "src/data/site/offer.json"],
  },
  whatsappButton: {
    label: "Pulsante WhatsApp flottante",
    enabled: on("whatsappButton"),
    offSince: since("whatsappButton"),
    whyOff: "Numero non deciso.",
    reEnable: ["Inserire il numero nel pannello, Contatti e dati aziendali (formato 393331234567)"],
    touches: ["src/components/WhatsAppButton.astro", "src/data/site/contacts.json"],
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
