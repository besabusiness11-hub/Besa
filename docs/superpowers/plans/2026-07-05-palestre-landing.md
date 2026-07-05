# `/palestre` Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/palestre` landing page — BESA's entire sales funnel for gym owners — as a self-contained React route in the existing site, converting visitors to Stripe checkout or WhatsApp.

**Architecture:** One new wouter route (`/palestre`) rendering a page composed of page-scoped components under `client/src/components/palestre/`. All copy and configuration live in a single typed content file (`client/src/lib/palestre-content.ts`) so future `/palestre/[città]` pages only swap content. UTM attribution is a pure-function module with unit tests plus a small React hook. Visual system ("bumper plates") is scoped via a wrapper class and CSS variables — the existing site's tokens are untouched.

**Tech Stack:** Vite + React 18 + TypeScript, wouter, Tailwind CSS 3, shadcn/Radix (accordion), framer-motion, react-helmet-async, lucide-react, vitest (new devDependency, pure-logic tests only).

## Global Constraints

- All customer-facing copy in Italian, informal "tu", plain and direct — never corporate.
- Exact H1 headline: `Una pagina, fatta su misura per la tua palestra, pensata per riempire le prove gratuite.`
- Only statistic allowed anywhere on the page: `Il 45% delle palestre italiane non ha ancora un sito web.` No other numbers invented.
- No fake testimonials, reviews, or social proof. Testimonials array stays empty with `// TODO: add real testimonials once available`.
- Photography is a teaser only — NO address inputs, NO geocoding on this page.
- Never mention internal tooling (Apify, n8n, Coolify) in customer-facing copy.
- Placeholders as constants with TODO comments: `STRIPE_LINK_MONTHLY`, `STRIPE_LINK_ONETIME`, `WHATSAPP_NUMBER`, `UMAMI_SITE_ID`.
- Only existing-site file modified: `client/src/App.tsx` (route + splash skip). Plus `package.json` for vitest.
- Numbered steps (01–04) appear ONLY in the "Come funziona" section.
- `prefers-reduced-motion` respected; visible keyboard focus everywhere; semantic headings (single H1).
- Verification commands: `npm run check` (tsc) and `npm test` (vitest, added in Task 2). Dev server: `npm run dev`, page at `http://localhost:5000/palestre` (check server port in `server/index.ts` output if different).

---

### Task 1: Content config file

**Files:**
- Create: `client/src/lib/palestre-content.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `palestreContent` object (typed by `PalestreContent`), `Goal`/`GoalId` types, constants `STRIPE_LINK_MONTHLY`, `STRIPE_LINK_ONETIME`, `WHATSAPP_NUMBER`, `WHATSAPP_MESSAGE`, `UMAMI_SITE_ID`, `UMAMI_SRC`. Every later component reads ONLY from this module for copy.

- [ ] **Step 1: Write the content file**

```ts
// client/src/lib/palestre-content.ts
// Single source of truth for all /palestre copy and configuration.
// Future /palestre/[città] pages swap this content without touching layout.

// TODO: replace with live Stripe Payment Link
export const STRIPE_LINK_MONTHLY = "https://buy.stripe.com/TODO_monthly";
// TODO: replace with live Stripe Payment Link
export const STRIPE_LINK_ONETIME = "https://buy.stripe.com/TODO_onetime";
// TODO: replace with real WhatsApp number (international format, digits only)
export const WHATSAPP_NUMBER = "390000000000";
export const WHATSAPP_MESSAGE =
  "Ciao BESA! Ho visto la pagina per le palestre e vorrei saperne di più.";
// TODO: insert real Umami site ID
export const UMAMI_SITE_ID = "TODO-umami-site-id";
// TODO: confirm Umami script host
export const UMAMI_SRC = "https://cloud.umami.is/script.js";

export type GoalId = "free_trial" | "trust" | "information" | "contact";

export interface Goal {
  id: GoalId;
  icon: string;
  label: string;
  description: string;
  default?: boolean;
  /** Bumper-plate accent color for this goal */
  color: string;
  sections: string[];
}

export type FeatureIconKey =
  | "calendar-check"
  | "star"
  | "clock"
  | "dumbbell"
  | "image"
  | "users"
  | "quote"
  | "tag"
  | "help-circle"
  | "map-pin"
  | "message-circle"
  | "instagram";

export interface PalestreContent {
  /** Optional city for future /palestre/[città] pages; undefined = generic page */
  cityName?: string;
  meta: { title: string; description: string; ogImage: string };
  header: { ctaLabel: string };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    stat: { figure: string; followUp: string };
  };
  problema: { title: string; body: string };
  comeFunziona: {
    title: string;
    steps: { title: string; body: string }[];
  };
  configurator: { title: string; intro: string; microcopy: string };
  goals: Goal[];
  featureGrid: {
    title: string;
    items: { icon: FeatureIconKey; label: string }[];
  };
  educational: { title: string; paragraphs: string[] }[];
  photoTeaser: { title: string; body: string; ctaLabel: string; ctaHref: string };
  pricing: {
    title: string;
    monthly: {
      badge: string;
      name: string;
      price: string;
      period: string;
      bullets: string[];
      ctaLabel: string;
    };
    onetime: {
      name: string;
      price: string;
      period: string;
      bullets: string[];
      ctaLabel: string;
    };
    clarifier: string;
  };
  faq: { title: string; items: { question: string; answer: string }[] };
  // TODO: add real testimonials once available — never invent content here
  testimonials: { name: string; gym: string; quote: string; photo: string }[];
  finalCta: { title: string; body: string; ctaLabel: string; whatsappLabel: string };
  footer: { line: string; privacyHref: string };
}

