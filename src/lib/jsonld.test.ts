import { describe, expect, it } from "vitest";
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
    expect(o.url).toBe("https://besaweb.com");
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
});
