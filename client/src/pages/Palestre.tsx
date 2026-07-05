// client/src/pages/Palestre.tsx
import { Helmet } from "react-helmet-async";
import { palestreContent, UMAMI_SITE_ID, UMAMI_SRC } from "@/lib/palestre-content";
import "@/components/palestre/palestre.css";

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
        {/* TODO: insert real Umami site ID (and confirm script host) */}
        <script defer src={UMAMI_SRC} data-website-id={UMAMI_SITE_ID}></script>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <main>
        {/* sections mount here */}
      </main>
    </div>
  );
}
