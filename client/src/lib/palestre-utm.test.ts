import { describe, it, expect } from "vitest";
import {
  extractUtmParams,
  storeUtmParams,
  readStoredUtmParams,
  buildClientReferenceId,
  appendAttributionToStripeLink,
  buildWhatsAppUrl,
} from "./palestre-utm";

function makeStorage(): Storage {
  const store = new Map<string, string>();
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: () => null,
    get length() {
      return store.size;
    },
  } as Storage;
}

describe("extractUtmParams", () => {
  it("reads the three utm params from a query string", () => {
    expect(
      extractUtmParams("?utm_source=instagram&utm_medium=bio&utm_campaign=lancio"),
    ).toEqual({ utm_source: "instagram", utm_medium: "bio", utm_campaign: "lancio" });
  });

  it("omits missing params and ignores unrelated ones", () => {
    expect(extractUtmParams("?utm_source=whatsapp&foo=bar")).toEqual({
      utm_source: "whatsapp",
    });
  });

  it("returns empty object for empty query", () => {
    expect(extractUtmParams("")).toEqual({});
  });
});

describe("storeUtmParams / readStoredUtmParams", () => {
  it("round-trips params through storage", () => {
    const storage = makeStorage();
    storeUtmParams({ utm_source: "instagram" }, storage);
    expect(readStoredUtmParams(storage)).toEqual({ utm_source: "instagram" });
  });

  it("does not overwrite stored params with an empty object", () => {
    const storage = makeStorage();
    storeUtmParams({ utm_source: "instagram" }, storage);
    storeUtmParams({}, storage);
    expect(readStoredUtmParams(storage)).toEqual({ utm_source: "instagram" });
  });

  it("returns empty object when nothing stored or JSON corrupt", () => {
    const storage = makeStorage();
    expect(readStoredUtmParams(storage)).toEqual({});
    storage.setItem("palestre_utm", "{not json");
    expect(readStoredUtmParams(storage)).toEqual({});
  });
});

describe("buildClientReferenceId", () => {
  it("joins source, medium, campaign with underscores", () => {
    expect(
      buildClientReferenceId({
        utm_source: "instagram",
        utm_medium: "bio",
        utm_campaign: "lancio",
      }),
    ).toBe("instagram_bio_lancio");
  });

  it("sanitizes characters Stripe does not allow", () => {
    expect(buildClientReferenceId({ utm_source: "insta gram!" })).toBe("insta-gram-");
  });

  it("returns undefined when no params", () => {
    expect(buildClientReferenceId({})).toBeUndefined();
  });
});

describe("appendAttributionToStripeLink", () => {
  it("appends client_reference_id and utm params", () => {
    const url = appendAttributionToStripeLink("https://buy.stripe.com/abc", {
      utm_source: "instagram",
      utm_medium: "bio",
      utm_campaign: "lancio",
    });
    expect(url).toBe(
      "https://buy.stripe.com/abc?client_reference_id=instagram_bio_lancio&utm_source=instagram&utm_medium=bio&utm_campaign=lancio",
    );
  });

  it("returns base url unchanged when no params", () => {
    expect(appendAttributionToStripeLink("https://buy.stripe.com/abc", {})).toBe(
      "https://buy.stripe.com/abc",
    );
  });
});

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me link with url-encoded message", () => {
    expect(buildWhatsAppUrl("390000000000", "Ciao BESA!")).toBe(
      "https://wa.me/390000000000?text=Ciao%20BESA!",
    );
  });
});
