# Deploy su Coolify

Servizio: sito agenzia (Astro 7 + `@astrojs/node` standalone). Repo autonoma (non più nel monorepo `besa-platform`): `docker build -t besa-agency-site .` dalla root, testabile in locale con `docker run -p 4321:4321 besa-agency-site`. Pagine prerenderizzate, dinamici solo `/api/lead`, `/healthz` e il pannello (`/admin`, `/api/keystatic/*`).

**Interruttori**: cosa è acceso (modalità offerta, modulo dinamico, pagamento online, pulsante WhatsApp, sezioni della home) più prezzi, link di pagamento, numero WhatsApp e dati aziendali stanno in `src/data/site/*.json`, non in variabili d'ambiente. Si cambiano dal pannello `/admin` (ogni salvataggio è un commit su `main`, Coolify ripubblica) o a mano con commit e push. `pnpm features` stampa cosa è spento, perché e la checklist per riaccenderlo. Il Dockerfile esegue `pnpm test` prima della build: un salvataggio che rompe le regole (prezzi in validazione, `[TODO]`, valori non validi) fa fallire il deploy e Coolify tiene online la versione precedente.

**Fase di validazione (ora)**: `leadForm` spento. I contatti arrivano per email a info@besaweb.com dall'app di posta del visitatore; `/api/lead` risponde 404 e la CSP non include Turnstile. Le variabili SMTP e Turnstile qui sotto servono **solo con `leadForm` acceso**.

## 1. Staging su new.besaweb.com

1. DNS: record `A` `new.besaweb.com` -> IP del VPS (se Cloudflare: proxy attivo, SSL "Full (strict)").
2. Coolify -> Project -> **+ New Resource** -> **Private Repository (GitHub App o Deploy Key)** -> repo `besabusiness11-hub/Besa`, branch `main`.
3. Build Pack: **Dockerfile**.
   - Base Directory: `/` (root della repo)
   - Dockerfile Location: `/Dockerfile`
   - Ports Exposes: `4321`
4. Domains: `https://new.besaweb.com`
5. Environment Variables (vedi `.env.example`):
   - Build-time (spunta "Build Variable"): `PUBLIC_SITE_URL=https://new.besaweb.com` (per produzione `https://besaweb.com`)
   - Runtime, **solo con `leadForm` acceso**: `TURNSTILE_SECRET`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` (default `info@besaweb.com`), `MAIL_FROM`
   - Pulsante WhatsApp: numero e interruttore si impostano dal pannello (`PUBLIC_WHATSAPP_NUMBER` resta solo come riserva). Con l'interruttore acceso e il numero mancante la build avvisa e il pulsante non compare.
   - Pannello admin: vedi la sezione 4.
   - `NODE_ENV`, `HOST`, `PORT` sono gia' impostate dal Dockerfile.
   - **Staging non indicizzabile**: `PUBLIC_NOINDEX=true` (spunta sia "Build Variable" sia runtime). Effetti: `<meta name="robots" content="noindex, nofollow">` in ogni pagina, header `X-Robots-Tag: noindex, nofollow` su ogni risposta, `robots.txt` con `Disallow: /`, `sitemap.xml` vuota. In produzione lascia la variabile non impostata (o `false`).
6. Health Check (tab Healthcheck): abilita, Method `GET`, Path `/healthz`, Port `4321`, Return Code `200`. (Il Dockerfile ha anche un `HEALTHCHECK` nativo.)
7. **Deploy**. Verifica:
   ```sh
   curl -sI https://new.besaweb.com/ | grep -iE 'content-security|x-frame|nosniff'
   curl -s https://new.besaweb.com/healthz        # ok
   curl -sI https://new.besaweb.com/ | grep -i x-robots-tag   # noindex, nofollow (staging)
   curl -s https://new.besaweb.com/robots.txt                 # Disallow: /
   ```
8. Con `leadForm` spento (validazione):
   - `curl -s -o /dev/null -w '%{http_code}' -X POST -H 'Origin: https://new.besaweb.com' https://new.besaweb.com/api/lead` risponde `404`.
   - Prova su due telefoni (iPhone e Android): incolla un link, premi «Ottieni la bozza», controlla che la posta si apra con destinatario, oggetto e testo giusti; poi «Non si è aperta? Copia il messaggio» e i tre pulsanti Copia.
   - Desktop senza programma di posta (webmail): non si apre nulla, il popup «Il tuo messaggio» dev'essere subito raggiungibile.
   - Umami: controlla che arrivino `mail_open` (con `where`), `mail_card_open`, `mail_copy` (con `field`).
   - Controllo automatico in locale: `pnpm build && HOST=127.0.0.1 PORT=4321 node server.mjs`, poi `node scripts/check-mail-flow.mjs`.
