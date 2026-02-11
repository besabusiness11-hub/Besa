// Function to load Google Analytics
function loadGoogleAnalytics() {
    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-H39T246KGX';
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-H39T246KGX');
}

// FUTURE: Function to load Google Ads (uncomment when needed)
// function loadGoogleAds() {
//     // Load Google Ads script
//     const script = document.createElement('script');
//     script.async = true;
//     script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX'; // Replace with your Google Ads ID
//     document.head.appendChild(script);
//     
//     // Initialize Google Ads
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){window.dataLayer.push(arguments);}
//     gtag('js', new Date());
//     gtag('config', 'AW-XXXXXXXXXX'); // Replace with your Google Ads ID
// }

// FUTURE: Function to load Meta Pixel (uncomment when needed)
// function loadMetaPixel() {
//     !function(f,b,e,v,n,t,s)
//     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//     n.queue=[];t=b.createElement(e);t.async=!0;
//     t.src=v;s=b.getElementsByTagName(e)[0];
//     s.parentNode.insertBefore(t,s)}(window, document,'script',
//     'https://connect.facebook.net/en_US/fbevents.js');
//     fbq('init', 'YOUR_PIXEL_ID'); // Replace with your Meta Pixel ID
//     fbq('track', 'PageView');
// }

// Load the CookieConsent library first
async function loadCookieConsentLibrary() {
    return new Promise((resolve, reject) => {
        if (window.CookieConsent) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load CookieConsent library'));
        document.head.appendChild(script);
    });
}

