import { useState, useEffect } from "react";
import { Route, Switch } from "wouter";
import Home from "./pages/home";
import Esempi from "./pages/Esempi";
import Categories from "./pages/categories";
import NotFound from "./pages/not-found";
import PrivacyCookie from "./pages/PrivacyCookie";
import Opzioni from "./pages/Opzioni";
import { SplashScreen } from "./components/splash-screen";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    initCookieConsent?: () => void;
  }
}

function App() {
  const [showSplash, setShowSplash] = useState(() => window.location.pathname !== '/privacy-policy');
  const [cookieConsentLoaded, setCookieConsentLoaded] = useState(false);

  useEffect(() => {
    // Load cookie consent script after splash screen is done
    if (!showSplash && !cookieConsentLoaded) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/cookieconsent-config.js';
      script.onload = () => {
        // Initialize cookie consent after script loads
        setTimeout(() => {
          if (window.initCookieConsent) {
            window.initCookieConsent();
          }
        }, 300);
      };
      document.body.appendChild(script);
      setCookieConsentLoaded(true);
    }
  }, [showSplash, cookieConsentLoaded]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/esempi" component={Esempi} />
      <Route path="/opzioni" component={Opzioni} />
      <Route path="/categories" component={Categories} />
      <Route path="/privacy-policy" component={PrivacyCookie} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
