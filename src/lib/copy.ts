// Copy IT per la landing BESA. Solo dati, nessuna logica salvo le varianti per modalità.
// Token enfasi: {em}…{/em}.
// buildCopy(mode, { leadForm }) costruisce il copy di ogni modalità dell’offerta (features.ts), così i test
// le controllano tutte; i componenti usano la costante `copy`, costruita con gli interruttori attuali.
// In "validation" non compare nessun importo: i blocchi con i prezzi (offer, form.payment) mancano del tutto.
import { FEATURES, OFFER_MODE, type OfferMode } from "./features";
import { legalLine } from "./contacts";
import { CHECKOUT, eur, PRICING } from "./offer";
import { anchorOn, SECTIONS, type SectionState } from "./sections";

/**
 * Costo per creare e mettere online la pagina in "validation" (deciso dal titolare il 2026-11-10): l’unico importo
 * che compare in questa fase. I costi di gestione si propongono solo dopo il primo mese, e solo se la pagina ha
 * portato più contatti del mese prima. Non è ancora nel pannello: per renderlo modificabile da /admin va aggiunto
 * allo schema di offer.json (keystatic.config.ts + offer.ts + admin.test.ts).
 */
export const SETUP_PRICE = 49;

export interface CopyOptions {
  /** Modulo dinamico acceso (FEATURES.leadForm): cambia le frasi che parlano del «modulo». */
  leadForm?: boolean;
  /** Sezioni visibili (sections.json): le voci di menu delle sezioni nascoste spariscono. */
  sections?: SectionState;
}