export const palestreContent: PalestreContent = {
  meta: {
    title: "Sito web per palestre in 48 ore | BESA",
    description:
      "Creare un sito per la tua palestra non è mai stato così semplice: una pagina su misura, prenotazioni nel tuo Google Calendar, online in 48 ore. Facciamo tutto noi.",
    // TODO: replace with real OG image asset once available
    ogImage: "/og-palestre.jpg",
  },
  header: { ctaLabel: "Attiva la tua palestra" },
  hero: {
    eyebrow: "Per palestre, box e centri fitness",
    headline:
      "Una pagina, fatta su misura per la tua palestra, pensata per riempire le prove gratuite.",
    subheadline:
      "Un sito web pensato apposta per palestre: online in 48 ore, con l'ottimizzazione della tua scheda Google inclusa. Tu non tocchi niente di tecnico — facciamo tutto noi.",
    primaryCta: { label: "Attiva ora", href: "#prezzi" },
    // TODO: replace with real demo site URL once one exists
    secondaryCta: { label: "Guarda un esempio", href: "#configuratore" },
    stat: {
      figure: "Il 45% delle palestre italiane non ha ancora un sito web.",
      followUp: "Chi ce l'ha, si prende le prove gratuite delle altre.",
    },
  },
  problema: {
    title: "Prima di entrare, ti cercano online",
    body: "Prima di mettere piede in palestra, le persone ti cercano su Google e su Instagram. Se trovano poco o niente — o qualcosa che sembra abbandonato — passano alla palestra successiva. Non ti chiamano per chiedere informazioni: semplicemente spariscono.",
  },
  comeFunziona: {
    title: "Come funziona",
    steps: [
      {
        title: "Scegli l'obiettivo del tuo sito",
        body: "Prove gratuite, fiducia, informazioni o contatto: decidi tu cosa deve fare la tua pagina.",
      },
      {
        title: "Compila un modulo veloce",
        body: "Foto, orari e il link del tuo Google Calendar. Dieci minuti, non di più.",
      },
      {
        title: "Ricevi il sito in 48 ore",
        body: "Pronto, online, con il tuo brand. Senza riunioni e senza tecnicismi.",
      },
      {
        title: "Le prenotazioni arrivano dritte nel tuo Google Calendar",
        body: "Nessun sistema nuovo da imparare: vedi le prove prenotate dove guardi già ogni giorno.",
      },
    ],
  },
  configurator: {
    title: "Qual è l'obiettivo della tua palestra?",
    intro: "Scegli un obiettivo e guarda come cambia il tuo sito.",
    microcopy:
      "Questo è solo il punto di partenza — personalizziamo tutto il resto (foto, colori, testi) quando attivi.",
  },
  goals: [
    {
      id: "free_trial",
      icon: "🎯",
      label: "Prove gratuite",
      description: "Convertire i visitatori in prove prenotate",
      default: true,
      color: "#C8102E",
      sections: [
        "Hero con CTA prenotazione",
        "Prenotazione (Google Calendar)",
        "Recensioni Google",
        "Orari dei corsi",
        "Trainer",
        "Galleria",
        "WhatsApp",
      ],
    },
    {
      id: "trust",
      icon: "🤝",
      label: "Fiducia",
      description: "Convincere che è la palestra giusta",
      color: "#0057B7",
      sections: [
        "Hero",
        "Recensioni Google (in evidenza)",
        "Trainer dettagliati",
        "Galleria ricca",
        "Chi siamo / la storia",
        "Testimonianze e trasformazioni",
        "WhatsApp",
      ],
    },
    {
      id: "information",
      icon: "ℹ️",
      label: "Informazioni",
      description: "Fornire tutte le informazioni essenziali",
      color: "#FFB81C",
      sections: [
        "Hero",
        "Orari completi",
        "Prezzi / listino",
        "Corsi e servizi",
        "FAQ",
        "Mappa, orari, parcheggio",
        "Contatti",
      ],
    },
    {
      id: "contact",
      icon: "💬",
      label: "Contatto",
      description: "Facilitare il contatto immediato",
      color: "#009A44",
      sections: [
        "Hero",
        "Pulsante WhatsApp grande",
        "Telefono (click-to-call)",
        "Form di contatto",
        "Mappa + orari",
        "Social",
      ],
    },
  ],
  featureGrid: {
    title: "Tutto quello che il tuo sito può includere",
    items: [
      { icon: "calendar-check", label: "Prenotazione Google Calendar" },
      { icon: "star", label: "Recensioni Google" },
      { icon: "clock", label: "Orari corsi" },
      { icon: "dumbbell", label: "Trainer" },
      { icon: "image", label: "Galleria" },
      { icon: "users", label: "Chi siamo" },
      { icon: "quote", label: "Testimonianze" },
      { icon: "tag", label: "Prezzi" },
      { icon: "help-circle", label: "FAQ" },
      { icon: "map-pin", label: "Mappa" },
      { icon: "message-circle", label: "WhatsApp" },
      { icon: "instagram", label: "Feed Instagram" },
    ],
  },
  educational: [
    {
      title: "Perché offrire una prova gratuita conviene alla tua palestra",
      paragraphs: [
        "Iscriversi a una palestra è una decisione che richiede fiducia — nello spazio, negli istruttori, nel fatto che valga i propri soldi. Una prova gratuita abbassa quella barriera: chi è curioso può provare senza impegno, invece di dover decidere alla cieca.",
        "Chi prenota una prova ed effettivamente si presenta è una persona che ha già superato la parte più difficile — ha scelto la tua palestra tra le altre. Da lì, il lavoro di convincerla a iscriversi è molto più semplice che partire da zero con un contatto freddo.",
        "Il punto debole, di solito, non è l'offerta della prova gratuita — è renderla facile da prenotare. Un modulo scomodo, una telefonata da fare in orario d'ufficio, un messaggio che resta senza risposta: sono tutti ostacoli che fanno perdere persone già interessate. Un sito con la prenotazione integrata nel tuo Google Calendar toglie ogni attrito: la persona sceglie l'orario, tu la vedi arrivare, senza passaggi in mezzo.",
      ],
    },
    {
      title: "La scheda Google non basta (ma è un ottimo inizio)",
      paragraphs: [
        "Molte palestre esistono online solo tramite la loro scheda Google Maps. È un buon punto di partenza — è spesso il primo posto dove qualcuno ti trova — ma è anche il posto dove la maggior parte del lavoro di convincere qualcuno si ferma. Non c'è modo di raccontare chi siete, mostrare i corsi, presentare i trainer, o soprattutto lasciare che qualcuno prenoti una prova su due piedi.",
        "Il servizio include comunque l'ottimizzazione della tua scheda Google Business — perché restare trovabili lì è importante — ma il sito è quello che trasforma \"mi hanno trovato\" in \"hanno prenotato una prova\".",
      ],
    },
  ],
  photoTeaser: {
    title: "Sei nella zona?",
    body: "Per le palestre entro un'ora di macchina da noi, offriamo anche uno shooting fotografico professionale — foto vere del tuo spazio, dei tuoi corsi, dei tuoi trainer, pronte anche per Instagram.",
    ctaLabel: "Scoprilo quando attivi",
    ctaHref: "#prezzi",
  },
  pricing: {
    title: "Quanto costa un sito per la tua palestra",
    monthly: {
      badge: "Consigliato",
      name: "Abbonamento",
      price: "49€",
      period: "/mese, tutto incluso",
      bullets: [
        "Sito e hosting inclusi",
        "Ottimizzazione Google Maps",
        "Aggiornamenti dei contenuti quando vuoi (orari, promo, foto nuove)",
        "Nessun costo di attivazione",
        "Disdici quando vuoi",
      ],
      ctaLabel: "Attiva l'abbonamento",
    },
    onetime: {
      name: "Una tantum",
      price: "690€",
      period: "una volta + 99€/anno di hosting",
      bullets: [
        "Il sito è tuo, lo paghi una volta sola",
        "Hosting a 99€/anno",
        "Aggiornamenti dei contenuti a richiesta, non inclusi",
      ],
      ctaLabel: "Scegli una tantum",
    },
    clarifier:
      "La differenza vera è negli aggiornamenti: nell'abbonamento sono sempre inclusi, nell'una tantum sono a richiesta.",
  },
  faq: {
    title: "Domande frequenti",
    items: [
      {
        question: "Quanto ci vuole per avere il sito online?",
        answer:
          "48 ore dalla compilazione del modulo. Ci mandi foto, orari e il link del tuo Google Calendar, e in due giorni il sito è online.",
      },
      {
        question: "Devo saper usare qualcosa di tecnico?",
        answer:
          "No. Colleghi solo il tuo account Google per le prenotazioni; a tutto il resto pensiamo noi.",
      },
      {
        question: "Ho già una pagina Instagram o Facebook, mi serve comunque un sito?",
        answer:
          "Instagram fa scoprire la tua palestra; il sito è dove chi è interessato prenota davvero una prova. Lavorano insieme, non si sostituiscono.",
      },
      {
        question: "Posso disdire quando voglio?",
        answer: "Sì, l'abbonamento si può disdire in qualsiasi momento.",
      },
      {
        question: "Come funzionano le prenotazioni?",
        answer:
          "Arrivano dritte nel tuo Google Calendar, tramite il tuo account Gmail. Nessun sistema nuovo da imparare.",
      },
      {
        question: "Cosa succede se voglio cambiare qualcosa dopo?",
        answer:
          "Con l'abbonamento gli aggiornamenti sono inclusi: ci scrivi cosa cambiare e lo aggiorniamo noi. Con l'una tantum sono a richiesta.",
      },
      {
        question: "Offrite anche fotografia professionale?",
        answer:
          "Sì, per le palestre entro un'ora di macchina da noi. Lo verifichiamo insieme quando attivi.",
      },
    ],
  },
  // TODO: add real testimonials once available — never invent content here
  testimonials: [],
  finalCta: {
    title: "La tua palestra, online in 48 ore.",
    body: "Scegli il piano, compila il modulo, e pensa solo ad allenare. Al resto pensiamo noi.",
    ctaLabel: "Attiva la tua palestra",
    whatsappLabel: "Scrivici su WhatsApp",
  },
  footer: {
    line: "BESA — siti web per palestre e centri fitness",
    privacyHref: "/privacy-policy",
  },
};
```

- [ ] **Step 2: Type-check**

Run: `npm run check`
Expected: exits 0, no errors.

- [ ] **Step 3: Commit**

```bash
git add client/src/lib/palestre-content.ts
git commit -m "feat(palestre): add content config for /palestre landing page"
```

---

### Task 2: UTM attribution module (TDD) + hook

**Files:**
- Modify: `package.json` (add vitest devDependency + `test` script)
- Create: `vitest.config.ts`
- Create: `client/src/lib/palestre-utm.ts`
- Create: `client/src/lib/palestre-utm.test.ts`
- Create: `client/src/hooks/useUtmParams.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `type UtmParams = Partial<Record<"utm_source" | "utm_medium" | "utm_campaign", string>>`
  - `extractUtmParams(search: string): UtmParams`
  - `storeUtmParams(params: UtmParams, storage: Storage): void`
  - `readStoredUtmParams(storage: Storage): UtmParams`
  - `buildClientReferenceId(params: UtmParams): string | undefined`
  - `appendAttributionToStripeLink(baseUrl: string, params: UtmParams): string`
  - `buildWhatsAppUrl(number: string, message: string): string`
  - Hook: `useUtmParams(): UtmParams` (default export not used; named export)

