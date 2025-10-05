import { CheckCircle, TrendingUp, Users, Clock, Sparkles, ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Suppliers() {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Gestione Autonoma",
      description: "Dashboard dedicata per gestire prodotti, ordini e statistiche"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Visibilità Nazionale",
      description: "Raggiungi clienti professionali in tutta Italia"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Supporto Dedicato",
      description: "Team di assistenza sempre disponibile per aiutarti"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Commissioni Competitive",
      description: "Tariffe trasparenti e vantaggiose per i tuoi servizi"
    }
  ];

  const stats = [
    { value: "500+", label: "Fornitori Attivi" },
    { value: "€2.5M", label: "Volume Mensile" },
    { value: "95%", label: "Soddisfazione" },
    { value: "24/7", label: "Supporto" }
  ];

  const steps = [
    {
      number: "1",
      title: "Registrazione",
      description: "Compila il form di registrazione con i tuoi dati aziendali"
    },
    {
      number: "2",
      title: "Verifica",
      description: "Il nostro team verifica la tua attività e i documenti"
    },
    {
      number: "3",
      title: "Configurazione",
      description: "Imposta il tuo profilo e carica i primi prodotti/servizi"
    },
    {
      number: "4",
      title: "Vendita",
      description: "Inizia a ricevere ordini e gestisci il tuo business"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-white text-sm font-semibold" data-testid="hero-badge">🚀 Opportunità di Business</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="suppliers-hero-title">
                Diventa Fornitore su BeSa
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed" data-testid="suppliers-hero-description">
                Unisciti alla nostra rete di fornitori certificati e raggiungi migliaia di clienti professionali 
                in tutta Italia. Gestisci le tue offerte in autonomia e fai crescere il tuo business.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3" data-testid={`benefit-${index}`}>
                    <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                      <p className="text-white/80 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-xl" data-testid="start-application-button">
                  Inizia Ora
                </Button>
                <Button variant="outline" className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-base hover:bg-white/10 transition-colors" data-testid="learn-more-button">
                  Scopri di Più
                </Button>
              </div>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-6" data-testid="stats-grid">
              {stats.map((stat, index) => (
                <Card key={index} className="stat-card bg-white/10 backdrop-blur-sm border-white/20" data-testid={`stat-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold mb-2 text-white" data-testid={`stat-value-${index}`}>{stat.value}</div>
                    <div className="text-white/90" data-testid={`stat-label-${index}`}>{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="how-it-works-title">
              Come Diventare Fornitore
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="how-it-works-description">
              Un processo semplice e veloce per iniziare a vendere su BeSa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-testid="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="text-center" data-testid={`step-${index}`}>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-primary-foreground">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6" data-testid="requirements-title">
                Requisiti per Diventare Fornitore
              </h2>
              <p className="text-lg text-muted-foreground mb-8" data-testid="requirements-description">
                Per garantire la qualità del nostro marketplace, richiediamo alcuni requisiti base:
              </p>

              <div className="space-y-4">
                {[
                  "Partita IVA attiva e regolare",
                  "Attività commerciale consolidata (minimo 2 anni)",
                  "Prodotti/servizi di qualità certificata",
                  "Capacità di gestire ordini e spedizioni",
                  "Servizio clienti professionale",
                  "Rispetto delle normative di settore"
                ].map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-3" data-testid={`requirement-${index}`}>
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Business meeting"
                className="rounded-2xl shadow-lg w-full"
                data-testid="requirements-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="faq-title">
              Domande Frequenti
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="faq-description">
              Le risposte alle domande più comuni sui fornitori
            </p>
          </div>

          <div className="space-y-6" data-testid="faq-list">
            {[
              {
                question: "Quanto costa diventare fornitore su BeSa?",
                answer: "La registrazione è completamente gratuita. Applichiamo solo una commissione sulle vendite effettuate, con tariffe competitive e trasparenti."
              },
              {
                question: "Come vengono gestiti i pagamenti?",
                answer: "I pagamenti vengono processati in modo sicuro attraverso la nostra piattaforma. Riceverai i tuoi pagamenti secondo i termini concordati nel contratto."
              },
              {
                question: "Posso gestire autonomamente i miei prodotti?",
                answer: "Sì, attraverso la dashboard dedicata potrai gestire completamente il tuo catalogo, prezzi, disponibilità e ordini in completa autonomia."
              },
              {
                question: "Che tipo di supporto fornite ai fornitori?",
                answer: "Offriamo supporto completo: onboarding guidato, assistenza tecnica 24/7, consulenza marketing e team dedicato per risolvere qualsiasi problema."
              }
            ].map((faq, index) => (
              <Card key={index} className="border border-border" data-testid={`faq-item-${index}`}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3" data-testid={`faq-question-${index}`}>
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`faq-answer-${index}`}>
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="cta-title">
            Pronto a Far Crescere il Tuo Business?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto" data-testid="cta-description">
            Unisciti a centinaia di fornitori che hanno già scelto BeSa per espandere la loro attività. 
            Inizia oggi stesso il tuo percorso di successo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-xl" data-testid="cta-apply-button">
              Candidati Ora
            </Button>
            <Button variant="outline" className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-base hover:bg-white/10 transition-colors" data-testid="cta-contact-button">
              Contatta il Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
