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
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactSection from "@/components/ContactSection";
import SEO from "@/components/SEO";
import benitoPath from "@assets/benito_sqr.jpg";
import leoPath from "@assets/leo_sqr.jpg";
import ludoPath from "@assets/ludo_sqr.jpg";
import { useLocation } from "wouter";

export default function Home() {
  const portfolioScrollRef = useRef<HTMLDivElement>(null);
  const esempiRef = useRef<HTMLDivElement>(null);
  const contattiRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
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

  const scrollToContatti = () => {
    contattiRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  // Otherwise, render the home page
  return (
    <div id="top" className="min-h-screen bg-background">
      <SEO lang={i18n.language} />
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
              {t("hero.badge")}
            </span>
          </div>

          {/* Main Title with Gradient Animation */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6 fade-in-up">
            {t("hero.title_part1")} <span className="tech-gradient-text">{t("hero.title_part2")}</span>{" "}
            {t("hero.title_part3").split(', ').map((str, idx, arr) => (
              <span key={idx}>
                {str}{idx < arr.length - 1 && ','}
                {idx === 0 && <br />}
              </span>
            ))}
          </h1>

          {/* Subtitle with Typing Effect */}
          <p
            className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto fade-in-up flex flex-wrap justify-center gap-1"
            style={{ animationDelay: "0.3s" }}
          >
            {t("hero.subtitle", "Dalla progettazione alla pubblicazione, ci occupiamo di tutto. Sito Web, Hosting e Dominio.")
              .split(" ")
              .map((word, i) => (
                <span
                  key={i}
                  className="inline-block opacity-0 fade-in-up"
                  style={{ animationDelay: `${0.6 + i * 0.1}s`, animationFillMode: "forwards" }}
                >
                  {word}
                </span>
              ))}
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
              onClick={scrollToContatti}
            >
              {t("hero.cta", "Richiedi Informazioni")}
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
              {t("howItWorks.title")}
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              data-testid="how-it-works-description"
            >
              {t("howItWorks.subtitle")}
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
                {t("howItWorks.step1.title")}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {t("howItWorks.step1.desc")}
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
                {t("howItWorks.step1.btn")}
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
                  {t("howItWorks.step2.title")}
                </h3>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed">
                {t("howItWorks.step2.desc")}
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
                {t("howItWorks.step3.title")}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {t("howItWorks.step3.desc")}
              </p>
              <Button
                className="mt-4 px-6 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                onClick={() => setLocation("/esempi")}
              >
                {t("howItWorks.step3.btn")}
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
                {t("hero.working", "Pronto a iniziare?")}
              </h3>
              <p
                className="text-white/90 text-lg mb-6 max-w-2xl mx-auto italic"
                data-testid="cta-description"
              >
                {t("howItWorks.cta.desc")}
              </p>
              <Button
                onClick={scrollToContatti}
                className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-xl"
                data-testid="cta-contact-button"
              >
                {t("hero.cta")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sneak Peek Options Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6 relative">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-primary text-sm font-semibold">
              {t("options.badge")}
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            {t("options.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            {t("options.subtitle")}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {[
              { icon: FileText, label: t("options.features.pages") },
              { icon: Mail, label: t("options.features.email") },
              { icon: MapPin, label: t("options.features.maps") },
              { icon: Calendar, label: t("options.features.booking") }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-sm lg:text-base">{feature.label}</h4>
              </div>
            ))}
          </div>

          <Button 
            className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            onClick={() => setLocation('/opzioni')}
          >
            {t("options.cta")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Team Section */}
      <section id="chi-siamo" className="py-16 lg:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t("team.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("team.subtitle")}
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
                  {t("team.roles.marketing")}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {t("team.descriptions.ludo")}
                </p>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
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
                  {t("team.roles.designer")}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {t("team.descriptions.benito")}
                </p>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
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
                  {t("team.roles.tech")}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {t("team.descriptions.leo")}
                </p>
                <a href="https://www.linkedin.com/in/leonardo-margiotta-7323871b7/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Click to Copy Email */}
          <div className="mt-16 flex justify-center">
            <Button
              variant="outline"
              className="group flex items-center justify-center gap-3 px-6 py-4 rounded-full border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all min-w-[250px] shadow-sm hover:shadow-md"
              onClick={() => {
                navigator.clipboard.writeText("info@besaweb.com");
                setHasCopiedEmail(true);
                setTimeout(() => setHasCopiedEmail(false), 2000);
              }}
            >
              <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-foreground font-medium text-base">
                {hasCopiedEmail ? t("team.copy.success") : "info@besaweb.com"}
              </span>
              {hasCopiedEmail ? (
                <CheckCircle className="w-5 h-5 text-green-500 animate-in zoom-in" />
              ) : (
                <span className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                  {t("team.copy.hint")}
                </span>
              )}
            </Button>
          </div>
        </div>
      </section>

      <div ref={contattiRef}>
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
}