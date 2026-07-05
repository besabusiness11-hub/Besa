import { Camera } from "lucide-react";
import { palestreContent } from "@/lib/palestre-content";

export default function PhotoTeaser() {
  const { photoTeaser } = palestreContent;
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-xl border-2 border-dashed border-[var(--pal-ink)]/30 bg-[var(--pal-yellow)]/10 p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Camera className="h-5 w-5 text-[var(--pal-ink)]" aria-hidden="true" />
          {photoTeaser.title}
        </h2>
        <p className="mt-2 text-[var(--pal-ink)]/80">{photoTeaser.body}</p>
        <a
          href={photoTeaser.ctaHref}
          className="mt-4 inline-block font-bold underline underline-offset-4 hover:text-[var(--pal-red)]"
        >
          {photoTeaser.ctaLabel}
        </a>
      </div>
    </section>
  );
}
