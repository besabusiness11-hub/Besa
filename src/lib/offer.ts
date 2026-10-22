// Offer switch and prices: the only place to change when BESA leaves the launch phase.
//
//   "prelaunch": a single landing page at the launch price; the subscription is offered only
//                in the form, once the visitor has chosen the page.
//   "full":      the three plans (Abbonamento, Una tantum, Su misura) with the quote configurator.
//
// Flip DEFAULT_OFFER_MODE to "full" to switch the whole site. PUBLIC_OFFER_MODE (build time)
// overrides it, which is how both modes are built and checked.
type OfferMode = "prelaunch" | "full";

const DEFAULT_OFFER_MODE: OfferMode = "prelaunch";

const env = (import.meta as { env?: Record<string, string | undefined> }).env ?? {};
const fromEnv = env.PUBLIC_OFFER_MODE;

export const OFFER_MODE: OfferMode = fromEnv === "full" || fromEnv === "prelaunch" ? fromEnv : DEFAULT_OFFER_MODE;
export const FULL = OFFER_MODE === "full";

/** Euro amounts shown on the site. Code-buyout prices are in the Terms only, never in marketing copy. */
export const PRICING = {
  /** Una tantum, launch price (prelaunch). */
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

export const eur = (n: number) => `€${n.toLocaleString("it-IT")}`;
