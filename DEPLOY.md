# Deploy su Coolify

Servizio: sito agenzia (Astro 7 + `@astrojs/node` standalone). Pagine prerenderizzate, dinamici solo `/api/lead` e `/healthz`.

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
   - Runtime: `TURNSTILE_SECRET`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` (default `info@besaweb.com`), `MAIL_FROM`
   - `NODE_ENV`, `HOST`, `PORT` sono gia' impostate dal Dockerfile.
6. Health Check (tab Healthcheck): abilita, Method `GET`, Path `/healthz`, Port `4321`, Return Code `200`. (Il Dockerfile ha anche un `HEALTHCHECK` nativo.)
7. **Deploy**. Verifica:
   ```sh
   curl -sI https://new.besaweb.com/ | grep -iE 'content-security|x-frame|nosniff'
   curl -s https://new.besaweb.com/healthz        # ok
   ```
8. Test form end-to-end: invia una richiesta da new.besaweb.com e controlla che arrivi la mail a `MAIL_TO`. In produzione senza SMTP o con Turnstile non valido l'API risponde errore (mai falso successo).
9. Turnstile: nel dashboard Cloudflare aggiungi `new.besaweb.com` (e `besaweb.com`) agli hostname del widget.

## 2. Passaggio DNS a produzione (besaweb.com)

1. Imposta `PUBLIC_SITE_URL=https://besaweb.com` (build variable) e fai redeploy; oppure crea una seconda applicazione dalla branch di produzione.
2. In Coolify aggiungi il dominio `https://besaweb.com` (e `https://www.besaweb.com` con redirect) all'app.
3. DNS: abbassa il TTL a 300s con 24h di anticipo; poi punta `besaweb.com` e `www` all'IP del VPS (proxy Cloudflare attivo).
4. Verifica `curl -sI https://besaweb.com/healthz`, form, e analytics Umami.
5. Rimuovi `new.besaweb.com` quando non serve piu' (o lascialo con `noindex`).

## 3. Rollback

- Coolify -> app -> **Deployments** -> scegli l'ultimo deploy funzionante -> **Redeploy / Rollback**.
- Se il problema e' solo DNS: ripunta `besaweb.com` al valore precedente (TTL basso ne accelera la propagazione).
- Il sito vecchio resta intatto finche' non cambi il DNS: tienilo attivo almeno 48h dopo lo switch.

## Note operative

- Rate limit del form: in memoria, 5 richieste / 10 minuti per IP. Si azzera a ogni restart (singola istanza).
- IP client: usa `cf-connecting-ip` / `x-forwarded-for`; mantieni l'app dietro il proxy di Coolify/Cloudflare.
- Header di sicurezza (CSP, nosniff, ecc.) sono applicati da `server.mjs` a tutte le risposte (anche ai file statici, che il node adapter serve prima del middleware Astro) e da `src/middleware.ts` alle route dinamiche. Tieni i due elenchi allineati.
- Se aggiungi script/origini esterne, aggiorna la CSP in entrambi i file.

## Rate limiting and proxies

`TRUSTED_PROXY` decides which IP header the lead rate limiter trusts. Unset uses the socket address (behind Coolify/Traefik that is the proxy, so all visitors look alike). Set `cloudflare` only if the origin accepts traffic solely from Cloudflare; set `xff-last` if exactly one trusted proxy appends to X-Forwarded-For. Never trust these headers when the origin is directly reachable.
