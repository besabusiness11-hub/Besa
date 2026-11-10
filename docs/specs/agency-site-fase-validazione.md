# Spec: sito agenzia in fase di validazione

> **Aggiornamento 2026-11-10**: la decisione «niente pannello online» è superata. Lo stato degli interruttori (più sezioni, prezzi, link di pagamento, numero WhatsApp e dati aziendali) sta in `src/data/site/*.json` e si modifica dal pannello Keystatic `/admin`; `features.ts` tiene solo spiegazioni e checklist. Vedi `DEPLOY.md` sezione 4 e `CLAUDE.md`. Il resto della spec resta valido.
>
> **Aggiornamento 2026-11-10 (prezzo)**: per decisione del titolare la validazione mostra un solo importo, €49 per creare e mettere online la pagina (`SETUP_PRICE` in `src/lib/copy.ts`). I costi di gestione si propongono per iscritto solo dopo il primo mese e solo se la pagina ha portato più contatti del mese prima, senza cifre sul sito. Le righe sotto che vietano ogni importo valgono per tutto il resto (niente «gratis», niente listino).

Stato: da sviluppare. Scritta il 2026-11-02 dopo le domande a Leo. Ramo di partenza: `feat/besa-2-0-site` (commit `7dd0622`).
Cartella di lavoro: `apps/agency-site/`. Leggi prima `CLAUDE.md`, `DESIGN.md`, `PRODUCT.md`.

## 1. Obiettivo

BESA sta validando il concetto "landing page per chi fa Meta Ads" come attività principale. In questa fase:

1. Niente setup complesso: i contatti arrivano per **email a info@besaweb.com**, scritta dal visitatore con la sua app di posta.
2. Il modulo dinamico (anteprima live, ricevuta, Turnstile, invio server) **si spegne ma non si cancella**. Si riaccende quando si parte davvero.
3. Un **file unico di interruttori** dice cosa è spento, perché, e cosa fare per riaccenderlo.
4. La sezione prezzi diventa una sezione **senza prezzi** ("stiamo validando, l'offerta te la spieghiamo noi"), con aria da progetto su invito, ma seria e professionale.

Conseguenza pratica: finché `leadForm` è spento **non servono** SMTP/Brevo, Turnstile, DKIM, backup dei contatti. Quei punti dell'audit del 2026-11-02 non bloccano il go-live. Restano da fare: deploy, DNS, test della mail (sezione 9).

## 2. Decisioni prese (risposte di Leo)

| Tema | Decisione |
|---|---|
| Forma del gestionale | Un solo file di interruttori nel codice (`src/lib/features.ts`). Niente pannello online, niente database. |
| Quando agisce | Si cambia il file e si ripubblica (pochi minuti su Coolify). Storia in git. |
| Invio con modulo spento | Il visitatore incolla il link, preme il pulsante e **si apre la sua app di posta** con destinatario, oggetto e testo già scritti. |
| Fallback | Tornando al sito compare l'opzione di aprire un **popup in stile email** (come l'editor di messaggi di ChatGPT) con **A**, **Oggetto** e **Messaggio**, ognuno col suo pulsante **Copia**. |
| Dove vale | Stesso campo + pulsante in tutti i punti d'invio (alto, 3 passi, dopo il calcolatore). La sezione finale "Contatto" diventa una scheda ridotta. |
| Contenuto della mail | Link o @profilo + numeri del calcolatore + piano scelto, solo se presenti. |
| Interruttori da registrare | Modulo dinamico, modalità offerta, pulsante WhatsApp, pagamento online. La promessa "3 consigli sul tuo annuncio" resta sempre accesa. |
| Prezzi in questa fase | La sezione prezzi diventa una sezione semi vuota, senza prezzi espliciti: se ne discute e l'offerta viene spiegata dopo. Il modello "paghi solo se porta risultati" **non** va sul sito (è ancora in valutazione). |
| Segnale di fase iniziale | Lasciato a me da Leo. Scelta: sezione offerta "su invito" + una riga onesta nel "Chi siamo", niente numeri inventati (sezione 6.4). |

