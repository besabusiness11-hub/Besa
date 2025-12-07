import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactContent } from "@/components/contact/contact-content"

export const metadata = {
  title: "Contact | The Gilded Glass",
  description: "Get in touch with The Gilded Glass. Find our location, hours, and reach out with any questions.",
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main>
        <ContactHero />
        <ContactContent />
      </main>
      <Footer />
    </>
  )
}
