# Design: `/palestre` — BESA gym landing page

**Date:** 2026-07-05
**Status:** Approved (brainstorming session)

## Goal

A single landing page at `besa.it/palestre` that converts Italian gym owners into either (a) starting Stripe checkout on a plan, or (b) messaging on WhatsApp. It is the entire sales funnel — no sales calls. Audience: owners of small/medium independent gyms, boxes, and studios in Italy; non-technical, time-poor, price-sensitive, living on Instagram/WhatsApp. All copy in Italian, informal "tu".

This page is the prototype for future `/palestre/[città]` SEO pages, so content must be fully separated from layout.

## Decisions made

| Decision | Choice |
|---|---|
| Route | `/palestre` (not `/gym`) — Italian SEO, sets up city pages |
| Splash screen | Skipped on `/palestre` (one-line condition change in `App.tsx`) |
| Page chrome | Own minimal sticky header (logo + one CTA), own minimal footer. Existing site header/footer NOT reused — no funnel exits |
| WhatsApp number | Placeholder constant + TODO |
| Stripe links | Placeholder constants `STRIPE_LINK_MONTHLY`, `STRIPE_LINK_ONETIME` + TODO |
| Visual direction | "Bumper plates" (see below) |
| Lead form | Not in v1 — WhatsApp is the low-commitment path (YAGNI) |
| i18n | Bypassed; page is Italian-only, copy in `palestre-content.ts`, not translation JSONs |

## Architecture

Matches existing stack exactly: Vite + React 18 + wouter + Tailwind 3 + shadcn/Radix + framer-motion. No new frameworks.

### Files

- `client/src/pages/Palestre.tsx` — page shell; composes section components in order; injects Helmet meta + JSON-LD + Umami script.
- `client/src/lib/palestre-content.ts` — single typed config object holding ALL copy, the 45% stat, the goals array, pricing data, FAQ items, testimonials array (empty + `// TODO: add real testimonials once available`), Stripe placeholder links, WhatsApp placeholder number/message, and city-swappable fields (e.g. optional `cityName`). Components read only from this object.
- `client/src/components/palestre/` — page-scoped components:
  - `PalestreHeader` — sticky, BESA wordmark + one CTA button scrolling to pricing
  - `Hero` — eyebrow badge, exact headline, subheadline, primary/secondary CTA, phone-frame mockup (styled DOM, no image), 45% stat badge
  - `Problema` — 3–4 lines, qualitative only
  - `ComeFunziona` — 4 numbered steps (01–04); only numbered section on page
  - `GoalConfigurator` — the signature element (spec below)
  - `FeatureGrid` — compact icon + label grid, 12 section-library items
  - `EducationalSections` — "Perché offrire una prova gratuita conviene" + "La scheda Google non basta"
  - `PhotoTeaser` — callout box only; CTA links to pricing/FAQ anchor; NO address input, NO geocoding
  - `Pricing` — two cards; monthly 49€/mese highlighted "Consigliato"; one-time 690€ + 99€/anno quieter; clarifier line below on updates difference
  - `FaqAccordion` — Radix/shadcn accordion, 7 questions from spec
  - `Testimonials` — component built, renders nothing while content array is empty; never fabricated content
  - `FinalCta` — repeat strongest CTA + WhatsApp
  - `WhatsAppFab` — floating button, `wa.me/<PLACEHOLDER>?text=<pre-filled Italian message>`
- `client/src/hooks/useUtmParams.ts` — UTM capture hook (see Analytics).

### Existing-site touch surface

Only `client/src/App.tsx`:
1. Add `<Route path="/palestre" component={Palestre} />`
2. Extend the splash-skip pathname check to include `/palestre`

Nothing else on the existing site changes.

## Visual system — "Bumper plates"

Grounded in real gym objects: competition bumper plates, chalk, rubber flooring. Scoped to the page via a wrapper class and local CSS variables — does not touch the site's `:root` tokens.

- **Base:** chalk white `#F4F2ED`
- **Ink / dark sections:** rubber black `#141412`
- **Accents — competition plate colors, one per configurator goal:**
  - Red `#C8102E` → Prove gratuite
  - Blue `#0057B7` → Fiducia
  - Yellow `#FFB81C` → Informazioni
  - Green `#009A44` → Contatto
