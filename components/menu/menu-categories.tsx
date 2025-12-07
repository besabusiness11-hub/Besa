"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const categories = [
  {
    id: "signature",
    name: "Signature Cocktails",
    description: "House originals crafted by our master bartenders",
    cocktails: [
      {
        name: "The Prohibition",
        price: 18,
        ingredients: "Aged bourbon, honey syrup, orange bitters, hickory smoke",
        description: "Our tribute to the speakeasy era, served in a smoked glass",
      },
      {
        name: "Velvet Underground",
        price: 17,
        ingredients: "London dry gin, elderflower, fresh cucumber, sparkling wine",
        description: "Refreshing and elegant, topped with champagne bubbles",
      },
      {
        name: "Midnight in Paris",
        price: 19,
        ingredients: "Cognac VS, champagne, lavender honey, lemon",
        description: "A romantic blend inspired by the City of Lights",
      },
      {
        name: "The Golden Hour",
        price: 18,
        ingredients: "Mezcal, passionfruit, lime, agave, chili salt rim",
        description: "Smoky meets tropical with a gentle heat",
      },
      {
        name: "Silk Road",
        price: 17,
        ingredients: "Japanese whisky, lychee, rose water, yuzu",
        description: "An Eastern-inspired journey of delicate flavors",
      },
      {
        name: "Copper Crown",
        price: 20,
        ingredients: "Rare Irish whiskey, maple, walnut bitters, orange peel",
        description: "Rich, warming, and perfectly balanced",
      },
    ],
  },
  {
    id: "classics",
    name: "Timeless Classics",
    description: "Perfected recipes from the golden age of cocktails",
    cocktails: [
      {
        name: "Old Fashioned",
        price: 15,
        ingredients: "Bourbon, demerara sugar, Angostura bitters, orange",
        description: "The original cocktail, made the proper way",
      },
      {
        name: "Negroni",
        price: 14,
        ingredients: "Gin, Campari, sweet vermouth",
        description: "Bitter, bold, and beautifully balanced",
      },
      {
        name: "Manhattan",
        price: 15,
        ingredients: "Rye whiskey, sweet vermouth, Angostura bitters, cherry",
        description: "Timeless sophistication in every sip",
      },
      {
        name: "Martini",
        price: 14,
        ingredients: "Gin or vodka, dry vermouth, olive or lemon twist",
        description: "Clean, crisp, and endlessly elegant",
      },
      {
        name: "Whiskey Sour",
        price: 14,
        ingredients: "Bourbon, lemon juice, simple syrup, egg white",
        description: "Silky smooth with a perfect citrus balance",
      },
      {
        name: "Daiquiri",
        price: 13,
        ingredients: "White rum, lime juice, simple syrup",
        description: "Three ingredients, infinite satisfaction",
      },
    ],
  },
  {
    id: "seasonal",
    name: "Seasonal Selections",
    description: "Limited offerings featuring the best of the season",
    cocktails: [
      {
        name: "Winter Solstice",
        price: 16,
        ingredients: "Spiced rum, apple cider, cinnamon, star anise",
        description: "Warm spices meet crisp apple—a winter embrace",
      },
      {
        name: "Autumn Ember",
        price: 17,
        ingredients: "Bourbon, pumpkin spice, maple, brown butter",
        description: "Harvest flavors in liquid form",
      },
      {
        name: "Spring Awakening",
        price: 16,
        ingredients: "Gin, fresh strawberry, basil, prosecco",
        description: "Bright and botanical, a garden in a glass",
      },
      {
        name: "Summer Daze",
        price: 15,
        ingredients: "Tequila, watermelon, jalapeño, lime",
        description: "Sweet heat and refreshing relief",
      },
    ],
  },
  {
    id: "nonalcoholic",
    name: "Spiritless Crafts",
    description: "Zero-proof cocktails with full flavor",
    cocktails: [
      {
        name: "Garden Party",
        price: 10,
        ingredients: "Cucumber, mint, elderflower tonic, lime",
        description: "Crisp and refreshing, perfect any time",
      },
      {
        name: "Citrus Sunrise",
        price: 10,
        ingredients: "Fresh orange, grapefruit, grenadine, soda",
        description: "A vibrant start without the spirits",
      },
      {
        name: "Ginger Mule",
        price: 10,
        ingredients: "House ginger beer, lime, mint",
        description: "Spicy, zingy, and deeply satisfying",
      },
      {
        name: "Berry Bramble",
        price: 11,
        ingredients: "Mixed berries, lemon, seedlip, tonic",
        description: "Fruity complexity without the alcohol",
      },
    ],
  },
]

export function MenuCategories() {
  const [activeCategory, setActiveCategory] = useState("signature")
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId)
    const element = sectionRefs.current[categoryId]
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
    }
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        {/* Category Navigation */}
        <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm py-4 mb-12 border-b border-border">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={cn(
                  "text-sm tracking-widest uppercase transition-colors whitespace-nowrap",
                  activeCategory === category.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-20">
          {categories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              ref={(el) => {
                sectionRefs.current[category.id] = el
              }}
              className={cn(
                "transition-all duration-1000",
                visibleSections.has(category.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light text-foreground mb-3">{category.name}</h2>
                <p className="text-white">{category.description}</p>
                <div className="w-16 h-px bg-primary mx-auto mt-6" />
              </div>

              {/* Cocktails Grid */}
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {category.cocktails.map((cocktail, index) => (
                  <div
                    key={cocktail.name}
                    className={cn(
                      "group p-6 border border-border hover:border-primary/50 transition-all duration-500",
                      visibleSections.has(category.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                        {cocktail.name}
                      </h3>
                      <span className="text-primary font-medium">${cocktail.price}</span>
                    </div>
                    <p className="text-sm text-primary/80 mb-2 tracking-wide">{cocktail.ingredients}</p>
                    <p className="text-white text-sm leading-relaxed">{cocktail.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
