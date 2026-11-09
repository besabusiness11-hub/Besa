// `pnpm features`: what is switched off on the site, why, and what is needed to switch it back on.
// Reads src/lib/features.ts directly (Node 24 strips the types), so it never drifts from the site.
import { FEATURES, type Feature, OFFER_MODE, OFFER_MODES, PLANNED } from "../src/lib/features.ts";

const bold = (s: string) => (process.stdout.isTTY ? `\x1b[1m${s}\x1b[0m` : s);
const lines: string[] = [];

lines.push(`${bold("Modalità offerta")}: ${OFFER_MODE}  (possibili: ${OFFER_MODES.join(", ")})`, "");

const entries = Object.entries(FEATURES) as [string, Feature][];
lines.push(bold("Accesi"));
const on = entries.filter(([, f]) => f.enabled);
lines.push(...(on.length ? on.map(([k, f]) => `  ✓ ${k}: ${f.label}`) : ["  (nessuno)"]), "");

lines.push(bold("Spenti"));
for (const [k, f] of entries.filter(([, f]) => !f.enabled)) {
  lines.push(`  ✗ ${k}: ${f.label}${f.offSince ? ` (dal ${f.offSince})` : ""}`);
  lines.push(`    Perché: ${f.whyOff ?? "(manca il motivo)"}`);
  lines.push("    Per riaccenderlo:");
  for (const step of f.reEnable ?? ["(manca la checklist)"]) lines.push(`      [ ] ${step}`);
  lines.push(`    File: ${f.touches.join(", ")}`, "");
}

lines.push(bold("Previsti, non costruiti"));
for (const [k, p] of Object.entries(PLANNED)) {
  lines.push(`  · ${k}: ${p.label}`, "    Da decidere:");
  for (const q of p.toDecide) lines.push(`      - ${q}`);
}

console.log(lines.join("\n"));
