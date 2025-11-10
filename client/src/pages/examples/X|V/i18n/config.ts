import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  it: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        menu: 'Menu',
        gallery: 'Gallery',
        locations: 'Locations',
        events: 'Events',
        contact: 'Contact'
      },
      hero: {
        title: "L'arte del gusto contemporaneo",
        subtitle: 'Tradizione e creatività si incontrano in ogni piatto.',
        cta: 'Prenota ora',
        scrollDown: 'Scorri per scoprire'
      },
      about: {
        title: 'La nostra filosofia',
        story: {
          title: 'La nostra storia',
          content: 'Dal 2010, X|V rappresenta l\'eccellenza culinaria dove la tradizione incontra l\'innovazione. Ogni piatto racconta una storia di passione e dedizione.'
        },
        philosophy: {
          title: 'La filosofia',
          content: 'Crediamo nell\'utilizzo di ingredienti di stagione di altissima qualità, trasformati con tecniche contemporanee per creare esperienze gastronomiche indimenticabili.'
        },
        chef: {
          title: 'Lo chef',
          content: 'Chef Alessandro Rossi porta la sua visione culinaria unica, combinando formazione Michelin con radici tradizionali italiane.'
        }
      },
      menu: {
        title: 'Il nostro menu',
        subtitle: 'Una selezione dei nostri piatti signature',
        filters: {
          all: 'Tutti',
          antipasti: 'Antipasti',
          main: 'Portate principali',
          dessert: 'Dessert',
          tasting: 'Degustazione'
        },
        downloadPdf: 'Scarica menu PDF'
      },
      gallery: {
        title: 'Gallery',
        subtitle: 'Un viaggio visivo attraverso la nostra cucina'
      },
      locations: {
        title: 'Le nostre sedi',
        subtitle: 'Scopri i nostri ristoranti',
        hours: 'Orari',
        discover: 'Scopri'
      },
      events: {
        title: 'Eventi e servizi',
        subtitle: 'Catering e Chef at Home',
        requestInfo: 'Richiedi informazioni'
      },
      contact: {
        title: 'Prenota un tavolo',
        subtitle: 'Contattaci per una esperienza indimenticabile',
        form: {
          name: 'Nome',
          email: 'Email',
          phone: 'Telefono',
          date: 'Data',
          guests: 'Numero di persone',
          message: 'Messaggio',
          submit: 'Prenota ora',
          success: 'Prenotazione ricevuta! Ti contatteremo presto.'
        }
      },
      footer: {
        followUs: 'Seguici',
        quickLinks: 'Link rapidi',
        copyright: '© 2024 X|V Restaurant. Tutti i diritti riservati.'
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        menu: 'Menu',
        gallery: 'Gallery',
        locations: 'Locations',
        events: 'Events',
        contact: 'Contact'
      },
      hero: {
        title: 'The Art of Contemporary Taste',
        subtitle: 'Where tradition and creativity meet in every dish.',
        cta: 'Reserve now',
        scrollDown: 'Scroll to discover'
      },
      about: {
        title: 'Our Philosophy',
        story: {
          title: 'Our Story',
          content: 'Since 2010, X|V represents culinary excellence where tradition meets innovation. Every dish tells a story of passion and dedication.'
        },
        philosophy: {
          title: 'Our Philosophy',
          content: 'We believe in using the highest quality seasonal ingredients, transformed with contemporary techniques to create unforgettable gastronomic experiences.'
        },
        chef: {
          title: 'The Chef',
          content: 'Chef Alessandro Rossi brings his unique culinary vision, combining Michelin training with traditional Italian roots.'
        }
      },
      menu: {
        title: 'Our Menu',
        subtitle: 'A selection of our signature dishes',
        filters: {
          all: 'All',
          antipasti: 'Starters',
          main: 'Main Courses',
          dessert: 'Desserts',
          tasting: 'Tasting Menu'
        },
        downloadPdf: 'Download PDF Menu'
      },
      gallery: {
        title: 'Gallery',
        subtitle: 'A visual journey through our cuisine'
      },
      locations: {
        title: 'Our Locations',
        subtitle: 'Discover our restaurants',
        hours: 'Hours',
        discover: 'Discover'
      },
      events: {
        title: 'Events & Services',
        subtitle: 'Catering and Chef at Home',
        requestInfo: 'Request Information'
      },
      contact: {
        title: 'Reserve a Table',
        subtitle: 'Contact us for an unforgettable experience',
        form: {
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          date: 'Date',
          guests: 'Number of Guests',
          message: 'Message',
          submit: 'Reserve Now',
          success: 'Reservation received! We will contact you soon.'
        }
      },
      footer: {
        followUs: 'Follow Us',
        quickLinks: 'Quick Links',
        copyright: '© 2024 X|V Restaurant. All rights reserved.'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        about: 'À propos',
        menu: 'Menu',
        gallery: 'Galerie',
        locations: 'Emplacements',
        events: 'Événements',
        contact: 'Contact'
      },
      hero: {
        title: "L'art du goût contemporain",
        subtitle: 'Où la tradition rencontre la créativité dans chaque plat.',
        cta: 'Réserver',
        scrollDown: 'Faites défiler pour découvrir'
      },
      about: {
        title: 'Notre Philosophie',
        story: {
          title: 'Notre Histoire',
          content: 'Depuis 2010, X|V représente l\'excellence culinaire où la tradition rencontre l\'innovation. Chaque plat raconte une histoire de passion et de dévouement.'
        },
        philosophy: {
          title: 'Notre Philosophie',
          content: 'Nous croyons en l\'utilisation d\'ingrédients de saison de la plus haute qualité, transformés avec des techniques contemporaines pour créer des expériences gastronomiques inoubliables.'
        },
        chef: {
          title: 'Le Chef',
          content: 'Le Chef Alessandro Rossi apporte sa vision culinaire unique, combinant une formation Michelin avec des racines traditionnelles italiennes.'
        }
      },
      menu: {
        title: 'Notre Menu',
        subtitle: 'Une sélection de nos plats signature',
        filters: {
          all: 'Tous',
          antipasti: 'Entrées',
          main: 'Plats Principaux',
          dessert: 'Desserts',
          tasting: 'Menu Dégustation'
        },
        downloadPdf: 'Télécharger le menu PDF'
      },
      gallery: {
        title: 'Galerie',
        subtitle: 'Un voyage visuel à travers notre cuisine'
      },
      locations: {
        title: 'Nos Emplacements',
        subtitle: 'Découvrez nos restaurants',
        hours: 'Horaires',
        discover: 'Découvrir'
      },
      events: {
        title: 'Événements et Services',
        subtitle: 'Traiteur et Chef à Domicile',
        requestInfo: 'Demander des informations'
      },
      contact: {
        title: 'Réserver une Table',
        subtitle: 'Contactez-nous pour une expérience inoubliable',
        form: {
          name: 'Nom',
          email: 'Email',
          phone: 'Téléphone',
          date: 'Date',
          guests: 'Nombre de personnes',
          message: 'Message',
          submit: 'Réserver maintenant',
          success: 'Réservation reçue! Nous vous contacterons bientôt.'
        }
      },
      footer: {
        followUs: 'Suivez-nous',
        quickLinks: 'Liens Rapides',
        copyright: '© 2024 X|V Restaurant. Tous droits réservés.'
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        about: 'Acerca de',
        menu: 'Menú',
        gallery: 'Galería',
        locations: 'Ubicaciones',
        events: 'Eventos',
        contact: 'Contacto'
      },
      hero: {
        title: 'El arte del sabor contemporáneo',
        subtitle: 'Donde la tradición y la creatividad se encuentran en cada plato.',
        cta: 'Reservar',
        scrollDown: 'Desplázate para descubrir'
      },
      about: {
        title: 'Nuestra Filosofía',
        story: {
          title: 'Nuestra Historia',
          content: 'Desde 2010, X|V representa la excelencia culinaria donde la tradición se encuentra con la innovación. Cada plato cuenta una historia de pasión y dedicación.'
        },
        philosophy: {
          title: 'Nuestra Filosofía',
          content: 'Creemos en el uso de ingredientes de temporada de la más alta calidad, transformados con técnicas contemporáneas para crear experiencias gastronómicas inolvidables.'
        },
        chef: {
          title: 'El Chef',
          content: 'El Chef Alessandro Rossi aporta su visión culinaria única, combinando formación Michelin con raíces tradicionales italianas.'
        }
      },
      menu: {
        title: 'Nuestro Menú',
        subtitle: 'Una selección de nuestros platos estrella',
        filters: {
          all: 'Todos',
          antipasti: 'Entrantes',
          main: 'Platos Principales',
          dessert: 'Postres',
          tasting: 'Menú Degustación'
        },
        downloadPdf: 'Descargar menú PDF'
      },
      gallery: {
        title: 'Galería',
        subtitle: 'Un viaje visual a través de nuestra cocina'
      },
      locations: {
        title: 'Nuestras Ubicaciones',
        subtitle: 'Descubre nuestros restaurantes',
        hours: 'Horario',
        discover: 'Descubrir'
      },
      events: {
        title: 'Eventos y Servicios',
        subtitle: 'Catering y Chef a Domicilio',
        requestInfo: 'Solicitar información'
      },
      contact: {
        title: 'Reservar una Mesa',
        subtitle: 'Contáctanos para una experiencia inolvidable',
        form: {
          name: 'Nombre',
          email: 'Email',
          phone: 'Teléfono',
          date: 'Fecha',
          guests: 'Número de personas',
          message: 'Mensaje',
          submit: 'Reservar ahora',
          success: '¡Reserva recibida! Te contactaremos pronto.'
        }
      },
      footer: {
        followUs: 'Síguenos',
        quickLinks: 'Enlaces Rápidos',
        copyright: '© 2024 X|V Restaurant. Todos los derechos reservados.'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'it',
    fallbackLng: 'it',
    interpolation: {
      escapeValue: false
    }
  }).then(() => {
    console.log('i18n initialized successfully');
  }).catch((error) => {
    console.error('Error initializing i18n:', error);
  });

export default i18n;
