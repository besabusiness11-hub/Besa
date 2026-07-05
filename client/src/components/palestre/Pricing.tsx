// client/src/components/palestre/Pricing.tsx
import { Check } from "lucide-react";
import {
  palestreContent,
  STRIPE_LINK_MONTHLY,
  STRIPE_LINK_ONETIME,
} from "@/lib/palestre-content";
import { appendAttributionToStripeLink } from "@/lib/palestre-utm";
import { useUtmParams } from "@/hooks/useUtmParams";

export default function Pricing() {
  const { pricing } = palestreContent;
  const utm = useUtmParams();

  return (
    <section id="prezzi" className="bg-[var(--pal-ink)] py-16 text-[var(--pal-bg)]">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="palestre-display text-2xl md:text-3xl">{pricing.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Monthly — recommended default */}
          <div className="relative rounded-2xl border-4 border-[var(--pal-red)] bg-white p-6 text-[var(--pal-ink)]">
            <span className="absolute -top-4 left-6 rounded-full bg-[var(--pal-red)] px-3 py-1 text-xs font-bold uppercase text-white">
              {pricing.monthly.badge}
            </span>
            <h3 className="text-lg font-bold">{pricing.monthly.name}</h3>
            <p className="mt-2">
              <span className="palestre-display text-4xl">{pricing.monthly.price}</span>
              <span className="text-[var(--pal-ink)]/70"> {pricing.monthly.period}</span>
            </p>
            <ul className="mt-4 space-y-2">
              {pricing.monthly.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-[var(--pal-green)]" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
            <a
              href={appendAttributionToStripeLink(STRIPE_LINK_MONTHLY, utm)}
              className="mt-6 block rounded-full bg-[var(--pal-red)] px-6 py-3 text-center font-bold text-white transition-colors hover:bg-[var(--pal-ink)]"
            >
              {pricing.monthly.ctaLabel}
            </a>
          </div>

          {/* One-time — quieter */}
          <div className="rounded-2xl border border-[var(--pal-bg)]/25 p-6">
            <h3 className="text-lg font-bold">{pricing.onetime.name}</h3>
            <p className="mt-2">
              <span className="palestre-display text-4xl">{pricing.onetime.price}</span>
              <span className="text-[var(--pal-bg)]/70"> {pricing.onetime.period}</span>
            </p>
            <ul className="mt-4 space-y-2">
              {pricing.onetime.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-sm text-[var(--pal-bg)]/85">
                  <Check className="h-4 w-4 shrink-0 text-[var(--pal-bg)]/60" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
            <a
              href={appendAttributionToStripeLink(STRIPE_LINK_ONETIME, utm)}
              className="mt-6 block rounded-full border-2 border-[var(--pal-bg)] px-6 py-3 text-center font-bold transition-colors hover:bg-[var(--pal-bg)] hover:text-[var(--pal-ink)]"
            >
              {pricing.onetime.ctaLabel}
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-[var(--pal-bg)]/80">
          {pricing.clarifier}
        </p>
      </div>
    </section>
  );
}
