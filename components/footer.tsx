import Link from "next/link"
import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-primary">The Gilded Glass</h3>
            <p className="text-white leading-relaxed">
              An intimate speakeasy experience featuring handcrafted cocktails and rare spirits in a warm, inviting
              atmosphere.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-foreground">Explore</h4>
            <ul className="space-y-3">
              {[
                { href: "/menu", label: "Our Cocktails" },
                { href: "/about", label: "Our Story" },
                { href: "/events", label: "Events" },
                { href: "/gallery", label: "Gallery" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  42 Speakeasy Lane
                  <br />
                  Downtown District, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="shrink-0 text-primary" />
                <span>(212) 555-0147</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="shrink-0 text-primary" />
                <span>hello@thegildedglass.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-foreground">Hours</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Clock size={18} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p>Tuesday – Thursday</p>
                  <p className="text-foreground">5:00 PM – 12:00 AM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Clock size={18} className="mt-0.5 shrink-0 text-primary opacity-0" />
                <div>
                  <p>Friday – Saturday</p>
                  <p className="text-foreground">5:00 PM – 2:00 AM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Clock size={18} className="mt-0.5 shrink-0 text-primary opacity-0" />
                <div>
                  <p>Sunday – Monday</p>
                  <p className="text-foreground">Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} The Gilded Glass. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">

            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
