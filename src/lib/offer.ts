// Prices and the offer mode helpers. The mode itself lives in features.ts (OFFER_MODE), the single
// switchboard of the site: flip it there and redeploy. The modes are documented next to it.
import { OFFER_MODE, type OfferMode } from "./features";

export { OFFER_MODE, type OfferMode };
export const FULL = OFFER_MODE === "full";
export const LAUNCH = OFFER_MODE === "launch";
/** Validation phase: no amounts anywhere in the visible copy or structured data. */
export const VALIDATION = OFFER_MODE === "validation";

/** Euro amounts for "launch" and "full". Code-buyout prices are in the Terms only, never in marketing copy. */
export const PRICING = {
  /** Una tantum, launch price (launch). */
  launch: 390,
  /** Una tantum, regular price (full). */
  oneTime: 449,
  /** Abbonamento, per month. */
  monthly: 79,
  /** Paused subscription: page stays online, no edits. */
  paused: 19,
  /** Hosting after the first included year (Una tantum). */
  hostingYear: 99,
  /** Su misura: starting price per month, covering `customIncluded` landings. */
  customFrom: 149,
  customIncluded: 3,
  /** Su misura: monthly price of each landing beyond the included ones. */
  customExtra: 49,
} as const;

/** Price of one landing in a mode; null in "validation", which shows no amounts. */
export const pagePrice = (mode: OfferMode): number | null =>
  mode === "full" ? PRICING.oneTime : mode === "launch" ? PRICING.launch : null;

export const eur = (n: number) => `€${n.toLocaleString("it-IT")}`;
