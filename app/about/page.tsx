import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { OurStory } from "@/components/about/our-story"
import { OurValues } from "@/components/about/our-values"
import { TheTeam } from "@/components/about/the-team"

export const metadata = {
  title: "About Us | The Gilded Glass",
  description: "Discover the story, philosophy, and passionate team behind The Gilded Glass cocktail bar.",
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <AboutHero />
        <OurStory />
        <OurValues />
        <TheTeam />
      </main>
      <Footer />
    </>
  )
}