export function buildCopy(mode: OfferMode, { leadForm = FEATURES.leadForm.enabled, sections = SECTIONS }: CopyOptions = {}) {
  const FULL = mode === "full";
  const V = mode === "validation";
  /** Blocchi con importi: assenti in "validation". */
  const priced = <const T>(block: T): T | undefined => (V ? undefined : block);
  const setup = eur(SETUP_PRICE);
  return {
    meta: {
      title: "Landing page per Meta Ads | BESA",
      description: V
        ? "Costruiamo la landing page che porta chi clicca a scriverti, senza cambiare annuncio. Prima guardi la bozza dal telefono, poi decidi."
        : "Costruiamo la landing page che porta chi clicca a scriverti, senza cambiare annuncio. La bozza è gratis e la provi prima di pagare.",
    },

    nav: {
      // CTA principale (footer). La pill di navigazione usa dockCta.
      cta: "Ottieni la bozza",
      dockCta: "Ottieni la bozza",
      links: [
        { label: "Fai due conti", href: "#problema" },
        { label: "Come lavoriamo", href: "#come-funziona" },
        { label: "Cosa include", href: "#cosa-include" },
        { label: V ? "Offerta" : "Piani", href: "#piani" },
        { label: "Chi siamo", href: "#chi-siamo" },
        { label: "FAQ", href: "#faq" },
      ].filter((l) => anchorOn(l.href, sections)),
      sections: {
        label: "Sezioni della pagina",
        title: "In questa pagina",
        top: "Inizio",
      /** Riga 00 del pannello aperto: torna all’inizio della pagina. */
      hello: "Ciao!",
        open: "Apri l’indice delle sezioni",
        close: "Chiudi l’indice delle sezioni",
        of: "di",
      },
    },

    hero: {
      headline: "Ottieni di più dagli ads {em}che stai già pagando{/em}.",
      lead: "Costruiamo landing page ottimizzate per convertire i click in azioni. Se ci mandi il link dell’annuncio, al resto pensiamo noi.",
      cta: "Ottieni la bozza",
      note: "Ci basta un link. Il resto lo facciamo noi.",
      keep: V
        ? "Il tuo annuncio resta com’è. La bozza la guardi dal telefono, senza impegno."
        : "Il tuo annuncio resta com’è. La bozza è gratis e la provi prima di pagare.",
      eli5: "Non ti torna? Te lo spieghiamo in modo semplicissimo",
      compare: {
        legend: "Dove arriva chi clicca il tuo annuncio",
        before: "Oggi",
        after: "Con BESA",
        captionBefore: "Atterra sul profilo o su un sito generico, trova tante cose, nessuna che gli dice cosa fare. Guarda velocemente e se ne va.",
        captionAfter: "Atterra su una pagina fatta esclusivamente per quell’annuncio: con la stessa offerta, un pulsante chiaro su cosa fare. E ti scrive.",
        note: "Esempio illustrativo",
        ad: { name: "La tua attività", sponsored: "Sponsorizzato", offer: "La tua offerta", cta: "Scopri di più" },
        profile: { handle: "latuaattivita", link: "link in bio", doubts: ["Dove scrivo?", "Quanto costa?", "Era questa l’offerta?"] },
        landing: { title: "La tua offerta, come nell’annuncio", text: "Due righe chiare su cosa ottieni.", button: "Scrivici su WhatsApp", badge: "Offerta", facts: ["Dove", "Orari", "Prezzi"] },
        url: "pagina-di-prova",
        tags: { art: "Come nell’annuncio", title: "Stessa promessa", button: "Un solo pulsante" },
        sent: "Messaggio inviato",
      },
    },

    catcher: {
      label: "Link dell’annuncio o @profilo Instagram",
      placeholder: "Link o @tuoprofilo",
      button: "Continua",
      hint: "Va bene anche solo il tuo @profilo: l’annuncio lo troviamo noi.",
      added: "Link aggiunto al modulo. Ora dicci dove risponderti.",
      fallback: "Ottieni la bozza",
    },

    // Invio per email (FEATURES.leadForm spento): bozza della mail, popup e scheda finale.
    // {link}, {calc}, {plan}, {to}: sostituiti nel browser; le righe con un dato mancante spariscono.
    mail: {
      subject: "Richiesta bozza BESA",
      body: {
        greeting: "Ciao Leo e Ben,",
        intro: "richiesta di una bozza di landing page per questo annuncio.",
        link: "Annuncio o profilo: {link}",
        calc: "Numeri dal calcolatore: {calc}",
        plan: "Piano scelto: {plan}",
        // Invito a scrivere di più, con una riga vuota sotto dove scrivere.
        extra: "Se vuoi, aggiungi qui cosa offri, dove lavori, il tuo numero WhatsApp o altro che ci può servire:",
        thanks: "Grazie!",
      },
      catcher: {
        button: "Ottieni la bozza",
        empty: "Incolla il link dell’annuncio o scrivi il tuo @profilo.",
        opened: "Abbiamo aperto la tua posta con il messaggio pronto.",
        retry: "Non si è aperta? Copia il messaggio",
      },
      card: {
        title: "Il tuo messaggio",
        subtitle: "Incollalo nella tua posta e invialo a {to}",
        to: "A",
        subject: "Oggetto",
        body: "Messaggio",
        copy: "Copia",
        copied: "Copiato",
        copyLabel: "Copia: {field}",
        copiedLive: "{field} copiato negli appunti.",
        close: "Chiudi",
        open: "Apri la posta",
        done: "Fatto",
      },
      contact: {
        title: "Scrivici una email",
        text: "Mandaci il link del tuo annuncio o il tuo @profilo. Se l’hai incollato qui sopra, è già nel messaggio.",
        address: "Il nostro indirizzo",
        write: "Scrivici",
        see: "Vedi il messaggio pronto",
        reassure: "Ti rispondiamo entro 1 giorno lavorativo. La prima bozza arriva in 48 ore, senza impegno.",
      },
    },

    linkHelp: {
      button: "Dove trovo il link?",
      title: "Dove trovo il link dell’annuncio?",
      subtitle: "Scegli da dove lo cerchi: bastano tre passaggi.",
      close: "Chiudi",
      sources: [
        {
          id: "phone",
          tab: "Telefono",
          steps: [
            "Apri l’annuncio su Instagram o Facebook.",
            "Tocca l’icona di condivisione o i tre puntini.",
            "Scegli «Copia link» e incollalo nel campo.",
          ],
        },
        {
          id: "manager",
          tab: "Gestione inserzioni",
          steps: [
            "Seleziona l’inserzione e apri l’anteprima.",
            "Clicca l’icona di condivisione e scegli di condividere un link.",
            "Copia il link e incollalo nel campo.",
          ],
        },
        {
          id: "library",
          tab: "Libreria inserzioni",
          steps: [
            "Apri la Libreria inserzioni di Meta.",
            "Cerca il nome della tua pagina e apri l’annuncio attivo.",
            "Copia l’indirizzo dal browser e incollalo nel campo.",
          ],
        },
      ],
      alt: "Non lo trovi? Scrivi il tuo @profilo: l’annuncio lo cerchiamo noi.",
      done: "Ho capito",
    },

    problem: {
      headline: "Quanti soldi delle tue inserzioni {em}non diventano messaggi{/em}?",
      lead: "Meta ti fa pagare ogni click, che poi ti scrivano o no. Metti i tuoi numeri: ti mostriamo quanto spendi per click che non portano a niente.",
      defaultsNote: "Valori di esempio: metti i tuoi.",
      /** Accanto alla nota sui valori di esempio: apre la scheda sul tab «I tuoi numeri». */
      defaultsWhere: "Dove li trovo?",
      less: "Diminuisci",
      more: "Aumenta",
      inputs: {
        budget: { label: "Spendi in inserzioni al mese", min: 50, max: 5000, step: 50, value: 300 },
        cpc: { label: "Quanto paghi ogni click (circa)", min: 0.1, max: 3, step: 0.05, value: 0.5 },
        msgs: { label: "Messaggi che ricevi al mese", min: 0, max: 150, step: 1, value: 6 },
        target: {
          label: "Con una pagina BESA ti scrive circa",
          hint: "È la nostra ipotesi, non una promessa. Sulle landing page di tutti i settori scrivono di solito circa 6 persone su 100 (Unbounce, 2024), ma chi arriva dai social di solito è meno pronto: per questo partiamo dal 3%. Puoi cambiarla.",
          min: 1,
          max: 12,
          step: 0.5,
          value: 3,
        },
      },
      // Lo scontrino: prima e dopo con la stessa spesa. {…} sono riempiti dal calcolatore (data-tpl).
      results: {
        title: "Il tuo mese di inserzioni",
        same: "Stessa spesa su Meta in tutti e due i casi: {budget} al mese, {clicks} click che paghi.",
        clicks: "click che paghi",
        colLabel: "Ogni mese",
        colNow: "Oggi",
        colWith: "Con BESA",
        rowMsgs: "Messaggi che ricevi",
        rowCost: "Ogni messaggio ti costa",
        rowSpend: "Spesa su Meta",
        total: "Oggi spendi senza ricevere messaggi",
        perMonth: "al mese",
        year: "In un anno: {year}",
        gain: "Con BESA, alla stessa spesa:",
        gainMsgs: "messaggi in più ogni mese",
        // Solo con almeno un messaggio oggi: la stessa resa di oggi, con meno budget.
        gainLess: "Oppure ricevi gli stessi {msgs} messaggi di oggi spendendo circa {sameFor} al mese invece di {budget}.",
        // Cita il prezzo: in "validation" manca e la riga non viene mostrata.
        payback: V ? undefined : "La tua pagina costa {price}, una volta. Con questi numeri è lo spreco di {span}.",
        compareNone: "nessun messaggio",
        dotsPre: "Su 100 persone che cliccano, oggi ti scrivono",
        dotsPost: "Con una pagina BESA, circa",
        dotsLegendNow: "ti scrive già",
        dotsLegendMore: "ti scriverebbe",
        dotsLegendGone: "se ne va",
        above: {
          title: "Qui la pagina non è il problema.",
          text: "Con questi numeri scrivi già più del {t}% di chi clicca. Se vuoi, guardiamo insieme dove si perde il resto: mandaci l’annuncio.",
        },
      },
      calcSummary: "{budget} al mese · {cpc} a click · {msgs} messaggi al mese",
      why: {
        headline: "Perché perdi potenziali clienti?",
        items: [
          {
            title: "Li devi convincere velocemente.",
            text: "Chi clicca il tuo annuncio è interessato, ma non ancora convinto. Sei in vantaggio, perché ha appena dimostrato interesse: ora va accompagnato subito dal click al passo successivo (un messaggio, una chiamata), senza lasciarlo da solo a cercare cosa fare. È quello che facciamo noi: una pagina che riprende il tuo annuncio, risponde ai suoi dubbi in pochi secondi e lo porta a contattarti con un solo tocco.",
          },
          {
            title: "Chi clicca sull’annuncio vuole risposte, subito.",
            text: "Vuole sapere quanto costa e come contattarti. Un profilo o un sito generico gli mette davanti dieci cose da guardare, e molti smettono di cercare.",
          },
          {
            title: "L’essere umano è pigro.",
            text: "Una pagina lenta o piena di elementi viene abbandonata velocemente. Le nostre pagine web sono leggere volutamente.",
          },
        ],
      },
      closing: {
        q: "Come risolviamo il problema?",
        text: "Non tocchiamo l’annuncio né il budget: cambia solo la pagina dove atterra l’utente interessato.",
      },
      // Come facciamo il conto, in chiaro sotto lo scontrino. {t} segue il cursore dell’ipotesi.
      method: {
        title: "Come facciamo il conto",
        steps: [
          "Dividiamo quanto spendi per quanto paghi ogni click: così sappiamo quante persone arrivano.",
          "Guardiamo quante di loro oggi ti scrivono, con i messaggi che hai indicato.",
          "Ipotizziamo che con una pagina BESA ti scriva il {t}% di chi arriva. La percentuale la scegli tu.",
          "La differenza sono i messaggi che oggi perdi, e la spesa che va in click senza risposta.",
        ],
        all: "Vedi tutti i passaggi",
      },
      note: leadForm
        ? "È un conto semplice, fatto con i numeri che metti tu: non è una previsione. Lo fa il tuo telefono o computer, noi non vediamo niente e non salviamo niente. Li riceviamo solo se ce li mandi tu, insieme alla richiesta."
        : "È un conto semplice, fatto con i numeri che metti tu: non è una previsione. Lo fa il tuo telefono o computer, noi non vediamo niente e non salviamo niente. Li riceviamo solo se ce li mandi tu, nella email.",
      help: {
        button: "Come facciamo il conto?",
        title: "Come facciamo il conto",
        subtitle: "Quattro passaggi semplici, con i tuoi numeri. Non salviamo niente.",
        close: "Chiudi",
        done: "Ho capito",
        tabs: { calc: "Il conto", numbers: "I tuoi numeri", limits: "Quanto è affidabile" },
        steps: [
          { title: "Quanti click paghi", formula: "{budget} ÷ {cpc} = {clicks} click" },
          { title: "Quanti ti scrivono oggi", formula: "{msgs} ÷ {clicks} = {rate}% dei click" },
          {
            title: "Quanti ti scriverebbero con la pagina",
            formula: "{clicks} × {t}% = {pot} messaggi",
            text: "Te ne mancano {missing}. Il {t}% è la nostra ipotesi: la puoi cambiare.",
          },
          {
            title: "Quanto spendi senza risultato",
            formula: "{missing} × {perT} = {wasted}",
            text: "{perT} è quanto ti costerebbe ogni messaggio con quella resa ({budget} ÷ {pot}). Oggi ti costa {perN}.",
          },
        ],
        numbers: {
          intro: "Li trovi in Gestione inserzioni, sugli ultimi 30 giorni.",
          items: [
            { title: "Spesa mensile", text: "Colonna «Importo speso»." },
            { title: "Costo per click", text: "Colonna «CPC (costo per click sul link)». Se non la vedi, dividi l’importo speso per i click sul link." },
            { title: "Messaggi", text: "Conversazioni avviate (Messenger, WhatsApp, Instagram) più i moduli compilati. Non li ricordi? Metti una stima: il risultato resta indicativo." },
          ],
        },
        limits: {
          items: [
            {
              title: "Il {t}% è un’ipotesi.",
              text: "Come riferimento, la mediana di molte landing page nel mondo è intorno al 6% (Unbounce, report 2024, tutti i settori). Chi arriva dai social di solito è meno pronto, per questo partiamo dal 3%.",
              source: { label: "Fonte: Unbounce, tassi di conversione medi delle landing page", href: "https://unbounce.com/average-conversion-rates-landing-pages/" },
            },
            { title: "Il conto è prudente.", text: "Non contiamo i click persi prima ancora che la pagina si carichi: è un’altra perdita, in più rispetto a questa." },
            { title: "Non è una garanzia.", text: "Il risultato vero dipende da offerta, prezzo e annuncio. Una buona pagina toglie un ostacolo, non fa miracoli." },
          ],
        },
      },
    },

    fix: {
      headline: "Un annuncio = una pagina = {em}un’azione{/em}.",
      lead: "Replichiamo esattamente la stessa offerta dell’annuncio e mettiamo un solo pulsante per contattarti. Nessuna distrazione, nessun dubbio su cosa fare: solo un’azione.",
    },

    howItWorks: {
      headline: "Come lavoriamo con te: {em}mandi un link{/em}, al resto pensiamo noi.",
      // Etichette del disegno del passo 3 (decorativo, aria-hidden).
      viz: {
        online: "Online",
        talkTitle: V ? "Dopo il primo mese" : "Ti aggiorniamo",
        talkText: V ? "contiamo insieme i contatti in più" : "com’è andata, cosa migliorare",
        linked: "collegata all’annuncio",
      },
      steps: [
        {
          title: "Ci mandi il tuo annuncio",
          text: leadForm
            ? "Incolla il link qui sotto e dicci dove risponderti. Basta questo: niente moduli lunghi, niente chiamate."
            : "Incolla il link qui sotto: si apre la tua posta con il messaggio già pronto. Basta questo: niente moduli lunghi, niente chiamate.",
          // Solo con l’invio per email: nel modulo ci sono già i campi facoltativi.
          tip: leadForm
            ? undefined
            : {
                title: "Vuoi dirci di più?",
                text: "Aggiungi pure nella mail quello che ti sembra utile: cosa offri, dove lavori, il tuo sito, cosa ti piace e cosa no, il tuo numero se preferisci WhatsApp. Lo usiamo per la tua pagina: più ci racconti, più la bozza assomiglia a quello che ti serve.",
              },
        },
        V
          ? {
              title: "Creiamo la bozza per te",
              text: "Partiamo da cosa offri nell’annuncio: scriviamo i testi e prepariamo la pagina. In 48 ore la apri dal telefono, su un indirizzo di prova. Senza impegno.",
            }
          : {
              title: "Creiamo la bozza per te, gratis",
              text: "Partiamo da cosa offri nell’annuncio: scriviamo i testi e prepariamo la pagina. In 48 ore la apri dal telefono, su un indirizzo di prova. Non paghi niente e non ti impegni.",
            },
        // Nessuna chiamata nemmeno qui: tutto per iscritto, come promesso al passo 1.
        V
          ? {
              title: `Se ti convince, la mettiamo online per ${setup}`,
              text: "Ci scrivi cosa sistemare e ci mandi testi e foto, per email o su WhatsApp se ci lasci il numero. La pagina va online entro 5 giorni lavorativi. Poi va collegata alle tue inserzioni e al Pixel di Meta, che conta i contatti. Il collegamento lo facciamo noi, oppure ti mandiamo una guida passo passo.",
            }
          : {
              title: "Se ti piace, paghi e andiamo online",
              text: "Firmi, ci mandi testi e foto e la pagina va online entro 5 giorni lavorativi. Poi va collegata alle tue inserzioni e al Pixel di Meta, che conta i contatti. Il collegamento lo facciamo noi, oppure ti mandiamo una guida passo passo.",
            },
      ],
    },

    features: {
      headline: "Tutto quello che serve, {em}fatto da noi{/em}.",
      lead: "Cosa succede dopo che ci mandi il tuo annuncio, e cosa resta a te: quasi niente.",
      cta: "Inizia da qui",
      items: [
        {
          id: "eta",
          title: "Prima bozza in 48 ore",
          text: "Ci mandi il link oggi, entro due giorni hai una pagina vera da aprire sul telefono.",
          steps: ["Ricevuto", "In lavorazione", "Pronta"],
        },
        {
          id: "link",
          title: "Basta un link, o il tuo @profilo",
          text: "Niente moduli lunghi, niente chiamate per iniziare.",
          sample: "@latuaattivita",
        },
        {
          id: "channel",
          title: "Il pulsante che usi davvero",
          text: "WhatsApp, chiamata o richiesta di preventivo: scegli tu dove arrivano i contatti.",
          chips: ["WhatsApp", "Chiamata", "Preventivo"],
        },
        {
          id: "edits",
          title: FULL ? "Modifiche quando ti servono" : V ? "Ti seguiamo anche dopo" : "Correzioni dopo la messa online",
          text: FULL
            ? "Cambi offerta o annuncio? Con l’abbonamento ci scrivi e aggiorniamo la pagina."
            : V
              ? "Ti seguiamo anche dopo la messa online. Qualcosa da sistemare? Ci scrivi e lo sistemiamo."
              : "Qualcosa da sistemare? Nei 30 giorni dopo la messa online le correzioni sono gratis.",
          chat: ["Da lunedì l’offerta cambia, aggiorniamo?", "Fatto, è già online."],
        },
        {
          id: "try",
          title: "La provi prima di decidere",
          text: "Vive su un indirizzo di prova finché non ti convince.",
          url: "pagina-di-prova",
        },
        {
          id: "people",
          title: "Parli con chi la costruisce",
          text: "Leo e Ben, nessun intermediario. Ti risponde chi ci mette le mani.",
          bubble: "Ciao, siamo Leo e Ben.",
        },
      ],
    },

    inside: {
      headline: "Cosa c’è dentro la pagina.",
      features: [
        {
          title: "Pagina leggera",
          text: "Costruita per aprirsi in un attimo sul telefono di chi arriva dai social, da Instagram o da Facebook.",
        },
        {
          title: "Titolo e offerta presi dal tuo annuncio",
          text: "Chi arriva ritrova la stessa promessa e capisce subito di essere nel posto giusto.",
        },
        {
          title: "Testi scritti da noi",
          text: "Brevi e concreti, senza giri di parole. Li scriviamo noi e li controlli tu prima di andare online.",
        },
        {
          title: "Modulo corto",
          text: "Poche domande, perché ogni campo in più fa scappare qualcuno.",
        },
        {
          title: "Pulsante per contattarti",
          text: "WhatsApp, telefono o modulo: quello che usi davvero per rispondere ai clienti.",
        },
        {
          title: "Sai cosa sta funzionando",
          text: FULL
            ? "Teniamo traccia di quello che funziona e di quello che no. Quando qualcuno ti scrive lo comunichiamo a Meta (si chiama Pixel di Meta): così Meta impara a mostrare il tuo annuncio alle persone più adatte. In più hai statistiche di visita che rispettano la privacy. L’abbonamento aggiunge un breve report mensile: visite, contatti, quanti visitatori ti scrivono."
            : "Teniamo traccia di quello che funziona e di quello che no. Quando qualcuno ti scrive lo comunichiamo a Meta (si chiama Pixel di Meta): così Meta impara a mostrare il tuo annuncio alle persone più adatte. In più hai statistiche di visita che rispettano la privacy.",
        },
      ],
    },

    offer: priced({
      headline: FULL ? "Scegli come lavoriamo {em}insieme{/em}." : "La tua landing page, {em}a prezzo di lancio{/em}.",
      lead: FULL
        ? "Tre modi, stesso risultato: una landing fatta bene per le tue inserzioni."
        : "Una pagina costruita sul tuo annuncio, pagata una volta sola.",
      draftLine: "La bozza è gratis: la vedi prima di pagare.",
      // Fase di lancio: un solo pacchetto. L’abbonamento si propone dopo, nel modulo.
      launch: {
        id: "una-tantum",
        name: "Landing page",
        tagline: "Una landing, pagata una volta.",
        badge: "Prezzo di lancio",
        price: `${eur(PRICING.launch)}`,
        priceNote: `Una volta sola. Hosting (la pagina online) incluso per 12 mesi, poi ${eur(PRICING.hostingYear)} all’anno.`,
        features: [
          "La landing finita, collegata al tuo annuncio, con modulo contatti e conteggio dei contatti (Pixel di Meta)",
          "2 giri di revisione prima della consegna",
          "30 giorni di correzioni gratuite dopo la messa online",
          "Hosting (la pagina resta online), certificato SSL (il lucchetto) ed email con i contatti inclusi",
        ],
        cta: "Scegli il pacchetto una tantum",
        checkout: CHECKOUT.launch,
        more: { text: "Hai molte inserzioni attive?", cta: "Raccontaci cosa ti serve" },
      },
      plans: [
        {
          id: "abbonamento",
          name: "Abbonamento",
          tagline: "Costruiamo la landing e la teniamo aggiornata quando ce lo chiedi.",
          highlight: true,
          price: `${eur(PRICING.monthly)} al mese`,
          priceNote: "Mensile, minimo 3 mesi.",
          features: [
            "Landing page costruita da noi",
            "Modifiche ai contenuti illimitate: nuova offerta, nuovo annuncio, testi aggiornati",
            "La struttura resta quella approvata: il design va approvato entro 48 ore dalla consegna",
            "Rispondiamo entro 1 giorno lavorativo; le modifiche vanno online entro 2 giorni lavorativi",
            "Hosting, certificato SSL ed email con i contatti inclusi, più un report mensile: visite, contatti, quanti visitatori ti scrivono",
          ],
          cta: "Scegli l’abbonamento",
          // Link di pagamento (es. Stripe Payment Link), dal pannello. Vuoto = il pulsante porta al modulo con il piano già scelto.
          checkout: CHECKOUT.abbonamento,
        },
        {
          id: "una-tantum",
          name: "Una tantum",
          tagline: "Una landing, pagata una volta.",
          highlight: false,
          price: eur(PRICING.oneTime),
          priceNote: `Una volta sola. Hosting (la pagina online) incluso per 12 mesi, poi ${eur(PRICING.hostingYear)} all’anno.`,
          features: [
            "La landing finita, collegata al tuo annuncio, con modulo contatti e conteggio dei contatti (Pixel di Meta)",
            "2 giri di revisione prima della consegna",
            "Dopo la consegna: 30 giorni di correzioni gratuite; poi modifiche a preventivo, oppure passi all’abbonamento",
          ],
          cta: "Scegli il pacchetto una tantum",
          checkout: CHECKOUT["una-tantum"],
        },
        {
          id: "su-misura",
          name: "Su misura",
          tagline: "Più campagne, esigenze particolari o qualcosa fuori dal solito.",
          highlight: false,
          price: `da ${eur(PRICING.customFrom)} al mese`,
          priceNote: "Per chi ha più inserzioni attive: più pagine, meno per ciascuna.",
          features: [
            "Compili un modulo con poche domande sul tuo caso",
            "Preventivo scritto via email entro 2 giorni lavorativi",
            "Una chiamata solo se la vuoi tu",
          ],
          cta: "Raccontaci cosa ti serve",
          checkout: CHECKOUT["su-misura"],
        },
      ],
      // Preventivo interattivo (solo offerta completa): quante landing servono e come cambia il prezzo.
      quote: {
        title: "Quanto costa con più inserzioni?",
        lead: "Muovi il cursore: il prezzo per pagina scende man mano che le pagine aumentano.",
        label: "Landing page attive",
        less: "Diminuisci",
        more: "Aumenta",
        min: PRICING.customIncluded,
        max: 20,
        value: 6,
        totalLabel: "Su misura",
        perMonth: "al mese",
        perPage: "a pagina",
        compare: "Confronto con gli altri piani",
        rows: { sub: "Abbonamento ×{n}", once: "Una tantum ×{n}" },
        once: "una volta",
        perMonthShort: "/mese",
        save: "Risparmi {amount} al mese rispetto a {n} abbonamenti singoli.",
        below: `Con meno di ${PRICING.customIncluded} pagine conviene l’abbonamento.`,
        note: "Stima indicativa. Il preventivo scritto arriva via email dopo il modulo.",
        cta: "Chiedi il preventivo",
        chip: "{n} landing, stima {total} al mese",
      },
    }),

    // Sezione offerta in "validation": l’unico importo è il costo di partenza (SETUP_PRICE). I costi di gestione
    // non hanno cifre: si propongono dopo il primo mese, solo se la pagina ha portato più contatti del mese prima.
    offerValidation: {
      eyebrow: "L’offerta",
      headline: `${setup} per partire. Il resto, {em}solo se funziona{/em}.`,
      lead: `Oltre a quello che spendi su Meta, che resta com’è, ti chiediamo ${setup} per creare la tua pagina. Dopo il primo mese guardiamo i numeri: parliamo di costi di gestione solo se la pagina ti ha portato contatti che senza di lei non avresti avuto.`,
      points: [
        { key: "Bozza in 48 ore", text: "La apri dal telefono, senza impegno. Se non ti convince, ci fermiamo lì." },
        { key: `${setup} per andare online`, text: "Se la bozza ti convince, la pagina va online per questa cifra, una volta sola. Il budget delle inserzioni resta tuo e va a Meta come oggi." },
        { key: "Il primo mese", text: "Nessun altro costo. La pagina lavora e contiamo i contatti che porta, con il Pixel di Meta." },
        { key: "Poi, solo se funziona", text: "Confrontiamo i contatti del primo mese con quelli del mese prima. Se sono di più, ti proponiamo per iscritto i costi di gestione. Se no, non ti chiediamo altro." },
      ],
      cta: "Ottieni la bozza",
      /** Link verso questa sezione da altre parti della pagina (Features). */
      link: "Vedi l’offerta",
    },

    // Richieste particolari e tanti annunci: nessun limite. Email diretta con un oggetto suo, in ogni modalità.
    bulk: {
      headline: "Hai tanti annunci? {em}Mandaceli tutti{/em}.",
      lead: "Non c’è un limite: che tu abbia 2 annunci o 100, prepariamo una pagina per ognuno. Lo stesso se hai una richiesta particolare: più sedi, un’offerta diversa per ogni zona, o qualcosa fuori dal solito.",
      points: [
        "Scrivici direttamente cosa ti serve, anche in due righe.",
        "Puoi mandarci tutti i link insieme, o il tuo @profilo: gli annunci li troviamo noi.",
        "Ti rispondiamo entro 1 giorno lavorativo con una proposta per il tuo caso.",
      ],
      cta: "Scrivici la tua richiesta",
      subject: "Richiesta particolare BESA",
      body: "Ciao Leo e Ben,\nrichiesta particolare: \n\nAnnunci (link o @profilo): \n\nGrazie!",
      or: "oppure scrivi a",
    },

    proof: {
      headline: "Questo sito è {em}la nostra prova{/em}.",
      paragraphs: [
        "È costruito come le nostre pagine: veloce, chiaro, una sola richiesta. Niente numeri inventati né recensioni di comodo: guarda come si carica e quanto è chiaro cosa fare, poi giudica tu.",
      ],
      how: [
        "Partiamo sempre dal tuo annuncio, non da un modello già pronto.",
        "Scriviamo noi i testi, con te che controlli prima di andare online.",
        "Dopo la messa online guardiamo insieme cosa succede.",
      ],
      metrics: {
        title: "Misurato su questo sito",
        note: "Lighthouse di Google, da telefono. Numeri nostri, misurati su questa pagina: i risultati dei clienti li mostreremo quando ce ne saranno.",
        spec: "Scheda tecnica",
        items: [
          { value: "99", label: "Punteggio Lighthouse da mobile" },
          { value: "173 KB", label: "Peso totale della pagina" },
          { value: "0 ms", label: "Tempo prima che la pagina risponda al tocco" },
          { value: "0", label: "Elementi che saltano mentre carica" },
        ],
      },
    },

    team: {
      headline: "Chi siamo.",
      lead: "Siamo in due, ti seguiamo di persona e parli direttamente con noi.",
      linkedin: "LinkedIn",
      members: [
        {
          name: "Ben",
          role: "Prodotto e sviluppo tecnico",
          // Fumetto sopra la besamoji, al passaggio sul nome o sull’immagine.
          greeting: "Ciao da Ben!",
          bio: "Studia Business Creation insieme a Leo. In BESA trasforma la bozza in una pagina che funziona davvero: la costruisce, la mette online, collega il Pixel di Meta e controlla che resti veloce e sicura nel tempo. Ha sviluppato anche gli strumenti interni con cui seguiamo ogni progetto, dalla tua richiesta alla pagina pubblicata. Se qualcosa non va dietro le quinte, è lui che lo sistema.",
          photoAlt: "Illustrazione di Ben",
          linkedin: "https://www.linkedin.com/in/benito-giacometti-valentino-589840388/",
          linkedinLabel: "Ben su LinkedIn",
        },
        {
          name: "Leo",
          role: "Business, strategia, marketing e contenuti",
          greeting: "Ciao da Leo!",
          bio: "Studia Business Creation & Entrepreneurship a H-FARM e da anni lancia progetti digitali. In BESA si occupa di strategia imprenditoriale e ha ideato il sistema che crea le tue landing page e le mantiene veloci, stabili e misurabili. Gli interessa una cosa sola: che la tua pagina trasformi i click che hai pagato in messaggi veri.",
          photoAlt: "Illustrazione di Leo",
          linkedin: "https://www.linkedin.com/in/leonardo-margiotta-644126289/",
          linkedinLabel: "Leo su LinkedIn",
        },
      ],
    },

    faq: {
      headline: "Domande frequenti.",
      items: [
        {
          q: "Cosa mi serve per partire?",
          a: leadForm
            ? "Il link a un tuo annuncio (o al tuo profilo Facebook o Instagram) e un recapito per risponderti. Basta il modulo qui sotto: il resto è facoltativo."
            : "Il link a un tuo annuncio (o al tuo profilo Facebook o Instagram). Incollalo in uno dei campi della pagina: si apre la tua posta con il messaggio già pronto, e ti rispondiamo all’indirizzo da cui scrivi.",
        },
        {
          q: "Non ho un annuncio attivo. Posso partire lo stesso?",
          a: leadForm
            ? "Sì, se hai chiaro cosa vuoi promuovere. Mandaci il tuo @profilo e raccontaci l’offerta nelle note del modulo: partiamo da lì. Con un annuncio già attivo il risultato è più preciso, perché costruiamo la pagina sulla sua promessa."
            : "Sì, se hai chiaro cosa vuoi promuovere. Mandaci il tuo @profilo e raccontaci l’offerta nella email: partiamo da lì. Con un annuncio già attivo il risultato è più preciso, perché costruiamo la pagina sulla sua promessa.",
        },
        {
          q: "Ho già un sito. Mi serve comunque una landing?",
          a: "Dipende da dove mandi le inserzioni oggi. Il sito di solito parla a tutti e racconta tutto. La landing parla a chi ha cliccato quel preciso annuncio e gli chiede una cosa sola. Le due cose convivono: il sito resta dov’è.",
        },
        {
          q: "Devo cambiare il mio annuncio?",
          a: "No. Partiamo dall’annuncio che hai e costruiamo la pagina in modo coerente. Se vuoi ritoccarlo, ti diamo qualche consiglio, ma non è una condizione.",
        },
        {
          q: "Dove vedo la pagina prima di decidere?",
          a: `All’inizio la pagina vive su un indirizzo di prova, non sul tuo dominio. La apri dal telefono, la provi, e ci dici cosa cambiare. Quando ti convince la colleghiamo al tuo dominio: se ce l’hai la colleghiamo noi, se non ce l’hai lo registriamo per te${V ? "" : " (il primo anno è incluso)"}. Il dominio (l’indirizzo del sito, tipo latuaattivita.it) resta sempre a tuo nome.`,
        },
        V
          ? {
              q: "Come funziona il pagamento?",
              a: `La bozza la vedi senza impegno. Se ti convince, la pagina va online per ${setup}, una volta sola, e per il primo mese non ti chiediamo altro. Poi confrontiamo i contatti arrivati con quelli del mese prima: solo se sono di più ti proponiamo per iscritto i costi di gestione, con tutte le condizioni chiare.`,
            }
          : {
              q: "Quando pago?",
              a: "Solo dopo aver visto la bozza, e solo se ti convince. Poi firmi, ci mandi testi e foto e andiamo online. Il collegamento della pagina alle tue inserzioni e al Pixel di Meta lo facciamo noi, oppure ti mandiamo una guida passo passo.",
            },
        {
          q: "Cos’è il Pixel di Meta e mi serve?",
          a: "È un piccolo codice che dice a Meta quando qualcuno ti scrive dopo aver cliccato. Così tu sai cosa sta funzionando, e Meta impara a mostrare il tuo annuncio alle persone più adatte. Lo installiamo sempre, insieme al banner cookie che serve sulla tua pagina.",
        },
        {
          q: "Quanto ci vuole per andare online?",
          a: V
            ? "La bozza arriva in 48 ore, senza impegno. Se ti convince, ci mandi testi, foto e tutto quello che serve, e la pagina va online entro 5 giorni lavorativi."
            : "La bozza arriva in 48 ore ed è gratis. La pagina va online entro 5 giorni lavorativi da quando firmi e ci mandi testi e foto.",
        },
        {
          q: "Chi mi segue dopo la messa online?",
          a: FULL
            ? "Siamo noi due, Leo e Ben. Con l’abbonamento ci scrivi quando serve una modifica ai contenuti. Con la formula una tantum hai 30 giorni di correzioni gratuite, poi le modifiche vanno a preventivo. Con il piano su misura vale quanto scritto nel preventivo (di base gli stessi 30 giorni)."
            : V
              ? "Siamo noi due, Leo e Ben. Dopo la messa online ci scrivi quando serve sistemare qualcosa: ti risponde chi ha costruito la pagina."
              : "Siamo noi due, Leo e Ben. Dopo la messa online hai 30 giorni di correzioni gratuite; poi le modifiche vanno a preventivo.",
        },
        {
          q: "Gestite voi anche le inserzioni?",
          a: "No, ci occupiamo solo della pagina. Ti diciamo come collegarla all’inserzione e, se vuoi, ti diamo qualche consiglio sul testo dell’annuncio.",
        },
        {
          q: "Quanto costa?",
          a: V
            ? `Oltre a quello che spendi su Meta, che non cambia: ${setup} per creare la pagina e metterla online. I costi di gestione arrivano solo dopo il primo mese, e solo se la pagina ti ha portato più contatti del mese prima. Hai tanti annunci o un caso particolare? Scrivici: non c’è un limite.`
            : FULL
              ? `Dipende da quanto vuoi seguirla nel tempo. La una tantum costa ${eur(PRICING.oneTime)} una volta sola; l’abbonamento ${eur(PRICING.monthly)} al mese, con modifiche ai contenuti illimitate; il su misura parte da ${eur(PRICING.customFrom)} al mese per chi ha più inserzioni attive. In ogni caso hosting, certificato SSL ed email con i contatti sono inclusi. Il dominio (l’indirizzo del sito, tipo latuaattivita.it) resta a tuo nome: se ce l’hai lo colleghiamo, se no lo registriamo noi per te (il primo anno è incluso). La prima bozza la vedi prima di pagare.`
              : `Una landing costa ${eur(PRICING.launch)}, una volta sola. Hosting, certificato SSL ed email con i contatti sono inclusi (l’hosting per 12 mesi, poi ${eur(PRICING.hostingYear)} all’anno). Il dominio (l’indirizzo del sito, tipo latuaattivita.it) resta a tuo nome: se ce l’hai lo colleghiamo, se no lo registriamo noi per te (il primo anno è incluso). La prima bozza la vedi prima di pagare.`,
        },
        ...(FULL
          ? [
              {
                q: "Posso disdire l’abbonamento?",
                a: `Sì. Dopo i primi 3 mesi disdici quando vuoi con 30 giorni di preavviso, senza penali. I mesi già iniziati non si rimborsano. Se vuoi fermarti senza perdere la pagina, puoi metterla in pausa a ${eur(PRICING.paused)} al mese per un massimo di 2 mesi: resta online, ma senza modifiche. Alla disdetta la pagina va offline, oppure la riscatti e diventa tua con un pagamento unico.`,
              },
            ]
          : []),
        ...(V
          ? [
              {
                q: "E se la bozza non mi convince?",
                a: "Ci dici cosa non ti torna e la sistemiamo. Se nemmeno così fa per te, ci fermiamo lì: senza impegno e senza spiegazioni da dare.",
              },
            ]
          : []),
        {
          q: "Chi tratta i dati di chi scrive dalla mia pagina?",
          a: "Il titolare sei tu: i contatti arrivano a te. Noi li trattiamo solo per tuo conto, per far funzionare la pagina, e raccogliamo solo i campi che servono per ricontattare chi ti scrive. Sulla pagina mettiamo l’informativa privacy e il banner cookie.",
        },
        {
          q: "Cosa fate con i dati che vi mando?",
          a: "Li usiamo solo per risponderti e preparare la tua bozza. Il titolare del trattamento è Leonardo Margiotta. Le richieste che non diventano un lavoro le cancelliamo dopo 12 mesi. Trovi tutti i dettagli nell’informativa privacy.",
        },
      ],
    },

    finalCta: {
      headline: "Mandaci il link. {em}Ti rispondiamo noi{/em}.",
      lead: leadForm
        ? "Guardiamo il tuo annuncio e prepariamo la tua prima bozza da aprire sul telefono. Ti rispondiamo entro 1 giorno lavorativo e la bozza arriva in 48 ore, su WhatsApp o via email."
        : "Guardiamo il tuo annuncio e prepariamo la tua prima bozza da aprire sul telefono. Ti rispondiamo entro 1 giorno lavorativo e la bozza arriva in 48 ore, via email. Preferisci WhatsApp? Lasciaci il numero nella mail.",
      hook: "In più ti diamo 3 consigli concreti sul tuo annuncio, entro 2 giorni lavorativi.",
      next: {
        title: "Cosa succede dopo",
        steps: [
          "Leggiamo il tuo annuncio: offerta, tono, a chi parli.",
          "Prepariamo la bozza su un indirizzo di prova.",
          "Te la mandiamo: la apri dal telefono e ci dici cosa ne pensi.",
        ],
      },
      preview: { forName: "Bozza per", fallbackName: "te", from: "dal tuo annuncio su", title: "La tua offerta, come nell’annuncio", note: "Anteprima illustrativa: si aggiorna mentre compili." },
      cta: "Mandaci il tuo annuncio",
    },

    form: {
      steps: { link: "Il tuo annuncio", goal: "Cosa deve fare chi arriva?", contact: "Dove ti rispondiamo?" },
      goal: {
        optional: "Facoltativo",
        options: [
          { value: "whatsapp", label: "Scriverti su WhatsApp", button: "Scrivici su WhatsApp" },
          { value: "chiamata", label: "Chiamarti", button: "Chiamaci ora" },
          { value: "preventivo", label: "Chiedere un preventivo", button: "Chiedi un preventivo" },
          { value: "prenotazione", label: "Prenotare", button: "Prenota ora" },
        ],
      },
      payment: priced({
        legend: "Se la bozza ti convince, come preferisci pagare?",
        optional: "Facoltativo",
        options: [
          {
            value: "una-volta",
            label: `Una volta sola, ${eur(PRICING.launch)}`,
            text: `Hosting incluso per 12 mesi, poi ${eur(PRICING.hostingYear)} all’anno. Le modifiche dopo i primi 30 giorni vanno a preventivo.`,
          },
          {
            value: "abbonamento",
            label: `Abbonamento, ${eur(PRICING.monthly)} al mese`,
            text: `Modifiche ai contenuti illimitate, hosting, SSL e report mensile inclusi. Minimo 3 mesi, poi disdici con 30 giorni di preavviso. Puoi metterlo in pausa a ${eur(PRICING.paused)} al mese per tenere la pagina online.`,
          },
        ],
      }),
      calc: { label: "Dal calcolatore", remove: "Togli i numeri del calcolatore" },
      plan: { label: "Piano scelto", remove: "Togli il piano scelto" },
      quote: { label: "Preventivo", remove: "Togli il preventivo" },
      checkoutCta: "Paga e inizia",
      progress: { of: "di 3", ready: "Pronto da inviare", label: "Domande completate" },
      cardTitle: "La tua bozza",
      cardSub: "Tre domande. Il resto è facoltativo.",
      more: {
        summary: "Vuoi una prova più vicina al risultato finale? Qualche dettaglio in più",
        optional: "Tutto facoltativo",
        attivita: { label: "Che attività hai?", placeholder: "Es. palestra, pizzeria, studio dentistico" },
        offerta: { label: "Cosa offri nell’annuncio?", placeholder: "Es. prima lezione gratis, sconto sul primo ordine" },
        zona: { label: "Dove lavori?", placeholder: "Es. Treviso e provincia" },
        sito: { label: "Sito o pagina con logo e colori", placeholder: "Se ce l’hai: da lì prendiamo logo e colori" },
        tono: {
          legend: "Come vuoi che parli la pagina?",
          options: [
            { value: "diretto", label: "Diretta" },
            { value: "amichevole", label: "Amichevole" },
            { value: "elegante", label: "Elegante" },
          ],
        },
        note: { label: "Altro che dobbiamo sapere?", placeholder: "Orari, cosa ti distingue, cosa non vuoi vedere…" },
      },
      monitor: {
        label: "Anteprima dal vivo",
        hint: "Si aggiorna mentre compili.",
        sticker: "Bozza fatta in 0,2 secondi da un modulo. Quella vera la scriviamo noi, ed è molto meglio.",
        nav: ["Offerta", "Dove siamo", "Contatti"],
        perks: ["Risposta rapida", "Nessun impegno", "Vicino a te"],
        fallbackTitle: "La tua offerta, come nell’annuncio",
        fallbackText: "Due righe chiare su cosa ottiene chi arriva.",
        in: "a",
        by: "Bozza per",
      },
      printer: {
        label: "Riepilogo della tua bozza",
        brand: "BESA",
        status: { draft: "Si compila mentre scrivi", printing: "Stampiamo il riepilogo…", complete: "Ricevuto: ci pensiamo noi" },
        title: "Bozza",
        forName: "per",
        fallbackName: "te",
        rows: { attivita: "Attività", offerta: "Offerta", zona: "Zona", annuncio: "Annuncio", sito: "Logo/colori", obiettivo: "Pulsante", tono: "Tono", piano: "Piano" },
        empty: "da capire insieme",
        sections: "Cosa ci sarà",
        sectionList: ["Titolo preso dal tuo annuncio", "La tua offerta, spiegata in breve", "Un solo pulsante"],
        delivery: "Arriva su un indirizzo di prova",
        eta: "Prima bozza: entro 48 ore",
        download: "Scarica il riepilogo",
        file: "besa-riepilogo-bozza.txt",
        thanks: "Grazie!",
        note: "Riepilogo illustrativo di quello che ci hai scritto.",
      },
      reassure: V
        ? "Ti rispondiamo entro 1 giorno lavorativo. La prima bozza arriva in 48 ore, senza impegno."
        : "Ti rispondiamo entro 1 giorno lavorativo. La prima bozza arriva in 48 ore e la vedi prima di pagare.",
      fields: {
        name: {
          label: "Nome",
          placeholder: "Come ti chiami",
          error: "Scrivi il tuo nome.",
        },
        contact: {
          label: "WhatsApp o email",
          placeholder: "Numero o email",
          error: "Inserisci un numero WhatsApp o un’email valida.",
        },
        link: {
          label: "Link dell’annuncio o @profilo Instagram",
          hint: "Va bene anche solo il tuo @profilo, o il link della pagina Facebook: l’annuncio lo troviamo noi.",
          placeholder: "Link o @tuoprofilo",
          error: "Incolla il link dell’annuncio o scrivi il tuo @profilo Instagram.",
        },
      },
      privacy: {
        label: "Ho letto l’informativa privacy e accetto che mi ricontattiate per rispondere a questa richiesta.",
        linkLabel: "informativa privacy",
        error: "Per inviare la richiesta devi accettare la privacy.",
      },
      submit: "Voglio la mia bozza",
      submitting: "Invio in corso…",
      success: {
        title: "Ricevuto, grazie.",
        text: "Guardiamo il tuo annuncio, prepariamo la tua bozza. Ti rispondiamo entro 1 giorno lavorativo e la bozza arriva entro 48 ore. Intanto stampiamo il riepilogo di quello che ci hai scritto.",
      },
      errors: {
        generic: "Non siamo riusciti a inviare. Riprova tra poco o scrivici a info@besaweb.com.",
        network: "Sembra che manchi la connessione. Controlla e riprova.",
      },
    },

    eli5: {
      title: "Facile facile.",
      close: "Chiudi",
      scene: "Immagina un cartellone che porta gente dentro la tua attività, e ogni persona che entra la paghi tu. Appena dentro, però, trova un corridoio con dieci porte e nessuna indicazione chiara: molti si perdono e tornano indietro. Eppure quella persona l’hai già pagata, perché il cartellone te la portasse dentro. BESA risolve proprio questo: dice a chi entra cosa fare e quale porta aprire.",
      before: "Oggi",
      after: "Con BESA",
      beforeNote: "Dieci porte, nessuna insegna",
      afterNote: "Una porta: scrivici qui",
      blocks: [
        {
          title: "Il problema che non vedi",
          text: "Paghi affinché il tuo annuncio venga cliccato, ma poi mandi le persone sul tuo profilo social o su un sito generico. Lì non capiscono cosa fare né come contattarti e, se non sono davvero motivate, se ne vanno. Tu hai pagato il click e non hai ottenuto niente.",
        },
        {
          title: "Cosa facciamo noi",
          text: "Creiamo la pagina che si apre quando qualcuno clicca il tuo annuncio. Riprende i contenuti dell’annuncio, dice con precisione cosa offri e rende facile il passo successivo: chiamarti, scriverti, prendere un appuntamento. Nella nostra metafora, apriamo una porta sola.",
        },
        {
          title: "Come lavoriamo",
          text: V
            ? `Ci mandi il link del tuo annuncio o del tuo profilo e ci dici cosa vuoi ottenere. Noi prepariamo una bozza della pagina, che apri facilmente dal telefono. Se ti piace, la mettiamo online per ${setup}, la colleghiamo all’annuncio e dopo un mese vediamo insieme se ti arrivano più contatti.`
            : "Ci mandi il link del tuo annuncio o del tuo profilo e ci dici cosa vuoi ottenere. Noi prepariamo una bozza della pagina, gratis, che apri facilmente dal telefono. Se ti piace, paghi, la colleghi all’annuncio e vediamo insieme se ti arrivano più contatti.",
        },
      ],
      closer: "Stesso annuncio, stesso budget. Cambia solo dove atterra chi clicca.",
      done: "Ho capito, mandaci l’annuncio",
    },

    spec: {
      title: "Scheda tecnica",
      subtitle: "Per chi vuole vedere cosa c’è sotto. Tutto misurato su questa pagina.",
      close: "Chiudi",
      done: "Chiudi la scheda",
      scoresLabel: "Lighthouse 12, mobile, rete lenta simulata",
      scores: [
        { value: "99", label: "Prestazioni" },
        { value: "100", label: "Accessibilità" },
        { value: "96", label: "Buone pratiche" },
        { value: "100", label: "SEO" },
      ],
      groups: [
        {
          title: "Velocità da telefono",
          rows: [
            ["Primo contenuto visibile (FCP)", "1,3 s"],
            ["Contenuto principale (LCP)", "2,0 s"],
            ["Blocco del thread (TBT)", "0 ms"],
            ["Spostamenti di layout (CLS)", "0"],
            ["Risposta del server (TTFB)", "4 ms"],
            ["Peso totale trasferito", "173 KB"],
          ],
        },
        {
          title: "Come è costruita",
          rows: [
            ["Generazione", "Pagine HTML pronte in anticipo (Astro, statico)"],
            ["Stile", "Tailwind CSS 4, incluso nella pagina"],
            ["JavaScript", "Circa 10 KB, nessun framework lato client"],
            ["Font", "Inter ospitato da noi (niente Google Fonts): variabile in tondo, corsivo solo nel peso usato"],
            ["Immagini", "2 file, 8 KB in tutto"],
            ["Consegna", "Compressione Brotli, cache di un anno sui file con hash"],
          ],
        },
        {
          title: "Sicurezza e privacy",
          rows: [
            ["Intestazioni", "CSP restrittiva, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy"],
            ["Cookie", "Zero su questa pagina"],
            ["Statistiche", "Umami ospitato da noi, rispetta Do Not Track"],
            leadForm
              ? ["Modulo", "Validazione lato server, honeypot, limite di richieste, Cloudflare Turnstile invisibile"]
              : ["Contatti", "Email diretta: nessun modulo, nessun dato inviato al nostro server"],
          ],
        },
        {
          title: "Accessibilità e SEO",
          rows: [
            ["WCAG 2.1 AA", "0 violazioni (axe-core)"],
            ["Movimento", "Le animazioni si spengono con «riduci movimento»"],
            ["Dati strutturati", sections.faq ? "JSON-LD: Organization, Service, FAQPage" : "JSON-LD: Organization, Service"],
            ["Indicizzazione", "Sitemap, canonical, lingua it"],
          ],
        },
        {
          title: "Nelle pagine dei clienti",
          rows: [
            ["Tracciamento", "Pixel di Meta, evento Lead all’invio del modulo e al click su WhatsApp"],
            ["Cookie", "Banner incluso, perché il Pixel lo richiede"],
            ["Incluso", "Hosting, certificato SSL, email con i contatti"],
          ],
        },
      ],
      note: "Misurato a novembre 2026 (Lighthouse 12.8, mediana di 3 prove) sulla versione di produzione di questa pagina, in locale. Il 96 di Buone pratiche viene da un errore in console dello script di statistiche, che in locale non risponde.",
    },

    footer: {
      slogan: "Landing page per chi fa pubblicità su Meta.",
      email: "info@besaweb.com",
      // Ragione sociale, P.IVA e sede si inseriscono dal pannello (Contatti e dati aziendali).
      legalLine: legalLine(),
      links: {
        privacy: "Privacy",
        cookie: "Cookie",
        terms: "Termini",
      },
      columns: { page: "Pagina", contact: "Contatti", legal: "Legale" },
      rights: "Tutti i diritti riservati.",
    },
  } as const;
}

export const copy = buildCopy(OFFER_MODE);

export type Copy = ReturnType<typeof buildCopy>;
