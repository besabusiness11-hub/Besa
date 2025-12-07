"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function AmbianceSection() {
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
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/luxurious-bar-interior-leather-seats-warm-lighting.jpg" alt="Bar ambiance" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div
          className={cn(
            "max-w-3xl mx-auto transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase">The Experience</span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mt-4 mb-8 leading-tight">
            More Than a Bar,
            <br />A Destination
          </h2>

          <p className="text-xl text-white leading-relaxed mb-10">
            Step through our doors and leave the ordinary behind. Velvet seats, candlelit corners, and the gentle hum of
            jazz create the perfect backdrop for unforgettable evenings.
          </p>

          <Link
            href="/gallery"
            className="inline-block px-8 py-3 border border-primary text-primary tracking-widest uppercase text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Explore Our Space
          </Link>
        </div>
      </div>
    </section>
  )
}
