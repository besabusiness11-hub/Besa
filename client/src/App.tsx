import { useState, useCallback, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nextProvider } from "react-i18next";
import i18n from "./pages/examples/X|V/i18n/config";
import { SplashScreen } from "@/components/splash-screen";
import Home from "@/pages/home";
import Categories from "@/pages/categories";
import NotFound from "@/pages/not-found";
import Esempi from "@/pages/Esempi";
import EsempioRistorante from "@/pages/examples/X|V/X|V";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/esempi" component={Esempi} />
      <Route path="/examples/X|V" component={EsempioRistorante} />
      <Route path="/:section" component={Home} />
      <Route path="/categories" component={Categories} />
      <Route path="/categories/:slug" component={Categories} />
      <Route component={NotFound} />
    </Switch>
  );
}

// [MANTIENI TUTTO IL RESTO DEL CODICE COME È...]

function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashShown'));
  const [showContent, setShowContent] = useState(!showSplash);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
    setTimeout(() => {
      setShowContent(true);
    }, 50);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  );
}

export default App;