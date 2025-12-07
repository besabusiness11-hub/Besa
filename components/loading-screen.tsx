"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [visibleLetters, setVisibleLetters] = useState(0)
  const [showTagline, setShowTagline] = useState(false)

  const logoText = "The Gilded Glass"

  useEffect(() => {
    const letterInterval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev >= logoText.length) {
          clearInterval(letterInterval)
          // Show tagline after all letters are visible
          setTimeout(() => setShowTagline(true), 300)
          return prev
        }
        return prev + 1
      })
    }, 100) // 100ms delay between each letter

    // Start fade out after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        setIsVisible(false)
        if (onComplete) {
          onComplete()
        }
      }, 500)
    }, 3500) // Extended time to allow for letter animation

    return () => {
      clearInterval(letterInterval)
      clearTimeout(timer)
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500",
        isLoading ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="text-center">
        {/* Decorative line */}
        <div
          className={cn(
            "w-16 h-px bg-primary mx-auto mb-8 transition-all duration-700",
            visibleLetters > 0 ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
          )}
        />

        <h1 className="text-4xl md:text-5xl font-semibold text-primary tracking-wide">
          {logoText.split("").map((letter, index) => (
            <span
              key={index}
              className={cn(
                "inline-block transition-all duration-300",
                index < visibleLetters ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm",
              )}
              style={{
                transitionDelay: `${index * 20}ms`,
                // Preserve spaces
                whiteSpace: letter === " " ? "pre" : "normal",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        {/* Tagline - appears after letters */}
        <p
          className={cn(
            "mt-4 text-muted-foreground tracking-widest uppercase text-sm transition-all duration-700",
            showTagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          Craft Cocktails Since 1923
        </p>

        {/* Decorative line */}
        <div
          className={cn(
            "w-16 h-px bg-primary mx-auto mt-8 transition-all duration-700",
            showTagline ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
          )}
        />
      </div>
    </div>
  )
}
