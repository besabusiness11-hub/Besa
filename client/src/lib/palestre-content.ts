// client/src/lib/palestre-content.ts
// Single source of truth for all /palestre copy and configuration.
// Future /palestre/[città] pages swap this content without touching layout.

// TODO: replace with live Stripe Payment Link
export const STRIPE_LINK_MONTHLY = "https://buy.stripe.com/TODO_monthly";
// TODO: replace with live Stripe Payment Link
export const STRIPE_LINK_ONETIME = "https://buy.stripe.com/TODO_onetime";
// TODO: replace with real WhatsApp number (international format, digits only)
export const WHATSAPP_NUMBER = "390000000000";
export const WHATSAPP_MESSAGE =
  "Ciao BESA! Ho visto la pagina per le palestre e vorrei saperne di più.";
// TODO: insert real Umami site ID
export const UMAMI_SITE_ID = "TODO-umami-site-id";
// TODO: confirm Umami script host
export const UMAMI_SRC = "https://cloud.umami.is/script.js";

export type GoalId = "free_trial" | "trust" | "information" | "contact";

export interface Goal {
  id: GoalId;
  icon: string;
  label: string;
  description: string;
  default?: boolean;
  /** Bumper-plate accent color for this goal */
  color: string;
  sections: string[];
}

export type FeatureIconKey =
  | "calendar-check"
  | "star"
  | "clock"
  | "dumbbell"
  | "image"
  | "users"
  | "quote"
  | "tag"
  | "help-circle"
  | "map-pin"
  | "message-circle"
  | "instagram";

export interface PalestreContent {
  /** Optional city for future /palestre/[città] pages; undefined = generic page */
  cityName?: string;
  meta: { title: string; description: string; ogImage: string };
  header: { ctaLabel: string };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    stat: { figure: string; followUp: string };
  };
  problema: { title: string; body: string };
  comeFunziona: {
    title: string;
    steps: { title: string; body: string }[];
  };
  configurator: { title: string; intro: string; microcopy: string };
  goals: Goal[];
  featureGrid: {
    title: string;
    items: { icon: FeatureIconKey; label: string }[];
  };
  educational: { title: string; paragraphs: string[] }[];
  photoTeaser: { title: string; body: string; ctaLabel: string; ctaHref: string };
  pricing: {
    title: string;
    monthly: {
      badge: string;
      name: string;
      price: string;
      period: string;
      bullets: string[];
      ctaLabel: string;
    };
    onetime: {
      name: string;
      price: string;
      period: string;
      bullets: string[];
      ctaLabel: string;
    };
    clarifier: string;
  };
  faq: { title: string; items: { question: string; answer: string }[] };
  // TODO: add real testimonials once available — never invent content here
  testimonials: { name: string; gym: string; quote: string; photo: string }[];
  finalCta: { title: string; body: string; ctaLabel: string; whatsappLabel: string };
  footer: { line: string; privacyHref: string };
}

