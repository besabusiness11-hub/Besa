// Genera public/og/home.png (1200x630) con Playwright (Chromium) + Inter variabile locale.
// Se Chromium non c'e' (es. build Docker) e il PNG esiste gia', salta senza errore.
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "public/og/home.png");
const BLUE = "#2844bd";
const headline = "Per chi fa Meta Ads: più messaggi dai click che già paghi.";

const b64 = (p) => readFileSync(resolve(root, p)).toString("base64");
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Inter;font-weight:100 900;src:url(data:font/woff2;base64,${b64("scripts/fonts/inter-latin-wght-normal.woff2")}) format("woff2")}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:${BLUE};color:#fff;font-family:Inter,sans-serif;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
img{height:96px;width:auto;align-self:flex-start}
h1{font-weight:800;font-size:84px;line-height:1.02;letter-spacing:-0.035em;max-width:1000px;text-wrap:balance}
</style><img src="data:image/png;base64,${b64("src/assets/logo-white.png")}"><h1>${headline}</h1>`;

try {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.setContent(html);
    await page.evaluate(() => document.fonts.ready);
    const shot = await page.screenshot({ type: "png" });
    mkdirSync(dirname(out), { recursive: true });
    await sharp(shot).png({ palette: true, colors: 32, compressionLevel: 9, effort: 10 }).toFile(out);
    console.log("og: scritto public/og/home.png");
  } finally {
    await browser.close();
  }
} catch (err) {
  if (existsSync(out)) {
    console.warn(`og: Chromium non disponibile (${err.message.split("\n")[0]}); uso il PNG esistente.`);
  } else {
    console.error("og: impossibile generare l'immagine e public/og/home.png non esiste.", err);
    process.exit(1);
  }
}