## 3. Decisioni aperte (default già scelti, Leo conferma o cambia)

1. **"Gratis" nel copy di validazione.** Leo sta valutando bozza gratis o a circa 10 €. Default: il copy dice "senza impegno" e **non** dice "gratis" né indica cifre.
2. **Pagina `/termini` in modalità validazione.** Contiene prezzi (79, 19, 99, 899, 749, 449). Default: testo breve "Le condizioni definitive arriveranno con l'offerta", pagina fuori dalla sitemap e senza link nel footer. Il testo completo resta nel codice per le altre modalità.
3. **Testo della sezione offerta di validazione** (6.2): due varianti proposte, scegliere.
4. **Etichetta del pulsante** nel campo link: bozza "Prepara l'email".
5. **Filtro in Zoho** per le mail con oggetto "Richiesta bozza BESA" (operativo, fuori dal codice).
6. **Quando riaccendere il modulo.** Proposta: appena le richieste per email superano la quantità che gestisci a mano, o quando servono promemoria e risposte automatiche. Leo fissa la soglia.
7. **Modello a risultati** (bozza gratis o 10 €, poi paghi solo per i risultati in più). Da definire prima di scriverlo: come si misura "in più" (situazione di partenza), soglia, prezzo o percentuale, durata, chi tiene i dati. Fuori scope qui; in sezione 8 resta come interruttore previsto.

## 4. Registro degli interruttori: `src/lib/features.ts`

File di soli dati, senza import, così lo leggono sia Astro sia Node (`node scripts/features.ts`).

```ts
export type OfferMode = "validation" | "launch" | "full";

export interface Feature {
  label: string;
  enabled: boolean;
  /** Obbligatorio se enabled = false. */
  whyOff?: string;
  /** Obbligatorio se enabled = false: cosa serve prima di riaccenderlo. */
  reEnable?: string[];
  /** File che l'interruttore tocca (promemoria per chi sviluppa). */
  touches: string[];
  /** Data di spegnimento, ISO. */
  offSince?: string;
}

export const OFFER_MODE: OfferMode = "validation";
export const FEATURES = { /* sotto */ } satisfies Record<string, Feature>;
```

### Elenco iniziale

| Chiave | Stato | Perché spento | Per riaccenderlo |
|---|---|---|---|
| `leadForm` | **off** dal 2026-11-02 | Fase di validazione: i contatti arrivano per email, nessun setup. | SMTP Brevo (`SMTP_USER`, `SMTP_PASS`), `TURNSTILE_SECRET`, hostname nel widget Turnstile, DKIM Brevo + SPF + DMARC su besaweb.com, backup dei contatti (file, Airtable o webhook) con notifica a Leo, test invio end-to-end, aggiornare privacy e cookie policy. |
| `onlinePayment` | **off** | Nessun link di pagamento. | Stripe Payment Link (o simile) in `offer.plans[].checkout`, P.IVA attiva, termini approvati dal commercialista. |
| `whatsappButton` | **off** | Numero non deciso. | Impostare `PUBLIC_WHATSAPP_NUMBER` (formato `393331234567`) e portare a `true`. |

`OFFER_MODE` non è un interruttore on/off ma uno stato a tre valori, documentato nello stesso file:

| Valore | Cosa mostra | Quando |
|---|---|---|
| `validation` | Sezione offerta senza prezzi, nessun importo in tutto il copy. **Default ora.** | Fase di validazione |
| `launch` | Una landing a 390 € (comportamento attuale `prelaunch`). | Quando i prezzi sono decisi |
| `full` | Abbonamento, Una tantum, Su misura + cursore preventivo. | Offerta completa |

Regole:
- **Rimuovere** la variabile `PUBLIC_OFFER_MODE` da `offer.ts` e `.env.example`: una sola fonte, così "cosa è acceso" si legge in un posto. `PUBLIC_WHATSAPP_NUMBER` resta variabile (è un dato, non un interruttore) ma il pulsante compare solo se `whatsappButton.enabled` **e** il numero esiste; con interruttore acceso e numero mancante la build deve **avvisare**.
- `offer.ts` legge da `features.ts` (`FULL`, `OFFER_MODE`) invece che dall'ambiente.
- Ogni funzionalità spenta **deve** avere `whyOff` e `reEnable` non vuoti (test, sezione 10).
- Facoltativo, bassa priorità: `pnpm features` stampa la tabella di ciò che è spento, con motivo e checklist (`scripts/features.ts`, Node 24 con rimozione dei tipi).

