import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ExternalLink, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import comingPath from "@assets/coming_soon.webp"
import xvImage from "../../../attached_assets/XV.webp"
import MrBarber from "../../../attached_assets/MrBarber.webp"
import NoirOrStudio from "../../../attached_assets/NoirOrStudio.webp"
import MilanoScomparsa from "../../../attached_assets/MilanoScomparsa.webp"
import PepperInFlame from "../../../attached_assets/PepperInFlame.webp"
import TheGentlemanHouse from "../../../attached_assets/TheGentlemanHouse.webp"
import TheGildedHouse from "../../../attached_assets/TheGildedHouse.webp"

const categories = ["Tutti", "Ristoranti", "Barbieri", "Tattoo", "Palestre", "Liberi Professionisti"];

// Dati degli esempi di siti
const websiteExamples = [
  {
    id: 1,
    title: "Ristorante X|V",
    category: "Ristoranti",
    image: xvImage,
    demoPath: "https://xv.besaweb.com",
    plan: "pro"
  }, 
  {
    id: 2,
    title: "MrBarber",
    category: "Barbieri",
    image: MrBarber,
    demoPath: "https://mrbarber.besaweb.com/",
    plan: "Standard"
  }, 
  {
    id: 3,
    title: "MilanoScomparsa",
    category: "Liberi Professionisti",
    image: MilanoScomparsa,
    demoPath: "https://milanoscomparsa.besaweb.com/",
    plan: "basic"
  }, 
  {
    id: 4,
    title: "PepperInFlame",
    category: "Tattoo",
    image: PepperInFlame,
    demoPath: "https://pepperinflame.besaweb.com/",
    plan: "pro"
  }, 
  {
    id: 5,
    title: "TheGentleman's House",
    category: "Barbieri",
    image: TheGentlemanHouse,
    demoPath: "https://thegentlemanhouse.besaweb.com/",
    plan: "pro"
  },
   {
    id: 6,
    title: "The Gilded Glass",
    category: "Ristoranti",
    image: TheGildedHouse,
    demoPath: "https://thegildedglass.besaweb.com/",
    plan: "pro"
  }
];

export default function Esempi() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Scroll to top quando la pagina si carica
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  // Load Tally script when form is shown
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

  // Update filtering logic to be case insensitive and handle Italian categories
  const filteredExamples = selectedCategory.toLowerCase() === "tutti"
    ? websiteExamples
    : websiteExamples.filter(example => {
        const categoryMap: { [key: string]: string } = {
          "ristoranti": "Ristoranti",
          "barbieri": "Barbieri",
          "tattoo": "Tattoo",
          "palestre": "Palestre",
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

  // Update the card click handler
  const handleDemoClick = (path: string) => {
    if (/^https?:\/\//i.test(path)) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      setLocation(path);
    }
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
              Torna alla Home
            </Button>

            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              I Nostri <span className="text-primary">Esempi</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Scopri i siti web che abbiamo creato per attività come la tua. 
              Ogni progetto è unico e realizzato su misura per le esigenze del cliente.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize ${
                    selectedCategory === category
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
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
                    {/* Immagine con overlay */}
                    <div className="relative overflow-hidden">
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20">
                        <img 
                          src={example.image}
                          alt={example.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Overlay hover */}
                      <div className={`absolute inset-0 bg-primary/90 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredCard === example.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <Button 
                          onClick={() => handleDemoClick(example.demoPath)}
                          className="bg-white text-primary hover:bg-white/90"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Vedi Demo
                        </Button>
                      </div>
                    </div>

                    {/* Contenuto */}
                    <div className="p-6">
                      {/* Title and Description */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                          {example.title}
                        </h3>
                      </div>

                      {/* Plan and Tags */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            example.plan.toLowerCase() === 'pro' 
                              ? 'bg-purple-100 text-purple-800' 
                              : example.plan.toLowerCase() === 'standard'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {example.plan.charAt(0).toUpperCase() + example.plan.slice(1)}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {example.category}
                          </span>
                        </div>
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
                <p className="text-muted-foreground">
                  Al momento non ci sono esempi disponibili per questa categoria.
                  <br />
                  Controlla più tardi!
                </p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary to-accent p-8 lg:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ti piacciono i nostri esempi?
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Possiamo creare un sito web altrettanto bello e funzionale per la tua attività.
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-xl"
              >
                Richiedi informazioni 
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}