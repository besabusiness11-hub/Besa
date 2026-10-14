// Genera favicon-32.png, favicon-192.png, favicon-512.png, apple-touch-icon.png dal favicon.svg.
// Non e' nel prebuild: gli output sono committati. Esegui: node scripts/favicons.mjs
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(resolve(root, "public/favicon.svg"));
const targets = { "favicon-32.png": 32, "favicon-192.png": 192, "favicon-512.png": 512, "apple-touch-icon.png": 180 };
for (const [name, size] of Object.entries(targets)) {
  // apple-touch-icon: quadrato pieno (iOS applica da solo gli angoli arrotondati)
  const input = name.startsWith("apple")
    ? Buffer.from(svg.toString().replace('rx="7"', 'rx="0"'))
    : svg;
  await sharp(input, { density: 512 }).resize(size, size).png({ compressionLevel: 9 }).toFile(resolve(root, "public", name));
}
console.log("favicons ok");