## 5. Invio via email con il modulo spento (`leadForm = false`)

### 5.1 Flusso

1. Il visitatore incolla il link in uno dei campi (alto, 3 passi, dopo il calcolatore). `lib/link.ts` normalizza come oggi (link di condivisione, dominio nudo, @profilo).
2. Preme il pulsante. Il codice costruisce la bozza (5.2) e apre `mailto:info@besaweb.com?subject=…&body=…` dentro il gesto dell'utente. Si usa un click su un `<a>` creato al volo o `location.href`, **mai** `window.open` (si blocca su telefono).
3. Sotto il campo compare lo stato: "Abbiamo aperto la tua posta con il messaggio pronto" + pulsante **"Non si è aperta? Copia il messaggio"** che apre il popup (5.3).
4. Senza JavaScript: il pulsante di riserva (`.lc-fallback`) diventa un normale `mailto:` con oggetto e indirizzo, senza corpo personalizzato. Nulla di scritto va perso.

### 5.2 Costruzione del messaggio: `src/lib/mail-draft.ts` (puro, testato)

```ts
buildMailDraft({ link, calc?, plan? }): { to: string; subject: string; body: string; mailto: string }
```

- `to`: `SITE.email` (`info@besaweb.com`).
- `subject`: `copy.mail.subject`, bozza "Richiesta bozza BESA".
- `body` (da `copy.mail.body`, righe vuote omesse se il dato manca):

```
Ciao Leo e Benito,
vorrei una bozza di landing page per il mio annuncio.

Annuncio o profilo: {link}
Numeri dal calcolatore: {calc}
Piano scelto: {plan}

Grazie!
```

- `calc` è la stringa già prodotta oggi dal calcolatore (`data-summary` → evento `besa:calc`). `plan` arriva dall'evento `besa:quote` e dai pulsanti con `data-plan` di `Offer.astro`; in modalità `validation` non esiste, quindi la riga sparisce.
- `mailto`: `encodeURIComponent` su oggetto e corpo, a capo `%0D%0A`. Il link in ingresso resta limitato a 500 caratteri come oggi. Deve restare sotto circa 2000 caratteri; il test copre il caso tipico e il caso peggiore.
- Il copy vive in `copy.ts` sotto `mail` (nessun testo nel componente). Niente trattini lunghi, "tu".
- Lo stato condiviso (ultimo link, ultimi numeri del calcolatore, piano) vive in un piccolo modulo client `lib/mail-state.ts` che sostituisce l'ascolto degli eventi che oggi fa `ContactForm.astro`.

### 5.3 Popup "Il tuo messaggio": `src/components/MailCard.astro`

- Popover nativo, stessa struttura e stile di `LinkHelp`, `CalcHelp`, `Eli5`, `SpecSheet`.
- Aspetto da email: intestazione blu con titolo **"Il tuo messaggio"** e sottotitolo "Incollalo nella tua posta e invialo a info@besaweb.com".
- Tre blocchi: **A** (destinatario), **Oggetto**, **Messaggio**. Il messaggio è un `textarea` in sola lettura (si può selezionare a mano). Ogni blocco ha un pulsante **Copia**.
- Feedback: il pulsante diventa "Copiato" per circa 1,5 secondi, con annuncio `aria-live="polite"`. Se `navigator.clipboard` manca (contesto non sicuro) si ripiega su selezione + `execCommand("copy")`.
- Pulsanti alti almeno 44 px. Animazioni solo con `prefers-reduced-motion: no-preference`.
- Aperto da: stato post-click sotto il campo e scheda ridotta della sezione finale.

### 5.4 Punti d'invio

