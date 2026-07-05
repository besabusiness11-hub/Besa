import { palestreContent } from "@/lib/palestre-content";

export default function PalestreHeader() {
  const { header } = palestreContent;
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--pal-ink)]/10 bg-[var(--pal-bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="/palestre" className="palestre-display text-xl">
          BESA<span className="text-[var(--pal-accent)]">/palestre</span>
        </a>
        <a
          href="#prezzi"
          className="rounded-full bg-[var(--pal-ink)] px-4 py-2 text-sm font-bold text-[var(--pal-bg)] transition-colors hover:bg-[var(--pal-accent)]"
        >
          {header.ctaLabel}
        </a>
      </div>
    </header>
  );
}
