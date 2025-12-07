"use client"

import React, { createContext, useContext } from "react"

interface AppLoadContextType {
  hasAppLoaded: boolean
}

const AppLoadContext = createContext<AppLoadContextType | undefined>(undefined)

export function AppLoadProvider({ children, hasAppLoaded }: { children: React.ReactNode, hasAppLoaded: boolean }) {
  return (
    <AppLoadContext.Provider value={{ hasAppLoaded }}>
      {children}
    </AppLoadContext.Provider>
  )
}

export function useAppLoadStatus() {
  const context = useContext(AppLoadContext)
  if (context === undefined) {
    throw new Error("useAppLoadStatus must be used within an AppLoadProvider")
  }
  return context
}
