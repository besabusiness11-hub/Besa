import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoPath from "@assets/besa-logo.png";

interface NavigationItem {
  name: string;
  href: string;
  isPage?: boolean;
  isButton?: boolean;
}

export default function Header() {
  const [location, setLocation] = useLocation();

  const leftNavigation: NavigationItem[] = [
    { name: "Esempi", href: "/esempi", isPage: true },
    { name: "Nel pratico", href: "#come-funziona" },
  ];

  const rightNavigation: NavigationItem[] = [
    { name: "Chi siamo", href: "#chi-siamo" },
    { name: "Prezzi", href: "#prezzi", isButton: true },
  ];

  const scrollToSection = (sectionId: string) => {
    const id = sectionId.replace('#', '');
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLogoClick = () => {
    if (location === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setLocation("/");
      // Scroll to top quando torni alla home da un'altra pagina
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 50);
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isPage: boolean = false,
  ) => {
    e.preventDefault();

    if (isPage) {
      // Naviga alla pagina dedicata usando wouter
      setLocation(href);
    } else {
      // Se siamo già in homepage, scrolla alla sezione
      if (location === "/") {
        scrollToSection(href);
      } else {
        // Se siamo in un'altra pagina, naviga alla home e poi scrolla
        setLocation("/");
        // Aspetta che la home si carichi prima di scrollare
        setTimeout(() => {
          scrollToSection(href);
        }, 100);
      }
    }
  };

  const handleMobileNavClick = (href: string, isPage: boolean = false) => {
    if (isPage) {
      // Naviga alla pagina dedicata usando wouter
      setLocation(href);
    } else {
      // Se siamo già in homepage, scrolla alla sezione
      if (location === "/") {
        scrollToSection(href);
      } else {
        // Se siamo in un'altra pagina, naviga alla home e poi scrolla
        setLocation("/");
        // Aspetta che la home si carichi prima di scrollare
        setTimeout(() => {
          scrollToSection(href);
        }, 100);
      }
    }

    // Chiudi il mobile menu dopo il click
    setTimeout(() => {
      const openSheet = document.querySelector('[data-state="open"]');
      if (openSheet) {
        const closeButton = openSheet.querySelector(
          'button[aria-label="Close"]',
        ) as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
      }
    }, 50);
  };

  const getTestId = (name: string, prefix: string = "nav") => {
    return `${prefix}-${name.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50 shadow-sm hover:bg-white/95 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Left Navigation */}
          <nav className="hidden md:flex items-center space-x-8 flex-1">
            {leftNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.isPage)}
                className="nav-link text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-testid={getTestId(item.name)}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none">
            <div className="relative group">
              <img
                src={logoPath}
                alt="Besa Logo"
                className="h-24 w-auto cursor-pointer transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
                onClick={handleLogoClick}
                data-testid="logo-link"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"></div>
            </div>
          </div>

          {/* Right Navigation */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-end">
            {rightNavigation.map((item) =>
              item.isButton ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md relative overflow-hidden group"
                  data-testid={getTestId(item.name)}
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  {item.name}
                </a>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-link text-sm font-medium text-foreground hover:text-primary transition-colors"
                  data-testid={getTestId(item.name)}
                >
                  {item.name}
                </a>
              ),
            )}
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden ml-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  data-testid="mobile-menu-trigger"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {[...leftNavigation, ...rightNavigation].map((item) =>
                    item.isButton ? (
                      <button
                        key={item.name}
                        onClick={() =>
                          handleMobileNavClick(item.href, item.isPage)
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                        data-testid={getTestId(item.name, "mobile-nav")}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <button
                        key={item.name}
                        onClick={() =>
                          handleMobileNavClick(item.href, item.isPage)
                        }
                        className="text-left px-4 py-2 hover:bg-secondary rounded-md transition-colors"
                        data-testid={getTestId(item.name, "mobile-nav")}
                      >
                        {item.name}
                      </button>
                    ),
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}