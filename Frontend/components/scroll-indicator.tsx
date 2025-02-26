"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const springConfig = { damping: 15, stiffness: 150 }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = 40

      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const angle = Math.atan2(dy, dx)
      const pull = Math.min(distance, Math.hypot(dx, dy)) / distance

      setMousePosition({
        x: Math.cos(angle) * pull * distance,
        y: Math.sin(angle) * pull * distance,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.div ref={ref} style={{ opacity }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.87, 0, 0.13, 1],
        }}
        className="relative"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="transform rotate-90">
          <motion.path
            d="M20 5C20 5 25 15 35 20C25 25 20 35 20 35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-primary dark:text-primary-dark"
            animate={{
              pathLength: [0, 1],
              pathOffset: [0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.87, 0, 0.13, 1],
            }}
          />
          <motion.circle
            cx="20"
            cy="20"
            r="2"
            className="fill-primary dark:fill-primary-dark"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.87, 0, 0.13, 1],
            }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 bg-primary/20 dark:bg-primary-dark/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: [0.87, 0, 0.13, 1],
          }}
        />
      </motion.div>
    </motion.div>
  )
}

