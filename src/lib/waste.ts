// The calculator's maths, in one place: Problem.astro renders it on the server and re-runs it in the browser,
// and the help card quotes the same numbers. Pure functions, covered by waste.test.ts.
//
// Model (every step is shown to the visitor in the help card):
//   clicks    = budget / cost per click
//   rate      = messages / clicks                      what the page converts today
//   potential = clicks x target%                       messages a focused page would bring (the target is a hypothesis)
//   missing   = potential - messages                   never below zero
//   perTarget = budget / potential                     what one message would cost at the target rate
//   wasted    = missing x perTarget                    the part of the budget that pays for messages you do not get
// When messages >= potential the page is not the bottleneck and wasted is 0: the card says so.

export interface WasteInput {
  budget: number;
  cpc: number;
  msgs: number;
  /** Percent of clicks that write to you with a page made for the ad (e.g. 5). */
  target: number;
}

export interface Waste {
  clicks: number;
  msgs: number;
  /** Today's click-to-message rate, in percent. */
  rate: number;
  /** Messages a page at the target rate would bring. */
  potential: number;
  missing: number;
  /** Cost of one message today; null with no messages. */
  perNow: number | null;
  /** Cost of one message at the target rate; null with no potential. */
  perTarget: number | null;
  wasted: number;
  year: number;
  /** True when today's messages already reach the target. */
  above: boolean;
}

// useGrouping "always": it-IT leaves 4-digit numbers ungrouped ("2880"), which reads oddly next to "€2.880" elsewhere.
export const nf = (n: number, d = 0) => new Intl.NumberFormat("it-IT", { maximumFractionDigits: d, useGrouping: "always" }).format(n);
/** "€1.200", "€0,50": same prefix style as the prices in offer.ts. */
export const eur = (n: number) => `€${new Intl.NumberFormat("it-IT", { minimumFractionDigits: n < 10 ? 2 : 0, maximumFractionDigits: n < 10 ? 2 : 0, useGrouping: "always" }).format(n)}`;

export function waste({ budget, cpc, msgs: rawMsgs, target }: WasteInput): Waste {
  const clicks = cpc > 0 ? Math.round(budget / cpc) : 0;
  const msgs = Math.min(rawMsgs, clicks);
  const rate = clicks ? (msgs / clicks) * 100 : 0;
  const potential = Math.round((clicks * target) / 100);
  const missing = Math.max(0, potential - msgs);
  const perNow = msgs > 0 ? budget / msgs : null;
  const perTarget = potential > 0 ? budget / potential : null;
  const wasted = perTarget === null ? 0 : missing * perTarget;
  return { clicks, msgs, rate, potential, missing, perNow, perTarget, wasted, year: wasted * 12, above: msgs > 0 && potential <= msgs };
}

/** How long the page's price takes to be "paid" by the waste, as text. Null when there is no waste. */
export function paybackSpan(price: number, wasted: number): string | null {
  if (wasted <= 0) return null;
  const days = Math.max(1, Math.round(price / (wasted / 30)));
  return days <= 60 ? `${days} ${days === 1 ? "giorno" : "giorni"}` : `${nf(Math.round((days / 30) * 2) / 2, 1)} mesi`;
}

/** Display strings for the help card and the receipt. */
export function describe(i: WasteInput, w: Waste, price: number) {
  return {
    budget: eur(i.budget),
    cpc: eur(i.cpc),
    msgs: nf(w.msgs),
    clicks: nf(w.clicks),
    rate: nf(w.rate, 1),
    t: nf(i.target, 1),
    pot: nf(w.potential),
    missing: nf(w.missing),
    perT: w.perTarget === null ? "–" : eur(w.perTarget),
    perN: w.perNow === null ? "nessun messaggio" : eur(w.perNow),
    wasted: eur(w.wasted),
    year: eur(w.year),
    price: eur(price),
    span: paybackSpan(price, w.wasted) ?? "–",
  };
}

export type WasteStrings = ReturnType<typeof describe>;

/** Replaces {key} placeholders; unknown keys are left as they are. */
export const fill = (tpl: string, vals: Record<string, string>) => tpl.replace(/\{(\w+)\}/g, (m, k) => vals[k] ?? m);
