import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  lang?: string;
}

export default function SEO({
  title = "Besa | Siti Web Professionali",
  description = "Besa crea siti web professionali per attività locali. Dalla progettazione alla pubblicazione, ci occupiamo di tutto per la tua presenza digitale.",
  name = "Besa",
  type = "website",
  lang = "it",
}: SEOProps) {
  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
