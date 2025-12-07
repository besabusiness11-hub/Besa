"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const team = [
  {
    name: "Marcus Webb",
    role: "Head Bartender",
    bio: "15 years of experience and a passion for reviving forgotten classics.",
    image: "/images/uomo4.webp",
  },
  {
    name: "Elena Rodriguez",
    role: "General Manager",
    bio: "The heart of our hospitality, ensuring every guest feels at home.",
    image: "/images/uomo2.webp",
  },
  {
    name: "James Chan",
    role: "Bar Manager",
    bio: "Master of rare spirits and the curator of our extensive collection.",
    image: "/images/uomo1.webp",
  },
  {
    name: "Sophie Laurent",
    role: "Mixologist",
    bio: "Award-winning creator known for innovative flavor combinations.",
    image: "/images/uomo3.webp",
  },
]

export function TheTeam() {
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
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase">The Faces Behind the Bar</span>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4 mb-6">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Passionate professionals dedicated to crafting your perfect experience
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={cn(
                "group transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden mb-6">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/0 transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-primary text-sm tracking-wide mt-1">{member.role}</p>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
