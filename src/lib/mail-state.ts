// Browser-only state of the email flow (FEATURES.leadForm off): the last link typed in any field,
// the calculator numbers once the visitor moved a slider, the plan picked in "Piani".
// It replaces the event listening that ContactForm does when the form is on. Imports only the pure
// draft builder, so the client bundle stays small (no copy.ts).
import { buildMailDraft, type MailDraft, type MailTemplates } from "./mail-draft";

interface MailState {
  link: string;
  calc: string;
  plan: string;
  quote: string;
}

type Where = "hero" | "steps" | "calc" | "offer" | "contact";

// One state per page, even if two bundles end up importing this module.
const g = globalThis as typeof globalThis & { __besaMail?: MailState };
g.__besaMail ??= { link: "", calc: "", plan: "", quote: "" };
const state: MailState = g.__besaMail;

if (typeof document !== "undefined" && !document.documentElement.dataset.mailState) {
  document.documentElement.dataset.mailState = "1";
  // Sent by Problem.astro only after a slider moved, so default numbers never end up in the email.
  document.addEventListener("besa:calc", (e) => { state.calc = String((e as CustomEvent).detail || ""); });
  document.addEventListener("besa:quote", (e) => { state.quote = String((e as CustomEvent).detail || ""); });
  document.addEventListener("click", (e) => {
    const a = (e.target as Element | null)?.closest?.<HTMLElement>("[data-plan]");
    if (!a) return;
    state.plan = a.dataset.planName ?? "";
    if (a.id !== "q-cta") state.quote = "";
  });
}

export const setLink = (link: string) => { state.link = link; };

let templates: MailTemplates | null = null;
/** Templates are serialized on the MailCard root (data-mail), rendered once per page. */
export function mailTemplates(): MailTemplates | null {
  if (templates) return templates;
  const raw = document.getElementById("mail-card")?.dataset.mail;
  try { templates = raw ? (JSON.parse(raw) as MailTemplates) : null; } catch { templates = null; }
  return templates;
}

export function currentDraft(): MailDraft | null {
  const t = mailTemplates();
  if (!t) return null;
  const plan = state.plan && state.quote ? `${state.plan} (${state.quote})` : state.plan;
  return buildMailDraft({ link: state.link, calc: state.calc, plan }, t);
}

type Umami = { track?: (name: string, data?: Record<string, string>) => void };
export const track = (name: string, data?: Record<string, string>) => (window as { umami?: Umami }).umami?.track?.(name, data);

/**
 * Opens the visitor's mail app with the draft, inside the click/submit that called it.
 * An <a> click, never window.open: phones block pop-ups that are not a direct navigation.
 */
export function openMail(where: Where): MailDraft | null {
  const d = currentDraft();
  if (!d) return null;
  const a = document.createElement("a");
  a.href = d.mailto;
  a.rel = "noopener";
  a.hidden = true;
  document.body.append(a);
  a.click();
  a.remove();
  track("mail_open", { where });
  return d;
}
