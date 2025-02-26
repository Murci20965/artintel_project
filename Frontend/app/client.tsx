"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ScrollToTop } from "@/components/ScrollToTop"
import { SplashScreen } from "@/components/ui/splash-screen"
import { theme } from "@/lib/theme"
import "@/styles/animations.css"
import "@/styles/shimmer.css"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/Icon.jpg" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={`${theme.light.background} dark:${theme.dark.background} cyber-pattern`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SplashScreen />
          <div className="relative dark:bg-gray-900">
            <ScrollToTop />
            <div className="fixed top-4 z-50 flex justify-center w-full bg-transparent">
              <div className="w-full max-w-7xl mx-auto px-4">
                <Navbar />
              </div>
            </div>
            <main className="w-full">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

