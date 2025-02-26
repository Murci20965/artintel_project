"use client"

import type React from "react"

import { ThemeProvider } from "@/components/ThemeProvider"
import { AuthProvider } from "@/components/ui/auth-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}

