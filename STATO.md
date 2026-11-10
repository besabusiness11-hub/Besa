# Stato del sito besaweb.com

Aggiornato il 10 novembre 2026. La situazione sempre aggiornata è nel **pannello** (besaweb.com/admin) oppure, dalla cartella del sito, con `pnpm features`.

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

I prezzi delle modalità `launch` e `full` si cambiano dal pannello, pagina «Offerta e prezzi».

## Come cambiare lo stato del sito: il pannello

Tutto si cambia dal **pannello**: **besaweb.com/admin**.

1. Apri il pannello e premi «Log in with GitHub». Entra con l'account GitHub che ha accesso alla repo del sito: gli altri account vedono il pannello ma non possono salvare.
2. A sinistra trovi quattro pagine:
   - **Modalità e funzioni**: la modalità dell'offerta (validazione, lancio, completa) e gli interruttori del modulo dinamico, del pagamento online e del pulsante WhatsApp. Sotto ogni interruttore c'è scritto perché è spento e cosa serve prima di accenderlo.
   - **Sezioni della home**: accendi o spegni le sezioni della pagina (calcolatore, come funziona, offerta, chi siamo, FAQ…). Una sezione spenta sparisce anche dal menu delle sezioni e dal footer. L'apertura e la sezione contatti restano sempre accese.
   - **Offerta e prezzi**: i prezzi e i link di pagamento (per esempio Stripe) di ogni piano.
   - **Contatti e dati aziendali**: numero WhatsApp, ragione sociale, partita IVA e sede (compaiono nel footer). Lascia vuoto quello che non esiste ancora.
3. Premi **Save**. È la pubblicazione: il sito si aggiorna da solo in pochi minuti.
4. Per tornare al sito c'è il pulsante «Torna al sito» in basso.

**Vuoi vedere il risultato prima di pubblicare?** Dalla cartella del sito lancia `pnpm admin`: si apre lo stesso pannello in locale (http://127.0.0.1:4321/admin) e il sito nell'altra scheda (http://127.0.0.1:4321) cambia mentre salvi, senza pubblicare niente. Quando va bene, fai commit e push.

**Se qualcosa non va, il sito non si rompe.** Prima di ogni pubblicazione partono i controlli automatici (per esempio: nessun prezzo visibile in validazione). Se un salvataggio non li passa, la pubblicazione si ferma e online resta la versione precedente.

**Prima di accendere qualcosa, fai la sua checklist.** Se riaccendi il modulo senza aver configurato l'invio delle email, le richieste dei visitatori non arrivano.

### Le checklist in breve

- **Modulo dinamico (`leadForm`)**
  - SMTP Brevo (`SMTP_USER`, `SMTP_PASS`) e `TURNSTILE_SECRET` impostati su Coolify.
  - DKIM, SPF e DMARC su besaweb.com.
  - Backup dei contatti, con notifica a Leo.
  - Un invio di prova dal sito pubblicato.
  - Le pagine privacy e cookie si aggiornano da sole quando accendi il modulo: fai comunque rileggere i testi.
- **Pagamento online (`onlinePayment`)**
  - Un link di pagamento (per esempio Stripe) nel pannello, «Offerta e prezzi».
  - P.IVA attiva.
  - Termini approvati dal commercialista.
- **Pulsante WhatsApp (`whatsappButton`)**
  - Inserisci il numero nel pannello, «Contatti e dati aziendali» (formato `393331234567`), poi accendi l'interruttore.
  - Se accendi il pulsante senza numero, il pulsante non compare e la build stampa un avviso.

## Cosa cambia in automatico con la modalità `validation`

- Nessun importo e nessuna parola "gratis" nel sito.
- La voce di menu "Piani" diventa "Offerta".
- La pagina `/termini` diventa un breve segnaposto, senza link nel footer e fuori dalla sitemap.
- Dal calcolatore sparisce la riga "La tua pagina costa…".

## Prima di andare online

- Attiva il pannello: crea la GitHub App e metti le sue chiavi su Coolify (istruzioni passo passo in `DEPLOY.md`, sezione 4). Finché non lo fai, il pannello online mostra il login ma non funziona; in locale (`pnpm admin`) funziona già.

- Prova il flusso email su un iPhone e su un Android: il messaggio deve aprirsi con destinatario, oggetto e testo giusti.
- Prova anche il popup e i tre pulsanti "Copia".
- Prova su un computer senza programma di posta: il popup deve restare raggiungibile.
- Controlla su Umami che arrivino gli eventi `mail_open` e `mail_copy`.
- Fai rileggere il nuovo testo della privacy.
- Crea in Zoho un filtro per le email con oggetto "Richiesta bozza BESA".

Per tutti i dettagli: `docs/specs/agency-site-fase-validazione.md` (decisioni) e `DEPLOY.md` (messa online).
