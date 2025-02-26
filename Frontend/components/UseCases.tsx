"use client"

import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react"
import { PixelCanvas } from "./ui/pixel-canvas"

const useCases = [
  {
    title: "Healthcare",
    description: "Enhance patient care with AI-powered diagnosis support and medical research acceleration.",
    icon: <Box className="h-4 w-4" />,
  },
  {
    title: "Finance",
    description: "Improve risk assessment and fraud detection with advanced AI models.",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    title: "Retail & E-Commerce",
    description: "Boost customer experience with AI-driven personalization and chatbots.",
    icon: <Lock className="h-4 w-4" />,
  },
  {
    title: "Legal",
    description: "Streamline legal processes with AI-powered contract analysis and document summarization.",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    title: "Coming Soon",
    description: "More industry solutions coming soon.",
    icon: <Search className="h-4 w-4" />,
  },
]

const UseCases = () => {
  return (
    <section id="use-cases" className="relative py-20 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <PixelCanvas
        gap={10}
        speed={25}
        colors={["#00cbdd", "#00a3b3", "#00031b"]}
        variant="icon"
        className="absolute inset-0 w-full h-full opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
        >
          Use Cases & Industry Applications
        </motion.h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <GridItem key={index} icon={useCase.icon} title={useCase.title} description={useCase.description} />
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Link href="/features#use-cases">
            <Button
              variant="outline"
              size="lg"
              className="relative bg-white/10 dark:bg-gray-800/10 border-primary hover:bg-primary/10"
            >
              <GlowingEffect spread={20} glow={true} disabled={false} />
              Explore More Use Cases
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

interface GridItemProps {
  icon: React.ReactNode
  title: string
  description: React.ReactNode
}

const GridItem = ({ icon, title, description }: GridItemProps) => {
  return (
    <li className="min-h-[14rem] list-none">
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-primary/20 p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-white/50 dark:bg-gray-800/50 p-6 shadow-sm backdrop-blur-sm">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-primary bg-primary/10 p-2">{icon}</div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-600 dark:text-gray-300">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default UseCases

