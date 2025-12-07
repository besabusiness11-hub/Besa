import type { Metadata, Viewport } from "next"
import ClientRootLayout from "./client-layout"

export const metadata: Metadata = {
  title: "The Gilded Glass | Craft Cocktail Bar",
  description:
    "An intimate speakeasy experience featuring handcrafted cocktails, rare spirits, and a warm atmosphere in the heart of the city.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a1512",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientRootLayout>{children}</ClientRootLayout>
}