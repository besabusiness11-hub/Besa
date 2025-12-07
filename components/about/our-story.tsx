"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function OurStory() {
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
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div
            className={cn(
              "order-2 lg:order-1 transition-all duration-1000 lg:pl-16",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
            )}
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase">The Beginning</span>

            <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4 mb-6 leading-tight">
              Born in the Age of Prohibition
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                In 1923, when the nation was dry but spirits were high, a hidden door on Speakeasy Lane opened for the
                first time. Behind it, Samuel Blackwood created a sanctuary—a place where the art of the cocktail could
                flourish in secret.
              </p>
              <p>
                What began as a clandestine gathering spot for artists, writers, and rebels quickly became legendary.
                The password changed nightly, the jazz never stopped, and the cocktails were the finest in the city.
                Even after Prohibition ended, the mystique remained.
              </p>
              <p>
                Through the decades, The Gilded Glass has passed through the hands of dedicated stewards, each adding
                their chapter to our story while honoring the traditions that make us who we are.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-border grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-light text-primary">1923</p>
                <p className="text-muted-foreground mt-1">Year Founded</p>
              </div>
              <div>
                <p className="text-4xl font-light text-primary">4th</p>
                <p className="text-muted-foreground mt-1">Generation Owners</p>
              </div>
            </div>
          </div>

          {/* Video */}
          <div
            className={cn(
              "order-1 lg:order-2 relative transition-all duration-1000 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            )}
          >
            <div className="relative">
              <div className="w-full h-[600px] overflow-hidden">
                <video
                  src="/images/video about.webm"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                />
              </div>
              <div className="absolute -bottom-3 -left-3 w-full h-full border border-primary -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
