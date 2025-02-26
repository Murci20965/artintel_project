"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowingEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  spread?: number
  glow?: boolean
  disabled?: boolean
  proximity?: number
  inactivezone?: number
}

export function GlowingEffect({
  className,
  spread = 20,
  glow = true,
  disabled = false,
  proximity = 128,
  inactivezone = 0.2,
  ...props
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled || !containerRef.current) return

    const container = containerRef.current
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const updatePosition = () => {
      if (!glow) return

      const dx = mouseX - currentX
      const dy = mouseY - currentY

      currentX += dx * 0.1
      currentY += dy * 0.1

      const distanceFromCenter = Math.sqrt(
        Math.pow(currentX - container.offsetWidth / 2, 2) + Math.pow(currentY - container.offsetHeight / 2, 2),
      )

      const maxDistance = Math.sqrt(Math.pow(container.offsetWidth / 2, 2) + Math.pow(container.offsetHeight / 2, 2))

      const intensity = Math.max(0, 1 - distanceFromCenter / maxDistance)
      const activeIntensity = intensity > inactivezone ? intensity : 0

      container.style.setProperty("--x", `${currentX}px`)
      container.style.setProperty("--y", `${currentY}px`)
      container.style.setProperty("--intensity", activeIntensity.toString())

      requestAnimationFrame(updatePosition)
    }

    container.addEventListener("mousemove", handleMouseMove)
    const animation = requestAnimationFrame(updatePosition)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animation)
    }
  }, [disabled, glow, inactivezone])

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "absolute inset-0 pointer-events-none transition-opacity duration-300",
        "before:absolute before:inset-0",
        "before:bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(var(--glow-rgb),calc(var(--intensity,0)*0.25))_0%,transparent_100%)]",
        "after:absolute after:inset-0",
        "after:bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(var(--glow-rgb),calc(var(--intensity,0)*0.1))_0%,transparent_100%)]",
        className,
      )}
      style={
        {
          "--spread": `${spread}px`,
          "--glow-rgb": "59, 130, 246",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

