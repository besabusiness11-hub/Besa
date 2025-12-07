"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Analytics } from "@vercel/analytics/react"

import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { LoadingScreen } from "@/components/loading-screen"
import { AppLoadProvider } from "./AppLoadContext"

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [hasAppLoaded, setHasAppLoaded] = useState(false)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {!hasAppLoaded && <LoadingScreen onComplete={() => setHasAppLoaded(true)} />}
          <div className={hasAppLoaded ? "" : "hidden"}>
            <AppLoadProvider hasAppLoaded={hasAppLoaded}>
              {children}
            </AppLoadProvider>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
