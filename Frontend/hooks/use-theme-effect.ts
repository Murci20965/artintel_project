"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function useThemeEffect() {
  const { setTheme } = useTheme()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      localStorage.setItem("theme", "dark")
    } else {
      setTheme("light")
      localStorage.setItem("theme", "light")
    }
  }, [setTheme])
}

