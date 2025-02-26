"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import UseCases from "@/components/UseCases"
import WhyChoose from "@/components/WhyChoose"
import CTA from "@/components/CTA"
import { HowItWorks } from "@/components/HowItWorks"
import type { Metadata } from "next"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const containerRef = useRef<HTMLDivElement>(null)
  const metadata: Metadata = {
    title: "Artintelllms - AI Platform",
    description: "Enterprise-grade solutions for AI model management and deployment",

    icons: {
      icon: [
        {
          media: "(prefers-color-scheme: light)",
          url: "/Icon.jpg",
          href: "/Icon.jpg",
        },
        {
          media: "(prefers-color-scheme: dark)",
          url: "/Icon.jpg",
          href: "/Icon.jpg",
        },
      ],
    },
    generator: "v0.dev",
  }
  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = ["/images/Logo-no-bg.png", "/images/Logo-white.png", "/favicon.ico", "/favicon-dark.ico"]
      imageUrls.forEach((url) => {
        const img = new Image()
        img.src = url
      })
    }
    preloadImages()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-background to-background/80">
      <Hero />

      <motion.div
        className="bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Features />
        <HowItWorks />
        <UseCases />
        <WhyChoose />
        <CTA />
      </motion.div>

      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        style={{ y }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute right-[10%] top-[10%] h-72 w-72 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
        <div className="absolute left-[5%] bottom-[20%] h-64 w-64 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
      </motion.div>
    </div>
  )
}

