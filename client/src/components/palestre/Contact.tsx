import { Mail, MessageCircle } from "lucide-react";
import { palestreContent, WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/lib/palestre-content";
import { buildWhatsAppUrl } from "@/lib/palestre-utm";

export default function Contact() {
  const { contact } = palestreContent;
  return (
    <section id="contatto" className="bg-white py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="palestre-display text-2xl md:text-3xl">{contact.title}</h2>
        <p className="mx-auto mt-3 max-w-md text-[var(--pal-ink)]/75">{contact.body}</p>
        <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:justify-center">
          <a
            href={buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {contact.whatsappLabel}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-[var(--pal-ink)] px-6 py-3 font-bold transition-colors hover:bg-[var(--pal-ink)] hover:text-[var(--pal-bg)]"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {contact.emailLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
