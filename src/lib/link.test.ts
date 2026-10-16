import { describe, expect, it } from "vitest";
import { isAdLink, normalizeAdLink } from "./link";

describe("normalizeAdLink", () => {
  it("keeps a full URL", () => {
    expect(normalizeAdLink("https://www.facebook.com/ads/library/?id=123")).toBe("https://www.facebook.com/ads/library/?id=123");
  });
  it("pulls the URL out of share text and trims punctuation", () => {
    expect(normalizeAdLink("Guarda questo annuncio: https://www.instagram.com/p/abc/).")).toBe("https://www.instagram.com/p/abc/");
  });
  it("adds the scheme to a bare domain", () => {
    expect(normalizeAdLink("fb.me/abc123")).toBe("https://fb.me/abc123");
  });
  it("turns an Instagram handle into a profile link", () => {
    expect(normalizeAdLink("@pizzeria.mario")).toBe("https://www.instagram.com/pizzeria.mario/");
    expect(normalizeAdLink("palestra_roncade")).toBe("https://www.instagram.com/palestra_roncade/");
  });
  it("treats domain-looking text as a domain, not a handle", () => {
    expect(normalizeAdLink("besaweb.com")).toBe("https://besaweb.com");
  });
  it("returns empty for nothing usable", () => {
    expect(normalizeAdLink("   ")).toBe("");
    expect(normalizeAdLink("non lo so")).toBe("");
  });
  it("produces links the form accepts", () => {
    for (const v of ["@a.b", "instagram.com/x", "https://m.facebook.com/x"]) expect(isAdLink(normalizeAdLink(v))).toBe(true);
  });
});
