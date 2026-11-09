// The email a visitor sends us while the dynamic form is off (FEATURES.leadForm = false).
// Pure and import-free on purpose: the browser gets the templates as data (MailCard's data-mail),
// so copy.ts never lands in the client bundle. Covered by mail-draft.test.ts.

export interface MailTemplates {
  to: string;
  subject: string;
  /** {link}, {calc}, {plan} lines are dropped when the value is missing; extra is followed by an empty line to write in. */
  body: { greeting: string; intro: string; link: string; calc: string; plan: string; extra?: string; thanks: string };
}

export interface MailInput {
  link?: string;
  calc?: string;
  plan?: string;
}

export interface MailDraft {
  to: string;
  subject: string;
  /** Full text, with "\n" line breaks: what the popup shows and copies. */
  body: string;
  /** mailto: URL, kept under MAIL_LIMITS.mailto; long fields are shortened here only ("…"). */
  mailto: string;
  /** True when the mailto had to shorten a field: the popup still has the full text. */
  shortened: boolean;
}

export const MAIL_LIMITS = { link: 500, calc: 160, plan: 160, mailto: 2000 } as const;

type Field = keyof MailInput;
const FIELDS: readonly Field[] = ["link", "calc", "plan"];
/** Shortened first when the mailto is too long: the link is the longest and the popup keeps it whole. */
const SHRINK_ORDER: readonly Field[] = ["link", "plan", "calc"];

const clean = (s: string | undefined, max: number) => [...(s ?? "").replace(/\s+/g, " ").trim()].slice(0, max);

const compose = (t: MailTemplates, v: Record<Field, string>) => {
  const data = FIELDS.filter((k) => v[k]).map((k) => t.body[k].replace(`{${k}}`, () => v[k]));
  const extra = t.body.extra ? ["", t.body.extra, ""] : [];
  return [t.body.greeting, t.body.intro, ...(data.length ? ["", ...data] : []), ...extra, "", t.body.thanks].join("\n");
};

/** mailto: with subject only: the no-JS fallback, and the base of every draft. */
export const plainMailto = (to: string, subject: string) => `mailto:${to}?subject=${encodeURIComponent(subject)}`;

const mailtoOf = (t: MailTemplates, body: string) =>
  `${plainMailto(t.to, t.subject)}&body=${encodeURIComponent(body.replace(/\r?\n/g, "\r\n"))}`;

export function buildMailDraft(input: MailInput, t: MailTemplates): MailDraft {
  const chars = { link: clean(input.link, MAIL_LIMITS.link), calc: clean(input.calc, MAIL_LIMITS.calc), plan: clean(input.plan, MAIL_LIMITS.plan) };
  const full = { link: chars.link.join(""), calc: chars.calc.join(""), plan: chars.plan.join("") };
  const body = compose(t, full);
  let mailto = mailtoOf(t, body);
  let shortened = false;
  const keep = { link: chars.link.length, calc: chars.calc.length, plan: chars.plan.length };
  for (const k of SHRINK_ORDER) {
    while (mailto.length > MAIL_LIMITS.mailto && keep[k] > 0) {
      // One encoded character is at most 12 URL characters (4 UTF-8 bytes): cut at least one per round.
      keep[k] = Math.max(0, keep[k] - Math.max(1, Math.floor((mailto.length - MAIL_LIMITS.mailto) / 12)));
      const v = { ...full };
      for (const f of SHRINK_ORDER) if (keep[f] < chars[f].length) v[f] = keep[f] ? `${chars[f].slice(0, keep[f]).join("")}…` : "";
      mailto = mailtoOf(t, compose(t, v));
      shortened = true;
    }
  }
  return { to: t.to, subject: t.subject, body, mailto, shortened };
}
