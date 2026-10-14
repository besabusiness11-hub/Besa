/** Turns "a {em}b{/em} c" into safe HTML. Input is our own copy, escaped first. */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const em = (s: string) =>
  esc(s).replace(/\{em\}/g, '<span class="em">').replace(/\{\/em\}/g, "</span>");
