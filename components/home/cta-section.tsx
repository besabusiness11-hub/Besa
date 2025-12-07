"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function CTASection() {
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">Reserve Your Evening</h2>

          <p className="text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're celebrating a special occasion or simply seeking an exceptional night out, we invite you to
            join us.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Link
              href="/events"
              className="px-8 py-3 border border-foreground text-foreground tracking-widest uppercase text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              Private Events
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-border">
            <div>
              <p className="text-4xl font-light text-primary">100+</p>
              <p className="text-white mt-2">Unique Cocktails</p>
            </div>
            <div>
              <p className="text-4xl font-light text-primary">50+</p>
              <p className="text-white mt-2">Rare Spirits</p>
            </div>
            <div>
              <p className="text-4xl font-light text-primary">1923</p>
              <p className="text-white mt-2">Year Established</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