9. Con `leadForm` acceso: test form end-to-end, invia una richiesta da new.besaweb.com e controlla che arrivi la mail a `MAIL_TO`. In produzione senza SMTP o con Turnstile non valido l'API risponde errore (mai falso successo). Turnstile: nel dashboard Cloudflare aggiungi `new.besaweb.com` (e `besaweb.com`) agli hostname del widget.

## 2. Passaggio DNS a produzione (besaweb.com)

1. Imposta `PUBLIC_SITE_URL=https://besaweb.com` (build variable) e fai redeploy; oppure crea una seconda applicazione dalla branch di produzione.
2. In Coolify aggiungi il dominio `https://besaweb.com` (e `https://www.besaweb.com` con redirect) all'app.
3. DNS: abbassa il TTL a 300s con 24h di anticipo; poi punta `besaweb.com` e `www` all'IP del VPS (proxy Cloudflare attivo).
4. Verifica `curl -sI https://besaweb.com/healthz`, invio (email o form, secondo `leadForm`), e analytics Umami.
5. Prima dello spostamento: redirect 301 delle vecchie pagine del sito attuale (es. `/esempi`) verso la home o la pagina più vicina.
6. Rimuovi `new.besaweb.com` quando non serve piu' (o lascialo con `PUBLIC_NOINDEX=true`).

## 3. Rollback

- Coolify -> app -> **Deployments** -> scegli l'ultimo deploy funzionante -> **Redeploy / Rollback**.
- Se il problema e' solo DNS: ripunta `besaweb.com` al valore precedente (TTL basso ne accelera la propagazione).
- Il sito vecchio resta intatto finche' non cambi il DNS: tienilo attivo almeno 48h dopo lo switch.

## 4. Pannello admin (/admin)

