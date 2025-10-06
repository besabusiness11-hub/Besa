import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoPath from "@assets/ChatGPT Image 25 set 2025, 13_13_58_1759676591455.png";

export default function Header() {
  const [search, setSearch] = useState("");
  const [location] = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Esempi", href: "#esempi" },
    { name: "Nel pratico", href: "#come-funziona" },
    { name: "Chi siamo", href: "#chi-siamo" },
    { name: "Prezzi", href: "#prezzi" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img 
                src={logoPath} 
                alt="Besa Logo" 
                className="h-14 w-auto cursor-pointer" 
                data-testid="logo-link"
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="nav-link text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="mobile-menu-trigger">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href}
                    className="text-left px-4 py-2 hover:bg-secondary rounded-md transition-colors"
                    data-testid={`mobile-nav-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
