// DOM check of the email flow (FEATURES.leadForm off) against a running build:
//   pnpm build && HOST=127.0.0.1 PORT=4321 node server.mjs
//   node scripts/check-mail-flow.mjs [http://127.0.0.1:4321]
// The mailto: navigation is intercepted (no mail app needed) and Umami is stubbed, so every
// tracked event can be asserted. Exits 1 on the first failed check.
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://127.0.0.1:4321";
let failed = 0;
const check = (ok, label, extra = "") => {
  console.log(`${ok ? "✓" : "✗"} ${label}${!ok && extra ? `: ${extra}` : ""}`);
  if (!ok) failed++;
};
const decode = (mailto) => {
  const u = new URL(mailto);
  return { to: u.pathname, subject: u.searchParams.get("subject"), body: u.searchParams.get("body") ?? "" };
};

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: base });
await context.route(/umami\.besaweb\.com|challenges\.cloudflare\.com/, (r) => r.abort());
await context.addInitScript(() => {
  window.__mailtos = [];
  window.__events = [];
  const click = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    if (this.href.startsWith("mailto:")) { window.__mailtos.push(this.href); return; }
    return click.call(this);
  };
  // also catch real clicks on mailto: links (ContactMail without the draft)
  document.addEventListener("click", (e) => {
    const a = e.target.closest?.("a[href^='mailto:']");
    if (a && !e.defaultPrevented) { window.__mailtos.push(a.href); e.preventDefault(); }
  });
  Object.defineProperty(window, "umami", { value: { track: (n, d) => window.__events.push([n, d ?? null]) } });
});

const page = await context.newPage();
const requests = [];
page.on("request", (r) => requests.push(r.url()));
await page.goto(base, { waitUntil: "networkidle" });

const mailtos = () => page.evaluate(() => window.__mailtos);
const events = () => page.evaluate(() => window.__events);

// Nothing of the dynamic form on the page.
check((await page.locator("#lead-form").count()) === 0, "nessun modulo dinamico nel DOM");
// the form's CSS still ships (Astro collects it from the import); only scripts count here
const formCode = requests.filter((u) => /turnstile|challenges\.cloudflare|ContactForm|confetti/i.test(u) && !/type=style|\.css(\?|$)/.test(u));
check(!formCode.length, "Turnstile e codice del modulo non caricati", formCode.join(", "));
check((await page.locator("#contatto").count()) === 1, "la sezione #contatto esiste ancora");

// Hero: an @handle becomes a link and opens the mail app with the draft.
await page.fill("#lc-hero", "@pizzeria.mario");
await page.locator("#lc-hero").press("Enter");
let m = await mailtos();
check(m.length === 1, "hero: un mailto aperto", JSON.stringify(m));
const d1 = decode(m[0]);
check(d1.to === "info@besaweb.com", "hero: destinatario", d1.to);
check(d1.subject === "Richiesta bozza BESA", "hero: oggetto", d1.subject);
check(d1.body.includes("Annuncio o profilo: https://www.instagram.com/pizzeria.mario/"), "hero: link normalizzato nel corpo", d1.body);
check(!/calcolatore/.test(d1.body), "hero: nessun numero del calcolatore prima di usarlo");
check(await page.locator("form:has(#lc-hero) .lc-sent").isVisible(), "hero: stato «posta aperta» visibile");

// Empty field: an error, no mailto.
await page.locator("form:has(#lc-how) button[type=submit]").click();
check((await mailtos()).length === 1, "campo vuoto: nessun mailto");
check(((await page.locator("form:has(#lc-how) .lc-err").textContent()) ?? "").length > 0, "campo vuoto: messaggio d'errore");

