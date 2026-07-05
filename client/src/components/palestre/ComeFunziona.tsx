import { palestreContent } from "@/lib/palestre-content";

export default function ComeFunziona() {
  const { comeFunziona } = palestreContent;
  return (
    <section id="come-funziona" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="palestre-display text-2xl md:text-3xl">{comeFunziona.title}</h2>
      <ol className="mt-8 grid gap-6 md:grid-cols-2">
        {comeFunziona.steps.map((step, index) => (
          <li key={step.title} className="rounded-xl bg-white p-6 shadow-sm">
            <span className="palestre-display text-3xl text-[var(--pal-red)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
            <p className="mt-1 text-[var(--pal-ink)]/75">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
