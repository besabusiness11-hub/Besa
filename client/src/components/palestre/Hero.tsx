import { Star } from "lucide-react";
import { palestreContent } from "@/lib/palestre-content";
import PhoneFrame from "@/components/palestre/PhoneFrame";

// Mock content shown inside the shared phone frame: a sample gym one-pager,
// styled DOM only (no image) so it stays fast.
function MockScreen() {
  return (
    <div className="flex flex-1 flex-col gap-2.5 px-3 pb-8 pt-8">
      <div className="rounded-2xl bg-[var(--pal-ink)] px-4 py-5 text-center">
        <p className="palestre-display text-xs text-white">La tua palestra</p>
        <span className="mt-3 inline-block rounded-full bg-[var(--pal-red)] px-3 py-1.5 text-[10px] font-bold text-white">
          Prenota la tua prova gratuita
        </span>
      </div>
      <div className="flex items-center gap-1.5 rounded-xl bg-[var(--pal-bg)] px-3 py-2.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-3 w-3 fill-[var(--pal-yellow)] text-[var(--pal-yellow)]" />
        ))}
        <span className="ml-1 text-[9px] font-semibold">Recensioni Google</span>
      </div>
      <div className="rounded-xl bg-[var(--pal-bg)] px-3 py-2.5">
        <p className="text-[9px] font-bold uppercase tracking-wide">Orari corsi</p>
        <div className="mt-1.5 space-y-1.5">
          <div className="h-2 rounded-full bg-[var(--pal-ink)]/15" />
          <div className="h-2 w-4/5 rounded-full bg-[var(--pal-ink)]/15" />
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between rounded-xl bg-[#25D366]/15 px-3 py-2.5">
        <span className="text-[9px] font-semibold">Scrivici su WhatsApp</span>
        <span className="h-4 w-4 rounded-full bg-[#25D366]" />
      </div>
    </div>
  );
}

// Decorative bumper plates floating behind the phone: makes the abstract
// accent-color system read as a literal, on-brand object instead of just paint.
function PlateBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <span className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--pal-yellow)]/25 blur-3xl" />
      <span className="absolute -left-4 top-6 h-24 w-24 -rotate-12 rounded-full border-[10px] border-[var(--pal-ink)] bg-[var(--pal-blue)] shadow-lg sm:-left-8" />
      <span className="absolute -right-2 bottom-16 h-20 w-20 rotate-12 rounded-full border-[8px] border-[var(--pal-ink)] bg-[var(--pal-green)] shadow-lg sm:-right-6" />
    </div>
  );
}

export default function Hero() {
  const { hero } = palestreContent;
  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-4 pb-16 pt-12 md:grid-cols-2 md:items-center">
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
        <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
          <span
            aria-hidden="true"
            className="palestre-display flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-[var(--pal-ink)] bg-[var(--pal-red)] text-sm text-white"
          >
            45%
          </span>
          <div>
            <p className="text-sm font-semibold leading-snug">{hero.stat.figure}</p>
            <p className="mt-1 text-xs text-[var(--pal-ink)]/70">{hero.stat.followUp}</p>
          </div>
        </div>
      </div>
      <div className="relative mx-auto flex items-center justify-center py-6">
        <PlateBackdrop />
        <PhoneFrame className="-rotate-2">
          <MockScreen />
        </PhoneFrame>
      </div>
    </section>
  );
}
