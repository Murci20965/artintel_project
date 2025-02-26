import type React from "react"
import { Providers } from "./providers"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"
import "@/styles/animations.css"
import "@/styles/shimmer.css"
import { headers } from "next/headers"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if the current path is a dashboard path
  const headersList = headers()
  const pathname = headersList.get("x-pathname") || ""
  const isDashboard = pathname.startsWith("/dashboard")

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            {/* Only show Navbar if not on dashboard */}
            {!isDashboard && <Navbar />}
            <main className="flex-1">{children}</main>
            {/* Only show Footer if not on dashboard */}
            {!isDashboard && <Footer />}
          </div>
        </Providers>
      </body>
    </html>
  )
}

export const metadata = {
  generator: "v0.dev",
}



import './globals.css'