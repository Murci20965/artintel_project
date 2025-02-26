"use client"

import { useEffect } from "react"
import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const isDashboardRoute = pathname.startsWith("/dashboard")

  useEffect(() => {
    if (!isLoading && !isAuthenticated && isDashboardRoute) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, isDashboardRoute, router])

  if (isLoading) {
    return null
  }

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      {children}
      {!isDashboardRoute && <Footer />}
    </>
  )
}

