// Contact and company data from the /admin panel (src/data/site/contacts.json).
// Empty fields are simply not shown: never fill them with placeholders.
import json from "../data/site/contacts.json" with { type: "json" };

// The panel omits empty fields, so read the file loosely.
const data = json as unknown as { whatsappNumber?: unknown; company?: { name?: unknown; vat?: unknown; address?: unknown } };

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** WhatsApp number, digits only with country code (393331234567). Falls back to PUBLIC_WHATSAPP_NUMBER. */
export function whatsappNumber(fromPanel: unknown = data.whatsappNumber, fromEnv: unknown = (import.meta as { env?: Record<string, string | undefined> }).env?.PUBLIC_WHATSAPP_NUMBER): string {
  return (text(fromPanel) || text(fromEnv)).replace(/\D/g, "");
}

export const COMPANY = {
  name: text(data.company?.name),
  vat: text(data.company?.vat),
  address: text(data.company?.address),
};

/** Footer legal line: brand, then company name, VAT number and address when they exist, then the email. */
export function legalLine(company: { name: string; vat: string; address: string } = COMPANY, email = "info@besaweb.com"): string {
  return ["besaweb", company.name, company.vat && `P.IVA ${company.vat}`, company.address, email].filter(Boolean).join(" · ");
}
