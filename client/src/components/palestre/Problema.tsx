import { palestreContent } from "@/lib/palestre-content";

export default function Problema() {
  const { problema } = palestreContent;
  return (
    <section className="bg-[var(--pal-ink)] py-14 text-[var(--pal-bg)]">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="palestre-display text-2xl md:text-3xl">{problema.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-[var(--pal-bg)]/85">
          {problema.body}
        </p>
      </div>
    </section>
  );
}
