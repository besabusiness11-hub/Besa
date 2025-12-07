"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function IntroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="intro-section" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={cn(
              "relative transition-all duration-1000 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
            )}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/bartender-crafting-cocktail-with-golden-lighting-v.jpg"
                alt="Bartender crafting a cocktail"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary -z-10" />
          </div>

          {/* Content */}
          <div
            className={cn(
              "transition-all duration-1000 delay-400 pl-32",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            )}
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase">Our Philosophy</span>

            <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4 mb-6 leading-tight">
              Where Craftsmanship Meets Tradition
            </h2>

            <div className="space-y-4 text-white leading-relaxed">
              <p>
                Tucked away behind an unmarked door lies The Gilded Glass, a sanctuary for those who appreciate the
                finer things. Here, time moves differently—slowly, deliberately, with purpose.
              </p>
              <p>
                Our bartenders are not merely mixologists; they are storytellers, historians, and alchemists. Each
                cocktail is a journey through flavor, a nod to the past with a vision for the future.
              </p>
              <p>
                We source rare spirits from around the world, craft our own bitters and syrups, and treat every ice cube
                as an essential ingredient. This is not just drinking—this is an experience.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-primary italic text-lg">"A drink should be savored like a fine memory."</p>
              <p className="text-white mt-2">— Marcus Webb, Head Bartender</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
