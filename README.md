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
| `pnpm admin` | Dev server con il pannello in locale: http://127.0.0.1:4321/keystatic |

## Interruttori e pannello

Cosa è acceso, le sezioni della home, i prezzi, i link di pagamento, il numero WhatsApp e i dati aziendali stanno in `src/data/site/*.json` e si cambiano dal **pannello** `/keystatic` (Keystatic): login con GitHub, ogni «Save» è un commit su `main` e Coolify ripubblica. In locale `pnpm admin` apre lo stesso pannello che scrive i file su disco, per vedere le modifiche prima di pubblicarle. Configurazione: [`DEPLOY.md`](DEPLOY.md), sezione 4.

- Modalità offerta: `validation` (senza prezzi, attiva ora), `launch`, `full`.
- `leadForm`: modulo dinamico al posto dell'email.
- `onlinePayment`: link di pagamento nell'offerta.
- `whatsappButton`: pulsante chat (serve anche il numero, nel pannello).
- Sezioni della home: ognuna si accende e spegne; apertura e contatti restano sempre.

Spiegazioni e checklist di ogni interruttore (`whyOff`, `reEnable`) restano in [`src/lib/features.ts`](src/lib/features.ts), verificate dai test, e compaiono nel pannello sotto ogni interruttore.

## Struttura

```
src/
  components/   sezioni della pagina (Hero, Problem, HowItWorks, Offer, Faq, …)
  layouts/      Base.astro
  data/site/    stato modificabile dal pannello: switches, sections, offer, contacts (JSON)
  admin/        il pannello Keystatic come componente React
  lib/          copy.ts (tutti i testi), features.ts, offer.ts, sections.ts, contacts.ts, lead.ts, mail-draft.ts, jsonld.ts + test
  pages/        index, grazie, privacy-policy, cookie-policy, termini, 404, api/lead, healthz, sitemap, robots, keystatic, api/keystatic
  styles/       global.css (token di design)
  middleware.ts CSP per le route dinamiche
keystatic.config.ts  schema del pannello
server.mjs      entry di produzione: header di sicurezza, compressione, cache, X-Robots-Tag
scripts/        immagine OG, favicon, controllo del flusso email, stampa interruttori
docs/specs/     specifica della fase di validazione
```

Tutti i testi italiani stanno in `src/lib/copy.ts`. Regole di design e di brand in [`DESIGN.md`](DESIGN.md) e [`PRODUCT.md`](PRODUCT.md).

## Variabili d'ambiente

Elenco completo e commentato in [`.env.example`](.env.example).

- **Build**: `PUBLIC_SITE_URL`, `PUBLIC_NOINDEX=true` (solo staging), `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
- **Runtime, pannello**: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`.
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
