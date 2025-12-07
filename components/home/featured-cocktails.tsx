"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const featuredCocktails = [
  {
    name: "The Prohibition",
    description: "Aged bourbon, honey syrup, orange bitters, and a hint of smoke",
    video: "/images/Video 1.webm",
  },
  {
    name: "Velvet Underground",
    description: "Gin, elderflower, fresh cucumber, and sparkling wine",
    video: "/images/Video 2.webm",
  },
  {
    name: "Midnight in Paris",
    description: "Cognac, champagne, lavender, and lemon",
    video: "/images/Video 3.webm",
  },
]

function CocktailCard({ cocktail }: { cocktail: typeof featuredCocktails[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="group cursor-pointer">
      <div className="relative overflow-hidden mb-6">
        {shouldLoad ? (
          <video
            ref={videoRef}
            src={cocktail.video}
            muted
            playsInline
            autoPlay
            loop
            className="w-full aspect-[1/1] object-cover transition-transform duration-700 group-hover:scale-105"
            suppressHydrationWarning
          />
        ) : (
          <div className="w-full aspect-[1/1] bg-muted" />
        )}
        <div className="absolute inset-0 bg-background/20 group-hover:bg-background/0 transition-colors duration-500" />
      </div>
      <h3 className="text-2xl font-medium text-foreground group-hover:text-primary transition-colors pl-4">
        {cocktail.name}
      </h3>
      <p className="text-white mt-2 leading-relaxed pl-4">{cocktail.description}</p>
    </div>
  )
}



export function FeaturedCocktails() {
  const [headerRef, isHeaderVisible] = useState(false)

  const [ctaRef, isCtaVisible] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)

  const isMobile = useIsMobile()



  useEffect(() => {

    const observer = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting) {

          isHeaderVisible(true)

        }

      },

      { threshold: 0.1 },

    )



    if (sectionRef.current) {

      observer.observe(sectionRef.current)

    }



    return () => observer.disconnect()

  }, [])



  return (

    <section ref={sectionRef} className="py-24 md:py-32">

      <div className="container mx-auto px-6 featured-cocktails-container">

        {/* Header */}

        <div

          className={cn(

            "text-center mb-16 transition-all duration-1000",

            isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",

          )}

        >

          <span className="text-primary text-sm tracking-[0.3em] uppercase">Signature Creations</span>

          <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4 mb-6">Featured Cocktails</h2>

          <p className="text-muted-foreground max-w-xl mx-auto">

            Our most beloved creations, each one crafted with precision and passion

          </p>

        </div>



        {/* Cocktails */}

        {isMobile ? (

          <Carousel

            opts={{

              align: "start",

              loop: true,

            }}

            className="w-all max-w-xs mx-auto"

          >

            <CarouselContent>

              {featuredCocktails.map((cocktail, index) => (

                <CarouselItem key={index}>

                  <CocktailCard cocktail={cocktail} />

                </CarouselItem>

              ))}

            </CarouselContent>

            <CarouselPrevious />

            <CarouselNext />

          </Carousel>

        ) : (

          <div className="grid md:grid-cols-3 gap-8">

            {featuredCocktails.map(cocktail => (

              <CocktailCard key={cocktail.name} cocktail={cocktail} />

            ))}

          </div>

        )}



        {/* CTA */}

        <div

          className={cn(

            "text-center mt-16 transition-all duration-1000 delay-700",

            isCtaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",

          )}

        >

          <Link

            href="/menu"

            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors group"

          >

            <span className="tracking-widest uppercase text-sm">View Full Menu</span>

            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />

          </Link>

        </div>

      </div>

    </section>

  )

}
