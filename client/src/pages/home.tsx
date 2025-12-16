import { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  CheckCircle,
  CircleDashed,
  X,
  FileText,
  MapPin,
  Calendar,
  Headphones,
  Edit3,
  Globe,
  Mail,
  Camera,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import benitoPath from "@assets/benito_sqr.jpg";
import leoPath from "@assets/leo_sqr.jpg";
import ludoPath from "@assets/ludo_sqr.jpg";
import { useLocation } from "wouter";

export default function Home() {
  const portfolioScrollRef = useRef<HTMLDivElement>(null);
  const esempiRef = useRef<HTMLDivElement>(null);
  const prezziRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const fullText = "siti web personalizzati";
  const [, setLocation] = useLocation();

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 80);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const sectionId = hash.replace('#', '');
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
          const offset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 300);
    }
  }, []);

  const scrollPortfolio = (direction: "left" | "right") => {
    if (portfolioScrollRef.current) {
      const currentScroll = portfolioScrollRef.current.scrollLeft;
      const scrollAmount = 350;
      const newPosition =
        direction === "left"
          ? Math.max(0, currentScroll - scrollAmount)
          : currentScroll + scrollAmount;

      portfolioScrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToEsempi = () => {
    esempiRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPrezzi = () => {
    prezziRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showForm) {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [showForm]);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.transform = "translateY(-2px)";
    button.style.boxShadow = "0 10px 25px rgba(37, 99, 235, 0.3)";

    // Create sparkle effect
    const sparkle = document.createElement("div");
    sparkle.className = "tech-sparkle";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    button.appendChild(sparkle);

    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 2000);
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.transform = "translateY(0)";
    button.style.boxShadow = "";
  };

  const handleStatHover = (index: number) => {
    setHoveredStat(index);
  };

  const handleStatLeave = () => {
    setHoveredStat(null);
  };

  // If form is shown, render only the form
  if (showForm) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          padding: 0,
          overflow: "hidden",
          zIndex: 9999,
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setShowForm(false)}
          className="fixed top-4 right-4 z-50 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg transition-colors"
          aria-label="Chiudi"
        >
          <X className="w-6 h-6" />
        </button>

        <iframe
          data-tally-src="https://tally.so/r/n0NPNZ?transparentBackground=1"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Crea il tuo Sito Web (gratis!)"
          style={{
            border: 0,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
    );
  }

  // Otherwise, render the home page
  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />

      {/* HERO SECTION CORRETTA */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-white via-blue-50/70 to-indigo-100/50 overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0">
          <div
            className="hero-particle"
            style={{
              top: "20%",
              left: "10%",
              width: "200px",
              height: "200px",
              animationDelay: "0s",
            }}
          ></div>
          <div
            className="hero-particle"
            style={{
              top: "60%",
              left: "80%",
              width: "150px",
              height: "150px",
              animationDelay: "2s",
            }}
          ></div>
          <div
            className="hero-particle"
            style={{
              top: "30%",
              left: "70%",
              width: "100px",
              height: "100px",
              animationDelay: "4s",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {/* Badge con Sparkle */}
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6 fade-in-up">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-primary text-sm font-semibold">
              Siti web professionali per realtà locali
            </span>
          </div>

          {/* Main Title with Gradient Animation */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6 fade-in-up">
            Il Tuo <span className="tech-gradient-text">Sito Web</span>{" "}
            Professionale,
            <br />
            Fatto su Misura per Te
          </h1>

          {/* Subtitle with Typing Effect */}
          <p
            className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Besa crea <strong className="text-foreground">siti web professionali</strong>{" "}
            per attività locali.{" "}
            <br />
            <strong className="text-foreground">Pensiamo a tutto noi</strong>: design, sviluppo e gestione online, per aiutarti a <strong className="text-foreground">migliorare visibilità</strong>, credibilità e contatti.
          </p>

          {/* CTA Buttons with z-index to stay on top - SINGOLO BOTTONE */}
          <div
            className="relative z-50 flex justify-center items-center fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <button
              className="bg-primary text-white px-12 py-4 rounded-lg text-lg font-semibold transition-all duration-300 relative overflow-hidden hover:bg-accent shadow-2xl hover:shadow-3xl"
              style={{
                position: "relative",
                zIndex: 100,
                boxShadow: "0 10px 40px rgba(37, 99, 235, 0.4)",
              }}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={scrollToPrezzi}
            >
              Scopri i Prezzi
            </button>
          </div>

          {/* Stats Section */}
          <div
            className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/30 fade-in-up"
            style={{ animationDelay: "0.9s" }}
          >
            {/* Aggiungi qui il contenuto delle stats se necessario */}
          </div>

          {/* Decorative Elements */}
          <div
            className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-primary/3 rounded-full blur-3xl"
            style={{ zIndex: 1 }}
          ></div>
          <div
            className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-accent/3 rounded-full blur-3xl"
            style={{ zIndex: 1 }}
          ></div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="come-funziona" className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
              data-testid="how-it-works-title"
            >
              Come funziona Besa
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              data-testid="how-it-works-description"
            >
              Un processo semplice e chiaro per creare il tuo sito web
              professionale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center" data-testid="step-1">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">
                  1
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Conosciamoci
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Ci racconti della tua attività, dei tuoi obiettivi e di cosa ti
                serve. Noi ascoltiamo e capiamo le tue esigenze.
              </p>
              <Button
                className="mt-4 px-6 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                onClick={() => {
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  });
                }}
              >
                I nostri contatti
              </Button>
            </div>

            {/* Step 2 */}
            <div className="text-center" data-testid="step-2">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">
                  2
                </span>
              </div>
              <div className="mb-3">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Creazione del sito
                </h3>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed">
                Progettiamo e realizziamo il tuo sito web su misura, curandone
                ogni dettaglio con professionalità.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center" data-testid="step-3">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">
                  3
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Sito online
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Il tuo sito va online e tu puoi concentrarti sul tuo lavoro. Noi
                ci occupiamo di tutto il resto.
              </p>
              <Button
                className="mt-4 px-6 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                onClick={() => setLocation("/esempi")}
              >
                I nostri esempi
              </Button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary to-accent p-8 lg:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto">
              <h3
                className="text-2xl lg:text-3xl font-bold text-white mb-4"
                data-testid="cta-title"
              >
                Pronto a iniziare?
              </h3>
              <p
                className="text-white/90 text-lg mb-6 max-w-2xl mx-auto italic"
                data-testid="cta-description"
              >
                "Voi ci dite cosa volete, e noi cerchiamo di indovinare cosa
                intendete davvero."
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-xl"
                data-testid="cta-contact-button"
              >
                Richiedi Informazioni
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        ref={prezziRef}
        id="prezzi"
        className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-accent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
              data-testid="pricing-title"
            >
              Prezzi Trasparenti e Semplici
            </h2>
            <p
              className="text-lg text-white/90 max-w-2xl mx-auto"
              data-testid="pricing-description"
            >
              Un prezzo chiaro per iniziare, personalizzabile in base alle tue esigenze
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {/* Main Pricing Card */}
            <Card className="border-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] bg-white relative">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-foreground mb-6">Pacchetto Base</h3>
                  
                  {/* Pricing Structure */}
                  <div className="flex flex-col md:flex-row items-center justify-center mb-8">
                    {/* Creation Cost */}
                    <div className="text-center flex flex-col items-end">
                      <div className="mb-2">
                        <span className="text-5xl font-bold text-foreground">€299</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-semibold">
                        Creazione sito
                      </p>
                      <p className="text-xs text-muted-foreground italic">
                        (pagamento unico)
                      </p>
                    </div>

                    <div className="text-3xl text-muted-foreground font-light mx-8 hidden md:block">+</div>

                    {/* Monthly Maintenance */}
                    <div className="text-center flex flex-col items-start">
                      <div className="mb-2">
                        <span className="text-5xl font-bold text-foreground">€9.99</span>
                        <span className="text-xl text-muted-foreground">/mese</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-semibold">
                        Mantenimento online
                      </p>
                      <p className="text-xs text-muted-foreground italic">
                        (hosting e gestione)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Included Features */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-foreground mb-4 text-center">Servizi Inclusi</h4>
                  <div className="space-y-3 max-w-md mx-auto pl-14">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">Sito web ad 1 pagina professionale</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">Dominio incluso (.it / .com)</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">Ottimizzazione mobile</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">Mantenimento e hosting online</span>
                    </div>
                  </div>
                </div>

                {/* Scrolling Extras Banner - Inside Card */}
                <div className="mb-13">
                  <p className="text-center text-muted-foreground text-sm font-medium mb-6 pt-4">
                    Personalizza il tuo sito con funzionalità aggiuntive
                  </p>
                  <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl py-4 overflow-hidden">
                    <div className="marquee-container">
                      <div className="marquee-track">
                        {/* First set */}
                        <div className="marquee-item">
                          <FileText className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Pagine aggiuntive</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <MapPin className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Google Maps</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Calendar className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Sistema appuntamenti</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Headphones className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Supporto prioritario</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Edit3 className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Modifiche mensili</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Globe className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Multilingue</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Mail className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Email professionale</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Camera className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Shooting fotografico</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        {/* Duplicate set for seamless loop */}
                        <div className="marquee-item">
                          <FileText className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Pagine aggiuntive</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <MapPin className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Google Maps</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Calendar className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Sistema appuntamenti</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Headphones className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Supporto prioritario</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Edit3 className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Modifiche mensili</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Globe className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Multilingue</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Mail className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Email professionale</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                        <div className="marquee-item">
                          <Camera className="w-4 h-4 text-white mr-2" />
                          <span className="text-white font-medium">Shooting fotografico</span>
                        </div>
                        <div className="marquee-item">
                          <span className="text-white/60">•</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border my-6"></div>

                {/* CTA Button */}
                <div className="text-center">
                  <Button
                    onClick={() => setShowForm(true)}
                    className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl"
                  >
                    Richiedi il Tuo Preventivo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Ti risponderemo entro 24 ore con un preventivo personalizzato
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="chi-siamo" className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Strategia, Design e Tecnologia
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              La nostra Besa: il vostro successo online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ludovico Canclini */}
            <Card className="border border-border shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img
                    src={ludoPath}
                    alt="Ludovico Canclini"
                    className="w-full h-full object-cover"
                    onError={(e) => console.error("Failed to load Ludovico image")}
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  Ludovico Canclini
                </h3>
                <p className="text-primary font-semibold mb-3">
                  Head of Marketing & Client Relations
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Stratega della relazione e della visione d'insieme. Collega le esigenze del cliente con il talento del team, guidando ogni progetto verso il successo condiviso.
                </p>
              </CardContent>
            </Card>

            {/* Benito Valentino */}
            <Card className="border border-border shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img
                    src={benitoPath}
                    alt="Benito Valentino"
                    className="w-full h-full object-cover"
                    onError={(e) => console.error("Failed to load Benito image")}
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  Benito Valentino
                </h3>
                <p className="text-primary font-semibold mb-3">
                  Lead Designer
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Perfezionista nell'arte e nella scienza del web. Cura ogni aspetto, dal pixel al codice, per consegnare un prodotto che superi le aspettative.
                </p>
              </CardContent>
            </Card>

            {/* Leonardo Margiotta */}
            <Card className="border border-border shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img
                    src={leoPath}
                    alt="Leonardo Margiotta"
                    className="w-full h-full object-cover"
                    onError={(e) => console.error("Failed to load Leonardo image")}
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  Leonardo Margiotta
                </h3>
                <p className="text-primary font-semibold mb-3">
                  Technical Lead
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Architetto della stabilità e dell'efficienza. Coordina l'infrastruttura tecnica con precisione, garantendo che ogni progetto sia solido, sicuro e performante.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}