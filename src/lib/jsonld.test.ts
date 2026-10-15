import { describe, expect, it } from "vitest";
import { copy } from "./copy";
import { SITE } from "./site";
import { faqJsonLd, organizationJsonLd, serviceJsonLd, websiteJsonLd } from "./jsonld";

const all = { organization: organizationJsonLd(), service: serviceJsonLd(), website: websiteJsonLd(), faq: faqJsonLd() };

describe("jsonld", () => {
  it.each(Object.entries(all))("%s serializza e ha @context/@type", (_n, obj) => {
    const parsed = JSON.parse(JSON.stringify(obj));
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(typeof parsed["@type"]).toBe("string");
  });

  it("organization: solo fatti noti, nessun dato inventato", () => {
    const o = organizationJsonLd();
    expect(o["@type"]).toBe("ProfessionalService");
    expect(o.name).toBe("BESA");
    expect(o.url).toBe(SITE.url);
    expect(o.email).toBe("info@besaweb.com");
    expect(o.founder.map((f) => f.name)).toEqual(["Benito", "Leo"]);
    for (const k of ["address", "vatID", "taxID", "telephone", "aggregateRating", "review", "sameAs", "priceRange"])
      expect(o).not.toHaveProperty(k);
  });

  it("service: provider collegato, nessun prezzo", () => {
    const s = serviceJsonLd();
    expect(s["@type"]).toBe("Service");
    expect(s.provider["@id"]).toBe(organizationJsonLd()["@id"]);
    expect(s).not.toHaveProperty("offers");
    expect(JSON.stringify(s)).not.toMatch(/\[TODO|€|EUR/);
  });

  it("nessun segnaposto TODO in nessun oggetto", () => {
    expect(JSON.stringify(all)).not.toContain("[TODO");
  });

  it("website: url e lingua", () => {
    const w = websiteJsonLd();
    expect(w.url).toBe("https://besaweb.com");
    expect(w.inLanguage).toBe("it-IT");
  });

  it("faq: solo domande interamente risposte, testo identico a copy", () => {
    const f = faqJsonLd();
    const complete = copy.faq.items.filter((it) => !it.q.includes("[TODO") && !it.a.includes("[TODO"));
    expect(copy.faq.items).toHaveLength(12);
    expect(f.mainEntity.length).toBe(complete.length);
    expect(f.mainEntity.length).toBeGreaterThan(0);
    f.mainEntity.forEach((e, n) => {
      expect(e.name).toBe(complete[n].q);
      expect(e.acceptedAnswer.text).toBe(complete[n].a);
    });
    expect(JSON.stringify(f)).not.toContain("TODO");
  });

  it("site: meta e JSON-LD condividono la stessa descrizione; lunghezze ok", () => {
    expect(SITE.description).toBe(copy.meta.description);
    expect(copy.meta.title.length).toBeLessThanOrEqual(60);
    expect(copy.meta.description.length).toBeLessThanOrEqual(155);
  });
});
