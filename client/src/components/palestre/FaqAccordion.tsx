// client/src/components/palestre/FaqAccordion.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { palestreContent } from "@/lib/palestre-content";

export default function FaqAccordion() {
  const { faq } = palestreContent;
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="palestre-display text-2xl md:text-3xl">{faq.title}</h2>
      <Accordion type="single" collapsible className="mt-6">
        {faq.items.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="text-left font-bold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-[var(--pal-ink)]/80">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
