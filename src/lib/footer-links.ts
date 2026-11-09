// Legal links shared by the home footer and the legal pages' footer.
// The page you are on is left out, so /cookie-policy never links to itself.

export type FooterLink = { key: "privacy" | "cookie" | "terms"; title: string; href: string };

type Labels = { privacy: string; cookie: string; terms: string };

/** "/privacy-policy/", "/privacy-policy.html" and "/privacy-policy" are the same page. */
export function normalizePath(path: string): string {
  const p = path.split(/[?#]/)[0].replace(/\.html$/, "").replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

export function legalLinks(currentPath: string, labels: Labels, opts: { terms: boolean }): FooterLink[] {
  const here = normalizePath(currentPath);
  const all: FooterLink[] = [
    { key: "privacy", title: labels.privacy, href: "/privacy-policy" },
    { key: "cookie", title: labels.cookie, href: "/cookie-policy" },
    // In "validation" the terms are only a placeholder: no link until the offer is defined.
    ...(opts.terms ? [{ key: "terms" as const, title: labels.terms, href: "/termini" }] : []),
  ];
  return all.filter((l) => l.href !== here);
}
