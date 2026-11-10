// @ts-check
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? "https://besaweb.com",
  output: "static", // pages prerendered; only /api/lead, /keystatic and /api/keystatic opt out
  adapter: node({ mode: "standalone" }),
  // React only for the admin panel (/keystatic, src/pages/keystatic): no public page ships React.
  integrations: [react()],
  trailingSlash: "never",
  // Behind Coolify (Traefik) and Cloudflare the app sees plain http on an internal host. Trust the
  // proxy's X-Forwarded-Host/Proto for our own domains only, so SSR routes see https://besaweb.com:
  // the /keystatic GitHub login builds its OAuth redirect_uri from the request URL.
  security: {
    allowedDomains: [
      { hostname: "besaweb.com", protocol: "https" },
      { hostname: "**.besaweb.com", protocol: "https" },
    ],
  },
  compressHTML: true,
  // the dev toolbar sits bottom-centre, exactly where the section dock lives (dev-only setting)
  devToolbar: { enabled: false },
  build: { format: "file", assets: "_astro", inlineStylesheets: "always" },
  vite: { plugins: [tailwindcss()], build: { cssMinify: "esbuild" } },
  image: { service: { entrypoint: "astro/assets/services/sharp" } },
  // Same family declared twice (Astro merges them): the variable roman file for every weight, but only
  // italic 800, the only italic the design uses (headline emphasis, names, slogan). Saves ~50 KB on mobile.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["400 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [800],
      styles: ["italic"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
  ],
});
