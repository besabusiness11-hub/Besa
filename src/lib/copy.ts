// Copy IT per la landing BESA. Solo dati, nessuna logica.
// Token enfasi: {em}…{/em}. Ogni lacuna e’ marcata [TODO: …].

export const copy = {
  meta: {
    title: "Landing page per Meta Ads: più messaggi | BESA",
    description:
      "Hai inserzioni Facebook o Instagram attive? Mandaci il link: costruiamo la landing page che porta chi clicca a scriverti, senza cambiare annuncio.",
  },

  nav: {
    cta: "Invia annuncio",
    links: [
      { label: "Fai due conti", href: "#problema" },
      { label: "Come funziona", href: "#come-funziona" },
      { label: "Cosa include", href: "#cosa-include" },
      { label: "Piani", href: "#piani" },
      { label: "Chi siamo", href: "#chi-siamo" },
      { label: "FAQ", href: "#faq" },
    ],
  },

  hero: {
    kicker: "Landing page per chi fa Meta Ads",
    headline: "Più messaggi dai click {em}che già paghi{/em}.",
    lead: "Mandaci il link del tuo annuncio Facebook o Instagram: costruiamo la pagina che porta chi clicca a scriverti.",
    cta: "Mandaci il tuo annuncio",
    note: "Ci basta un link. Il resto lo facciamo noi.",
    chips: ["Non cambi annuncio", "La provi prima di decidere", "Un solo pulsante: scrivere a te"],
    compare: {
      legend: "Dove arriva chi clicca il tuo annuncio",
      before: "Oggi",
      after: "Con BESA",
      captionBefore: "Atterra sul profilo: mille cose, nessuna domanda. Guarda, non trova, se ne va.",
      captionAfter: "Atterra su una pagina fatta per quell’annuncio: stessa offerta, un pulsante. E ti scrive.",
      note: "Esempio illustrativo",
      ad: { name: "La tua attività", sponsored: "Sponsorizzato", offer: "La tua offerta", cta: "Scopri di più" },
      profile: { handle: "latuaattivita", link: "link in bio", doubts: ["Dove scrivo?", "Quanto costa?", "Era questa l’offerta?"] },
      landing: { title: "La tua offerta, come nell’annuncio", text: "Due righe chiare su cosa ottieni.", button: "Scrivici su WhatsApp" },
      toast: { app: "WhatsApp", text: "Ciao! Ho visto l’annuncio, vorrei sapere di più." },
    },
  },

  problem: {
    headline: "Quanto ti costa {em}chi clicca e se ne va{/em}?",
    lead: "Metti i tuoi numeri. Il conto si fa qui, nel tuo browser: non salviamo niente.",
    defaultsNote: "Valori di esempio: metti i tuoi.",
    less: "Diminuisci",
    more: "Aumenta",
    inputs: {
      budget: { label: "Spendi in inserzioni al mese", min: 50, max: 5000, step: 50, value: 300 },
      cpc: { label: "Paghi ogni click, più o meno", min: 0.1, max: 3, step: 0.05, value: 0.5 },
      msgs: { label: "Messaggi che ricevi al mese", min: 0, max: 150, step: 1, value: 6 },
    },
    results: {
      clicks: "click pagati al mese",
      title: "Il tuo mese di inserzioni",
      gone: "se ne vanno senza scriverti",
      perMsg: "ti costa ogni messaggio",
      perMsgNone: "nessun messaggio: ogni euro va via così",
      dotsPre: "Su 100 persone che cliccano, oggi ti scrivono",
      dotsLegendWrote: "ti scrive",
      dotsLegendGone: "se ne va",
    },
    closing: "Di solito il problema non è l’annuncio: è la pagina dove arriva chi clicca. Lì lavoriamo noi.",
    note: "Solo aritmetica sui numeri che inserisci. Non è una previsione.",
  },

  fix: {
    headline: "Un annuncio, una pagina, {em}un’azione{/em}.",
    lead: "Stesse parole dell’inserzione, un solo pulsante, niente da cercare.",
  },

  howItWorks: {
    headline: "Come funziona: {em}mandi un link{/em}, al resto pensiamo noi.",
    steps: [
      {
        title: "Mandi il link del tuo annuncio",
        text: "Nome, WhatsApp o email, link all’inserzione (o al profilo). Tre campi.",
      },
      {
        title: "Costruiamo la landing da lì",
        text: "Partiamo da cosa prometti nell’annuncio: scriviamo i testi e prepariamo la pagina. Prima di andare online la vedi tu. [TODO: tempi di consegna dichiarati, da confermare con Benito]",
      },
      {
        title: "La pagina va online",
        text: "Ti diciamo dove collegarla alle inserzioni. Poi guardiamo insieme com’è andata e cosa fare dopo.",
      },
    ],
    pasteExample: "facebook.com/ads/library/?id=…",
    demoTitle: "Prova prima di decidere",
    demoNote:
      "All’inizio la pagina vive su un indirizzo di prova, non sul tuo dominio. Così puoi vederla e provarla dal telefono prima di decidere.",
    demoUrl: "indirizzo-di-prova/la-tua-pagina",
    demoIllustrative: "Indirizzo illustrativo: quello vero ti arriva con la pagina.",
  },

  inside: {
    headline: "Cosa c’è dentro la pagina.",
    features: [
      {
        title: "Titolo preso dal tuo annuncio",
        text: "Chi arriva ritrova la stessa promessa e capisce subito di essere nel posto giusto.",
      },
      {
        title: "Pulsante per contattarti",
        text: "WhatsApp, telefono o modulo: quello che usi davvero per rispondere ai clienti.",
      },
      {
        title: "Testi scritti da noi",
        text: "Brevi e concreti, senza giri di parole. Li scriviamo noi e li controlli tu prima di andare online.",
      },
      {
        title: "Pagina leggera",
        text: "Costruita per caricarsi in fretta dal telefono, anche con poca connessione.",
      },
      {
        title: "Modulo corto",
        text: "Poche domande, perché ogni campo in più fa scappare qualcuno.",
      },
      {
        title: "Tracciamento delle richieste",
        text: "Possiamo collegare la pagina al Pixel di Meta, se lo vuoi. [TODO: confermare con Benito cosa e’ incluso nel tracciamento]",
      },
    ],
  },

  offer: {
    headline: "Scegli come lavoriamo {em}insieme{/em}.",
    lead: "Tre modi, stesso risultato: una landing fatta bene per le tue inserzioni.",
    plans: [
      {
        id: "abbonamento",
        name: "Abbonamento",
        tagline: "Costruiamo la landing e la teniamo aggiornata quando ce lo chiedi.",
        highlight: true,
        price: "[TODO: prezzo]",
        priceNote: "[TODO: periodicità e durata minima]",
        features: [
          "Landing page costruita da noi",
          "Modifiche su tua richiesta: nuova offerta, nuovo annuncio, testi aggiornati",
          "Scrivi a noi direttamente quando serve una modifica",
          "[TODO: numero di modifiche incluse al mese e tempi di risposta]",
        ],
        cta: "Scegli l’abbonamento",
      },
      {
        id: "una-tantum",
        name: "Una tantum",
        tagline: "Una landing, pagata una volta.",
        highlight: false,
        price: "[TODO: prezzo]",
        priceNote: "[TODO: cosa è incluso e per quanto tempo]",
        features: [
          "Una landing page costruita da noi",
          "Consegna e messa online",
          "[TODO: round di revisione inclusi e cosa succede dopo la consegna]",
        ],
        cta: "Scegli una tantum",
      },
      {
        id: "su-misura",
        name: "Su misura",
        tagline: "Più campagne, esigenze particolari o qualcosa fuori dal solito.",
        highlight: false,
        price: "[TODO: prezzo]",
        priceNote: "[TODO: come si definisce il preventivo]",
        features: [
          "Ne parliamo e ti diciamo cosa serve davvero",
          "Preventivo dopo aver visto il tuo caso",
        ],
        cta: "Raccontaci cosa ti serve",
      },
    ],
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
    caseStudies: "[TODO: casi reali con permesso del cliente, quando ci saranno]",
  },

  team: {
    headline: "Chi siamo.",
    lead: "Siamo in due e parli direttamente con noi.",
    members: [
      {
        name: "Leo",
        role: "Business, strategia, marketing e contenuti",
        bio: "[TODO: conferma bio con Leo]",
        photoAlt: "Ritratto di Leo",
      },
      {
        name: "Benito",
        role: "Prodotto e sviluppo tecnico",
        bio: "[TODO: conferma bio con Leo]",
        photoAlt: "Ritratto di Benito",
      },
    ],
  },

  faq: {
    headline: "Domande frequenti.",
    items: [
      {
        q: "Cosa mi serve per partire?",
        a: "Il link a un tuo annuncio (o al tuo profilo Facebook o Instagram) e un recapito per risponderti. Basta il modulo qui sotto: tre campi.",
      },
      {
        q: "Non ho un annuncio attivo. Posso partire lo stesso?",
        a: "[TODO: confermare se partiamo anche senza annuncio attivo, ad esempio da un profilo o da un’offerta descritta a parole]",
      },
      {
        q: "Ho già un sito. Mi serve comunque una landing?",
        a: "Dipende da dove mandi le inserzioni oggi. Il sito di solito parla a tutti e racconta tutto. La landing parla a chi ha cliccato quel preciso annuncio e gli chiede una cosa sola. Le due cose convivono: il sito resta dov’è.",
      },
      {
        q: "Devo cambiare il mio annuncio?",
        a: "No. Partiamo dall’annuncio che hai e costruiamo la pagina in modo coerente. Se vuoi ritoccarlo, ne parliamo, ma non è una condizione.",
      },
      {
        q: "Dove vedo la pagina prima di decidere?",
        a: "All’inizio la pagina vive su un indirizzo di prova, non sul tuo dominio. La apri dal telefono, la provi, e ci dici cosa cambiare. [TODO: cosa succede per passare al dominio del cliente]",
      },
      {
        q: "Serve il Pixel di Meta?",
        a: "Non è obbligatorio per avere la landing. Il Pixel serve a misurare cosa succede dopo il click. Possiamo collegarlo se vuoi. [TODO: confermare con Benito se l’installazione del Pixel è inclusa in ogni piano]",
      },
      {
        q: "Quanto ci vuole per andare online?",
        a: "[TODO: tempi di consegna dichiarati, da confermare con Benito]",
      },
      {
        q: "Chi mi segue dopo la messa online?",
        a: "Siamo noi due, Leo e Benito. Con l’abbonamento puoi chiederci modifiche quando ti servono. [TODO: cosa è incluso dopo la consegna negli altri piani]",
      },
      {
        q: "Gestite voi anche le inserzioni?",
        a: "Il nostro lavoro è la landing page. [TODO: confermare se offriamo anche gestione campagne Meta]",
      },
      {
        q: "Quanto costa?",
        a: "Dipende dal piano che scegli. [TODO: prezzo e condizioni dei tre piani]",
      },
      {
        q: "Posso disdire l’abbonamento?",
        a: "[TODO: condizioni di recesso e preavviso dell’abbonamento]",
      },
      {
        q: "Cosa succede ai dati di chi compila la pagina?",
        a: "Raccogliamo solo i campi che servono per essere ricontattati. Per i dettagli leggi l’informativa privacy. [TODO: link e testo definitivo della privacy, titolare del trattamento]",
      },
    ],
  },

  finalCta: {
    headline: "Mandaci il link. {em}Ti rispondiamo noi{/em}.",
    lead: "Tre campi e hai fatto: nome, recapito, link all’annuncio. Ti rispondiamo su WhatsApp o via email. [TODO: tempo di risposta promesso]",
    cta: "Mandaci il tuo annuncio",
  },

  form: {
    fields: {
      name: {
        label: "Nome",
        placeholder: "Come ti chiami",
        error: "Scrivi il tuo nome.",
      },
      contact: {
        label: "WhatsApp o email",
        placeholder: "Il numero o l’indirizzo dove risponderti",
        error: "Inserisci un numero WhatsApp o un’email valida.",
      },
      link: {
        label: "Link all’annuncio o al profilo",
        placeholder: "Incolla qui il link",
        error: "Incolla il link del tuo annuncio o del tuo profilo.",
      },
    },
    privacy: {
      label: "Ho letto l’informativa privacy e accetto che mi ricontattiate per rispondere a questa richiesta.",
      linkLabel: "informativa privacy",
      error: "Per inviare la richiesta devi accettare la privacy.",
    },
    submit: "Mandaci il tuo annuncio",
    submitting: "Invio in corso…",
    success: {
      title: "Ricevuto, grazie.",
      text: "Guardiamo il tuo annuncio e ti scriviamo noi. [TODO: tempo di risposta promesso]",
    },
    errors: {
      generic: "Non siamo riusciti a inviare. Riprova tra poco o scrivici a info@besaweb.com.",
      network: "Sembra che manchi la connessione. Controlla e riprova.",
    },
  },

  footer: {
    slogan: "Veloce. Pratico. Funzionale.",
    email: "info@besaweb.com",
    legalLine: "[TODO: ragione sociale / P.IVA]",
    links: {
      privacy: "Privacy",
      cookie: "Cookie",
    },
  },
} as const;

export type Copy = typeof copy;
