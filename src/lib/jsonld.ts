import { copy } from "./copy";
import { hasTodo, splitTodo } from "./todo";

const strip = (s: string) =>
  splitTodo(s)
    .filter((p) => !p.todo)
    .map((p) => p.text)
    .join("")
    .replace(/\s+/g, " ")
    .trim();

/**
 * FAQPage JSON-LD from fully answered items only. Any item whose question or answer still
 * contains a [TODO] is skipped, so the markup always equals the visible text exactly.
 */
export function faqJsonLd() {
  const mainEntity = copy.faq.items
    .filter((it) => !hasTodo(it.q) && !hasTodo(it.a))
    .map((it) => ({ q: strip(it.q), a: strip(it.a) }))
    .filter((it) => it.q && it.a)
    .map((it) => ({
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
