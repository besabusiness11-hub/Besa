import { Mail, Phone, MapPin } from "lucide-react";
import logoPath from "@assets/besatrasparente.png";
export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo e descrizione - MOLTO più in alto e più vicini */}
        <div className="text-center -mt-10 mb-1">
          <img
            src={logoPath}
            alt="Besa Logo"
            className="h-24 w-auto mx-auto mb-0 pb-0"
            data-testid="footer-logo"
          />
          <p className="text-white/70 max-w-2xl mx-auto text-base leading-relaxed -mt-4 pb-10">
            Besa crea siti web professionali per attività locali. Dalla progettazione alla pubblicazione, ci occupiamo di tutto per la tua presenza digitale.
          </p>
        </div>

        {/* Sezioni con spaziatura precisa - 3 colonne equidistanti ALLINEATE IN ALTO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-6 space-y-6 md:space-y-0">
          {/* Link Rapidi - PRIMA COLONNA allineata a sinistra */}
          <div className="md:flex-1 md:px-4">
            <h3 className="text-white font-bold mb-2 text-base">Link Rapidi</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#esempi" className="text-white/70 hover:text-white transition-colors block">Esempi</a></li>
              <li><a href="#come-funziona" className="text-white/70 hover:text-white transition-colors block">Nel pratico</a></li>
              <li><a href="#chi-siamo" className="text-white/70 hover:text-white transition-colors block">Chi siamo</a></li>
              <li><a href="#prezzi" className="text-white/70 hover:text-white transition-colors block">Prezzi</a></li>
            </ul>
          </div>

          {/* Supporto - SECONDA COLONNA centrata perfettamente su desktop, allineata a sinistra su mobile */}
          <div className="md:flex-1 md:px-4 md:flex md:flex-col md:items-center">
            <h3 className="text-white font-bold mb-2 text-base">Supporto</h3>
            <ul className="space-y-1 text-sm md:text-center">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors block">FAQ</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors block">Termini di Servizio</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors block">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors block">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contatti - TERZA COLONNA allineata a destra */}
          <div className="md:flex-1 md:px-4 md:text-right">
            <h3 className="text-white font-bold mb-2 text-base">Contatti</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex md:justify-end items-start space-x-2">
                <Mail className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/70">info@besaweb.com</span>
              </li>
              <li className="flex md:justify-end items-start space-x-2">
                <Phone className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/70">+39 3512338575</span>
              </li>
              <li className="flex md:justify-end items-start space-x-2">
                <MapPin className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-white/70">Via Adriano Olivetti 1, 31056, Roncade TV </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Modificato: slogan allineato con copyright e link */}
        <div className="pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>&copy; 2025 Besa. Tutti i diritti riservati.</p>

          {/* Slogan spostato qui e centrato */}
          <div className="text-white text-base font-semibold tracking-wider font-sans uppercase my-4 md:my-0 md:-ml-8">
            Veloce, Pratico, Funzionale.
          </div>

          <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Termini</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}