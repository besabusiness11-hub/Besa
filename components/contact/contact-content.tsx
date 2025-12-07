"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export function ContactContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const contentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitted(true)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: "" }))
    }
  }

  return (
    <section ref={contentRef} className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div
            className={cn(
              "transition-all duration-1000",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8",
            )}
          >
            {isSubmitted ? (
              <div className="text-center py-16 border border-primary/50">
                <div className="w-16 h-16 border border-primary text-primary flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-medium text-foreground mb-4">
                  Message Sent
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thank you for reaching out! We&apos;ll get back to you as
                  soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>
                      We&apos;d love to hear from you. Please fill out the form
                      below and we&apos;ll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={cn(errors.name ? "border-destructive" : "")}
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={cn(errors.email ? "border-destructive" : "")}
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        name="subject"
                        onValueChange={handleSubjectChange}
                        value={formData.subject}
                      >
                        <SelectTrigger
                          className={cn(
                            errors.subject ? "border-destructive" : "",
                          )}
                        >
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="reservation">
                            Reservation Question
                          </SelectItem>
                          <SelectItem value="private-event">
                            Private Event Inquiry
                          </SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="careers">Careers</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.subject && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="How can we help you?"
                        className={cn(
                          "resize-none",
                          errors.message ? "border-destructive" : "",
                        )}
                      />
                      {errors.message && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div
            className={cn(
              "transition-all duration-1000 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            )}
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase">Find Us</span>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mt-4 mb-8">Visit The Gilded Glass</h2>

            <div className="space-y-8 mb-12">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-primary text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Address</h3>
                  <p className="text-muted-foreground">
                    42 Speakeasy Lane
                    <br />
                    Downtown District
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-primary text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+12125550147" className="hover:text-primary transition-colors">
                      (212) 555-0147
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-primary text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:hello@thegildedglass.com" className="hover:text-primary transition-colors">
                      hello@thegildedglass.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-primary text-primary">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Hours</h3>
                  <div className="text-muted-foreground space-y-1">
                    <p>Tuesday – Thursday: 5:00 PM – 12:00 AM</p>
                    <p>Friday – Saturday: 5:00 PM – 2:00 AM</p>
                    <p>Sunday – Monday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mb-12">
              <h3 className="text-lg font-medium text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
              <img
                src="/placeholder.svg?key=map01"
                alt="Map location"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary text-primary-foreground tracking-widest uppercase text-sm hover:bg-primary/90 transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