export const palestreContent: PalestreContent = {
  meta: {
    title: "Sito web per palestre in 48 ore | BESA",
    description:
      "Creare un sito per la tua palestra non è mai stato così semplice: una pagina su misura, prenotazioni nel tuo Google Calendar, online in 48 ore. Facciamo tutto noi.",
    // TODO: replace with real OG image asset once available
    ogImage: "/og-palestre.jpg",
  },
  header: { ctaLabel: "Attiva la tua palestra" },
  hero: {
    eyebrow: "Per palestre, box e centri fitness",
    headline:
      "Una pagina, fatta su misura per la tua palestra, pensata per riempire le prove gratuite.",
    subheadline:
      "Un sito web pensato apposta per palestre: online in 48 ore, con l'ottimizzazione della tua scheda Google inclusa. Tu non tocchi niente di tecnico — facciamo tutto noi.",
    primaryCta: { label: "Attiva ora", href: "#prezzi" },
    // TODO: replace with real demo site URL once one exists
    secondaryCta: { label: "Guarda un esempio", href: "#configuratore" },
    stat: {
      figure: "Il 45% delle palestre italiane non ha ancora un sito web.",
      followUp: "Chi ce l'ha, si prende le prove gratuite delle altre.",
    },
  },
  problema: {
    title: "Prima di entrare, ti cercano online",
    body: "Prima di mettere piede in palestra, le persone ti cercano su Google e su Instagram. Se trovano poco o niente — o qualcosa che sembra abbandonato — passano alla palestra successiva. Non ti chiamano per chiedere informazioni: semplicemente spariscono.",
  },
  comeFunziona: {
    title: "Come funziona",
    steps: [
      {
        title: "Scegli l'obiettivo del tuo sito",
        body: "Prove gratuite, fiducia, informazioni o contatto: decidi tu cosa deve fare la tua pagina.",
      },
      {
        title: "Compila un modulo veloce",
        body: "Foto, orari e il link del tuo Google Calendar. Dieci minuti, non di più.",
      },
      {
        title: "Ricevi il sito in 48 ore",
        body: "Pronto, online, con il tuo brand. Senza riunioni e senza tecnicismi.",
      },
      {
        title: "Le prenotazioni arrivano dritte nel tuo Google Calendar",
        body: "Nessun sistema nuovo da imparare: vedi le prove prenotate dove guardi già ogni giorno.",
      },
    ],
  },
  configurator: {
    title: "Qual è l'obiettivo della tua palestra?",
    intro: "Scegli un obiettivo e guarda come cambia il tuo sito.",
    microcopy:
      "Questo è solo il punto di partenza — personalizziamo tutto il resto (foto, colori, testi) quando attivi.",
  },
  goals: [
    {
      id: "free_trial",
      icon: "🎯",
      label: "Prove gratuite",
      description: "Convertire i visitatori in prove prenotate",
      default: true,
      color: "#C8102E",
      sections: [
        "Hero con CTA prenotazione",
        "Prenotazione (Google Calendar)",
        "Recensioni Google",
        "Orari dei corsi",
        "Trainer",
        "Galleria",
        "WhatsApp",
      ],
    },
    {
      id: "trust",
      icon: "🤝",
      label: "Fiducia",
      description: "Convincere che è la palestra giusta",
      color: "#0057B7",
      sections: [
        "Hero",
        "Recensioni Google (in evidenza)",
        "Trainer dettagliati",
        "Galleria ricca",
        "Chi siamo / la storia",
        "Testimonianze e trasformazioni",
        "WhatsApp",
      ],
    },
    {
      id: "information",
      icon: "ℹ️",
      label: "Informazioni",
      description: "Fornire tutte le informazioni essenziali",
      color: "#FFB81C",
      sections: [
        "Hero",
        "Orari completi",
        "Prezzi / listino",
        "Corsi e servizi",
        "FAQ",
        "Mappa, orari, parcheggio",
        "Contatti",
      ],
    },
    {
      id: "contact",
      icon: "💬",
      label: "Contatto",
      description: "Facilitare il contatto immediato",
      color: "#009A44",
      sections: [
        "Hero",
        "Pulsante WhatsApp grande",
        "Telefono (click-to-call)",
        "Form di contatto",
        "Mappa + orari",
        "Social",
      ],
    },
  ],
  featureGrid: {
    title: "Tutto quello che il tuo sito può includere",
    items: [
      { icon: "calendar-check", label: "Prenotazione Google Calendar" },
      { icon: "star", label: "Recensioni Google" },
      { icon: "clock", label: "Orari corsi" },
      { icon: "dumbbell", label: "Trainer" },
      { icon: "image", label: "Galleria" },
      { icon: "users", label: "Chi siamo" },
      { icon: "quote", label: "Testimonianze" },
      { icon: "tag", label: "Prezzi" },
      { icon: "help-circle", label: "FAQ" },
      { icon: "map-pin", label: "Mappa" },
      { icon: "message-circle", label: "WhatsApp" },
      { icon: "instagram", label: "Feed Instagram" },
    ],
  },
  educational: [
    {
      title: "Perché offrire una prova gratuita conviene alla tua palestra",
      paragraphs: [
        "Iscriversi a una palestra è una decisione che richiede fiducia — nello spazio, negli istruttori, nel fatto che valga i propri soldi. Una prova gratuita abbassa quella barriera: chi è curioso può provare senza impegno, invece di dover decidere alla cieca.",
        "Chi prenota una prova ed effettivamente si presenta è una persona che ha già superato la parte più difficile — ha scelto la tua palestra tra le altre. Da lì, il lavoro di convincerla a iscriversi è molto più semplice che partire da zero con un contatto freddo.",
        "Il punto debole, di solito, non è l'offerta della prova gratuita — è renderla facile da prenotare. Un modulo scomodo, una telefonata da fare in orario d'ufficio, un messaggio che resta senza risposta: sono tutti ostacoli che fanno perdere persone già interessate. Un sito con la prenotazione integrata nel tuo Google Calendar toglie ogni attrito: la persona sceglie l'orario, tu la vedi arrivare, senza passaggi in mezzo.",
      ],
    },
    {
      title: "La scheda Google non basta (ma è un ottimo inizio)",
      paragraphs: [
        "Molte palestre esistono online solo tramite la loro scheda Google Maps. È un buon punto di partenza — è spesso il primo posto dove qualcuno ti trova — ma è anche il posto dove la maggior parte del lavoro di convincere qualcuno si ferma. Non c'è modo di raccontare chi siete, mostrare i corsi, presentare i trainer, o soprattutto lasciare che qualcuno prenoti una prova su due piedi.",
        "Il servizio include comunque l'ottimizzazione della tua scheda Google Business — perché restare trovabili lì è importante — ma il sito è quello che trasforma \"mi hanno trovato\" in \"hanno prenotato una prova\".",
      ],
    },
  ],
  photoTeaser: {
    title: "Sei nella zona?",
    body: "Per le palestre entro un'ora di macchina da noi, offriamo anche uno shooting fotografico professionale — foto vere del tuo spazio, dei tuoi corsi, dei tuoi trainer, pronte anche per Instagram.",
    ctaLabel: "Scoprilo quando attivi",
    ctaHref: "#prezzi",
  },
  pricing: {
    title: "Quanto costa un sito per la tua palestra",
    monthly: {
      badge: "Consigliato",
      name: "Abbonamento",
      price: "49€",
      period: "/mese, tutto incluso",
      bullets: [
        "Sito e hosting inclusi",
        "Ottimizzazione Google Maps",
        "Aggiornamenti dei contenuti quando vuoi (orari, promo, foto nuove)",
        "Nessun costo di attivazione",
        "Disdici quando vuoi",
      ],
      ctaLabel: "Attiva l'abbonamento",
    },
    onetime: {
      name: "Una tantum",
      price: "690€",
      period: "una volta + 99€/anno di hosting",
      bullets: [
        "Il sito è tuo, lo paghi una volta sola",
        "Hosting a 99€/anno",
        "Aggiornamenti dei contenuti a richiesta, non inclusi",
      ],
      ctaLabel: "Scegli una tantum",
    },
    clarifier:
      "La differenza vera è negli aggiornamenti: nell'abbonamento sono sempre inclusi, nell'una tantum sono a richiesta.",
  },
  faq: {
    title: "Domande frequenti",
    items: [
      {
        question: "Quanto ci vuole per avere il sito online?",
        answer:
          "48 ore dalla compilazione del modulo. Ci mandi foto, orari e il link del tuo Google Calendar, e in due giorni il sito è online.",
      },
      {
        question: "Devo saper usare qualcosa di tecnico?",
        answer:
          "No. Colleghi solo il tuo account Google per le prenotazioni; a tutto il resto pensiamo noi.",
      },
      {
        question: "Ho già una pagina Instagram o Facebook, mi serve comunque un sito?",
        answer:
          "Instagram fa scoprire la tua palestra; il sito è dove chi è interessato prenota davvero una prova. Lavorano insieme, non si sostituiscono.",
      },
      {
        question: "Posso disdire quando voglio?",
        answer: "Sì, l'abbonamento si può disdire in qualsiasi momento.",
      },
      {
        question: "Come funzionano le prenotazioni?",
        answer:
          "Arrivano dritte nel tuo Google Calendar, tramite il tuo account Gmail. Nessun sistema nuovo da imparare.",
      },
      {
        question: "Cosa succede se voglio cambiare qualcosa dopo?",
        answer:
          "Con l'abbonamento gli aggiornamenti sono inclusi: ci scrivi cosa cambiare e lo aggiorniamo noi. Con l'una tantum sono a richiesta.",
      },
      {
        question: "Offrite anche fotografia professionale?",
        answer:
          "Sì, per le palestre entro un'ora di macchina da noi. Lo verifichiamo insieme quando attivi.",
      },
    ],
  },
  // TODO: add real testimonials once available — never invent content here
  testimonials: [],
  finalCta: {
    title: "La tua palestra, online in 48 ore.",
    body: "Scegli il piano, compila il modulo, e pensa solo ad allenare. Al resto pensiamo noi.",
    ctaLabel: "Attiva la tua palestra",
    whatsappLabel: "Scrivici su WhatsApp",
  },
  footer: {
    line: "BESA — siti web per palestre e centri fitness",
    privacyHref: "/privacy-policy",
  },
};
