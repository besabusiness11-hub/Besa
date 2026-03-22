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
import { useTranslation } from "react-i18next";

const featuresList = [
  {
    icon: LayoutTemplate,
    key: "pages",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: FileText,
    key: "form",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Mail,
    key: "email",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: MapPin,
    key: "maps",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Calendar,
    key: "booking",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    icon: Palette,
    key: "design",
    color: "bg-pink-100 text-pink-600"
  },
  {
    icon: Globe,
    key: "lang",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: Share2,
    key: "social",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Search,
    key: "seo",
    color: "bg-teal-100 text-teal-600"
  },
  {
    icon: ShoppingCart,
    key: "ecommerce",
    color: "bg-cyan-100 text-cyan-600"
  }
];

export default function Opzioni() {
  const { t } = useTranslation();
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
              {t("opzioni_page.back")}
            </Button>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              {t("opzioni_page.title")} <span className="text-primary">{t("opzioni_page.titleBadge")}</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("opzioni_page.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((feature, idx) => (
              <Card 
                key={idx} 
                className="group border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t(`opzioni_page.features.${feature.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`opzioni_page.features.${feature.key}.desc`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-primary to-accent p-8 lg:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {t("opzioni_page.cta.title")}
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                {t("opzioni_page.cta.desc")}
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
                {t("opzioni_page.cta.btn")}
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
