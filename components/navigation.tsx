"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Cocktails" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },

  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { locale } = router

    const switchLanguage = (newLocale: string) => {
      router.push(pathname, { locale: newLocale })
      setIsDropdownOpen(false)
      setIsMobileMenuOpen(false)
    }
  
    useEffect(() => {
      const handleScroll = () => {
        // Check if scrolled past hero section (approximately viewport height)
        const heroHeight = window.innerHeight
        setIsScrolled(window.scrollY > heroHeight * 0.8)
      }
  
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])
  
    useEffect(() => {
      // Prevent body scroll when menus are open
      if (isDropdownOpen || isMobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
      return () => {
        document.body.style.overflow = ''
      }
    }, [isDropdownOpen, isMobileMenuOpen])
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        // Check if the click is outside the dropdown content AND the menu is open
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isDropdownOpen) {
          setIsDropdownOpen(false)
        }
      }
      // Only add the event listener when the dropdown is open
      if (isDropdownOpen) {
        document.addEventListener("mousedown", handleClickOutside)
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isDropdownOpen]) // Re-run effect when isDropdownOpen changes
  
    return (
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "bg-black/90 backdrop-blur-sm border-b border-border shadow-lg" : "bg-transparent",
        )}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Desktop Dropdown Menu Button - Left */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsDropdownOpen(true)} // Open directly
                className="flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Menu size={20} />
                <span>Menu</span>
              </button>
  
              {/* Full-screen Overlay Menu */}
              <div
                className={cn(
                  "fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-500 overflow-y-auto",
                  isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible",
                )}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsDropdownOpen(false)
                  }
                }}
              >
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors z-[51]"
                  aria-label="Close menu"
                >
                  <X size={32} />
                </button>
  
                <div ref={dropdownRef} className="w-full max-w-lg mx-auto p-4">
                  <ul className="text-center">                            {navLinks.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={() => {
                                    setIsDropdownOpen(false);
                                    router.push(link.href);
                                  }}
                                  className={cn(
                                    "block text-4xl md:text-5xl font-light py-4 hover:text-primary",
                                    pathname === link.href ? "text-primary" : "text-foreground",
                                  )}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                            <li className="my-6 border-t border-border w-24 mx-auto" /> {/* Separator */}
                            <ul className="flex justify-center gap-4">
                                <li>
                                  <button
                                    onClick={() => switchLanguage("en")}
                                    className={cn(
                                      "text-xl md:text-2xl font-light py-2 transition-colors duration-300 hover:text-primary",
                                      locale === "en" ? "text-primary" : "text-muted-foreground",
                                    )}
                                  >
                                    EN
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => switchLanguage("it")}
                                    className={cn(
                                      "text-xl md:text-2xl font-light py-2 transition-colors duration-300 hover:text-primary",
                                      locale === "it" ? "text-primary" : "text-muted-foreground",
                                    )}
                                  >
                                    IT
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => switchLanguage("fr")}
                                    className={cn(
                                      "text-xl md:text-2xl font-light py-2 transition-colors duration-300 hover:text-primary",
                                      locale === "fr" ? "text-primary" : "text-muted-foreground",
                                    )}
                                  >
                                    FR
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => switchLanguage("es")}
                                    className={cn(
                                      "text-xl md:text-2xl font-light py-2 transition-colors duration-300 hover:text-primary",
                                      locale === "es" ? "text-primary" : "text-muted-foreground",
                                    )}
                                  >
                                    ES
                                  </button>
                                </li>
                            </ul>
                          </ul>
                        </div>
                      </div>
                    </div>
          
                    {/* Mobile Menu Button - Left on mobile (remains unchanged for now) */}
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
                      aria-label="Toggle menu"
                    >
                      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
          
                    <Link href="/" className="group absolute left-1/2 -translate-x-1/2">
                      <span className="text-2xl md:text-3xl font-semibold tracking-wide text-primary transition-colors group-hover:text-accent">
                        The Gilded Glass
                      </span>
                    </Link>
          
                    {/* Empty div for spacing on desktop, hidden on mobile */}
                    <div className="hidden lg:block w-[100px]"></div>
                    {/* Empty div for spacing on mobile */}
                    <div className="lg:hidden w-10"></div>
                  </div>
          
                  {/* Mobile Navigation (remains unchanged for now) */}
                  <div
                    className={cn(
                      "lg:hidden overflow-hidden transition-all duration-500",
                      isMobileMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0",
                    )}
                  >
                    <ul className="flex flex-col gap-4 pb-6">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              router.push(link.href);
                            }}
                            className={cn(
                              "block text-lg tracking-wide transition-colors duration-300 hover:text-primary",
                              pathname === link.href ? "text-primary" : "text-muted-foreground",
                            )}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                      <li className="my-2 border-t border-border" /> {/* Separator */}
                      <ul className="flex justify-center gap-4">
                        <li>
                          <button
                            onClick={() => switchLanguage("en")}
                            className={cn(
                              "text-lg tracking-wide transition-colors duration-300 hover:text-primary",
                              locale === "en" ? "text-primary" : "text-muted-foreground",
                            )}
                          >
                            EN
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => switchLanguage("it")}
                            className={cn(
                              "text-lg tracking-wide transition-colors duration-300 hover:text-primary",
                              locale === "it" ? "text-primary" : "text-muted-foreground",
                            )}
                          >
                            IT
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => switchLanguage("fr")}
                            className={cn(
                              "text-lg tracking-wide transition-colors duration-300 hover:text-primary",
                              locale === "fr" ? "text-primary" : "text-muted-foreground",
                            )}
                          >
                            FR
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => switchLanguage("es")}
                            className={cn(
                              "text-lg tracking-wide transition-colors duration-300 hover:text-primary",
                              locale === "es" ? "text-primary" : "text-muted-foreground",
                            )}
                          >
                            ES
                          </button>
                        </li>
                      </ul>
                    </ul>
                  </div>
                </nav>
              </header>
            )
          }