// Calculator: after a slider moves, its numbers join the draft.
await page.locator("#c-budget").evaluate((el) => { el.value = "500"; el.dispatchEvent(new Event("input", { bubbles: true })); });
await page.fill("#lc-calc", "https://www.facebook.com/ads/library/?id=123&q=caffè");
await page.locator("form:has(#lc-calc) button[type=submit]").click();
m = await mailtos();
const d2 = decode(m.at(-1));
check(d2.body.includes("Annuncio o profilo: https://www.facebook.com/ads/library/?id=123&q=caffè"), "calcolatore: link con & ? e accenti intatto", d2.body);
check(/Numeri dal calcolatore: €500 al mese/.test(d2.body), "calcolatore: numeri nel corpo", d2.body);
check(!/Piano scelto/.test(d2.body), "validation: nessun piano scelto");

// Popup: opens from the status line, filled with the same draft; each Copy puts the right text on the clipboard.
await page.locator("form:has(#lc-calc) .lc-retry").click();
check(await page.locator("#mail-card:popover-open").isVisible(), "popup aperto da «Non si è aperta?»");
const body = await page.locator("#mc-body").inputValue();
check(body === d2.body.replace(/\r\n/g, "\n"), "popup: il messaggio è la stessa bozza");
for (const [field, expected] of [["to", "info@besaweb.com"], ["subject", "Richiesta bozza BESA"], ["body", body]]) {
  const btn = page.locator(`#mail-card [data-copy="${field}"]`);
  await btn.click();
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  check(clip === expected, `Copia ${field}: testo giusto negli appunti`, clip.slice(0, 80));
  check((await btn.textContent())?.trim() === "Copiato", `Copia ${field}: diventa «Copiato»`);
  // layout height, not boundingBox: the press/"Copiato" animations scale the button for a moment
  const h = await btn.evaluate((el) => el.offsetHeight);
  check(h >= 44, `Copia ${field}: alto almeno 44 px`, String(h));
}
check(((await page.locator("#mc-live").textContent()) ?? "").includes("copiato"), "annuncio aria-live dopo la copia");
await page.locator("#mail-card .mc-done").click();
check(!(await page.locator("#mail-card:popover-open").count()), "popup chiuso con «Fatto»");

// Final card: Scrivici opens the draft, address copy, "Vedi il messaggio pronto" opens the popup.
await page.locator("#cm-write").click();
m = await mailtos();
check(decode(m.at(-1)).body.includes("caffè"), "Scrivici: apre la bozza con l'ultimo link", m.at(-1));
await page.locator("#cm-copy").click();
check((await page.evaluate(() => navigator.clipboard.readText())) === "info@besaweb.com", "scheda finale: Copia indirizzo");
await page.locator("#contatto .see").click();
check(await page.locator("#mail-card:popover-open").isVisible(), "scheda finale: «Vedi il messaggio pronto» apre il popup");
await page.keyboard.press("Escape");

// Umami events.
const ev = await events();
const names = ev.map(([n, d]) => (d ? `${n}:${Object.values(d).join(",")}` : n));
for (const want of ["mail_open:hero", "mail_open:calc", "mail_open:contact", "mail_card_open", "mail_copy:to", "mail_copy:subject", "mail_copy:body"]) {
  check(names.includes(want), `Umami: ${want}`, names.join(" "));
}

// No horizontal scroll on a phone.
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
check(overflow <= 0, "nessuno scroll orizzontale a 390 px", String(overflow));

// Without JavaScript the fallbacks are plain mailto: links.
const nojs = await browser.newContext({ javaScriptEnabled: false });
const p2 = await nojs.newPage();
await p2.goto(base);
const fb = await p2.locator(".lc-fallback").first().getAttribute("href");
check(fb === "mailto:info@besaweb.com?subject=Richiesta%20bozza%20BESA", "senza JS: fallback mailto con oggetto", fb ?? "");
check(await p2.locator(".lc-fallback").first().isVisible(), "senza JS: il fallback è visibile");

await browser.close();
console.log(failed ? `\n${failed} controlli falliti` : "\nTutti i controlli passati");
process.exit(failed ? 1 : 0);
