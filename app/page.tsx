import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedCocktails } from "@/components/home/featured-cocktails"
import { AmbianceSection } from "@/components/home/ambiance-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedCocktails />
        <AmbianceSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
