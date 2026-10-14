// @ts-check
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? "https://besaweb.com",
  output: "static", // pages prerendered; only src/pages/api/lead.ts opts out
  adapter: node({ mode: "standalone" }),
  trailingSlash: "never",
  compressHTML: true,
  build: { format: "file", assets: "_astro", inlineStylesheets: "auto" },
  vite: { plugins: [tailwindcss()] },
  image: { service: { entrypoint: "astro/assets/services/sharp" } },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["400 800"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
  ],
});
