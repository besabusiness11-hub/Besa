"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MenuCTA() {
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "max-w-3xl mx-auto text-center transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase">Can't Decide?</span>

          <h2 className="text-3xl md:text-4xl font-light text-foreground mt-4 mb-6">Let Our Bartenders Guide You</h2>

          <p className="text-muted-foreground leading-relaxed mb-8">
            Share your flavor preferences with our expert team and we'll craft something special just for you. Off-menu
            creations are our specialty.
          </p>

          <div className="text-muted-foreground text-sm">Reservations are currently unavailable.</div>
        </div>
      </div>
    </section>
  )
}
