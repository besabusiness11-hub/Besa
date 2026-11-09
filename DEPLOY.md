# Deploy su Coolify

Servizio: sito agenzia (Astro 7 + `@astrojs/node` standalone). Pagine prerenderizzate, dinamici solo `/api/lead` e `/healthz`.

**Interruttori**: cosa è acceso (modulo dinamico, modalità offerta, pagamento online, pulsante WhatsApp) si decide in `src/lib/features.ts`, non con variabili d'ambiente. Si cambia il file, si fa commit e Coolify ripubblica. `pnpm features` stampa cosa è spento, perché e la checklist per riaccenderlo.

**Fase di validazione (ora)**: `leadForm` spento. I contatti arrivano per email a info@besaweb.com dall'app di posta del visitatore; `/api/lead` risponde 404 e la CSP non include Turnstile. Le variabili SMTP e Turnstile qui sotto servono **solo con `leadForm` acceso**.

## 1. Staging su new.besaweb.com

1. DNS: record `A` `new.besaweb.com` -> IP del VPS (se Cloudflare: proxy attivo, SSL "Full (strict)").
2. Coolify -> Project -> **+ New Resource** -> **Public/Private Repository** (GitHub) -> repo `besa-platform`, branch `feat/besa-2-0-site`.
3. Build Pack: **Dockerfile**.
   - Base Directory: `/` (la build context deve essere la root del monorepo)
   - Dockerfile Location: `/apps/agency-site/Dockerfile`
   - Ports Exposes: `4321`
4. Domains: `https://new.besaweb.com`
5. Environment Variables (vedi `.env.example`):
   - Build-time (spunta "Build Variable"): `PUBLIC_SITE_URL=https://new.besaweb.com` (per produzione `https://besaweb.com`)
   - Runtime, **solo con `leadForm` acceso**: `TURNSTILE_SECRET`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` (default `info@besaweb.com`), `MAIL_FROM`
   - Pulsante WhatsApp: `PUBLIC_WHATSAPP_NUMBER` (build) **e** `whatsappButton.enabled` in `features.ts`. Con l'interruttore acceso e il numero mancante la build avvisa e il pulsante non compare.
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

## Note operative

- Rate limit del form: in memoria, 5 richieste / 10 minuti per IP. Si azzera a ogni restart (singola istanza).
- IP client: usa `cf-connecting-ip` / `x-forwarded-for`; mantieni l'app dietro il proxy di Coolify/Cloudflare.
- Header di sicurezza (CSP, nosniff, ecc.) sono applicati da `server.mjs` a tutte le risposte (anche ai file statici, che il node adapter serve prima del middleware Astro) e da `src/middleware.ts` alle route dinamiche. Tieni i due elenchi allineati.
- Se aggiungi script/origini esterne, aggiorna la CSP in entrambi i file. Le origini Turnstile ci sono solo con `leadForm` acceso: `server.mjs` legge `src/lib/features.ts` direttamente (Node 24 rimuove i tipi; il Dockerfile copia il file accanto a `server.mjs`).

## Rate limiting and proxies

`TRUSTED_PROXY` decides which IP header the lead rate limiter trusts. Unset uses the socket address (behind Coolify/Traefik that is the proxy, so all visitors look alike). Set `cloudflare` only if the origin accepts traffic solely from Cloudflare; set `xff-last` if exactly one trusted proxy appends to X-Forwarded-For. Never trust these headers when the origin is directly reachable.

## SEO: checklist al go-live

- Produzione: `PUBLIC_SITE_URL=https://besaweb.com` e `PUBLIC_NOINDEX` NON impostata (canonical, og:url, sitemap e JSON-LD derivano da `PUBLIC_SITE_URL`; sono baked a build time, quindi rifai la build quando cambi dominio/flag).
- Verifica: `curl -s https://besaweb.com/robots.txt` mostra `Allow: /` e la riga `Sitemap:`; nessun `X-Robots-Tag` su `/`.
- Nota: con `Disallow: /` Google non rilegge il noindex; se new.besaweb.com e' gia' stato indicizzato, rimuovilo da Search Console (Rimozioni) o, temporaneamente, togli il Disallow lasciando noindex finche' non sparisce.