- [ ] **Step 1: Install vitest and add test script**

Run: `npm install -D vitest`

Then in `package.json`, in `"scripts"`, add after the `"check"` line:

```json
    "test": "vitest run",
```

Create a standalone vitest config so vitest does not load `vite.config.ts` (whose root remap and Replit plugins are irrelevant to these pure-function tests):

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["client/src/**/*.test.ts"],
    environment: "node",
  },
});
```

- [ ] **Step 2: Write the failing tests**

```ts
// client/src/lib/palestre-utm.test.ts
import { describe, it, expect } from "vitest";
import {
  extractUtmParams,
  storeUtmParams,
  readStoredUtmParams,
  buildClientReferenceId,
  appendAttributionToStripeLink,
  buildWhatsAppUrl,
} from "./palestre-utm";

function makeStorage(): Storage {
  const store = new Map<string, string>();
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: () => null,
    get length() {
      return store.size;
    },
  } as Storage;
}

describe("extractUtmParams", () => {
  it("reads the three utm params from a query string", () => {
    expect(
      extractUtmParams("?utm_source=instagram&utm_medium=bio&utm_campaign=lancio"),
    ).toEqual({ utm_source: "instagram", utm_medium: "bio", utm_campaign: "lancio" });
  });

  it("omits missing params and ignores unrelated ones", () => {
    expect(extractUtmParams("?utm_source=whatsapp&foo=bar")).toEqual({
      utm_source: "whatsapp",
    });
  });

  it("returns empty object for empty query", () => {
    expect(extractUtmParams("")).toEqual({});
  });
});

describe("storeUtmParams / readStoredUtmParams", () => {
  it("round-trips params through storage", () => {
    const storage = makeStorage();
    storeUtmParams({ utm_source: "instagram" }, storage);
    expect(readStoredUtmParams(storage)).toEqual({ utm_source: "instagram" });
  });

  it("does not overwrite stored params with an empty object", () => {
    const storage = makeStorage();
    storeUtmParams({ utm_source: "instagram" }, storage);
    storeUtmParams({}, storage);
    expect(readStoredUtmParams(storage)).toEqual({ utm_source: "instagram" });
  });

  it("returns empty object when nothing stored or JSON corrupt", () => {
    const storage = makeStorage();
    expect(readStoredUtmParams(storage)).toEqual({});
    storage.setItem("palestre_utm", "{not json");
    expect(readStoredUtmParams(storage)).toEqual({});
  });
});

describe("buildClientReferenceId", () => {
  it("joins source, medium, campaign with underscores", () => {
    expect(
      buildClientReferenceId({
        utm_source: "instagram",
        utm_medium: "bio",
        utm_campaign: "lancio",
      }),
    ).toBe("instagram_bio_lancio");
  });

  it("sanitizes characters Stripe does not allow", () => {
    expect(buildClientReferenceId({ utm_source: "insta gram!" })).toBe("insta-gram-");
  });

  it("returns undefined when no params", () => {
    expect(buildClientReferenceId({})).toBeUndefined();
  });
});

