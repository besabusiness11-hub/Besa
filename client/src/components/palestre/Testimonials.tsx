// client/src/components/palestre/Testimonials.tsx
import { palestreContent } from "@/lib/palestre-content";

// Renders nothing until real testimonials exist in palestre-content.ts.
// TODO: add real testimonials once available — never invent content.
export default function Testimonials() {
  const { testimonials } = palestreContent;
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="palestre-display text-2xl">Dicono di noi</h2>
      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <li key={testimonial.name} className="rounded-xl bg-white p-6 shadow-sm">
            <p className="leading-relaxed">"{testimonial.quote}"</p>
            <div className="mt-4 flex items-center gap-3">
              <img
                src={testimonial.photo}
                alt={`Foto di ${testimonial.name}`}
                loading="lazy"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-[var(--pal-ink)]/70">{testimonial.gym}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
