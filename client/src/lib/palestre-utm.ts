// UTM capture + attribution threading for /palestre.
// Pure functions; storage is injected so everything is unit-testable.

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const SESSION_KEY = "palestre_utm";

export function extractUtmParams(search: string): UtmParams {
  const query = new URLSearchParams(search);
  const params: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = query.get(key);
    if (value) params[key] = value;
  }
  return params;
}

export function storeUtmParams(params: UtmParams, storage: Storage): void {
  if (Object.keys(params).length === 0) return;
  storage.setItem(SESSION_KEY, JSON.stringify(params));
}

export function readStoredUtmParams(storage: Storage): UtmParams {
  try {
    const raw = storage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

// Stripe client_reference_id allows only alphanumerics, dashes, underscores.
export function buildClientReferenceId(params: UtmParams): string | undefined {
  const parts = UTM_KEYS.map((key) => params[key]).filter(
    (value): value is string => Boolean(value),
  );
  if (parts.length === 0) return undefined;
  return parts.join("_").replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 200);
}

export function appendAttributionToStripeLink(
  baseUrl: string,
  params: UtmParams,
): string {
  const referenceId = buildClientReferenceId(params);
  if (!referenceId) return baseUrl;
  const url = new URL(baseUrl);
  url.searchParams.set("client_reference_id", referenceId);
  for (const key of UTM_KEYS) {
    const value = params[key];
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
