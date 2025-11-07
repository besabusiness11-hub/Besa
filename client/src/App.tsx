import WebsiteShowcase from './WebsiteShowcase.jsx';
import { useState, useCallback, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SplashScreen } from "@/components/splash-screen";
import Home from "@/pages/home";
import Marketplace from "@/pages/marketplace";
import Categories from "@/pages/categories";
import ProductDetail from "@/pages/product-detail";
import Suppliers from "@/pages/suppliers";
import NotFound from "@/pages/not-found";
import Esempi from "@/pages/Esempi";

// Importa il form (puoi tenerlo importato se ti serve in futuro)
import ContactForm from "@/components/ui/ContactForm";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/esempi" component={Esempi} />
      {/* AGGIUNTE: Rotta per sezioni con hash */}
      <Route path="/:section" component={Home} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/categories" component={Categories} />
      <Route path="/categories/:slug" component={Categories} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/suppliers" component={Suppliers} />
      <Route component={NotFound} />
    </Switch>
  );
}

// [MANTIENI TUTTO IL RESTO DEL CODICE COME È...]

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    setTimeout(() => {
      setShowContent(true);
    }, 50);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <div
          className={`min-h-screen bg-white transition-all duration-1000 ease-in-out ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          data-testid="main-content"
        >
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;