"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Calendar, Clock, MapPin } from "lucide-react"

const events = [
  {
    title: "Jazz Under the Stars",
    date: "December 15, 2025",
    time: "8:00 PM",
    location: "Main Bar & Terrace",
    description:
      "An evening of smooth jazz featuring the Marcus Cole Quartet. Complimentary champagne for early arrivals.",
    image: "/images/Jazz Under the Stars.webp",
    featured: true,
  },
  {
    title: "Whiskey Masterclass",
    date: "December 20, 2025",
    time: "7:00 PM",
    location: "Private Tasting Room",
    description: "Explore rare single malts and bourbons with our spirits expert. Limited to 20 guests.",
    image: "/images/whiskey masterclass 2.webp",
    featured: false,
  },
  {
    title: "New Year's Eve Gala",
    date: "December 31, 2025",
    time: "9:00 PM",
    location: "Full Venue",
    description:
      "Ring in 2026 with live entertainment, a champagne toast, and exclusive cocktails created for the night.",
    image: "/placeholder.svg?key=n4g2k",
    featured: true,
  },
  {
    title: "Cocktail Creation Workshop",
    date: "January 10, 2026",
    time: "6:00 PM",
    location: "Bar Area",
    description: "Learn the secrets behind our signature cocktails and craft your own creations with our mixologists.",
    image: "/placeholder.svg?key=r8o2t",
    featured: false,
  },
]

export function UpcomingEvents() {
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
          <span className="text-primary text-sm tracking-[0.3em] uppercase">Mark Your Calendar</span>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4 mb-6">Upcoming Events</h2>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={event.title}
              className={cn(
                "group border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden",
                event.featured && "md:col-span-2",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={cn("grid", event.featured ? "md:grid-cols-2" : "grid-cols-1")}>
                <div className={cn("relative overflow-hidden")}>
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className={cn(
                      "w-full object-cover transition-transform duration-700 group-hover:scale-105",
                      event.featured ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-[16/9]",
                    )}
                  />
                  {event.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs tracking-widest uppercase">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-medium text-foreground group-hover:text-primary transition-colors mb-4">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-3 text-muted-foreground text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground text-sm">
                      <Clock size={16} className="text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground text-sm">
                      <MapPin size={16} className="text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">{event.description}</p>

                  <button className="px-6 py-2 border border-primary text-primary text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors">
                    Reserve Spot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
