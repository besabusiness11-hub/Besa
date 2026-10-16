/**
 * Turns whatever a visitor pastes into a link we can use:
 * - share text with a URL inside ("Guarda questo annuncio https://…") -> the URL
 * - a bare domain/path ("facebook.com/…") -> https://facebook.com/…
 * - an Instagram handle ("@pizzeria.mario" or "pizzeria.mario") -> https://www.instagram.com/pizzeria.mario/
 * Returns "" when nothing usable is there.
 */
export function normalizeAdLink(raw: string): string {
  const s = raw.trim();
  if (!s) return "";
  const url = s.match(/https?:\/\/[^\s<>"]+/i)?.[0];
  if (url) return trimTail(url);
  const handle = s.match(/^@?([a-z0-9._]{1,30})$/i);
  if (handle && (s.startsWith("@") || !/\.[a-z]{2,}$/i.test(handle[1]))) {
    return `https://www.instagram.com/${handle[1].replace(/^\.+|\.+$/g, "")}/`;
  }
  const bare = s.match(/\b(?:[\w-]+\.)+[a-z]{2,}(?:\/[^\s<>"]*)?/i)?.[0];
  if (bare) return "https://" + trimTail(bare);
  return "";
}

const trimTail = (u: string) => u.replace(/[),.;:!?»"'’]+$/, "");

/** True for links we accept on the form (http/https with a dotted host). */
export function isAdLink(v: string): boolean {
  try {
    const u = new URL(v);
    return /^https?:$/.test(u.protocol) && u.hostname.includes(".");
  } catch {
    return false;
  }
}
