// client/src/pages/Palestre.tsx
import { Helmet } from "react-helmet-async";
import { palestreContent } from "@/lib/palestre-content";
import "@/components/palestre/palestre.css";
import PalestreHeader from "@/components/palestre/PalestreHeader";
import Hero from "@/components/palestre/Hero";
import Problema from "@/components/palestre/Problema";
import ComeFunziona from "@/components/palestre/ComeFunziona";
import GoalConfigurator from "@/components/palestre/GoalConfigurator";
import FeatureGrid from "@/components/palestre/FeatureGrid";
import EducationalSections from "@/components/palestre/EducationalSections";
import PhotoTeaser from "@/components/palestre/PhotoTeaser";
import Pricing from "@/components/palestre/Pricing";
import FaqAccordion from "@/components/palestre/FaqAccordion";
import Testimonials from "@/components/palestre/Testimonials";
import FinalCta from "@/components/palestre/FinalCta";
import WhatsAppFab from "@/components/palestre/WhatsAppFab";

export default function Palestre() {
  const { meta } = palestreContent;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sito web per palestre — BESA",
    serviceType: "Creazione siti web per palestre e centri fitness",
    description: meta.description,
    areaServed: "IT",
    provider: {
      "@type": "LocalBusiness",
      name: "BESA",
      url: "https://besa.it",
    },
  };

  return (
    <div className="palestre-page min-h-screen">
      <Helmet htmlAttributes={{ lang: "it" }}>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Umami analytics already loaded site-wide in client/index.html — no per-page tag needed */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <PalestreHeader />
      <main>
        <Hero />
        <Problema />
        <ComeFunziona />
        <GoalConfigurator />
        <FeatureGrid />
        <EducationalSections />
        <PhotoTeaser />
        <Testimonials />
        <Pricing />
        <FaqAccordion />
        <FinalCta />
      </main>
      <WhatsAppFab />
    </div>
  );
}
