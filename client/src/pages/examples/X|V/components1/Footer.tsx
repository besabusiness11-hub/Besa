import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Download } from 'lucide-react';
import { SiTripadvisor } from 'react-icons/si';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'gallery', href: '#gallery' },
    { key: 'contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMenuDownload = () => {
    window.open('/menu-xv.pdf', '_blank');
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: SiTripadvisor, href: '#', label: 'TripAdvisor' }
  ];

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="text-3xl font-serif text-gold mb-4" data-testid="text-footer-logo">
              X|V
            </div>
            <p className="text-white/60 text-sm">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-gold font-medium mb-4" data-testid="text-footer-quick-links">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/60 hover:text-gold transition-colors text-sm cursor-pointer"
                    data-testid={`link-footer-${link.key}`}
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-gold font-medium mb-4" data-testid="text-footer-follow">
              {t('footer.followUs')}
            </h3>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gold hover:text-black transition-all"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm" data-testid="text-footer-copyright">
              {t('footer.copyright')}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMenuDownload}
              className="text-gold/70 hover:text-gold text-sm group"
              data-testid="button-download-menu"
            >
              <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              <span className="hidden md:inline">{t('menu.downloadPdf')}</span>
              <span className="md:hidden">Menu PDF</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
