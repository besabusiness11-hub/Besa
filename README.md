# BESA · besaweb.com

Sito dell'agenzia BESA: landing page in italiano che vende landing page alle attività che fanno pubblicità su Facebook e Instagram, più le pagine legali (privacy, cookie, termini).

Astro 7 + Tailwind 4, servito da Node (`@astrojs/node` standalone). Le pagine sono prerenderizzate; lato server girano solo `/api/lead` e `/healthz`.

> Stato attuale: **fase di validazione** (niente prezzi, contatti via email). Il riepilogo per chi non tocca il codice è in [`STATO.md`](STATO.md).

## Requisiti

- Node 24 (`.nvmrc` / `.node-version`)
- pnpm 11 (`corepack enable`)

## Avvio in locale

```sh
pnpm install
cp .env.example .env     # in validazione basta PUBLIC_SITE_URL
pnpm dev                 # http://127.0.0.1:4321
```

Se dopo una modifica il CSS sembra vecchio: `pnpm exec astro dev stop` e rilancia.

## Comandi

| Comando | Cosa fa |
|---|---|
| `pnpm dev` | Server di sviluppo |
| `pnpm test` | Test (vitest). Un file solo: `pnpm exec vitest run src/lib/lead.test.ts` |
| `pnpm check` | Controllo tipi e template (`astro check`) |
| `pnpm build` | Build di produzione in `dist/` (prima genera `public/og/home.png` con Playwright; senza Chromium tiene il PNG già committato) |
| `pnpm start` | Serve la build (`HOST=127.0.0.1 PORT=4321 pnpm start`; senza `HOST` ascolta solo su IPv6) |
| `pnpm features` | Stampa cosa è spento, perché e come riaccenderlo |

## Interruttori

Cosa è acceso si decide in un solo file, [`src/lib/features.ts`](src/lib/features.ts), non con variabili d'ambiente: si modifica, si fa commit e Coolify ripubblica.

- `OFFER_MODE`: `"validation"` (senza prezzi, attiva ora), `"launch"`, `"full"`.
- `FEATURES.leadForm`: modulo dinamico al posto dell'email.
- `FEATURES.onlinePayment`: link di pagamento nell'offerta.
- `FEATURES.whatsappButton`: pulsante chat (serve anche `PUBLIC_WHATSAPP_NUMBER`).

Ogni interruttore spento ha il suo `whyOff` e la checklist `reEnable`, verificati dai test.

## Struttura

```
src/
  components/   sezioni della pagina (Hero, Problem, HowItWorks, Offer, Faq, …)
  layouts/      Base.astro
  lib/          copy.ts (tutti i testi), features.ts, offer.ts, lead.ts, mail-draft.ts, jsonld.ts + test
  pages/        index, grazie, privacy-policy, cookie-policy, termini, 404, api/lead, healthz, sitemap, robots
  styles/       global.css (token di design)
  middleware.ts CSP per le route dinamiche
server.mjs      entry di produzione: header di sicurezza, compressione, cache, X-Robots-Tag
scripts/        immagine OG, favicon, controllo del flusso email, stampa interruttori
docs/specs/     specifica della fase di validazione
```

Tutti i testi italiani stanno in `src/lib/copy.ts`. Regole di design e di brand in [`DESIGN.md`](DESIGN.md) e [`PRODUCT.md`](PRODUCT.md).

## Variabili d'ambiente

Elenco completo e commentato in [`.env.example`](.env.example).

- **Build**: `PUBLIC_SITE_URL`, `PUBLIC_NOINDEX=true` (solo staging), `PUBLIC_WHATSAPP_NUMBER`.
- **Runtime, solo con `leadForm` acceso**: `SMTP_*`, `MAIL_TO`, `MAIL_FROM`, `TURNSTILE_SECRET`.
- **Produzione**: `TRUSTED_PROXY=cloudflare`, altrimenti tutti i visitatori finiscono nello stesso limite di richieste.

Le credenziali vanno solo nelle variabili di Coolify, mai nel repo.

## Deploy (Coolify)

Il `Dockerfile` nella root fa build e immagine di produzione (solo dipendenze prod, utente `node`, healthcheck integrato).

```sh
docker build -t besa-agency-site .
docker run --rm -p 4321:4321 besa-agency-site   # http://localhost:4321/healthz -> ok
```

Su Coolify: Build Pack **Dockerfile**, Base Directory `/`, Dockerfile Location `/Dockerfile`, porta `4321`, healthcheck `GET /healthz`. Passaggi completi (staging, DNS, rollback) in [`DEPLOY.md`](DEPLOY.md).

## Regole

- Niente cookie, embed di terze parti o font da CDN. Analytics solo Umami self-hosted.
- Mai inventare prezzi, testimonianze, numeri o dati legali: se manca un dato si lascia vuoto e si chiede.
- Testi in italiano, registro "tu", niente lineette lunghe.
- Commit convenzionali (`feat: …`, `fix: …`).
