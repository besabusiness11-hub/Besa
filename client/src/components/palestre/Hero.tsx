import { Star } from "lucide-react";
import { palestreContent } from "@/lib/palestre-content";

// Styled-DOM phone mockup of a sample gym one-pager: fast (no image) and
// visually consistent with the goal configurator preview further down.
function PhoneMockup() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-64 rounded-[2rem] border-4 border-[var(--pal-ink)] bg-white p-3 shadow-xl"
    >
      <div className="space-y-2">
        <div className="rounded-lg bg-[var(--pal-ink)] px-3 py-4 text-center">
          <p className="palestre-display text-xs text-white">La tua palestra</p>
          <span className="mt-2 inline-block rounded-full bg-[var(--pal-red)] px-3 py-1 text-[10px] font-bold text-white">
            Prenota la tua prova gratuita
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-[var(--pal-bg)] px-3 py-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3 w-3 fill-[var(--pal-yellow)] text-[var(--pal-yellow)]" />
          ))}
          <span className="ml-1 text-[9px] font-semibold">Recensioni Google</span>
        </div>
        <div className="rounded-lg bg-[var(--pal-bg)] px-3 py-2">
          <p className="text-[9px] font-bold uppercase">Orari corsi</p>
          <div className="mt-1 space-y-1">
            <div className="h-2 rounded bg-[var(--pal-ink)]/15" />
            <div className="h-2 w-4/5 rounded bg-[var(--pal-ink)]/15" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-[#25D366]/15 px-3 py-2">
          <span className="text-[9px] font-semibold">Scrivici su WhatsApp</span>
          <span className="h-4 w-4 rounded-full bg-[#25D366]" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { hero } = palestreContent;
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 pb-16 pt-12 md:grid-cols-2 md:items-center">
      <div>
        <p className="inline-block rounded-full border-2 border-[var(--pal-ink)] px-3 py-1 text-xs font-bold uppercase tracking-wide">
          {hero.eyebrow}
        </p>
        <h1 className="palestre-display mt-5 text-3xl md:text-4xl lg:text-5xl">
          {hero.headline}
        </h1>
        <p className="mt-4 text-lg text-[var(--pal-ink)]/80">{hero.subheadline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={hero.primaryCta.href}
            className="rounded-full bg-[var(--pal-red)] px-6 py-3 font-bold text-white transition-colors hover:bg-[var(--pal-ink)]"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="rounded-full border-2 border-[var(--pal-ink)] px-6 py-3 font-bold transition-colors hover:bg-[var(--pal-ink)] hover:text-[var(--pal-bg)]"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
        <div className="mt-8 rounded-xl border-l-8 border-[var(--pal-red)] bg-white p-4 shadow-sm">
          <p className="palestre-display text-lg">{hero.stat.figure}</p>
          <p className="mt-1 text-sm text-[var(--pal-ink)]/70">{hero.stat.followUp}</p>
        </div>
      </div>
      <PhoneMockup />
    </section>
  );
}
