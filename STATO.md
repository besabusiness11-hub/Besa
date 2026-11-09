# Stato del sito besaweb.com

Aggiornato il 3 novembre 2026. Per la situazione sempre aggiornata lancia `pnpm features` dentro `apps/agency-site`: legge direttamente il file degli interruttori.

## In breve

Il sito è in **fase di validazione**:

- **Non ci sono prezzi.** La sezione "Offerta" dice che stiamo partendo su invito e che l'offerta la spieghiamo a voce.
- **I contatti arrivano per email** a info@besaweb.com. Il visitatore incolla il link del suo annuncio, preme "Ottieni la bozza" e si apre la sua app di posta con il messaggio già scritto. Se la posta non si apre, può copiare il messaggio da un popup.
- **Il modulo dinamico è spento**, ma il suo codice è ancora nel sito, pronto da riaccendere.

## Cosa è acceso e cosa è spento

| Cosa | Stato | Perché |
|---|---|---|
| Modalità offerta | **validation** (senza prezzi) | Stiamo validando l'idea con i primi clienti |
| Modulo dinamico (anteprima, ricevuta, invio dal sito) | **Spento** | Per ora bastano le email, senza nessun servizio da configurare |
| Pagamento online | **Spento** | Non c'è ancora un link di pagamento né la P.IVA |
| Pulsante WhatsApp | **Spento** | Il numero non è ancora deciso |
| Promessa "3 consigli sul tuo annuncio" | Sempre accesa | Non è un interruttore |

## Le tre modalità dell'offerta

| Modalità | Cosa vede il visitatore |
|---|---|
| `validation` | Nessun prezzo, offerta "su invito". **È quella attiva ora.** |
| `launch` | Una landing page a 390 € |
| `full` | Tre piani (Abbonamento, Una tantum, Su misura) e il cursore per il preventivo |

I prezzi delle modalità `launch` e `full` sono in `src/lib/offer.ts`.

## Come cambiare lo stato del sito

Tutto si decide in **un solo file**: `apps/agency-site/src/lib/features.ts`.

1. Apri il file.
2. Fai la modifica che ti serve:
   - **Per cambiare modalità**, modifica la riga `export const OFFER_MODE: OfferMode = "validation";` e scrivi `"launch"` o `"full"` al posto di `"validation"`.
   - **Per accendere o spegnere una funzione**, trova il suo blocco (`leadForm`, `onlinePayment` o `whatsappButton`) e cambia `enabled: false` in `enabled: true`, o viceversa.
3. Salva, fai commit e push. Coolify ripubblica il sito in pochi minuti.

Puoi controllare il risultato in locale prima di pubblicare con `pnpm dev`, poi apri http://127.0.0.1:4321.

**Prima di accendere qualcosa, fai la sua checklist.** Ogni funzione spenta ha nel file una lista `reEnable` con quello che serve prima di riaccenderla, e `pnpm features` la stampa. Se riaccendi il modulo senza aver configurato l'invio delle email, le richieste dei visitatori non arrivano.

### Le checklist in breve

- **Modulo dinamico (`leadForm`)**
  - SMTP Brevo (`SMTP_USER`, `SMTP_PASS`) e `TURNSTILE_SECRET` impostati su Coolify.
  - DKIM, SPF e DMARC su besaweb.com.
  - Backup dei contatti, con notifica a Leo.
  - Un invio di prova dal sito pubblicato.
  - Le pagine privacy e cookie si aggiornano da sole quando accendi il modulo: fai comunque rileggere i testi.
- **Pagamento online (`onlinePayment`)**
  - Un link di pagamento (per esempio Stripe) in `src/lib/copy.ts`, nel campo `checkout` dei piani.
  - P.IVA attiva.
  - Termini approvati dal commercialista.
- **Pulsante WhatsApp (`whatsappButton`)**
  - Imposta la variabile `PUBLIC_WHATSAPP_NUMBER` su Coolify (formato `393331234567`) e porta `enabled` a `true`.
  - Se accendi il pulsante senza numero, il pulsante non compare e la build stampa un avviso.

## Cosa cambia in automatico con la modalità `validation`

- Nessun importo e nessuna parola "gratis" nel sito.
- La voce di menu "Piani" diventa "Offerta".
- La pagina `/termini` diventa un breve segnaposto, senza link nel footer e fuori dalla sitemap.
- Dal calcolatore sparisce la riga "La tua pagina costa…".

## Prima di andare online

- Prova il flusso email su un iPhone e su un Android: il messaggio deve aprirsi con destinatario, oggetto e testo giusti.
- Prova anche il popup e i tre pulsanti "Copia".
- Prova su un computer senza programma di posta: il popup deve restare raggiungibile.
- Controlla su Umami che arrivino gli eventi `mail_open` e `mail_copy`.
- Fai rileggere il nuovo testo della privacy.
- Crea in Zoho un filtro per le email con oggetto "Richiesta bozza BESA".

Per tutti i dettagli: `docs/specs/agency-site-fase-validazione.md` (decisioni) e `DEPLOY.md` (messa online).
