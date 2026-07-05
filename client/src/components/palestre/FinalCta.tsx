// client/src/components/palestre/FinalCta.tsx
import {
  palestreContent,
  WHATSAPP_MESSAGE,
  WHATSAPP_NUMBER,
} from "@/lib/palestre-content";
import { buildWhatsAppUrl } from "@/lib/palestre-utm";

export default function FinalCta() {
  const { finalCta, footer } = palestreContent;
  return (
    <>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="palestre-display text-3xl">{finalCta.title}</h2>
          <p className="mt-3 text-lg text-[var(--pal-ink)]/80">{finalCta.body}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#prezzi"
              className="rounded-full bg-[var(--pal-red)] px-6 py-3 font-bold text-white transition-colors hover:bg-[var(--pal-ink)]"
            >
              {finalCta.ctaLabel}
            </a>
            <a
              href={buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-[#25D366] px-6 py-3 font-bold text-[var(--pal-ink)] transition-colors hover:bg-[#25D366] hover:text-white"
            >
              {finalCta.whatsappLabel}
            </a>
          </div>
        </div>
      </section>
      <footer className="border-t border-[var(--pal-ink)]/10 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 text-sm text-[var(--pal-ink)]/70">
          <p>{footer.line}</p>
          <a href={footer.privacyHref} className="underline underline-offset-4">
            Privacy e cookie
          </a>
        </div>
      </footer>
    </>
  );
}