Keystatic in modalità GitHub: chi entra fa login con GitHub e ogni «Save» è un commit su `besabusiness11-hub/Besa`. Possono salvare **solo gli account GitHub con permesso di scrittura sulla repo**: Keystatic usa il token dell'utente, quindi GitHub stesso rifiuta chi non ha accesso. Attenzione: l'account personale di Leo oggi non ha scrittura sulla repo (per questo il push usa l'alias SSH `github.com-besa`). Per usare il pannello: entra con l'account che ha accesso, oppure aggiungi l'account personale come collaboratore (repo -> Settings -> Collaborators -> Add people; su una repo di un account utente il collaboratore ha già scrittura).

### 4.1 GitHub App (una volta)

Da loggato come `besabusiness11-hub` (è un account utente, non un'organizzazione): foto profilo -> Settings -> Developer settings -> GitHub Apps -> **New GitHub App** (link diretto: https://github.com/settings/apps/new):
- Nome: per esempio `BESA Pannello` (lo slug è la parte finale di `https://github.com/apps/<slug>`).
- Homepage URL: `https://besaweb.com`
- Callback URL (una per riga):
  - `https://besaweb.com/api/keystatic/github/oauth/callback`
  - `https://new.besaweb.com/api/keystatic/github/oauth/callback` (staging)
  - `http://127.0.0.1:4321/api/keystatic/github/oauth/callback` (per provare la modalità GitHub in locale)
- «Expire user authorization tokens»: **attivo** (Keystatic usa il refresh token).
- «Request user authorization (OAuth) during installation»: spento. Webhook: **disattivato** (non serve).
- Repository permissions: **Contents: Read and write**, **Pull requests: Read-only** (il pannello mostra se un branch ha già una pull request; la crea GitHub), Metadata: Read-only (automatico).
- Where can this GitHub App be installed: **Only on this account**.
- Crea l'app, poi **Generate a new client secret** e annota Client ID e secret.
- Pagina dell'app -> **Install App** -> account `besabusiness11-hub` -> **Only select repositories** -> `Besa` -> Install.

In alternativa Keystatic crea l'app da solo: `PUBLIC_KEYSTATIC_STORAGE=github pnpm dev`, apri `http://127.0.0.1:4321/admin` e segui la procedura (scrive le chiavi in `.env`). Controlla poi che l'app appartenga a `besabusiness11-hub`, abbia le callback di produzione e sia installata solo su `Besa`.

### 4.2 Variabili su Coolify

- Runtime: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` (genera con `openssl rand -hex 32`; non cambiarlo più, altrimenti tutti devono rifare il login).
- Build Variable: `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=<slug>`.
- Senza le tre variabili runtime `/api/keystatic/*` risponde `503` con il nome delle variabili mancanti; il resto del sito funziona.
- **Auto deploy** attivo sul branch `main` (con sorgente GitHub App è automatico; con Deploy Key serve il webhook di Coolify su GitHub). Senza, i salvataggi finiscono su GitHub ma il sito non si aggiorna.

### 4.3 Verifica

```sh
curl -sI https://besaweb.com/admin | grep -iE 'x-robots|cache-control|content-security'   # noindex, no-store, CSP con api.github.com
curl -s -o /dev/null -w '%{http_code}\n' https://besaweb.com/api/keystatic/github/login        # 3xx (redirect a GitHub); 503 = variabili mancanti
```
Poi entra, cambia una cosa innocua (per esempio la data «Spento dal»), Save: su GitHub compare il commit su `main`, Coolify parte da solo.

### 4.4 Anteprima prima di pubblicare

- **In locale (subito, nessuna configurazione)**: `pnpm admin`, poi `http://127.0.0.1:4321/admin` in una scheda e `http://127.0.0.1:4321` nell'altra. In locale il pannello scrive i file sul disco e il sito si ricarica da solo. Quando va bene: commit e push a mano.
- **Online, con un branch (facoltativo)**: nel pannello, menu del branch in alto a sinistra -> crea un branch (prefisso `admin/`), salva lì, poi «Create pull request». Con le **Preview Deployments** di Coolify attive (app collegata via GitHub App: Configuration -> Preview Deployments, URL tipo `{{pr_id}}.new.besaweb.com`, con `PUBLIC_NOINDEX=true` tra le variabili delle preview) ogni pull request ha il suo indirizzo di anteprima. Merge della pull request su GitHub = pubblicazione. Le modifiche si fanno sempre dal pannello di besaweb.com (sul branch); l'indirizzo di anteprima serve solo a guardare il sito, quindi non va aggiunto alle callback della GitHub App.
- Il login funziona dietro Coolify/Cloudflare perché `astro.config.mjs` (`security.allowedDomains`) si fida di `X-Forwarded-Host`/`X-Forwarded-Proto` solo per `besaweb.com` e i suoi sottodomini in https: così il pannello costruisce la callback `https://besaweb.com/...`. Se cambi dominio, aggiorna quella lista e le callback della GitHub App.

## Note operative

- Rate limit del form: in memoria, 5 richieste / 10 minuti per IP. Si azzera a ogni restart (singola istanza).
- IP client: usa `cf-connecting-ip` / `x-forwarded-for`; mantieni l'app dietro il proxy di Coolify/Cloudflare.
- Header di sicurezza (CSP, nosniff, ecc.) sono applicati da `server.mjs` a tutte le risposte (anche ai file statici, che il node adapter serve prima del middleware Astro) e da `src/middleware.ts` alle route dinamiche, dove la CSP del middleware sostituisce quella di `server.mjs`. Tieni i due elenchi allineati. Il pannello (`/admin`, `/api/keystatic`) ha una CSP più larga (GitHub API, avatar, worker) solo nel middleware, più `no-store` e `noindex`.
- Se aggiungi script/origini esterne, aggiorna la CSP in entrambi i file. Le origini Turnstile ci sono solo con `leadForm` acceso: `server.mjs` legge `src/lib/features.ts` direttamente (Node 24 rimuove i tipi; il Dockerfile copia il file e `src/data/site/switches.json` accanto a `server.mjs`).

## Rate limiting and proxies

`TRUSTED_PROXY` decides which IP header the lead rate limiter trusts. Unset uses the socket address (behind Coolify/Traefik that is the proxy, so all visitors look alike). Set `cloudflare` only if the origin accepts traffic solely from Cloudflare; set `xff-last` if exactly one trusted proxy appends to X-Forwarded-For. Never trust these headers when the origin is directly reachable.

## SEO: checklist al go-live

- Produzione: `PUBLIC_SITE_URL=https://besaweb.com` e `PUBLIC_NOINDEX` NON impostata (canonical, og:url, sitemap e JSON-LD derivano da `PUBLIC_SITE_URL`; sono baked a build time, quindi rifai la build quando cambi dominio/flag).
- Verifica: `curl -s https://besaweb.com/robots.txt` mostra `Allow: /` e la riga `Sitemap:`; nessun `X-Robots-Tag` su `/`.
- Nota: con `Disallow: /` Google non rilegge il noindex; se new.besaweb.com e' gia' stato indicizzato, rimuovilo da Search Console (Rimozioni) o, temporaneamente, togli il Disallow lasciando noindex finche' non sparisce.
