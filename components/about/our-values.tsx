"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Sparkles, Clock, Heart, Users } from "lucide-react"

const values = [
  {
    icon: Sparkles,
    title: "Craftsmanship",
    description: "Every cocktail is made with precision, care, and the finest ingredients. We never cut corners.",
  },
  {
    icon: Clock,
    title: "Tradition",
    description: "We honor the recipes and techniques of the past while embracing innovation.",
  },
  {
    icon: Heart,
    title: "Hospitality",
    description: "Our guests are family. We create experiences, not just drinks.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We're more than a bar—we're a gathering place for dreamers, creators, and friends.",
  },
]

export function OurValues() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase">What We Believe</span>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4 mb-6">Our Philosophy</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">The principles that guide everything we do</p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                className={cn(
                  "text-center p-8 border border-border hover:border-primary/50 transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 border border-primary text-primary mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
