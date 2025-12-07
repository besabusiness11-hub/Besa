import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MenuHero } from "@/components/menu/menu-hero"
import { MenuCategories } from "@/components/menu/menu-categories"
import { MenuCTA } from "@/components/menu/menu-cta"

export const metadata = {
  title: "Cocktail Menu | The Gilded Glass",
  description: "Explore our handcrafted cocktails, from timeless classics to signature house creations.",
}

export default function MenuPage() {
  return (
    <>
      <Navigation />
      <main>
        <MenuHero />
        <MenuCategories />
        <MenuCTA />
      </main>
      <Footer />
    </>
  )
}
