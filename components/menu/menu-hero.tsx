"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function MenuHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/cocktails.webp" alt="Bar bottles" className="w-full h-full object-cover object-[center_25%]" />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div
          className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-primary" />
            <span className="text-primary text-sm tracking-[0.3em] uppercase">Our Creations</span>
            <span className="w-12 h-px bg-primary" />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-foreground mb-6">The Menu</h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Each cocktail is crafted with care, precision, and the finest ingredients. Discover your new favorite or
            trust our bartenders to surprise you.
          </p>
        </div>
      </div>
    </section>
  )
}
