import { Sparkles, CheckCircle } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-secondary via-white to-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary mr-2" />
                <span className="text-primary text-sm font-semibold" data-testid="hero-badge">Siti web professionali per realtà locali</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6" data-testid="hero-title">
                Il Tuo <span className="text-primary">Sito Web</span> Professionale, Fatto su Misura per Te
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="hero-description">
                Besa crea siti web personalizzati per attività locali. Dalla progettazione alla pubblicazione online, 
                ci occupiamo di tutto per rendere la tua presenza digitale professionale ed efficace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="btn-primary px-8 py-4 rounded-lg font-semibold text-base shadow-lg" data-testid="hero-explore-button">
                  <a href="#esempi">Vedi Esempi</a>
                </Button>
                <Button asChild variant="outline" className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold text-base hover:bg-secondary transition-colors" data-testid="hero-contact-button">
                  <a href="#prezzi">Scopri i Prezzi</a>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                <div data-testid="stat-sites">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground mt-1">Siti Realizzati</div>
                </div>
                <div data-testid="stat-categories">
                  <div className="text-3xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground mt-1">Settori Coperti</div>
                </div>
                <div data-testid="stat-satisfaction">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground mt-1">Clienti Soddisfatti</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:block">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=900" 
                alt="Professional workspace" 
                className="rounded-2xl shadow-2xl w-full object-cover"
                data-testid="hero-image"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden lg:block">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-success" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground" data-testid="hero-card-title">Verifica Qualità</div>
                    <div className="text-xs text-muted-foreground" data-testid="hero-card-subtitle">Tutti i fornitori certificati</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </section>

        {/* Portfolio Section */}
        <section id="esempi" className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="portfolio-title">Esempi di Siti per Aziende Locali</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="portfolio-description">
              Scopri i siti web che abbiamo creato per attività come la tua
            </p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 scroll-smooth snap-x snap-mandatory scrollbar-hide" data-testid="portfolio-slider">
            {[
              {
                id: "restaurant",
                title: "Ristoranti",
                description: "Siti web accattivanti per ristoranti, pizzerie, trattorie e bar",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                exampleUrl: "#"
              },
              {
                id: "beauty",
                title: "Bellezza e Cura Personale",
                description: "Siti eleganti per saloni, barbieri e centri estetici",
                image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                exampleUrl: "#"
              },
              {
                id: "health",
                title: "Salute e Fitness",
                description: "Piattaforme professionali per palestre, studi medici e wellness center",
                image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                exampleUrl: "#"
              },
              {
                id: "hotel",
                title: "Hotel",
                description: "Siti web di impatto per hotel, B&B e strutture ricettive",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                exampleUrl: "#"
              },
              {
                id: "auto",
                title: "Autofficine e Concessionari",
                description: "Siti web professionali per officine meccaniche e vendita auto",
                image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                exampleUrl: "#"
              }
            ].map((portfolio) => (
              <Card key={portfolio.id} className="flex-shrink-0 w-80 snap-center border border-border" data-testid={`portfolio-card-${portfolio.id}`}>
                <img
                  src={portfolio.image}
                  alt={portfolio.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{portfolio.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{portfolio.description}</p>
                  <Button asChild variant="outline" className="w-full" data-testid={`portfolio-example-button-${portfolio.id}`}>
                    <a href={portfolio.exampleUrl}>Vedi Esempio</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        {/* How It Works Section */}
        <section id="come-funziona" className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="how-it-works-title">Come funziona Besa</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="how-it-works-description">
              Un processo semplice e chiaro per creare il tuo sito web professionale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center" data-testid="step-1">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Conosciamoci</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Ci racconti della tua attività, dei tuoi obiettivi e di cosa ti serve. Noi ascoltiamo e capiamo le tue esigenze.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center" data-testid="step-2">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Creazione del sito</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Progettiamo e realizziamo il tuo sito web su misura, curandone ogni dettaglio con professionalità.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center" data-testid="step-3">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Sito online</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Il tuo sito va online e tu puoi concentrarti sul tuo lavoro. Noi ci occupiamo di tutto il resto.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary to-accent p-8 lg:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4" data-testid="cta-title">
                Pronto a iniziare?
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto italic" data-testid="cta-description">
                "Voi ci dite cosa volete, e noi cerchiamo di indovinare cosa intendete davvero."
              </p>
              <Button asChild className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-xl" data-testid="cta-contact-button">
                <a href="https://tally.so/r/n0NPNZ" target="_blank" rel="noopener noreferrer">
                  Richiedi Informazioni
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

        {/* Team Section */}
        <section id="chi-siamo" className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="team-title">Il nostro team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="team-description">
              Le persone che lavorano ogni giorno per creare siti web di successo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="team-grid">
            {[
              {
                name: "Marco Bianchi",
                role: "CEO & Founder",
                description: "Gestisce la strategia aziendale e coordina tutti i progetti. Con 10 anni di esperienza nel web design.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
              },
              {
                name: "Laura Ferretti",
                role: "Lead Designer",
                description: "Si occupa di progettare l'aspetto visivo dei siti, curando ogni dettaglio estetico e di usabilità.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
              },
              {
                name: "Andrea Rossi",
                role: "Technical Lead",
                description: "Responsabile dello sviluppo tecnico, hosting e manutenzione di tutti i siti web realizzati.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
              }
            ].map((member, index) => (
              <Card key={index} className="border border-border shadow-md hover:shadow-xl transition-shadow" data-testid={`team-member-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      data-testid={`team-photo-${index}`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1" data-testid={`team-name-${index}`}>{member.name}</h3>
                  <p className="text-primary font-semibold mb-3" data-testid={`team-role-${index}`}>{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`team-description-${index}`}>
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        {/* Pricing Section */}
        <section id="prezzi" className="py-16 lg:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="pricing-title">Prezzi e servizi inclusi</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="pricing-description">
              Tutto ciò di cui hai bisogno per la tua presenza online, ad un prezzo trasparente
            </p>
          </div>

          <Card className="border-2 border-primary shadow-2xl">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="inline-block bg-primary/10 px-6 py-2 rounded-full mb-4">
                  <span className="text-primary font-semibold">Offerta Lancio</span>
                </div>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-foreground" data-testid="pricing-amount">€59</span>
                  <span className="text-xl text-muted-foreground">/mese</span>
                </div>
                <p className="text-muted-foreground text-lg mb-2" data-testid="pricing-subtitle">
                  Creazione del sito gratuita
                </p>
                <p className="text-sm text-muted-foreground italic">
                  (meno di €2 al giorno)
                </p>
              </div>

              <div className="space-y-4 mb-8" data-testid="services-list">
                {[
                  "Sito web personalizzato (1 pagina)",
                  "Dominio con nome personalizzato",
                  "Hosting",
                  "Email professionale",
                  "Ottimizzazione su Google Maps",
                  "Aggiornamenti del sito",
                  "Assistenza 7/7 via email e telefono",
                  "Servizio fotografico business professionale"
                ].map((service, index) => (
                  <div key={index} className="flex items-start" data-testid={`service-${index}`}>
                    <CheckCircle className="w-6 h-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-base">{service}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button asChild className="btn-primary px-12 py-4 rounded-lg font-semibold text-lg shadow-lg" data-testid="pricing-cta-button">
                  <a href="https://tally.so/r/n0NPNZ" target="_blank" rel="noopener noreferrer">
                    Inizia Ora
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

        <Footer />
    </div>
  );
}
