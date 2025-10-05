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
    { name: "Marketplace", href: "/marketplace" },
    { name: "Categorie", href: "/categories" },
    { name: "Area Fornitori", href: "/suppliers" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img 
                src={logoPath} 
                alt="BeSa Logo" 
                className="h-14 w-auto cursor-pointer" 
                data-testid="logo-link"
              />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Cerca servizi, prodotti o categorie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input pl-10"
                data-testid="search-input"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="hidden lg:flex items-center space-x-1"
              asChild
              data-testid="become-supplier-button"
            >
              <Link href="/suppliers">
                <Briefcase className="h-5 w-5" />
                <span>Diventa Fornitore</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center space-x-1"
              data-testid="login-button"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Accedi</span>
            </Button>

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
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left"
                        data-testid={`mobile-nav-${item.name.toLowerCase().replace(' ', '-')}`}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                  <Link href="/suppliers">
                    <Button variant="outline" className="w-full">
                      Diventa Fornitore
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-8 py-4 border-t border-border">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`nav-link text-sm font-medium ${
                  location === item.href ? "text-primary" : "text-foreground"
                }`}
                data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Input
            type="text"
            placeholder="Cerca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input pl-10"
            data-testid="mobile-search-input"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
