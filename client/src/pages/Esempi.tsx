import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ExternalLink, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactSection from "@/components/ContactSection";
import comingPath from "@assets/coming_soon.webp"

// Helper to get automated screenshot from URL
const getScreenshotUrl = (url: string) => {
  if (!url || url === "#") return undefined;
  // Using Microlink API with an 8-second delay to allow slow splash screens to fade out
  return `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&waitFor=10000&v=2`;
};

const categories = ["Tutti", "Ristoranti", "Barbieri", "Tattoo", "Bar & Cocktail", "Liberi Professionisti"];

// Dati degli esempi di siti
const websiteExamples = [
  {
    id: 1,
    title: "Ristorante X|V",
    category: "Ristoranti",
    demoPath: "https://xv.besaweb.com",
    plan: "pro"
  },
  {
    id: 3,
    title: "MilanoScomparsa",
    category: "Liberi Professionisti",
    demoPath: "https://milanoscomparsa.besaweb.com/",
    plan: "basic"
  },
  {
    id: 5,
    title: "TheGentleman's House",
    category: "Barbieri",
    demoPath: "https://thegentlemanhouse.besaweb.com/",
    plan: "pro"
  },
  {
    id: 6,
    title: "The Gilded Glass",
    category: "Bar & Cocktail",
    demoPath: "https://thegildedglass.besaweb.com/",
    plan: "pro"
  },
  {
    id: 7,
    title: "Tempta",
    category: "Bar & Cocktail",
    demoPath: "https://tempta.besaweb.com/",
    plan: "pro"
  },
  {
    id: 9,
    title: "Le Jardin Secret Studio",
    category: "Beauty",
    demoPath: "https://lejardinsecretstudio.fr/",
    plan: "pro"
  },
  {
    id: 10,
    title: "Marco Bortolan",
    category: "Liberi Professionisti",
    demoPath: "https://marcobortolan.it/",
    plan: "pro"
  },
  {
    id: 11,
    title: "Progetto Bortolan",
    category: "Liberi Professionisti",
    demoPath: "https://progettobortolan.besaweb.com/",
    plan: "pro"
  },
  {
    id: 12,
    title: "J Costruzioni",
    category: "Liberi Professionisti",
    demoPath: "https://jcostruzioni.besaweb.com/",
    plan: "pro"
  }
];

// Helper function to get badge colors based on category
const getCategoryBadgeColor = (category: string): string => {
  const colorMap: { [key: string]: string } = {
    "Ristoranti": "bg-orange-100 text-orange-700",
    "Barbieri": "bg-blue-100 text-blue-700",
    "Tattoo": "bg-purple-100 text-purple-700",
    "Bar & Cocktail": "bg-pink-100 text-pink-700",
    "Liberi Professionisti": "bg-green-100 text-green-700",
  };
  return colorMap[category] || "bg-blue-100 text-blue-700";
};

export default function Esempi() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Scroll to top quando la pagina si carica
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  // Update filtering logic to be case insensitive and handle Italian categories
  const filteredExamples = selectedCategory.toLowerCase() === "tutti"
    ? websiteExamples
    : websiteExamples.filter(example => {
      const categoryMap: { [key: string]: string } = {
        "ristoranti": "Ristoranti",
        "barbieri": "Barbieri",
        "tattoo": "Tattoo",
        "bar & cocktail": "Bar & Cocktail",
        "dentisti": "Medico",
        "centri estetici": "Beauty",
        "liberi professionisti": "Liberi Professionisti"
      };
      return example.category === categoryMap[selectedCategory.toLowerCase()];
    });

  const handleBackClick = () => {
    setLocation("/");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const handleDemoClick = (path: string) => {
    if (/^https?:\/\//i.test(path)) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      setLocation(path);
    }
  };

  const getTranslatedCategory = (cat: string) => {
    const categoryMap: { [key: string]: string } = {
      "Tutti": t("portfolio.categories.all"),
      "Ristoranti": t("portfolio.categories.restaurants"),
      "Barbieri": t("portfolio.categories.barbers"),
      "Tattoo": t("portfolio.categories.tattoo"),
      "Bar & Cocktail": t("portfolio.categories.bar"),
      "Liberi Professionisti": t("portfolio.categories.professionals"),
    };
    return categoryMap[cat] || cat;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Button
              variant="ghost"
              onClick={handleBackClick}
              className="mb-8 hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("portfolio.back")}
            </Button>

            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("portfolio.title")} <span className="text-primary">Esempi</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t("portfolio.subtitle")}
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize ${selectedCategory === category
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "hover:bg-primary/10 hover:text-primary"
                    }`}
                >
                  {getTranslatedCategory(category)}
                </Button>
              ))}
            </div>
          </div>


          {/* Grid Esempi */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExamples.length > 0 ? (
              filteredExamples.map((example) => (
                <Card
                  key={example.id}
                  className="group cursor-pointer border-2 border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  onMouseEnter={() => setHoveredCard(example.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="p-0">
                    {/* Browser Mockup Frame */}
                    <div className="relative overflow-hidden bg-muted flex flex-col h-full border-b border-border/50">
                      {/* Browser Bar */}
                      <div className="bg-white/80 backdrop-blur-sm border-b border-border/50 px-4 py-2 flex items-center gap-4">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                        </div>
                        <div className="flex-1 bg-muted rounded-md py-1 px-3 text-[10px] text-muted-foreground truncate font-mono">
                          {example.demoPath === "#" ? "besaweb.com/preview" : example.demoPath.replace(/^https?:\/\//, '')}
                        </div>
                      </div>

                      {/* Immagine con overlay */}
                      <div className="relative h-48 overflow-hidden group/img">
                        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 animate-pulse flex items-center justify-center">
                          {getScreenshotUrl(example.demoPath) ? (
                            <img
                              src={getScreenshotUrl(example.demoPath)}
                              alt={example.title}
                              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-110"
                              onLoad={(e) => {
                                (e.target as HTMLImageElement).parentElement?.classList.remove('animate-pulse');
                              }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = comingPath;
                              }}
                            />
                          ) : (
                            <img
                              src={comingPath}
                              alt="Placeholder"
                              className="w-full h-full object-cover opacity-50 grayscale"
                            />
                          )}
                        </div>

                        {/* Overlay hover */}
                        <div className={`absolute inset-0 bg-primary/80 flex items-center justify-center transition-all duration-300 ${hoveredCard === example.id ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
                          }`}>
                          <Button
                            onClick={() => handleDemoClick(example.demoPath)}
                            className="bg-white text-primary hover:bg-white/90 shadow-xl transform transition-transform duration-300 group-hover:scale-105"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {t("portfolio.viewDemo")}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Contenuto */}
                    <div className="p-6">
                      {/* Title and Category */}
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex-1">
                          {example.title}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCategoryBadgeColor(example.category)}`}>
                          {getTranslatedCategory(example.category)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-0">
                <img
                  src={comingPath}
                  alt="Coming Soon"
                  className="w-27 h-27 mx-auto mb-5 object-contain"
                />
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {t("portfolio.noResults")}
                </p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary to-accent p-8 lg:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {t("portfolio.cta.title")}
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                {t("portfolio.cta.desc")}
              </p>
              <Button
                onClick={() => {
                  const contatti = document.getElementById("contatti");
                  if (contatti) {
                    contatti.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-xl"
              >
                {t("portfolio.cta.btn")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </div>
  );
}