"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface ModelCardProps {
  title: string
  description: string
  index: number
}

export function ModelCard({ title, description, index }: ModelCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.1,
        ease: [0.87, 0, 0.13, 1],
      }}
      className="group relative bg-background/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-[32px] overflow-hidden"
      style={{
        perspective: "1000px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-neural-grid opacity-10" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary-dark/5"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          duration: 1,
          ease: [0.87, 0, 0.13, 1],
        }}
      />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_100%)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      </div>
      <motion.div
        className="relative z-10"
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? -5 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
      >
        <h3 className="font-semibold mb-2 dark:text-white">{title}</h3>
        <p className="text-sm text-muted-foreground dark:text-gray-300">{description}</p>
      </motion.div>
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary-dark/10"
              animate={{
                x: ["0%", "200%"],
              }}
              transition={{
                duration: 2,
                ease: [0.87, 0, 0.13, 1],
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

