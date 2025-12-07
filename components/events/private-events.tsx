"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Users, Sparkles, Wine } from "lucide-react"

const options = [
  {
    icon: Users,
    title: "Private Parties",
    capacity: "Up to 50 guests",
    description: "Exclusive use of our space for birthdays, anniversaries, or celebrations.",
  },
  {
    icon: Sparkles,
    title: "Corporate Events",
    capacity: "Up to 80 guests",
    description: "Impress clients and colleagues with a sophisticated venue and custom menus.",
  },
  {
    icon: Wine,
    title: "Tasting Events",
    capacity: "Up to 25 guests",
    description: "Curated spirit or cocktail experiences led by our expert team.",
  },
]

export function PrivateEvents() {
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
          {/* Image */}
          <div
            className={cn(
              "relative transition-all duration-1000",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
            )}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src="/placeholder.svg?key=p2s0y" alt="Private event setup" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary -z-10" />
          </div>

          {/* Content */}
          <div
            className={cn(
              "transition-all duration-1000 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            )}
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase">Host With Us</span>

            <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4 mb-6 leading-tight">Private Events</h2>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Make your special occasion unforgettable. Our team will work with you to create a bespoke experience
              tailored to your vision.
            </p>

            <div className="space-y-6 mb-10">
              {options.map((option) => {
                const Icon = option.icon
                return (
                  <div key={option.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-primary text-primary">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground">{option.title}</h3>
                      <p className="text-sm text-primary mb-1">{option.capacity}</p>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground tracking-widest uppercase text-sm hover:bg-primary/90 transition-colors"
            >
              Inquire Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
