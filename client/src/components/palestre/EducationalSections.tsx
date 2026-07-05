import { palestreContent } from "@/lib/palestre-content";

export default function EducationalSections() {
  const { educational } = palestreContent;
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl space-y-12 px-4">
        {educational.map((article) => (
          <article key={article.title}>
            <h2 className="palestre-display text-2xl">{article.title}</h2>
            {article.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed text-[var(--pal-ink)]/80">
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
