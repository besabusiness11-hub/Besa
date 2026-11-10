# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

BESA agency site (besaweb.com, "BESA 2.0"): Italian single-page landing that sells landing pages to businesses running Meta (FB/IG) ads, plus legal pages. Standalone repo since 2026-11-09, split with full history out of the `besa-platform` monorepo (where it was `apps/agency-site`). GitHub `besabusiness11-hub/Besa`, branch `main`; the previous Vite site is preserved on branch `legacy-main` (and locally in `../Besa/`, do not edit). Push via the SSH alias `github.com-besa` (the plain `github.com` host authenticates as the personal account, which has no write access).

Read `DESIGN.md` and `PRODUCT.md` (Impeccable brand register) before UI edits, `DEPLOY.md` for Coolify, `docs/specs/agency-site-fase-validazione.md` for the validation phase. `STATO.md` is the owner-facing (Italian, non-technical) guide to the switches and the admin panel: update it when the set of switches or the panel changes (day-to-day state lives in the panel).

## Commands
Node 24 (`fnm use 24`), pnpm 11.
- `pnpm dev`: Astro 7 runs dev as a daemon; `pnpm exec astro dev stop` if CSS looks stale.
- `pnpm test` (vitest, `src/**/*.test.ts`); single file: `pnpm exec vitest run src/lib/lead.test.ts`.
- `pnpm check`: `astro check`.
- `pnpm build`: `prebuild` renders `public/og/home.png` via Playwright; without Chromium it keeps the committed PNG.
- `HOST=127.0.0.1 PORT=4321 node server.mjs`: serve the production build (without `HOST` it binds IPv6 only).
- `pnpm admin`: dev server + admin panel in local mode (`/keystatic` writes `src/data/site/*.json` on disk).
- `pnpm features`: prints which switches are off, why, and how to re-enable.
- `node scripts/check-mail-flow.mjs <url>`: DOM check of the email lead flow against a running server.
- `docker build -t besa-agency-site .` from the repo root (runs `pnpm test` before `pnpm build`). Coolify: Base Directory `/`, Dockerfile `/Dockerfile`, port 4321, healthcheck `GET /healthz`.

Dependency quirks (all deliberate): pnpm enforces a minimum release age, so pin new deps to versions older than a day (e.g. `@astrojs/react` 7.1.1) instead of adding `minimumReleaseAgeExclude`; `pnpm-workspace.yaml` holds the build-script approvals and pins `@astrojs/language-server` to 2.16.16 (2.17.x crashes `astro check` with `this.bridge.deleteEnv is not a function`); `esbuild` is a direct devDependency because `vite.build.cssMinify: "esbuild"` needs it and Vite 8 no longer ships it.

## Architecture
- Astro + Tailwind 4 + `@astrojs/node` standalone. All pages are prerendered; only `POST /api/lead` (`src/pages/api/lead.ts` + `src/lib/lead.ts`: zod, honeypot `website`, Turnstile, nodemailer SMTP, in-memory rate limit), `/healthz` and the admin panel (`/keystatic`, `/api/keystatic/*`) run server-side.
- `server.mjs` is the production entry: security headers, compression, cache headers, `X-Robots-Tag`. It applies headers to static files too (the node adapter serves them before Astro middleware); `src/middleware.ts` adds CSP to dynamic routes. Keep the two CSP lists aligned. Compression decides at `writeHead` time because SSR responses commit headers there; deciding later broke every browser form submission.
- `server.mjs` imports `src/lib/features.ts` directly via Node type stripping (to drop Turnstile from the CSP when the form is off), so the Dockerfile copies that file and `src/data/site/switches.json` next to `server.mjs` in the runtime image. On SSR routes the middleware's CSP overwrites server.mjs's; the admin's wider CSP (GitHub API, avatars, blob worker) lives only in the middleware.

