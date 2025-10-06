import { useState } from "react";
import { Link } from "wouter";
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Send } from "lucide-react";
import logoPath from "@assets/ChatGPT Image 25 set 2025, 13_13_58_1759676591455.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Errore",
        description: "Inserisci un indirizzo email valido",
        variant: "destructive"
      });
      return;
    }

    setIsSubscribing(true);
    
    try {
      await apiRequest("POST", "/api/newsletter/subscribe", { email });

      toast({
        title: "Iscrizione completata!",
        description: "Grazie per esserti iscritto alla newsletter BeSa",
      });
      setEmail("");
    } catch (error: any) {
      const errorMessage = error.message?.includes("409") 
        ? "Email già registrata" 
        : "Errore durante l'iscrizione";
      toast({
        title: "Errore",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-foreground text-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <img 
              src={logoPath} 
              alt="Besa Logo" 
              className="h-14 w-auto mb-4 brightness-0 invert" 
              data-testid="footer-logo"
            />
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Besa crea siti web professionali per attività locali. Dalla progettazione alla pubblicazione, ci occupiamo di tutto per la tua presenza digitale.
            </p>
            
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" data-testid="social-twitter">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" data-testid="social-linkedin">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer" data-testid="social-facebook">
                <Facebook className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Link Rapidi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-home">
                  Home
                </a>
              </li>
              <li>
                <a href="#esempi" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-examples">
                  Esempi
                </a>
              </li>
              <li>
                <a href="#come-funziona" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-how-it-works">
                  Come funziona
                </a>
              </li>
              <li>
                <a href="#chi-siamo" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-team">
                  Chi siamo
                </a>
              </li>
              <li>
                <a href="#prezzi" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-pricing">
                  Prezzi
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Supporto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-help">
                  Centro Assistenza
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-faq">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-terms">
                  Termini di Servizio
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-privacy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="footer-link-cookies">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contatti</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/70" data-testid="contact-email">info@besa.it</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/70" data-testid="contact-phone">+39 02 1234 5678</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/70" data-testid="contact-address">Via Milano 123, 20100 Milano, Italia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p data-testid="copyright">&copy; 2025 Besa. Tutti i diritti riservati.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-bottom-privacy">Privacy</a>
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-bottom-terms">Termini</a>
            <a href="#" className="hover:text-white transition-colors" data-testid="footer-bottom-cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