- **Type:** Archivo (Black / condensed usage) for display, loaded via Google Fonts on this page only; Inter (already loaded) for body.
- **Signature element:** the goal configurator. Four plate-colored goal cards; selecting one animates a phone-frame preview whose labeled section blocks reorder with a spring transition. The active goal's plate color threads into nearby page accents via a CSS variable while selected.
- Motion budget: deliberate motion only in the configurator. Everything else calm. `useReducedMotion` → instant state swap, no animation.
- Avoids the three forbidden generic patterns (cream+serif+terracotta; near-black+neon; hairline newspaper).

## Interactivity

- **GoalConfigurator:** driven by the exact 4-goal config array from the spec (ids `free_trial`, `trust`, `information`, `contact`, with icons, labels, descriptions, section lists). `free_trial` selected by default. framer-motion `layout` animation for block reorder — a reorder, not a fade. Microcopy below: "Questo è solo il punto di partenza — personalizziamo tutto il resto (foto, colori, testi) quando attivi."
- **FAQ:** shadcn accordion; 7 questions with substance fixed by spec.
- **UTM attribution:** `useUtmParams` reads `utm_source`, `utm_medium`, `utm_campaign` from URL on mount and stores in sessionStorage (survives in-page navigation). At click time, Stripe link hrefs get `client_reference_id` (compact channel token) and `utm_*` metadata params appended so a completed payment traces back to its channel.
- **WhatsApp:** FAB + inline CTAs open pre-filled Italian chat message.

## Analytics & SEO

- Umami script tag with placeholder site ID + `// TODO: insert real Umami site ID`.
- `react-helmet-async` (already installed): title, meta description, Open Graph (image/title/description), Twitter Card.
- JSON-LD `Service` schema for BESA.
- Single H1 = the exact spec headline. Logical H2/H3 tree. Target keywords woven naturally: `sito web palestra`, `creare sito per palestra`, `quanto costa un sito per palestra`, `sito con prenotazioni palestra`.
- Hero visual is styled DOM (phone frame), not a heavy image — fast LCP. Any raster images: WebP, descriptive Italian alt text, lazy-loaded below the fold.
- Anchor slugs in Italian: `#come-funziona`, `#configuratore`, `#prezzi`, `#faq`.

## Copy rules (hard constraints)

- Exact headline: "Una pagina, fatta su misura per la tua palestra, pensata per riempire le prove gratuite."
- Only statistic anywhere on the page: "Il 45% delle palestre italiane non ha ancora un sito web." No other numbers invented, including in the Problema section.
- Educational sections use the spec's Italian copy substantially as written.
- Pricing copy per spec: 49€/mese all-inclusive vs 690€ una tantum + 99€/anno hosting; clarifier line on updates included vs on request.
- No fake testimonials, reviews, or social proof. No mention of internal tooling (Apify, n8n, Coolify).

## Accessibility & performance

- Visible keyboard focus states everywhere; configurator cards keyboard-operable (roving tabindex or radio-group semantics).
- `prefers-reduced-motion` respected globally on the page.
- Mobile-first layout; target excellent Core Web Vitals on average Italian mobile connections.
- Semantic HTML: real headings, `<button>`s, landmark elements.

## Error handling

Page is static content + client-only interactivity — no network calls beyond outbound links. Empty testimonials array hides section. Missing UTM params → Stripe links work unmodified.

## Testing

- `npm run check` (tsc) passes.
- Manual verification on dev server: all four configurator states, default selection, reduced-motion behavior, UTM params threaded onto Stripe hrefs, WhatsApp link opens with pre-filled text, splash skipped on `/palestre`, mobile viewport layout.

## Out of scope

- Post-payment intake flow (address/drive-time photography gate) — separate system; photography is teaser-only here.
- Real Stripe checkout logic, real backend, lead-capture form.
- City pages `/palestre/[città]` — enabled by content structure but not built now.
- Any change to existing site pages, header, footer, or i18n resources.
