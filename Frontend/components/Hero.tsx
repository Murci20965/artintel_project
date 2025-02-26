"use client"

import { motion } from "framer-motion"
import { Circle } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { scrollToSection } from "@/utils/scroll"
import Link from "next/link"
import { initCyberAnimations } from "@/app/features/cyber-animations"
import { MorphingText } from "@/components/ui/morphing-text"
import { FlickeringGrid } from "./ui/flickeringgrid"

import "@/styles/animations.css"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [byteCount, setByteCount] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      initCyberAnimations(containerRef.current)
    }
  }, [])

  const [titleIndex, setTitleIndex] = useState(0)
  const titles = ["Ai Language Models", "Small Language Models ", "Large Language Models"]

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleIndex((prev) => (prev === titles.length - 1 ? 0 : prev + 1))
    }, 20)
    return () => clearTimeout(timeoutId)
  }, [])

  function MorphingTextModels() {
    return <MorphingText texts={titles} />
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  const handleHover = () => {
    const interval = setInterval(() => {
      setByteCount((prev) => (prev + Math.floor(Math.random() * 1000)) % 1000000)
    }, 50)
    return () => clearInterval(interval)
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden
                 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      {/* Background Effect */}
      <div className="absolute inset-0">
        <FlickeringGrid
          squareSize={20}
          gridGap={5}
          flickerChance={0.5}
          color1="#00cbdd"
          color2="#00cbdf"
          maxOpacity={1.15}
          className="dark:opacity-50 opacity-50"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                       bg-primary/10 dark:bg-primary/20 border border-primary/20
                       dark:border-white/30 mb-6 md:mb-8"
          >
            <Circle className="h-2 w-2 text-primary" />
            <span className="text-xs text-primary dark:text-white font-medium tracking-wide">Artintel AI Models</span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            onHoverStart={handleHover}
            onHoverEnd={() => setByteCount(0)}
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-7 tracking-tight text-gray-900 dark:text-white">
              <span className="text-secondary dark:text-white">
                Artintel <span className="text-primary dark:text-primary-dark animate-glitch">LLMs</span>
              </span>
              <br />
              <span className="block text-secondary dark:text-primary">
                <span className="text-primary dark:text-white"> Democratization of </span>
                <br />
                {MorphingTextModels()}
              </span>
            </h1>
            {byteCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-sm text-primary dark:text-primary-dark font-mono"
              >
                Bytes processed: {byteCount.toLocaleString()}
              </motion.div>
            )}
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light tracking-wide max-w-3xl mx-auto px-4">
              Deploy, Fine-Tune, and Manage Enterprise-Grade LLMs And SLMs With Confidence. From Deepseek to Falcon
              180B, We Offer Secure, Compliant, And Cost-Effective AI Solutions For Businesses Of All Sizes.
            </p>
          </motion.div>

          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white
                           dark:bg-primary-dark dark:hover:bg-primary-dark/90
                           transition-colors duration-300"
                onClick={() => scrollToSection("features")}
              >
                Explore Platform
              </Button>
              <Link href="/features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary
                             hover:bg-primary/10
                             dark:border-primary-dark dark:text-primary-dark
                             dark:hover:bg-primary-dark/10
                             transition-colors duration-300"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

