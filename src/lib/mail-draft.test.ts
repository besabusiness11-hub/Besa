import { describe, expect, it } from "vitest";
import { buildCopy } from "./copy";
import { buildMailDraft, MAIL_LIMITS, type MailTemplates, plainMailto } from "./mail-draft";

const m = buildCopy("validation", { leadForm: false }).mail;
const T: MailTemplates = { to: "info@besaweb.com", subject: m.subject, body: m.body };

/** What a mail app gets back from the mailto URL. */
const decode = (mailto: string) => {
  const u = new URL(mailto);
  return { to: u.pathname, subject: u.searchParams.get("subject"), body: u.searchParams.get("body") };
};

describe("buildMailDraft", () => {
  it("caso tipico: link, numeri del calcolatore e piano, nell'ordine della spec", () => {
    const d = buildMailDraft(
      { link: "https://www.instagram.com/pizzeria.mario/", calc: "€300 al mese · €0,50 a click · 6 messaggi al mese", plan: "Landing page" },
      T,
    );
    expect(d.to).toBe("info@besaweb.com");
    expect(d.subject).toBe("Richiesta bozza BESA");
    expect(d.body).toBe(
      [
        "Ciao Leo e Ben,",
        "richiesta di una bozza di landing page per questo annuncio.",
        "",
        "Annuncio o profilo: https://www.instagram.com/pizzeria.mario/",
        "Numeri dal calcolatore: €300 al mese · €0,50 a click · 6 messaggi al mese",
        "Piano scelto: Landing page",
        "",
        "Se vuoi, aggiungi qui cosa offri, dove lavori, il tuo numero WhatsApp o altro che ci può servire:",
        "",
        "",
        "Grazie!",
      ].join("\n"),
    );
    expect(d.mailto.startsWith("mailto:info@besaweb.com?subject=Richiesta%20bozza%20BESA&body=")).toBe(true);
    expect(d.mailto.length).toBeLessThan(MAIL_LIMITS.mailto);
    expect(d.shortened).toBe(false);
  });

  it("a capo come %0D%0A, accenti e simboli codificati, nessun carattere grezzo nell'URL", () => {
    const d = buildMailDraft({ link: "https://example.it/perché", calc: "€300 · 6" }, T);
    expect(d.mailto).toContain("%0D%0A");
    expect(d.mailto).not.toMatch(/[\s€·é]/);
    expect(d.mailto).toContain("perch%C3%A9");
    expect(d.mailto).toContain("%E2%82%AC300");
    expect(decode(d.mailto).body).toBe(d.body.replace(/\n/g, "\r\n"));
  });

  it("righe omesse se mancano i dati; lo spazio per scrivere resta", () => {
    const only = buildMailDraft({ link: "@pizzeria" }, T);
    expect(only.body).not.toMatch(/calcolatore|Piano scelto/);
    expect(only.body).toContain("Annuncio o profilo: @pizzeria");
    const none = buildMailDraft({ link: "  ", calc: "", plan: undefined }, T);
    expect(none.body).toBe(
      "Ciao Leo e Ben,\nrichiesta di una bozza di landing page per questo annuncio.\n\nSe vuoi, aggiungi qui cosa offri, dove lavori, il tuo numero WhatsApp o altro che ci può servire:\n\n\nGrazie!",
    );
    // the only double empty line is the space left to write in, after the invitation
    expect(none.body.split("\n\n\n")).toHaveLength(2);
  });

  it("link con caratteri speciali: & ? # = + non rompono i parametri del mailto", () => {
    const link = "https://www.facebook.com/ads/library/?id=1&q=caffè #promo+50%";
    const d = buildMailDraft({ link }, T);
    const back = decode(d.mailto);
    expect(back.to).toBe("info@besaweb.com");
    expect(back.subject).toBe("Richiesta bozza BESA");
    expect(back.body).toContain(`Annuncio o profilo: ${link}`);
  });

  it("caso peggiore: campi al massimo e tutti da codificare, il mailto resta sotto il limite", () => {
    const d = buildMailDraft({ link: "&€".repeat(400), calc: "€·".repeat(200), plan: "€".repeat(300) }, T);
    expect(d.mailto.length).toBeLessThanOrEqual(MAIL_LIMITS.mailto);
    expect(d.shortened).toBe(true);
    // the popup keeps the full (capped) text
    expect(d.body).toContain("&€".repeat(250));
    expect(decode(d.mailto).body).toMatch(/…/);
  });

  it("un link lungo ma normale entra intero", () => {
    const link = `https://www.facebook.com/share/p/${"a1B2c3".repeat(40)}/`;
    const d = buildMailDraft({ link, calc: "€300 al mese · €0,50 a click · 6 messaggi al mese" }, T);
    expect(d.shortened).toBe(false);
    expect(decode(d.mailto).body).toContain(link);
  });

  it("mailto senza corpo per il fallback senza JavaScript", () => {
    expect(plainMailto("info@besaweb.com", "Richiesta bozza BESA")).toBe("mailto:info@besaweb.com?subject=Richiesta%20bozza%20BESA");
  });
});