// Wait for splash screen to complete before showing cookie consent
// This will be triggered from the React app
window.initCookieConsent = async function() {
    try {
        await loadCookieConsentLibrary();
        
        window.CookieConsent.run({
            guiOptions: {
                consentModal: {
                    layout: "box inline",
                    position: "bottom right",
                    equalWeightButtons: true,
                    flipButtons: true
                },
                preferencesModal: {
                    layout: "bar",
                    position: "right",
                    equalWeightButtons: true,
                    flipButtons: false
                }
            },
            categories: {
                necessary: {
                    readOnly: true
                },
                analytics: {
                    services: {
                        ga: {
                            label: 'Google Analytics',
                            onAccept: () => {
                                loadGoogleAnalytics();
                            },
                            onReject: () => {
                                console.log('Google Analytics rejected');
                            }
                        }
                    }
                }
             //   marketing: {
                    // FUTURE: Uncomment when you start using these services
                    // services: {
                    //     googleAds: {
                    //         label: 'Google Ads',
                    //         onAccept: () => {
                    //             loadGoogleAds();
                    //         },
                    //         onReject: () => {
                    //             console.log('Google Ads rejected');
                    //         }
                    //     },
                    //     metaPixel: {
                    //         label: 'Meta Pixel',
                    //         onAccept: () => {
                    //             loadMetaPixel();
                    //         },
                    //         onReject: () => {
                    //             console.log('Meta Pixel rejected');
                    //         }
                    //     }
                    // }
             //   }
            },
            language: {
                default: "it",
                translations: {
                    en: {
                        consentModal: {
                            title: "Hello traveller, it's cookie time!",
                            description: "We use cookies to improve your experience on our website. You can manage your preferences or accept all cookies.",
                            acceptAllBtn: "Accept all",
                            acceptNecessaryBtn: "Reject all",
                            showPreferencesBtn: "Manage preferences",
                            footer: "<a href=\"#link\">Privacy Policy</a>"
                        },
                        preferencesModal: {
                            title: "Consent Preferences Center",
                            acceptAllBtn: "Accept all",
                            acceptNecessaryBtn: "Reject all",
                            savePreferencesBtn: "Save preferences",
                            closeIconLabel: "Close modal",
                            serviceCounterLabel: "Service|Services",
                            sections: [
                                {
                                    title: "Cookie Usage",
                                    description: "We use cookies to enhance your browsing experience and analyze our traffic."
                                },
                                {
                                    title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                                    description: "These cookies are essential for the website to function properly. They cannot be disabled.",
                                    linkedCategory: "necessary"
                                },
                                {
                                    title: "Analytics Cookies",
                                    description: "We use analytics cookies to understand how visitors interact with our website. This helps us improve our service.",
                                    linkedCategory: "analytics",
                                    cookieTable: {
                                        headers: {
                                            name: "Service",
                                            domain: "Domain",
                                            description: "Description"
                                        },
                                        body: [
                                            {
                                                name: "Google Analytics",
                                                domain: "google.com",
                                                description: "Tracks website usage and visitor statistics"
                                            }
                                        ]
                                    }
                                },
                                // {
                                //     title: "Marketing Cookies",
                                //     description: "These cookies are used to deliver personalized advertisements and track campaign performance.",
                                //     linkedCategory: "marketing"
                                    // FUTURE: Uncomment and add cookie table when marketing services are active
                                    // cookieTable: {
                                    //     headers: {
                                    //         name: "Service",
                                    //         domain: "Domain",
                                    //         description: "Description"
                                    //     },
                                    //     body: [
                                    //         {
                                    //             name: "Google Ads",
                                    //             domain: "google.com",
                                    //             description: "Tracks ad conversions and campaign performance"
                                    //         },
                                    //         {
                                    //             name: "Meta Pixel",
                                    //             domain: "facebook.com",
                                    //             description: "Tracks Facebook/Instagram ad performance"
                                    //         }
                                    //     ]
                                    // }
                              //  },
                                {
                                    title: "More information",
                                    description: "For any query in relation to our policy on cookies and your choices, please <a class=\"cc__link\" href=\"#contact\">contact us</a>."
                                }
                            ]
                        }
                    },
                    it: {
                        consentModal: {
                            title: "Ciao, è tempo di cookie!",
                            description: "Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito web. Puoi gestire le tue preferenze o accettare tutti i cookie.",
                            acceptAllBtn: "Accetta tutto",
                            acceptNecessaryBtn: "Rifiuta tutto",
                            showPreferencesBtn: "Gestisci preferenze",
                            footer: "<a href=\"#link\">Informativa sulla privacy</a>"
                        },
                        preferencesModal: {
                            title: "Centro preferenze per il consenso",
                            acceptAllBtn: "Accetta tutto",
                            acceptNecessaryBtn: "Rifiuta tutto",
                            savePreferencesBtn: "Salva le preferenze",
                            closeIconLabel: "Chiudi la finestra",
                            serviceCounterLabel: "Servizi",
                            sections: [
                                {
                                    title: "Utilizzo dei Cookie",
                                    description: "Utilizziamo i cookie per migliorare la tua esperienza di navigazione e analizzare il nostro traffico."
                                },
                                {
                                    title: "Cookie Strettamente Necessari <span class=\"pm__badge\">Sempre Attivati</span>",
                                    description: "Questi cookie sono essenziali per il corretto funzionamento del sito web. Non possono essere disabilitati.",
                                    linkedCategory: "necessary"
                                },
                                {
                                    title: "Cookie Analitici",
                                    description: "Utilizziamo cookie analitici per capire come i visitatori interagiscono con il nostro sito web. Questo ci aiuta a migliorare il nostro servizio.",
                                    linkedCategory: "analytics",
                                    cookieTable: {
                                        headers: {
                                            name: "Servizio",
                                            domain: "Dominio",
                                            description: "Descrizione"
                                        },
                                        body: [
                                            {
                                                name: "Google Analytics",
                                                domain: "google.com",
                                                description: "Traccia l'utilizzo del sito e le statistiche dei visitatori"
                                            }
                                        ]
                                    }
                                },
                                // {
                                //     title: "Cookie di Marketing",
                                //     description: "Questi cookie vengono utilizzati per fornire annunci pubblicitari personalizzati e monitorare le prestazioni delle campagne.",
                                //     linkedCategory: "marketing"
                                //     // FUTURE: Decommenta e aggiungi la tabella dei cookie quando i servizi di marketing saranno attivi
                                //     // cookieTable: {
                                //     //     headers: {
                                //     //         name: "Servizio",
                                //     //         domain: "Dominio",
                                //     //         description: "Descrizione"
                                //     //     },
                                //     //     body: [
                                //     //         {
                                //     //             name: "Google Ads",
                                //     //             domain: "google.com",
                                //     //             description: "Traccia le conversioni degli annunci e le prestazioni delle campagne"
                                //     //         },
                                //     //         {
                                //     //             name: "Meta Pixel",
                                //     //             domain: "facebook.com",
                                //     //             description: "Traccia le prestazioni degli annunci su Facebook/Instagram"
                                //     //         }
                                //     //     ]
                                //     // }
                                // },
                                {
                                    title: "Ulteriori informazioni",
                                    description: "Per qualsiasi domanda relativa alla nostra politica sui cookie e alle tue scelte, <a class=\"cc__link\" href=\"#contatto\">contattaci</a>."
                                }
                            ]
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Failed to initialize cookie consent:', error);
    }
};
