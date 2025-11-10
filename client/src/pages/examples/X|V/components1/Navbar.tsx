import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' }
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'gallery', href: '#gallery' },
    { key: 'locations', href: '#locations' },
    { key: 'events', href: '#events' },
    { key: 'contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 3 }}
    >
      <a
        href="/esempi"
        className="return-to-besa"
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
        data-testid="return-to-besa"
      >
        Torna su Besa
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a 
            href="#home" 
            className="text-2xl font-dm-serif text-gold tracking-wider"
            data-testid="link-logo"
          >
            X|V
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative text-sm text-white/90 hover:text-gold transition-colors duration-300 group cursor-pointer font-zalando"
                data-testid={`link-${item.key}`}
              >
                {t(`nav.${item.key}`)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                size="sm"
                onClick={() => changeLanguage(lang.code)}
                className={`text-xs ${
                  i18n.language === lang.code ? 'text-gold' : 'text-white/70'
                }`}
                data-testid={`button-lang-${lang.code}`}
              >
                {lang.label}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block text-white/90 hover:text-gold transition-colors cursor-pointer font-zalando"
                data-testid={`link-mobile-${item.key}`}
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
            <div className="flex space-x-2 pt-4 border-t border-white/10">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`font-zalando ${
                    i18n.language === lang.code ? 'border-gold text-gold' : ''
                  }`}
                  data-testid={`button-mobile-lang-${lang.code}`}
                >
                  {lang.label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