| Punto | Oggi | Con `leadForm = false` |
|---|---|---|
| Alto (`lc-hero`) | `LinkCatcher` → scrolla al modulo | `LinkCatcher` in modalità email (5.1) |
| 3 passi (`lc-how`) | idem | idem |
| Dopo il calcolatore (`lc-calc`) | idem | idem |
| Sezione finale `#contatto` | `ContactForm` | **`ContactMail.astro`**, scheda ridotta: indirizzo email con **Copia**, pulsante **Scrivici** (apre la posta con la bozza), pulsante "Vedi il messaggio pronto" (apre il popup). Mantiene `id="contatto"` per CTA dell'header, dock e footer. |

`LinkCatcher.astro` riceve la modalità da `FEATURES.leadForm.enabled`. Con modulo acceso il comportamento attuale resta identico.

### 5.5 Misura (Umami, senza cookie)

Eventi con `window.umami?.track(nome, dati)`:
- `mail_open` con `{ where: "hero" | "steps" | "calc" | "contact" }`
- `mail_card_open`
- `mail_copy` con `{ field: "to" | "subject" | "body" }`

Servono a stimare quanti visitatori provano a scrivere. Il numero reale di richieste resta la casella di posta.

## 6. Modalità `OFFER_MODE = "validation"`

### 6.1 Principio

Nessun importo, nessuna promessa di prezzo, nessuna parola "gratis" in tutto il copy visibile e nei dati strutturati. Resta: la bozza si vede prima di decidere, senza impegno; i tempi (48 ore per la bozza; online entro 5 giorni lavorativi da quando firmiamo e ci mandi testi e foto).

### 6.2 Sezione offerta (`id="piani"`), nuovo componente `OfferValidation.astro`

Sezione quasi vuota: titolo, due righe, un solo pulsante (campo link). Due varianti, da scegliere. Sono bozze, da rifinire con le regole Ogilvy e il tono di `PRODUCT.md`:

- **Variante A.** Titolo: "Stiamo partendo, {em}su invito{/em}." Testo: "BESA è agli inizi e sta scegliendo con chi cominciare. Ti facciamo vedere la bozza; solo se ti convince parliamo di come lavorare insieme. Niente listini da decifrare, nessun impegno."
- **Variante B.** Titolo: "L'offerta te la spieghiamo {em}a voce{/em}." Testo: "Stiamo validando BESA insieme ai primi clienti, quindi l'offerta la definiamo parlando con te. Prima ti mostriamo la bozza, poi decidiamo insieme."

Pulsante: "Mandaci il tuo annuncio" (apre il flusso email).
Etichetta della voce di menu: "Piani" → "Offerta" (`copy.nav.links`).

### 6.3 Dove cambia il copy (elenco da controllare)

