const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/** Perforated postage-stamp outline as a CSS polygon (percent units). */
export function stampClipPath(depth = 2.4, horizontal = 12, vertical = 15): string {
  const d = clamp(depth, 0, 10);
  const hc = clamp(Math.round(horizontal), 4, 32);
  const vc = clamp(Math.round(vertical), 4, 40);
  const hs = 100 / hc;
  const vs = 100 / vc;
  const pts: Array<[number, number]> = [[0, 0]];
  for (let i = 0; i < hc; i++) {
    const s = i * hs;
    pts.push([s + hs * 0.25, 0], [s + hs * 0.5, d], [s + hs * 0.75, 0], [s + hs, 0]);
  }
  for (let i = 0; i < vc; i++) {
    const s = i * vs;
    pts.push([100, s + vs * 0.25], [100 - d, s + vs * 0.5], [100, s + vs * 0.75], [100, s + vs]);
  }
  for (let i = 0; i < hc; i++) {
    const s = 100 - i * hs;
    pts.push([s - hs * 0.25, 100], [s - hs * 0.5, 100 - d], [s - hs * 0.75, 100], [s - hs, 100]);
  }
  for (let i = 0; i < vc; i++) {
    const s = 100 - i * vs;
    pts.push([0, s - vs * 0.25], [d, s - vs * 0.5], [0, s - vs * 0.75], [0, s - vs]);
  }
  return `polygon(${pts.map(([x, y]) => `${x.toFixed(3)}% ${y.toFixed(3)}%`).join(", ")})`;
}
