// Prices and the offer mode helpers. The mode itself lives in features.ts (OFFER_MODE), the single
// switchboard of the site: flip it there and redeploy. The modes are documented next to it.
// The amounts live in src/data/site/offer.json, editable from the /admin panel.
import json from "../data/site/offer.json" with { type: "json" };
import { OFFER_MODE, type OfferMode } from "./features";

export { OFFER_MODE, type OfferMode };
export const FULL = OFFER_MODE === "full";
export const LAUNCH = OFFER_MODE === "launch";
/** Validation phase: no amounts anywhere in the visible copy or structured data. */
export const VALIDATION = OFFER_MODE === "validation";

// The panel omits empty fields (e.g. a checkout link never set), so read the file loosely.
const data = json as unknown as { prices?: Record<string, unknown>; checkout?: Record<string, unknown> };

const PRICE_KEYS = ["launch", "oneTime", "monthly", "paused", "hostingYear", "customFrom", "customIncluded", "customExtra"] as const;
type PriceKey = (typeof PRICE_KEYS)[number];
const prices = (data.prices ?? {}) as Record<PriceKey, unknown>;
// A missing or non-positive amount stops the build instead of printing "€0" or "€NaN" on the site.
for (const k of PRICE_KEYS) {
  const v = prices[k];
  if (typeof v !== "number" || !Number.isInteger(v) || v <= 0) throw new Error(`offer.json: prices.${k} deve essere un numero intero maggiore di 0 (trovato ${JSON.stringify(v)})`);
}

/** Euro amounts for "launch" and "full". Code-buyout prices are in the Terms only, never in marketing copy. */
export const PRICING = prices as unknown as {
  /** Una tantum, launch price (launch). */
  readonly launch: number;
  /** Una tantum, regular price (full). */
  readonly oneTime: number;
  /** Abbonamento, per month. */
  readonly monthly: number;
  /** Paused subscription: page stays online, no edits. */
  readonly paused: number;
  /** Hosting after the first included year (Una tantum). */
  readonly hostingYear: number;
  /** Su misura: starting price per month, covering `customIncluded` landings. */
  readonly customFrom: number;
  readonly customIncluded: number;
  /** Su misura: monthly price of each landing beyond the included ones. */
  readonly customExtra: number;
};

/** Payment links per plan (e.g. Stripe Payment Links). Empty = the button goes to the contact section. */
const httpsOnly = (u: unknown) => (typeof u === "string" && /^https:\/\/\S+$/.test(u.trim()) ? u.trim() : "");
export const CHECKOUT = {
  launch: httpsOnly(data.checkout?.launch),
  abbonamento: httpsOnly(data.checkout?.abbonamento),
  "una-tantum": httpsOnly(data.checkout?.unaTantum),
  "su-misura": httpsOnly(data.checkout?.suMisura),
} as const;

/** Price of one landing in a mode; null in "validation", which shows no amounts. */
export const pagePrice = (mode: OfferMode): number | null =>
  mode === "full" ? PRICING.oneTime : mode === "launch" ? PRICING.launch : null;

export const eur = (n: number) => `€${n.toLocaleString("it-IT")}`;