describe("appendAttributionToStripeLink", () => {
  it("appends client_reference_id and utm params", () => {
    const url = appendAttributionToStripeLink("https://buy.stripe.com/abc", {
      utm_source: "instagram",
      utm_medium: "bio",
      utm_campaign: "lancio",
    });
    expect(url).toBe(
      "https://buy.stripe.com/abc?client_reference_id=instagram_bio_lancio&utm_source=instagram&utm_medium=bio&utm_campaign=lancio",
    );
  });

  it("returns base url unchanged when no params", () => {
    expect(appendAttributionToStripeLink("https://buy.stripe.com/abc", {})).toBe(
      "https://buy.stripe.com/abc",
    );
  });
});

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me link with url-encoded message", () => {
    expect(buildWhatsAppUrl("390000000000", "Ciao BESA!")).toBe(
      "https://wa.me/390000000000?text=Ciao%20BESA!",
    );
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './palestre-utm'` (or equivalent resolution error).

- [ ] **Step 4: Write the implementation**

```ts
// client/src/lib/palestre-utm.ts
// UTM capture + attribution threading for /palestre.
// Pure functions; storage is injected so everything is unit-testable.

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const SESSION_KEY = "palestre_utm";

export function extractUtmParams(search: string): UtmParams {
  const query = new URLSearchParams(search);
  const params: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = query.get(key);
    if (value) params[key] = value;
  }
  return params;
}

export function storeUtmParams(params: UtmParams, storage: Storage): void {
  if (Object.keys(params).length === 0) return;
  storage.setItem(SESSION_KEY, JSON.stringify(params));
}

