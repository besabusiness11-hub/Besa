import { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  CheckCircle,
  CircleDashed,
  X,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import benitoPath from "@assets/benito_sqr.jpg";
import leoPath from "@assets/leo_sqr.jpg";
import ludoPath from "@assets/ludo_sqr.jpg";

export default function Home() {
  const portfolioScrollRef = useRef<HTMLDivElement>(null);
  const esempiRef = useRef<HTMLDivElement>(null);
  const prezziRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const fullText = "siti web personalizzati";

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
            Besa crea <strong className="text-foreground">gratuitamente</strong>{" "}
            siti web personalizzati per attività locali.
            <br />
            Dalla progettazione alla pubblicazione online, ci occupiamo di tutto
            per rendere la tua presenza digitale{" "}
            <strong className="text-foreground">
              professionale ed efficace
            </strong>
            .
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
            </div>

            {/* Step 2 */}
            <div className="text-center md:-mt-8" data-testid="step-2">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">
                  2
                </span>
              </div>

              {/* Title with "Gratis" badge below */}
              <div className="mb-3">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Creazione del sito
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-success/10 text-success border-2 border-success animate-pulse">
                  GRATIS
                </span>
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
              Prezzi e servizi inclusi
            </h2>
            <p
              className="text-lg text-white/90 max-w-2xl mx-auto"
              data-testid="pricing-description"
            >
              Tutto ciò di cui hai bisogno per la tua presenza online, ad un
              prezzo trasparente
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Basic Plan */}
            <Card className="border-2 border-white/20 shadow-xl bg-white/95 hover:shadow-2xl transition-all">
              <CardContent className="p-6 lg:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Basic</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">€39</span>
                    <span className="text-lg text-muted-foreground">/mese</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    Ideale per iniziare
                  </p>
                  <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-sm font-bold bg-success/10 text-success border-2 border-success">
                    Creazione GRATIS
                  </span>
                </div>
                <div className="space-y-1 mb-6">
                  {/* Pages */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">1 pagina (scroll layout)</span>
                  </div>

                  {/* Domain */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Dominio incluso (.it /.com)</span>
                  </div>

                  {/* Mobile Optimization */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Ottimizzazione mobile</span>
                  </div>

                  {/* Design */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Design personalizzato</span>
                  </div>

                  {/* Booking */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Prenotazioni (numero di telefono)</span>
                  </div>

                  {/* Modifications */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">3 modifiche/mese</span>
                  </div>

                  {/* Support */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Supporto email (2 giorni)</span>
                  </div>

                  {/* Photo Service */}
                  <div className="flex items-start min-h-[40px]">
                    <CircleDashed className="w-5 h-5 text-dark mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Servizio fotografico opzionale (€149)</span>
                  </div>

                  {/* Languages */}
                  <div className="flex items-start min-h-[40px]">
                    <X className="w-5 h-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm line-through">Multi lingue (IT)</span>
                  </div>

                  {/* Google Business */}
                  <div className="flex items-start min-h-[40px]">
                    <X className="w-5 h-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm line-through">Google Business Setup</span>
                  </div>

                  {/* QR Menu */}
                  <div className="flex items-start min-h-[40px]">
                    <X className="w-5 h-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm line-through">Menu con QR code</span>
                  </div>

                  {/* Professional Email */}
                  <div className="flex items-start min-h-[40px]">
                    <X className="w-5 h-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm line-through">Email professionale</span>
                  </div>
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  variant="outline"
                  className="w-full px-6 py-3 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Inizia Ora
                </Button>
              </CardContent>
            </Card>

            {/* Standard Plan - Highlighted */}
            <Card className="border-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] bg-white relative transform md:scale-105 z-10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center px-6 py-2 rounded-full text-sm font-bold bg-accent text-white shadow-lg">
                  PIÙ POPOLARE
                </span>
              </div>
              <CardContent className="p-6 lg:p-8 pt-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Standard</h3>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-foreground">€59</span>
                    <span className="text-xl text-muted-foreground">/mese</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    (meno di €2 al giorno)
                  </p>
                  <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-sm font-bold bg-success/10 text-success border-2 border-success">
                    Creazione GRATIS
                  </span>
                </div>
                <div className="space-y-1 mb-6">
                  {/* Pages */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">5 pagine</span>
                  </div>

                  {/* Domain */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Dominio incluso (.it /.com)</span>
                  </div>

                  {/* Mobile Optimization */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Ottimizzazione mobile</span>
                  </div>

                  {/* Design */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Design personalizzato</span>
                  </div>

                  {/* Booking */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Prenotazioni (numero di telefono)</span>
                  </div>

                  {/* Modifications */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Modifiche illimitate (info)</span>
                  </div>

                  {/* Support */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Supporto email/whatsapp (1 giorno)</span>
                  </div>

                  {/* Photo Service */}
                  <div className="flex items-start min-h-[40px]">
                    <CircleDashed className="w-5 h-5 text-dark mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Servizio fotografico opzionale (€99)</span>
                  </div>

                  {/* Languages */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Multilingue (EN-IT)</span>
                  </div>

                  {/* Google Business */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Google Business Setup</span>
                  </div>

                  {/* QR Menu */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Menu con QR code (pdf)</span>
                  </div>

                  {/* Professional Email */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Email professionale</span>
                  </div>
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  className="btn-primary w-full px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl"
                >
                  Inizia Ora
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-white/20 shadow-xl bg-white/95 hover:shadow-2xl transition-all">
              <CardContent className="p-6 lg:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Pro</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">€109</span>
                    <span className="text-lg text-muted-foreground">/mese</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    Soluzione completa premium
                  </p>
                  <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-sm font-bold bg-success/10 text-success border-2 border-success">
                    Creazione GRATIS
                  </span>
                  <div className="h-[2px]"></div>
                </div>
                <div className="space-y-1 mb-6">
                  {/* Pages */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-semibold">7+ pagine complete</span>
                  </div>

                  {/* Domain */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Dominio incluso (.it /.com)</span>
                  </div>

                  {/* Mobile Optimization */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">Ottimizzazione mobile</span>
                  </div>

                  {/* Design */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-semibold">Design premium personalizzato</span>
                  </div>

                  {/* Booking */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-semibold">Prenotazioni online integrate</span>
                  </div>

                  {/* Modifications */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-semibold">Modifiche illimitate (info + design)</span>
                  </div>

                  {/* Support */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-semibold">Supporto stesso giorno prioritario</span>
                  </div>

                  {/* Photo Service */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-semibold">Servizio fotografico (incluso)</span>
                  </div>

                  {/* Languages */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-semibold">Multilingue (EN-IT-FR-ES)</span>
                  </div>

                  {/* Google Business */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-semibold">Google Business Setup</span>
                  </div>

                  {/* QR Menu */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-semibold">Menu con QR code interattivo</span>
                  </div>

                  {/* Professional Email */}
                  <div className="flex items-start min-h-[40px]">
                    <CheckCircle className="w-5 h-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-semibold">Email professionale</span>
                  </div>
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  variant="outline"
                  className="w-full px-6 py-3 rounded-lg font-semibold border-2 border-accent text-accent hover:bg-accent hover:text-white"
                >
                  Inizia Ora
                </Button>
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
                  Leonardo Rossi
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