### Admin panel (Keystatic)
- `keystatic.config.ts` (root) defines four singletons, each a JSON file in `src/data/site/`: `switches` (offer mode + `FEATURES` on/off), `sections` (home sections), `offer` (prices + checkout links), `contacts` (WhatsApp number, company data). Storage: local in dev, GitHub (`besabusiness11-hub/Besa`, commits to `main`, branch prefix `admin/`) in prod; `PUBLIC_KEYSTATIC_STORAGE` overrides.
- Own routes instead of the `@keystatic/astro` integration (not installed as integration): `src/pages/keystatic/[...params].astro` (BESA colours via Keystar's `--kui-color-scale-indigo*`, "Torna al sito" button) and `src/pages/api/keystatic/[...params].ts` (503 without secrets, 404 for local mode outside dev). React (`@astrojs/react`) is used only there.
- Keystatic omits empty fields when saving, and TS infers types from the JSON: readers (`features.ts`, `offer.ts`, `sections.ts`, `contacts.ts`) cast via `unknown`, tolerate missing keys and throw on invalid values so a bad save fails the build. Adding a field = schema in `keystatic.config.ts` + reader + `admin.test.ts`.
- Labels, `whyOff`, `reEnable` stay in `features.ts` and appear as help text under each toggle.

### Switches (`src/lib/features.ts`, state in `src/data/site/switches.json`)
`OFFER_MODE` ("validation" | "launch" | "full") plus `FEATURES` (`leadForm`, `onlinePayment`, `whatsappButton`); each switch carries `whyOff` + a `reEnable` checklist (tested). No env override: change the JSON (panel or by hand) and redeploy. Current: validation, everything off.
- `offer.ts` reads `PRICING` and `CHECKOUT` from `offer.json` and derives `FULL`/`LAUNCH`/`VALIDATION`. "launch" = one landing at the launch price; "full" = three plans + quote slider.
- `sections.ts`: home sections on/off (`sections.json`). Hero and `#contatto` are always on. A hidden section also drops its `copy.nav.links` entry (dock, footer), the Features cross-links to it, and (FAQ) the FAQPage JSON-LD. Never index `copy.nav.links` by position.
- `copy.ts` exports `buildCopy(mode, { leadForm, sections })` (tests build every mode) and `copy` = current switches.
- In "validation": no amounts or "gratis" anywhere (`copy.test.ts` scans with an explicit allowlist), `offer`/`form.payment` are absent, the offer section is `OfferValidation.astro`, `/termini` is a noindex stub out of sitemap and footer. In launch/full, `/termini` holds cancellation, pause and code-buyout prices (never in marketing copy).
- WhatsApp button shows only with `whatsappButton.enabled` AND a number (`contacts.json`, fallback `PUBLIC_WHATSAPP_NUMBER`).

### Lead capture
- `leadForm` OFF (now): every `LinkCatcher` (hero, step 1, calculator, offer) opens the visitor's mail app with a draft to info@besaweb.com. `lib/mail-draft.ts` is the pure builder, `lib/mail-state.ts` the client state (last link, calculator numbers, plan). `MailCard.astro` is the copy-paste popup, `ContactMail.astro` replaces the form in `#contatto`. `/api/lead` returns 404. Umami events: `mail_open{where}`, `mail_card_open`, `mail_copy{field}`.
- `leadForm` ON: `LinkCatcher` drops the link into `ContactForm.astro` (3 required answers: link, name, contact; optional goal, plan, calculator numbers, "more context"). `DemoMonitor` sketches the trial page live, `ReceiptPrinter` prints the summary on send (confetti via lazy `canvas-confetti`). Every optional field must exist in `leadSchema` + `buildEmail` + tests + the privacy policy list, or it is silently dropped. Privacy/cookie pages switch their Brevo/Turnstile paragraphs on the same flag. The form's CSS still ships when off (Astro collects CSS from imports), its JS does not.
- Never put `data-tpl` on anything outside the calculator: `Problem.astro` rewrites the text of every `[data-tpl]`.

### SEO / env
- `PUBLIC_SITE_URL` and `PUBLIC_NOINDEX=true` (staging: noindex meta, `X-Robots-Tag`, `Disallow: /`, empty sitemap) are build-time. Set `TRUSTED_PROXY=cloudflare` in prod or all visitors share one rate-limit bucket. SMTP/Turnstile vars (only needed with `leadForm` on) are documented in `.env.example`.
- JSON-LD FAQPage includes only FAQ items without a `[TODO]`; its text must match the visible answer exactly (`jsonld.test.ts`).

## Design and motion
- Tokens: primitives in `@theme`, components use only semantic tokens (`@theme inline` in `src/styles/global.css`). Type classes are `.t-h2/.t-h3` (Tailwind `h-2/h-3` collide).
- Never name a component class after a Tailwind utility (`ring`, `h-2`, …): Tailwind 4 scans the source and applies the utility too (`.ring` drew a 1px box-shadow square on the Lighthouse gauges and the dock ring).
- Motion is CSS-only (`animation-timeline: view()`) and must respect `prefers-reduced-motion`. Never put `overflow-hidden` on an ancestor of a `view()` animation: it creates a scroll container and freezes the timeline (use `overflow-clip`). Lightning CSS breaks `animation-timeline`, hence `cssMinify: "esbuild"`.
- Word-by-word scroll headlines: `LitHeadline.astro` (spreads rest props so the caller's scoped classes apply).
- Page and `[popover]` scrollbars are hidden in `global.css`; `Base.astro` resets every popover to its top on open.
- No cookies, no third-party embeds, no CDN fonts. Analytics = self-hosted Umami only.

## Copy and content rules
- All Italian copy lives in `src/lib/copy.ts`; `{em}…{/em}` marks emphasis. `copy.test.ts` fails on any `[TODO]` left in copy.
- No em dashes, informal "tu", smart punctuation, no buzzwords.
- **Never invent prices, testimonials, stats, legal/company data.** Prices, payment links (`offer.plans[].checkout`), bios, case studies and legal data are still `[TODO]`/empty: leave them and ask.
- Team = Leo and Ben (Benito, shown as "Ben" everywhere). Portraits are SVG "besamoji" stickers (`TeamAvatar.astro`), never photos of faces.
- Delivery promise (confirmed by the owner 2026-11-03): draft in 48 hours, first reply within 1 business day; WhatsApp only if the visitor leaves a number in the email.
- "Ottieni la bozza" is the one CTA label everywhere (link fields, footer, dock pill `nav.dockCta`). No CTA in the sticky header (logo only).
- Commits: conventional (`feat: …`, `fix(copy): …`).