export function readStoredUtmParams(storage: Storage): UtmParams {
  try {
    const raw = storage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

// Stripe client_reference_id allows only alphanumerics, dashes, underscores.
export function buildClientReferenceId(params: UtmParams): string | undefined {
  const parts = UTM_KEYS.map((key) => params[key]).filter(
    (value): value is string => Boolean(value),
  );
  if (parts.length === 0) return undefined;
  return parts.join("_").replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 200);
}

export function appendAttributionToStripeLink(
  baseUrl: string,
  params: UtmParams,
): string {
  const referenceId = buildClientReferenceId(params);
  if (!referenceId) return baseUrl;
  const url = new URL(baseUrl);
  url.searchParams.set("client_reference_id", referenceId);
  for (const key of UTM_KEYS) {
    const value = params[key];
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all tests green.

- [ ] **Step 6: Write the hook**

```ts
// client/src/hooks/useUtmParams.ts
import { useEffect, useState } from "react";
import {
  extractUtmParams,
  readStoredUtmParams,
  storeUtmParams,
  type UtmParams,
} from "@/lib/palestre-utm";

// Captures UTM params from the URL on mount, persists them for the session,
// and returns whichever set is available (fresh URL params win over stored).
export function useUtmParams(): UtmParams {
  const [utm, setUtm] = useState<UtmParams>({});

  useEffect(() => {
    const fromUrl = extractUtmParams(window.location.search);
    storeUtmParams(fromUrl, window.sessionStorage);
    setUtm(
      Object.keys(fromUrl).length > 0
        ? fromUrl
        : readStoredUtmParams(window.sessionStorage),
    );
  }, []);

  return utm;
}
```

- [ ] **Step 7: Type-check and commit**

Run: `npm run check`
Expected: exits 0.

```bash
git add package.json package-lock.json vitest.config.ts client/src/lib/palestre-utm.ts client/src/lib/palestre-utm.test.ts client/src/hooks/useUtmParams.ts
git commit -m "feat(palestre): add tested UTM attribution module and hook"
```

---

### Task 3: Page styles, shell, route, splash skip, SEO

**Files:**
- Create: `client/src/components/palestre/palestre.css`
- Create: `client/src/pages/Palestre.tsx`
- Modify: `client/src/App.tsx`

**Interfaces:**
- Consumes: `palestreContent`, `UMAMI_SITE_ID`, `UMAMI_SRC` from Task 1.
- Produces: `.palestre-page` wrapper class + CSS variables (`--pal-bg`, `--pal-ink`, `--pal-accent`, plus per-plate colors) and utility classes `palestre-display`, `palestre-focus` that ALL later components use. Page shell `Palestre.tsx` with `<main>` where later tasks insert sections.

- [ ] **Step 1: Write the scoped stylesheet**

```css
/* client/src/components/palestre/palestre.css */
/* Bumper-plates visual system, scoped to /palestre only.
   Does not touch the site's :root tokens. */

.palestre-page {
  --pal-bg: #f4f2ed;      /* chalk white */
  --pal-ink: #141412;     /* rubber black */
  --pal-red: #c8102e;     /* 25kg plate */
  --pal-blue: #0057b7;    /* 20kg plate */
  --pal-yellow: #ffb81c;  /* 15kg plate */
  --pal-green: #009a44;   /* 10kg plate */
  --pal-accent: var(--pal-red);
  background-color: var(--pal-bg);
  color: var(--pal-ink);
  font-family: "Inter", sans-serif;
}

.palestre-display {
  font-family: "Archivo", "Inter", sans-serif;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 1.05;
}

/* Visible keyboard focus everywhere on the page */
.palestre-page :focus-visible {
  outline: 3px solid var(--pal-accent);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Smooth anchor scrolling, disabled for reduced motion */
html:has(.palestre-page) {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html:has(.palestre-page) {
    scroll-behavior: auto;
  }
  .palestre-page *,
  .palestre-page *::before,
  .palestre-page *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Write the page shell**

```tsx
// client/src/pages/Palestre.tsx
import { Helmet } from "react-helmet-async";
import { palestreContent, UMAMI_SITE_ID, UMAMI_SRC } from "@/lib/palestre-content";
import "@/components/palestre/palestre.css";

export default function Palestre() {
  const { meta } = palestreContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sito web per palestre — BESA",
    serviceType: "Creazione siti web per palestre e centri fitness",
    description: meta.description,
    areaServed: "IT",
    provider: {
      "@type": "LocalBusiness",
      name: "BESA",
      url: "https://besa.it",
    },
  };

  return (
    <div className="palestre-page min-h-screen">
      <Helmet htmlAttributes={{ lang: "it" }}>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* TODO: insert real Umami site ID (and confirm script host) */}
        <script defer src={UMAMI_SRC} data-website-id={UMAMI_SITE_ID}></script>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <main>
        {/* sections mount here */}
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Add route and splash skip in App.tsx**

In `client/src/App.tsx`, add the import after the `Opzioni` import:

```tsx
import Palestre from "./pages/Palestre";
```

Change the splash condition from:

```tsx
  const [showSplash, setShowSplash] = useState(() => window.location.pathname !== '/privacy-policy');
```

to:

```tsx
  const [showSplash, setShowSplash] = useState(() =>
    window.location.pathname !== '/privacy-policy' &&
    !window.location.pathname.startsWith('/palestre')
  );
```

Add the route before the `NotFound` fallback route:

```tsx
      <Route path="/palestre" component={Palestre} />
```

- [ ] **Step 4: Verify**

Run: `npm run check`
Expected: exits 0.

Run: `npm run dev` (background), open `http://localhost:5000/palestre`.
Expected: chalk-white page, no splash screen, `<title>` is "Sito web per palestre in 48 ore | BESA". Root `/` still shows splash + home unchanged.

- [ ] **Step 5: Commit**

```bash
git add client/src/components/palestre/palestre.css client/src/pages/Palestre.tsx client/src/App.tsx
git commit -m "feat(palestre): add /palestre route, page shell, scoped design tokens, SEO"
```

---

### Task 4: Sticky header + WhatsApp FAB

**Files:**
- Create: `client/src/components/palestre/PalestreHeader.tsx`
- Create: `client/src/components/palestre/WhatsAppFab.tsx`
- Modify: `client/src/pages/Palestre.tsx`

**Interfaces:**
- Consumes: `palestreContent`, `WHATSAPP_NUMBER`, `WHATSAPP_MESSAGE` (Task 1); `buildWhatsAppUrl` (Task 2).
- Produces: `<PalestreHeader />` and `<WhatsAppFab />` (default exports, no props).

- [ ] **Step 1: Write the header**

```tsx
// client/src/components/palestre/PalestreHeader.tsx
import { palestreContent } from "@/lib/palestre-content";

export default function PalestreHeader() {
  const { header } = palestreContent;
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--pal-ink)]/10 bg-[var(--pal-bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="/palestre" className="palestre-display text-xl">
          BESA<span className="text-[var(--pal-accent)]">/palestre</span>
        </a>
        <a
          href="#prezzi"
          className="rounded-full bg-[var(--pal-ink)] px-4 py-2 text-sm font-bold text-[var(--pal-bg)] transition-colors hover:bg-[var(--pal-accent)]"
        >
          {header.ctaLabel}
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Write the WhatsApp floating button**

```tsx
// client/src/components/palestre/WhatsAppFab.tsx
import { MessageCircle } from "lucide-react";
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/lib/palestre-content";
import { buildWhatsAppUrl } from "@/lib/palestre-utm";

export default function WhatsAppFab() {
  return (
    <a
      href={buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
```

- [ ] **Step 3: Wire into the page**

In `client/src/pages/Palestre.tsx`, add imports after the `palestre.css` import:

```tsx
import PalestreHeader from "@/components/palestre/PalestreHeader";
import WhatsAppFab from "@/components/palestre/WhatsAppFab";
```

Add `<PalestreHeader />` immediately before `<main>`, and `<WhatsAppFab />` immediately after `</main>`:

```tsx
      <PalestreHeader />
      <main>
        {/* sections mount here */}
      </main>
      <WhatsAppFab />
```

- [ ] **Step 4: Verify and commit**

Run: `npm run check` — exits 0. In browser: sticky header with wordmark + CTA; green FAB bottom-right opens `wa.me` link with pre-filled text in new tab.

```bash
git add client/src/components/palestre/PalestreHeader.tsx client/src/components/palestre/WhatsAppFab.tsx client/src/pages/Palestre.tsx
git commit -m "feat(palestre): add sticky header and WhatsApp floating button"
```

---

### Task 5: Hero with phone-frame mockup

**Files:**
- Create: `client/src/components/palestre/Hero.tsx`
- Modify: `client/src/pages/Palestre.tsx`

**Interfaces:**
- Consumes: `palestreContent` (Task 1).
- Produces: `<Hero />` (default export, no props). Contains the page's single `<h1>`.

- [ ] **Step 1: Write the hero**

```tsx
// client/src/components/palestre/Hero.tsx
import { Star } from "lucide-react";
import { palestreContent } from "@/lib/palestre-content";

// Styled-DOM phone mockup of a sample gym one-pager: fast (no image) and
// visually consistent with the goal configurator preview further down.
function PhoneMockup() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-64 rounded-[2rem] border-4 border-[var(--pal-ink)] bg-white p-3 shadow-xl"
    >
      <div className="space-y-2">
        <div className="rounded-lg bg-[var(--pal-ink)] px-3 py-4 text-center">
          <p className="palestre-display text-xs text-white">La tua palestra</p>
          <span className="mt-2 inline-block rounded-full bg-[var(--pal-red)] px-3 py-1 text-[10px] font-bold text-white">
            Prenota la tua prova gratuita
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-[var(--pal-bg)] px-3 py-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3 w-3 fill-[var(--pal-yellow)] text-[var(--pal-yellow)]" />
          ))}
          <span className="ml-1 text-[9px] font-semibold">Recensioni Google</span>
        </div>
        <div className="rounded-lg bg-[var(--pal-bg)] px-3 py-2">
          <p className="text-[9px] font-bold uppercase">Orari corsi</p>
          <div className="mt-1 space-y-1">
            <div className="h-2 rounded bg-[var(--pal-ink)]/15" />
            <div className="h-2 w-4/5 rounded bg-[var(--pal-ink)]/15" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-[#25D366]/15 px-3 py-2">
          <span className="text-[9px] font-semibold">Scrivici su WhatsApp</span>
          <span className="h-4 w-4 rounded-full bg-[#25D366]" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { hero } = palestreContent;
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 pb-16 pt-12 md:grid-cols-2 md:items-center">
      <div>
        <p className="inline-block rounded-full border-2 border-[var(--pal-ink)] px-3 py-1 text-xs font-bold uppercase tracking-wide">
          {hero.eyebrow}
        </p>
        <h1 className="palestre-display mt-5 text-3xl md:text-4xl lg:text-5xl">
          {hero.headline}
        </h1>
        <p className="mt-4 text-lg text-[var(--pal-ink)]/80">{hero.subheadline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={hero.primaryCta.href}
            className="rounded-full bg-[var(--pal-red)] px-6 py-3 font-bold text-white transition-colors hover:bg-[var(--pal-ink)]"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="rounded-full border-2 border-[var(--pal-ink)] px-6 py-3 font-bold transition-colors hover:bg-[var(--pal-ink)] hover:text-[var(--pal-bg)]"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
        <div className="mt-8 rounded-xl border-l-8 border-[var(--pal-red)] bg-white p-4 shadow-sm">
          <p className="palestre-display text-lg">{hero.stat.figure}</p>
          <p className="mt-1 text-sm text-[var(--pal-ink)]/70">{hero.stat.followUp}</p>
        </div>
      </div>
      <PhoneMockup />
    </section>
  );
}
```

- [ ] **Step 2: Wire into the page**

In `client/src/pages/Palestre.tsx`, add import:

```tsx
import Hero from "@/components/palestre/Hero";
```

Inside `<main>`, add `<Hero />` immediately before `{/* sections mount here */}`.

- [ ] **Step 3: Verify and commit**

Run: `npm run check` — exits 0. In browser (mobile viewport first): headline exact, stat badge shows the 45% figure, both CTAs scroll, phone mockup renders.

```bash
git add client/src/components/palestre/Hero.tsx client/src/pages/Palestre.tsx
git commit -m "feat(palestre): add hero with phone mockup and 45% stat badge"
```

---

### Task 6: Problema + Come funziona

**Files:**
- Create: `client/src/components/palestre/Problema.tsx`
- Create: `client/src/components/palestre/ComeFunziona.tsx`
- Modify: `client/src/pages/Palestre.tsx`

**Interfaces:**
- Consumes: `palestreContent` (Task 1).
- Produces: `<Problema />`, `<ComeFunziona />` (default exports, no props).

- [ ] **Step 1: Write Problema (dark section, short and sharp)**

```tsx
// client/src/components/palestre/Problema.tsx
import { palestreContent } from "@/lib/palestre-content";

export default function Problema() {
  const { problema } = palestreContent;
  return (
    <section className="bg-[var(--pal-ink)] py-14 text-[var(--pal-bg)]">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="palestre-display text-2xl md:text-3xl">{problema.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-[var(--pal-bg)]/85">
          {problema.body}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write ComeFunziona (the only numbered section)**

```tsx
// client/src/components/palestre/ComeFunziona.tsx
import { palestreContent } from "@/lib/palestre-content";

export default function ComeFunziona() {
  const { comeFunziona } = palestreContent;
  return (
    <section id="come-funziona" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="palestre-display text-2xl md:text-3xl">{comeFunziona.title}</h2>
      <ol className="mt-8 grid gap-6 md:grid-cols-2">
        {comeFunziona.steps.map((step, index) => (
          <li key={step.title} className="rounded-xl bg-white p-6 shadow-sm">
            <span className="palestre-display text-3xl text-[var(--pal-red)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
            <p className="mt-1 text-[var(--pal-ink)]/75">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 3: Wire into the page**

Add imports in `Palestre.tsx`:

```tsx
import Problema from "@/components/palestre/Problema";
import ComeFunziona from "@/components/palestre/ComeFunziona";
```

Inside `<main>`, after `<Hero />`, before the anchor comment:

```tsx
        <Problema />
        <ComeFunziona />
```

- [ ] **Step 4: Verify and commit**

Run: `npm run check` — exits 0. Browser: dark problem band, 01–04 numbered steps.

```bash
git add client/src/components/palestre/Problema.tsx client/src/components/palestre/ComeFunziona.tsx client/src/pages/Palestre.tsx
git commit -m "feat(palestre): add problem section and numbered how-it-works"
```

---

### Task 7: Goal configurator (signature element)

**Files:**
- Create: `client/src/components/palestre/GoalConfigurator.tsx`
- Modify: `client/src/pages/Palestre.tsx`

**Interfaces:**
- Consumes: `palestreContent.goals` (`Goal[]`), `palestreContent.configurator` (Task 1); framer-motion.
- Produces: `<GoalConfigurator />` (default export, no props). Section id `#configuratore`.

- [ ] **Step 1: Write the configurator**

```tsx
// client/src/components/palestre/GoalConfigurator.tsx
import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { palestreContent } from "@/lib/palestre-content";

export default function GoalConfigurator() {
  const { goals, configurator } = palestreContent;
  const defaultGoal = goals.find((goal) => goal.default) ?? goals[0];
  const [activeId, setActiveId] = useState(defaultGoal.id);
  const reduceMotion = useReducedMotion();
  const active = goals.find((goal) => goal.id === activeId) ?? defaultGoal;

  return (
    <section
      id="configuratore"
      className="bg-white py-16"
      style={{ "--pal-accent": active.color } as CSSProperties}
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="palestre-display text-2xl md:text-3xl">{configurator.title}</h2>
        <p className="mt-2 text-[var(--pal-ink)]/75">{configurator.intro}</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div
            role="radiogroup"
            aria-label="Obiettivo del sito"
            className="grid content-start gap-3"
          >
            {goals.map((goal) => {
              const selected = goal.id === activeId;
              return (
                <button
                  key={goal.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setActiveId(goal.id)}
                  className="rounded-xl border-2 p-4 text-left transition-colors"
                  style={{
                    borderColor: selected ? goal.color : "rgba(20,20,18,0.15)",
                    backgroundColor: selected ? `${goal.color}14` : "transparent",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
                      style={{ backgroundColor: `${goal.color}22` }}
                    >
                      {goal.icon}
                    </span>
                    <span>
                      <span className="block font-bold">{goal.label}</span>
                      <span className="block text-sm text-[var(--pal-ink)]/70">
                        {goal.description}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mx-auto w-full max-w-xs rounded-[2rem] border-4 border-[var(--pal-ink)] bg-[var(--pal-bg)] p-4">
            <p className="palestre-display mb-3 text-center text-xs">
              Il tuo sito per: {active.label}
            </p>
            <ul className="space-y-2">
              <AnimatePresence initial={false} mode="popLayout">
                {active.sections.map((sectionLabel) => (
                  <motion.li
                    key={sectionLabel}
                    layout
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 32 }
                    }
                    className="rounded-lg border-l-4 bg-white px-3 py-2 text-sm font-semibold shadow-sm"
                    style={{ borderLeftColor: active.color }}
                  >
                    {sectionLabel}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-sm text-[var(--pal-ink)]/70">{configurator.microcopy}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into the page**

Add import in `Palestre.tsx`:

```tsx
import GoalConfigurator from "@/components/palestre/GoalConfigurator";
```

Inside `<main>`, after `<ComeFunziona />`:

```tsx
        <GoalConfigurator />
```

- [ ] **Step 3: Verify and commit**

Run: `npm run check` — exits 0. Browser: "Prove gratuite" selected on load; switching goals reorders the preview blocks with a spring transition (shared labels like "WhatsApp" slide, new ones enter); accent color changes with the goal. With OS reduced-motion enabled: instant swap, no animation. All four cards reachable and activatable by keyboard.

```bash
git add client/src/components/palestre/GoalConfigurator.tsx client/src/pages/Palestre.tsx
git commit -m "feat(palestre): add animated goal configurator with plate-color accents"
```

---

### Task 8: Feature grid + educational sections + photo teaser

**Files:**
- Create: `client/src/components/palestre/FeatureGrid.tsx`
- Create: `client/src/components/palestre/EducationalSections.tsx`
- Create: `client/src/components/palestre/PhotoTeaser.tsx`
- Modify: `client/src/pages/Palestre.tsx`

**Interfaces:**
- Consumes: `palestreContent`, `FeatureIconKey` (Task 1); lucide-react icons.
- Produces: `<FeatureGrid />`, `<EducationalSections />`, `<PhotoTeaser />` (default exports, no props).

- [ ] **Step 1: Write the feature grid**

```tsx
// client/src/components/palestre/FeatureGrid.tsx
import {
  CalendarCheck,
  Clock,
  Dumbbell,
  HelpCircle,
  Image,
  Instagram,
  MapPin,
  MessageCircle,
  Quote,
  Star,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { palestreContent, type FeatureIconKey } from "@/lib/palestre-content";

const ICONS: Record<FeatureIconKey, LucideIcon> = {
  "calendar-check": CalendarCheck,
  star: Star,
  clock: Clock,
  dumbbell: Dumbbell,
  image: Image,
  users: Users,
  quote: Quote,
  tag: Tag,
  "help-circle": HelpCircle,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  instagram: Instagram,
};

export default function FeatureGrid() {
  const { featureGrid } = palestreContent;
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <h2 className="palestre-display text-2xl">{featureGrid.title}</h2>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {featureGrid.items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li
              key={item.label}
              className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold shadow-sm"
            >
              <Icon className="h-4 w-4 shrink-0 text-[var(--pal-red)]" aria-hidden="true" />
              {item.label}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Write the educational sections**

```tsx
// client/src/components/palestre/EducationalSections.tsx
import { palestreContent } from "@/lib/palestre-content";

export default function EducationalSections() {
  const { educational } = palestreContent;
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl space-y-12 px-4">
        {educational.map((article) => (
          <article key={article.title}>
            <h2 className="palestre-display text-2xl">{article.title}</h2>
            {article.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed text-[var(--pal-ink)]/80">
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write the photo teaser (teaser ONLY — no address input, no geocoding)**

```tsx
// client/src/components/palestre/PhotoTeaser.tsx
import { Camera } from "lucide-react";
import { palestreContent } from "@/lib/palestre-content";

export default function PhotoTeaser() {
  const { photoTeaser } = palestreContent;
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-xl border-2 border-dashed border-[var(--pal-ink)]/30 bg-[var(--pal-yellow)]/10 p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Camera className="h-5 w-5 text-[var(--pal-ink)]" aria-hidden="true" />
          {photoTeaser.title}
        </h2>
        <p className="mt-2 text-[var(--pal-ink)]/80">{photoTeaser.body}</p>
        <a
          href={photoTeaser.ctaHref}
          className="mt-4 inline-block font-bold underline underline-offset-4 hover:text-[var(--pal-red)]"
        >
          {photoTeaser.ctaLabel}
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wire into the page**

Add imports in `Palestre.tsx`:

```tsx
import FeatureGrid from "@/components/palestre/FeatureGrid";
import EducationalSections from "@/components/palestre/EducationalSections";
import PhotoTeaser from "@/components/palestre/PhotoTeaser";
```

Inside `<main>`, after `<GoalConfigurator />`:

```tsx
        <FeatureGrid />
        <EducationalSections />
        <PhotoTeaser />
```

- [ ] **Step 5: Verify and commit**

Run: `npm run check` — exits 0. Browser: compact 12-item grid, two educational articles with spec copy, dashed teaser box linking to `#prezzi`.

```bash
git add client/src/components/palestre/FeatureGrid.tsx client/src/components/palestre/EducationalSections.tsx client/src/components/palestre/PhotoTeaser.tsx client/src/pages/Palestre.tsx
git commit -m "feat(palestre): add feature grid, educational sections, photo teaser"
```

---

### Task 9: Pricing (UTM-threaded) + FAQ + testimonials

**Files:**
- Create: `client/src/components/palestre/Pricing.tsx`
- Create: `client/src/components/palestre/FaqAccordion.tsx`
- Create: `client/src/components/palestre/Testimonials.tsx`
- Modify: `client/src/pages/Palestre.tsx`

**Interfaces:**
- Consumes: `palestreContent`, `STRIPE_LINK_MONTHLY`, `STRIPE_LINK_ONETIME` (Task 1); `useUtmParams`, `appendAttributionToStripeLink` (Task 2); shadcn accordion (`@/components/ui/accordion`).
- Produces: `<Pricing />`, `<FaqAccordion />`, `<Testimonials />` (default exports, no props). Section ids `#prezzi`, `#faq`.

- [ ] **Step 1: Write pricing**

```tsx
// client/src/components/palestre/Pricing.tsx
import { Check } from "lucide-react";
import {
  palestreContent,
  STRIPE_LINK_MONTHLY,
  STRIPE_LINK_ONETIME,
} from "@/lib/palestre-content";
import { appendAttributionToStripeLink } from "@/lib/palestre-utm";
import { useUtmParams } from "@/hooks/useUtmParams";

export default function Pricing() {
  const { pricing } = palestreContent;
  const utm = useUtmParams();

  return (
    <section id="prezzi" className="bg-[var(--pal-ink)] py-16 text-[var(--pal-bg)]">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="palestre-display text-2xl md:text-3xl">{pricing.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Monthly — recommended default */}
          <div className="relative rounded-2xl border-4 border-[var(--pal-red)] bg-white p-6 text-[var(--pal-ink)]">
            <span className="absolute -top-4 left-6 rounded-full bg-[var(--pal-red)] px-3 py-1 text-xs font-bold uppercase text-white">
              {pricing.monthly.badge}
            </span>
            <h3 className="text-lg font-bold">{pricing.monthly.name}</h3>
            <p className="mt-2">
              <span className="palestre-display text-4xl">{pricing.monthly.price}</span>
              <span className="text-[var(--pal-ink)]/70"> {pricing.monthly.period}</span>
            </p>
            <ul className="mt-4 space-y-2">
              {pricing.monthly.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-[var(--pal-green)]" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
            <a
              href={appendAttributionToStripeLink(STRIPE_LINK_MONTHLY, utm)}
              className="mt-6 block rounded-full bg-[var(--pal-red)] px-6 py-3 text-center font-bold text-white transition-colors hover:bg-[var(--pal-ink)]"
            >
              {pricing.monthly.ctaLabel}
            </a>
          </div>

          {/* One-time — quieter */}
          <div className="rounded-2xl border border-[var(--pal-bg)]/25 p-6">
            <h3 className="text-lg font-bold">{pricing.onetime.name}</h3>
            <p className="mt-2">
              <span className="palestre-display text-4xl">{pricing.onetime.price}</span>
              <span className="text-[var(--pal-bg)]/70"> {pricing.onetime.period}</span>
            </p>
            <ul className="mt-4 space-y-2">
              {pricing.onetime.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-sm text-[var(--pal-bg)]/85">
                  <Check className="h-4 w-4 shrink-0 text-[var(--pal-bg)]/60" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
            <a
              href={appendAttributionToStripeLink(STRIPE_LINK_ONETIME, utm)}
              className="mt-6 block rounded-full border-2 border-[var(--pal-bg)] px-6 py-3 text-center font-bold transition-colors hover:bg-[var(--pal-bg)] hover:text-[var(--pal-ink)]"
            >
              {pricing.onetime.ctaLabel}
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-[var(--pal-bg)]/80">
          {pricing.clarifier}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write the FAQ accordion**

```tsx
// client/src/components/palestre/FaqAccordion.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { palestreContent } from "@/lib/palestre-content";

export default function FaqAccordion() {
  const { faq } = palestreContent;
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="palestre-display text-2xl md:text-3xl">{faq.title}</h2>
      <Accordion type="single" collapsible className="mt-6">
        {faq.items.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="text-left font-bold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-[var(--pal-ink)]/80">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
```

- [ ] **Step 3: Write testimonials (hidden while empty — never fabricate)**

```tsx
// client/src/components/palestre/Testimonials.tsx
import { palestreContent } from "@/lib/palestre-content";

// Renders nothing until real testimonials exist in palestre-content.ts.
// TODO: add real testimonials once available — never invent content.
export default function Testimonials() {
  const { testimonials } = palestreContent;
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="palestre-display text-2xl">Dicono di noi</h2>
      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <li key={testimonial.name} className="rounded-xl bg-white p-6 shadow-sm">
            <p className="leading-relaxed">"{testimonial.quote}"</p>
            <div className="mt-4 flex items-center gap-3">
              <img
                src={testimonial.photo}
                alt={`Foto di ${testimonial.name}`}
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-[var(--pal-ink)]/70">{testimonial.gym}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Wire into the page**

Add imports in `Palestre.tsx`:

```tsx
import Pricing from "@/components/palestre/Pricing";
import FaqAccordion from "@/components/palestre/FaqAccordion";
import Testimonials from "@/components/palestre/Testimonials";
```

Inside `<main>`, after `<PhotoTeaser />`:

```tsx
        <Testimonials />
        <Pricing />
        <FaqAccordion />
```

- [ ] **Step 5: Verify UTM threading and commit**

Run: `npm run check` — exits 0. Browser: open `http://localhost:5000/palestre?utm_source=instagram&utm_medium=bio&utm_campaign=test`, inspect the pricing CTA hrefs — must contain `client_reference_id=instagram_bio_test` and the three utm params. Reload without query params: hrefs still carry them (sessionStorage). Monthly card visually dominant with "Consigliato" badge; clarifier line under both cards; accordion opens/closes; no testimonials section visible.

```bash
git add client/src/components/palestre/Pricing.tsx client/src/components/palestre/FaqAccordion.tsx client/src/components/palestre/Testimonials.tsx client/src/pages/Palestre.tsx
git commit -m "feat(palestre): add pricing with UTM attribution, FAQ, testimonials shell"
```

---

### Task 10: Final CTA + footer, full-page verification

**Files:**
- Create: `client/src/components/palestre/FinalCta.tsx`
- Modify: `client/src/pages/Palestre.tsx`

**Interfaces:**
- Consumes: `palestreContent`, `WHATSAPP_NUMBER`, `WHATSAPP_MESSAGE` (Task 1); `buildWhatsAppUrl` (Task 2).
- Produces: `<FinalCta />` (default export, no props) — includes the minimal footer.

- [ ] **Step 1: Write final CTA + footer**

```tsx
// client/src/components/palestre/FinalCta.tsx
import {
  palestreContent,
  WHATSAPP_MESSAGE,
  WHATSAPP_NUMBER,
} from "@/lib/palestre-content";
import { buildWhatsAppUrl } from "@/lib/palestre-utm";

export default function FinalCta() {
  const { finalCta, footer } = palestreContent;
  return (
    <>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="palestre-display text-3xl">{finalCta.title}</h2>
          <p className="mt-3 text-lg text-[var(--pal-ink)]/80">{finalCta.body}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#prezzi"
              className="rounded-full bg-[var(--pal-red)] px-6 py-3 font-bold text-white transition-colors hover:bg-[var(--pal-ink)]"
            >
              {finalCta.ctaLabel}
            </a>
            <a
              href={buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-[#25D366] px-6 py-3 font-bold text-[var(--pal-ink)] transition-colors hover:bg-[#25D366] hover:text-white"
            >
              {finalCta.whatsappLabel}
            </a>
          </div>
        </div>
      </section>
      <footer className="border-t border-[var(--pal-ink)]/10 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 text-sm text-[var(--pal-ink)]/70">
          <p>{footer.line}</p>
          <a href={footer.privacyHref} className="underline underline-offset-4">
            Privacy e cookie
          </a>
        </div>
      </footer>
    </>
  );
}
```

- [ ] **Step 2: Wire into the page**

Add import in `Palestre.tsx`:

```tsx
import FinalCta from "@/components/palestre/FinalCta";
```

Inside `<main>`, after `<FaqAccordion />` (the anchor comment `{/* sections mount here */}` can now be deleted):

```tsx
        <FinalCta />
```

- [ ] **Step 3: Full verification pass**

Run: `npm run check` — exits 0.
Run: `npm test` — all UTM tests pass.
Run: `npm run build` — build succeeds.

Browser checklist (mobile viewport ~390px first, then desktop):

- [ ] Splash skipped on `/palestre`; still present on `/`.
- [ ] Single `<h1>` with the exact spec headline; heading hierarchy H1 → H2 → H3.
- [ ] Only statistic anywhere: the 45% figure. Grep to confirm no others: `grep -n "%" client/src/lib/palestre-content.ts` → only the 45% line (plus € prices, which are prices, not statistics).
- [ ] Configurator defaults to "Prove gratuite"; spring reorder between goals; instant swap with OS reduced-motion on.
- [ ] Pricing CTAs carry UTM attribution when arriving with `?utm_source=...`.
- [ ] WhatsApp FAB and final-CTA WhatsApp button open pre-filled chat.
- [ ] Keyboard: Tab reaches header CTA, all 4 goal cards, accordion triggers, pricing CTAs, FAB — focus ring visible on each.
- [ ] JSON-LD `Service` script present in page head (view source).
- [ ] Photography content is teaser-only — no address input anywhere.
- [ ] No testimonials section rendered (array empty).
- [ ] Root site pages (`/`, `/esempi`, `/opzioni`) unchanged.

- [ ] **Step 4: Commit**

```bash
git add client/src/components/palestre/FinalCta.tsx client/src/pages/Palestre.tsx
git commit -m "feat(palestre): add final CTA and footer, complete landing page"
```