Introdurre `buildCopy(mode)` in `copy.ts` (la costante `copy = buildCopy(OFFER_MODE)` resta l'API per i componenti), così i test possono costruire il copy di ogni modalità. Punti da toccare:

- `meta.description`: toglie "La bozza è gratis…". Il JSON-LD eredita da qui.
- `nav.links`: "Piani" → "Offerta".
- `hero.keep`: "Il tuo annuncio resta com'è. La bozza la guardi dal telefono, senza impegno."
- `howItWorks.steps[1..2]`: niente "gratis", niente "paghi". Passo 3: "Ne parliamo e, se ti convince, andiamo online" con i tempi.
- `features.items[edits]`: tolta la regola dei 30 giorni gratis, resta "Ti seguiamo anche dopo la messa online".
- `offer.*`: sostituita dalla sezione di 6.2.
- `problem.results.payback` e riga correlata: **nascoste** (citano il prezzo). `describe()` in `lib/waste.ts` non riceve il prezzo.
- `faq`: "Quanto costa?" → "Stiamo definendo l'offerta insieme ai primi clienti: prima ti mostriamo la bozza, poi ne parliamo a voce." "Quando pago?" → "Come funziona il pagamento?" con la stessa linea. "Chi mi segue dopo": senza i 30 giorni. Rimosso "il primo anno è incluso" dalle risposte sul dominio.
- `eli5.blocks[2]`: "Noi facciamo la bozza e la guardi dal telefono. Se ti piace, ne parliamo e la colleghi all'annuncio."
- `finalCta.lead` e `form.reassure`: controllare ogni riferimento a prezzo o gratuità.
- `/termini`, link nel footer, voce in `sitemap.xml.ts`: vedi decisione aperta 2.
- `offer.ts`: gli importi restano per le altre modalità, ma `validation` non li esporta.

### 6.4 Segnale di fase iniziale

- La sezione di 6.2 fa da segnale principale.
- Nel "Chi siamo" (`copy.team.lead`): una riga onesta, per esempio "Abbiamo appena iniziato: ti seguiamo noi due, di persona." Nessun numero di clienti, posti o lanci inventati (regola del progetto).
- Footer (`copy.footer.legalLine`): nessuna modifica finché non ci sono P.IVA e sede.

## 7. Spegnere il modulo dinamico (`leadForm = false`): cosa succede nel codice

- `src/pages/index.astro`: monta `<ContactForm />` solo con l'interruttore acceso, altrimenti `<ContactMail />`. Gli import del modulo restano, così riaccendere è cambiare una riga.
- Non viene caricato nulla del modulo: niente Turnstile, niente `DemoMonitor`, `ReceiptPrinter`, confetti (`canvas-confetti` resta in `package.json`). Beneficio atteso: pagina più leggera.
- `src/pages/api/lead.ts`: con interruttore spento la rotta risponde **404** prima di leggere il corpo (nessuna superficie d'attacco). `lead.ts` e `lead.test.ts` restano e continuano a girare.
- `src/pages/grazie.astro`: resta (noindex), non più raggiunta.
- Sicurezza: le origini Turnstile nella CSP (`server.mjs` e `src/middleware.ts`, da tenere allineati) si possono togliere con l'interruttore spento. Priorità bassa, ma se si fa, in entrambi i file.
- **Privacy e cookie**: testi condizionali. Con il modulo spento spariscono i paragrafi su Brevo e Cloudflare Turnstile; entra "Se ci scrivi per email, usiamo il tuo indirizzo e quello che scrivi per risponderti" con la stessa base giuridica e conservazione. Resta Zoho Mail. Il testo va fatto rivedere (nota di prudenza già presente nelle pagine).
- `LinkHelp` (dove trovo il link) resta com'è: serve al flusso email.

## 8. Cose che restano uguali o previste per dopo

- **Invariati:** calcolatore e card "Come facciamo il conto", card "spiegamelo come a un bambino", Scheda tecnica, sezione prova, FAQ (testi come 6.3).
- **Interruttore previsto, non costruito:** `OFFER_MODE = "results"` per il modello a risultati. Registrarlo nel file come "non implementato" con l'elenco della decisione aperta 7, così non si dimentica. Non scrivere ora nessun testo su quel modello.

## 9. Per andare online (staging) con questa configurazione

1. Repo GitHub, push, DNS `new.besaweb.com`, app Coolify (vedi `DEPLOY.md`), `PUBLIC_NOINDEX=true`.
2. **Non servono** SMTP, Turnstile, DKIM Brevo. `PUBLIC_SITE_URL` sì.
3. Prova su due telefoni (iPhone e Android): premere il pulsante, controllare che la posta si apra con destinatario, oggetto e testo giusti; poi il popup e i tre pulsanti Copia.
4. Prova su desktop senza programma di posta (caso tipico: webmail): non succede nulla, il popup deve essere subito raggiungibile.
5. Umami: controllare che arrivino `mail_open` e `mail_copy`.
6. Prima dello spostamento di `besaweb.com`: redirect 301 delle vecchie pagine (es. `/esempi`), come da audit.
7. Aggiornare `DEPLOY.md` (le variabili SMTP/Turnstile valgono solo con `leadForm` acceso) e la sezione "Status log" di `CLAUDE.md` con la regola "gli interruttori vivono in `src/lib/features.ts`".

## 10. Ordine di lavoro e verifica

| Fase | Contenuto | Taglia |
|---|---|---|
| P0 | `features.ts` + `offer.ts` letti da lì + test del registro + rimozione di `PUBLIC_OFFER_MODE` | S |
| P1 | `mail-draft.ts`, `mail-state.ts`, `LinkCatcher` in modalità email, `MailCard`, `ContactMail`, spegnimento del modulo e della rotta, eventi Umami | M |
| P2 | `buildCopy(mode)`, modalità `validation`, `OfferValidation`, FAQ, termini, test sul copy | M |
| P3 | Privacy e cookie condizionali, CSP, `DEPLOY.md`, `CLAUDE.md` | S |
| P4 | `pnpm features` (facoltativo) | S |

### Criteri di accettazione

- [ ] Con `leadForm: false` la pagina non carica Turnstile né il codice del modulo; `POST /api/lead` risponde 404.
- [ ] Con `leadForm: true` il modulo funziona come prima (nessuna regressione, test esistenti verdi).
- [ ] Le tre modalità `validation`, `launch`, `full` costruiscono la pagina senza errori; `launch` e `full` restano identiche a oggi.
- [ ] In `validation`, nessuna stringa del copy contiene `€`, "gratis", "prezzo", "abbonament", "una tantum", "paghi", "pagare" (lista di permessi esplicita se serve), né i dati strutturati FAQ e `description`.
- [ ] Ogni funzionalità spenta ha `whyOff` e `reEnable`.
- [ ] Test unitari di `buildMailDraft`: codifica corretta di accenti e a capo, righe omesse se mancano dati, lunghezza massima sotto il limite, link con caratteri speciali.
- [ ] Controllo DOM con Playwright: il pulsante compone il `mailto` giusto; il popup si apre; ogni Copia mette il testo giusto negli appunti e mostra "Copiato".
- [ ] `pnpm check` e `pnpm test` senza errori; Lighthouse mobile ancora ≥ 98 (atteso in aumento).
- [ ] Nessun testo inventato: niente numeri di clienti, posti o risultati (regola del progetto).

## 11. File da toccare

| File | Modifica |
|---|---|
| `src/lib/features.ts` | **Nuovo**: registro degli interruttori e `OFFER_MODE` |
| `src/lib/offer.ts` | Legge `OFFER_MODE` da `features.ts`; esporta `FULL`; `validation` senza importi |
| `src/lib/copy.ts` | `buildCopy(mode)`; blocchi `mail`, `offerValidation`; varianti di 6.3 |
| `src/lib/mail-draft.ts`, `src/lib/mail-state.ts` | **Nuovi** (+ test) |
| `src/components/LinkCatcher.astro` | Modalità email / modulo |
| `src/components/MailCard.astro`, `ContactMail.astro`, `OfferValidation.astro` | **Nuovi** |
| `src/components/ContactForm.astro`, `src/pages/index.astro` | Montaggio condizionale |
| `src/components/Offer.astro`, `Problem.astro`, `HowItWorks.astro`, `Features.astro`, `Faq.astro`, `Footer.astro`, `Team.astro` | Variante `validation` (6.3, 6.4) |
| `src/lib/waste.ts` | `describe()` senza prezzo in `validation` |
| `src/pages/api/lead.ts` | 404 con modulo spento |
| `src/pages/termini.astro`, `privacy-policy.astro`, `cookie-policy.astro`, `sitemap.xml.ts` | Testi condizionali; sitemap |
| `src/components/WhatsAppButton.astro` | Rispetta l'interruttore e avvisa se manca il numero |
| `server.mjs`, `src/middleware.ts` | (opzionale) CSP senza Turnstile, in sincrono |
| `DEPLOY.md`, `.env.example`, `CLAUDE.md` | Documentazione |
| `src/lib/jsonld.ts` | Nessuna modifica, eredita da `copy` |

## 12. Da non fare

- Non cancellare codice del modulo, di Turnstile, di SMTP o dei test: solo spegnere.
- Non inventare prezzi, clienti, posti disponibili o risultati.
- Non scrivere nel sito il modello "a risultati" finché non è definito.
- Non aggiungere dipendenze, database o login per il gestionale.
