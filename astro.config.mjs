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
  // the dev toolbar sits bottom-centre, exactly where the section dock lives (dev-only setting)
  devToolbar: { enabled: false },
  build: { format: "file", assets: "_astro", inlineStylesheets: "always" },
  vite: { plugins: [tailwindcss()], build: { cssMinify: "esbuild" } },
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
