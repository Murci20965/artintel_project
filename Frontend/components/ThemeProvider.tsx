"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { theme, type ThemeType } from "@/lib/theme"

type Theme = "light" | "dark" | "system"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
  currentTheme: ThemeType
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    const savedTheme = localStorage.getItem(storageKey) as Theme | null

    if (savedTheme) {
      setCurrentTheme(savedTheme)
    } else if (defaultTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setCurrentTheme(systemTheme)
    }

    root.classList.remove("light", "dark")
    root.classList.add(currentTheme === "dark" ? "dark" : "light")
  }, [defaultTheme, storageKey, currentTheme])

  const value = {
    theme: currentTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setCurrentTheme(theme)
    },
    currentTheme: currentTheme === "dark" ? theme.dark : theme.light,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}

