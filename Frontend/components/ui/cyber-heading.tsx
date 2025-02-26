"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CyberHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children: React.ReactNode
  className?: string
  glitch?: boolean
  animate?: boolean
}

export const CyberHeading = React.forwardRef<HTMLHeadingElement, CyberHeadingProps>(
  ({ as: Component = "h2", children, className, glitch = false, animate = true, ...props }, ref) => {
    const baseClasses = "relative"

    const content = (
      <span
        className={cn(
          "relative inline-block",
          glitch && "animate-glitch",
          "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-primary/0 after:via-primary/30 after:to-primary/0 after:translate-x-[-200%]",
          "after:animate-[shimmer_2s_infinite]",
          className,
        )}
      >
        {children}
      </span>
    )

    if (animate) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {React.createElement(Component, { ref, className: baseClasses, ...props }, content)}
        </motion.div>
      )
    }

    return React.createElement(Component, { ref, className: baseClasses, ...props }, content)
  },
)

CyberHeading.displayName = "CyberHeading"

