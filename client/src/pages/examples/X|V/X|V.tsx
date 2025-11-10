import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import IntroAnimation from './components1/IntroAnimation';
import Navbar from './components1/Navbar';
import './X|V.css';
import HeroSection from './components1/HeroSection';
import AboutSection from './components1/AboutSection';
import GallerySection from './components1/GallerySection';
import LocationsSection from './components1/LocationsSection';
import EventsSection from './components1/EventsSection';
import ContactSection from './components1/ContactSection';
import Footer from './components1/Footer';

// Load required resources
const loadResources = () => {
  // Load Glightbox CSS
  const glightboxLink = document.createElement('link');
  glightboxLink.rel = 'stylesheet';
  glightboxLink.href = 'https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css';
  document.head.appendChild(glightboxLink);

  // Preload DM Serif Text font
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.href = 'https://fonts.gstatic.com/s/dmseriftext/v12/rnCu-xZa_krGokauCeNq1wWyafOPXHIJErY.woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);
  const [location] = useLocation();

  // Load resources first
  useEffect(() => {
    const loadAllResources = async () => {
      // Load and wait for font
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.href = 'https://fonts.gstatic.com/s/dmseriftext/v12/rnCu-xZa_krGokauCeNq1wWyafOPXHIJErY.woff2';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);

      // Load font with FontFace API
      try {
        const font = new FontFace(
          'DM Serif Text',
          `url(${fontLink.href})`,
          { weight: '400' }
        );
        await font.load();
        document.fonts.add(font);
      } catch (error) {
        console.error('Font loading failed:', error);
      }

      // Load Glightbox CSS
      const glightboxLink = document.createElement('link');
      glightboxLink.rel = 'stylesheet';
      glightboxLink.href = 'https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css';
      document.head.appendChild(glightboxLink);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Mark resources as loaded
      setResourcesLoaded(true);
    };

    loadAllResources();

    // Cleanup function
    return () => {
      const links = document.head.getElementsByTagName('link');
      for (let i = links.length - 1; i >= 0; i--) {
        const link = links[i];
        if (link.href.includes('fonts.googleapis.com') || 
            link.href.includes('fonts.gstatic.com') ||
            link.href.includes('glightbox')) {
          document.head.removeChild(link);
        }
      }
    };
  }, []);

  return (
    <>
      {showIntro && resourcesLoaded && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}
      <div 
        className="bg-black min-h-screen font-zalando xv-content"
        style={{ 
          visibility: showIntro ? 'hidden' : 'visible',
          opacity: showIntro ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <Navbar />
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <LocationsSection />
        <EventsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
