"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const schedule = [
  {
    day: "Tuesday",
    event: "Vinyl Night",
    time: "7:00 PM – Close",
    description: "Guest DJs spin classic records. Half-price Old Fashioneds.",
  },
  {
    day: "Wednesday",
    event: "Wine & Whiskey",
    time: "6:00 PM – 10:00 PM",
    description: "Featured selections at special prices. Perfect for midweek relaxation.",
  },
  {
    day: "Thursday",
    event: "Live Jazz",
    time: "8:00 PM – 11:00 PM",
    description: "Local jazz ensembles perform in our intimate setting.",
  },
  {
    day: "Friday",
    event: "Cocktail Hour Extended",
    time: "5:00 PM – 8:00 PM",
    description: "Start your weekend early with $12 signature cocktails.",
  },
  {
    day: "Saturday",
    event: "The Main Event",
    time: "8:00 PM – 2:00 AM",
    description: "Our busiest night with live entertainment and surprise specials.",
  },
]

export function WeeklySchedule() {
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
          <span className="text-primary text-sm tracking-[0.3em] uppercase">Every Week</span>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mt-4 mb-6">Weekly Programming</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">There's always a reason to visit</p>
        </div>

        {/* Schedule */}
        <div className="max-w-3xl mx-auto">
          {schedule.map((item, index) => (
            <div
              key={item.day}
              className={cn(
                "group py-8 border-b border-border last:border-b-0 transition-all duration-500",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="md:w-1/4">
                  <p className="text-primary font-medium tracking-wide">{item.day}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                    {item.event}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
