import Header from "@/components/header";
import Footer from "@/components/footer";
import SEO from "@/components/SEO";

declare global {
  interface Window {
    CookieConsent?: any;
  }
}

export default function PrivacyCookie() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy & Cookie Policy | Besa" 
        description="Informativa sulla privacy e sull'uso dei cookie di BesaWeb." 
      />
      
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 mt-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy & Cookie Policy</h1>
        
        <div className="prose prose-blue max-w-none text-muted-foreground">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Informativa sulla Privacy</h2>
            <p className="mb-4">
              La presente informativa sulla privacy descrive come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali quando visiti il nostro sito web e utilizzi i nostri servizi.
              Ci impegniamo a proteggere la tua privacy in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR).
            </p>
            <h3 className="text-xl font-medium text-foreground mb-3">Dati raccolti</h3>
            <p className="mb-4">
              Raccogliamo le informazioni che ci fornisci volontariamente compilando il modulo di contatto, come il tuo nome, indirizzo email e altre informazioni rilevanti per la tua richiesta.
            </p>
            <h3 className="text-xl font-medium text-foreground mb-3">Email di Contatto</h3>
            <p className="mb-4">
              Puoi inviare qualsiasi richiesta o dubbio relativo ai tuoi dati e alla privacy scrivendoci all'indirizzo: <a href="mailto:info@besaweb.com" className="text-primary hover:underline">info@besaweb.com</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Cookie Policy</h2>
            <p className="mb-4">
              Utilizziamo i cookie per migliorare la tua esperienza di navigazione, analizzare il traffico del sito e personalizzare i contenuti. 
              Puoi gestire o revocare il tuo consenso in qualsiasi momento attraverso il banner dei cookie situato in basso.
            </p>
            <h3 className="text-xl font-medium text-foreground mb-3">Cookie di terze parti</h3>
            <p className="mb-4">
              Il nostro sito include servizi di terze parti (come Google Analytics, disabilitato di default senza il tuo consenso esplicito) che potrebbero impostare cookie analitici o di profilazione.
            </p>
            
            <button 
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow"
              onClick={() => {
                if (window.CookieConsent) {
                  window.CookieConsent.showPreferences();
                } else {
                  alert("Impostazioni dei cookie attualmente non disponibili.");
                }
              }}
            >
              Gestisci le tue Preferenze sui Cookie
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
