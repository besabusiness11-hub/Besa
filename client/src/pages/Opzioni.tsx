import { useEffect } from "react";
import { useLocation } from "wouter";
import { 
  ArrowLeft, 
  MapPin, 
  Mail, 
  Calendar, 
  FileText, 
  Globe, 
  Share2, 
  Search, 
  ShoppingCart, 
  Palette, 
  LayoutTemplate
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactSection from "@/components/ContactSection";

const features = [
  {
    icon: LayoutTemplate,
    title: "Pagine Illimitate",
    description: "Possibilità di strutturare il sito senza limiti, aggiungendo tutte le pagine che servono per presentare al meglio la tua attività.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: FileText,
    title: "Modulo Contatti",
    description: "Ricevi le richieste dei tuoi clienti direttamente sulla tua email con moduli personalizzati e anti-spam.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Mail,
    title: "Email Custom",
    description: "Indirizzi email professionali col tuo dominio (es. info@tuodominio.it) per trasmettere maggiore autorevolezza.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: MapPin,
    title: "Integrazione Google Maps",
    description: "Una mappa interattiva integrata nel sito per permettere ai tuoi clienti di trovare facilmente la tua sede.",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Calendar,
    title: "Booking System",
    description: "Sistema di prenotazione online per gestire appuntamenti, tavoli o consulenze in modo completamente automatico.",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    icon: Palette,
    title: "Premium Custom Design",
    description: "Design unico e realizzato su misura, con animazioni fluide e una grafica curata in ogni singolo pixel.",
    color: "bg-pink-100 text-pink-600"
  },
  {
    icon: Globe,
    title: "Multilingua",
    description: "Raggiungi un pubblico internazionale offrendo il tuo sito in diverse lingue, con traduzioni SEO-friendly.",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: Share2,
    title: "Integrazione Social",
    description: "Collega i tuoi profili social al sito web per aumentare l'interazione e far crescere la tua community.",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Search,
    title: "Ottimizzazione SEO",
    description: "Struttura tecnica e contenuti ottimizzati per favorire l'indicizzazione e migliorare il posizionamento su Google.",
    color: "bg-teal-100 text-teal-600"
  },
  {
    icon: ShoppingCart,
    title: "Funzionalità E-commerce",
    description: "Vendi i tuoi prodotti o servizi direttamente online con un sistema di checkout sicuro e facile da gestire.",
    color: "bg-cyan-100 text-cyan-600"
  }
];

export default function Opzioni() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const handleBackClick = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Button
              variant="ghost"
              onClick={handleBackClick}
              className="mb-8 hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna alla Home
            </Button>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Funzionalità <span className="text-primary">Premium</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Scopri tutto ciò che possiamo integrare nel tuo nuovo spazio digitale. 
              Dal design ad alte prestazioni a strumenti avanzati per il tuo business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card 
                key={idx} 
                className="group border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary to-accent p-8 lg:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Hai un'esigenza particolare?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Implementiamo anche funzioni su misura per ogni tipologia di business.
              </p>
              <Button
                onClick={() => {
                  const contatti = document.getElementById("contatti");
                  if (contatti) {
                    contatti.scrollIntoView({ behavior: "smooth" });
                  } else {
                    setLocation("/#contatti");
                  }
                }}
                className="px-8 py-4 bg-white text-primary rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors shadow-xl"
              >
                Parlane con noi
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
