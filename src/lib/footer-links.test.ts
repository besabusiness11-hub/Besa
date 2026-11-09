import { describe, expect, it } from "vitest";
import { legalLinks, normalizePath } from "./footer-links";

const labels = { privacy: "Privacy", cookie: "Cookie", terms: "Termini" };
const hrefs = (path: string, terms = true) => legalLinks(path, labels, { terms }).map((l) => l.href);

describe("legalLinks", () => {
  it("shows every legal page on the home", () => {
    expect(hrefs("/")).toEqual(["/privacy-policy", "/cookie-policy", "/termini"]);
  });
  it("drops the cookie link on the cookie page", () => {
    expect(hrefs("/cookie-policy")).toEqual(["/privacy-policy", "/termini"]);
  });
  it("drops the privacy link on the privacy page", () => {
    expect(hrefs("/privacy-policy")).toEqual(["/cookie-policy", "/termini"]);
  });
  it("drops the terms link on the terms page", () => {
    expect(hrefs("/termini")).toEqual(["/privacy-policy", "/cookie-policy"]);
  });
  it("leaves terms out when they are off", () => {
    expect(hrefs("/", false)).toEqual(["/privacy-policy", "/cookie-policy"]);
    expect(hrefs("/cookie-policy", false)).toEqual(["/privacy-policy"]);
  });
  it("matches the current page whatever its URL form", () => {
    for (const p of ["/cookie-policy/", "/cookie-policy.html", "/cookie-policy?x=1", "/cookie-policy#top"]) {
      expect(hrefs(p)).not.toContain("/cookie-policy");
    }
  });
});

describe("normalizePath", () => {
  it("keeps the root", () => {
    expect(normalizePath("/")).toBe("/");
    expect(normalizePath("")).toBe("/");
  });
});
