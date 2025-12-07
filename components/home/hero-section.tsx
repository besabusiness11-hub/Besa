"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppLoadStatus } from "@/app/AppLoadContext" // Import useAppLoadStatus

const VIDEO_URL = "/images/intro.webm"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { hasAppLoaded } = useAppLoadStatus() // Use the context

  // Preload critical video
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'video'
    link.href = VIDEO_URL
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (hasAppLoaded) {
      // If the app has already loaded, skip the intro animation
      setIsVisible(true)
      const video = videoRef.current
      if (video) {
        video.currentTime = 0
        video.play().catch(() => {})
      }
      return
    }

    // Otherwise, play the intro animation
    const timer = setTimeout(() => {
      setIsVisible(true)
      const video = videoRef.current
      if (video) {
        video.currentTime = 0
        video.play().catch(() => {})
      }
    }, 2200)
    return () => clearTimeout(timer)
  }, [hasAppLoaded]) // Re-run effect if hasAppLoaded changes

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          willChange: "transform"
        }}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover"
          src={VIDEO_URL}
          suppressHydrationWarning
        />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div
          className={cn(
            "transition-all duration-1000 py-12 px-8 rounded-lg",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-primary" />
            <span className="text-primary text-sm tracking-[0.3em] uppercase">Est. 1923</span>
            <span className="w-12 h-px bg-primary" />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-foreground mb-6">
            The Gilded Glass
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            An intimate speakeasy experience where every cocktail tells a story
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/menu"
              className="px-8 py-3 bg-primary text-primary-foreground tracking-widest uppercase text-sm hover:bg-primary/90 transition-colors"
            >
              View Our Cocktails
            </Link>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <Link
        href="#intro-section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="text-primary" size={28} />
      </Link>
    </section>
  )
}
