import { copy } from "./copy";

/** FAQPage JSON-LD from the visible FAQ (already mode-aware in copy.ts), so markup equals page text exactly. */
export function faqJsonLd() {
  const mainEntity = copy.faq.items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  }));
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity };
}

// --- Organization / Service / WebSite (solo fatti presenti in site.ts e copy) ---
import { SITE } from "./site";

const ORG_ID = `${SITE.url}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    areaServed: { "@type": "Country", name: "Italia" },
    founder: [
      { "@type": "Person", name: "Benito" },
      { "@type": "Person", name: "Leo" },
    ],
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/#service`,
    name: "Landing page per inserzioni Meta",
    serviceType: "Landing page per inserzioni Facebook e Instagram",
    description: SITE.description,
    url: SITE.url,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Italia" },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "it-IT",
    publisher: { "@id": ORG_ID },
  };
}
