"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Cloud, Zap, Lock, BarChart, Layers } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CyberContainer } from "@/components/ui/cyber-container"
import { fadeInUp } from "@/app/features/scroll-animations"

import "@/styles/animations.css"
import { initCyberAnimations } from "@/app/features/cyber-animations"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "LLM Directory",
    description: "Access curated open-source models like Llama-3, Mistral, and BERT.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "No-Code Fine-Tuning",
    description: "Fine-tune models with company data using intuitive workflows.",
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Flexible Deployment",
    description: "One-click cloud, on-prem, or hybrid deployment options.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Enterprise Security",
    description: "GDPR/HIPAA-ready pipelines with advanced security features.",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Performance Analytics",
    description: "Monitor and optimize your models with detailed insights.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Seamless Integration",
    description: "Easy integration with existing workflows and systems.",
  },
]

export default function Features() {
  const featureRefs = useRef<(HTMLElement | null)[]>([])
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(".feature-item")
      elements.forEach((element, index) => {
        featureRefs.current[index] = element as HTMLElement
      })

      initCyberAnimations(containerRef.current)
    }
  }, [])
  const sectionRef = useRef(null)

  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp(sectionRef.current)
    }
  }, [])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % features.length)
    }, 5000) // Change tab every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="features" className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden cyber-border">
      <div className="cyber-grid-overlay"></div>
      <div className="matrix-bg"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold sm:text-5xl neon-glow glitch cyber-float" data-text="Platform Overview">
            Platform Overview
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300"
          >
            A unified platform for discovery, fine-tuning, and deployment of open-source language models.
          </motion.p>
        </div>

        <div className="mt-20 feature-section">
          <Tabs
            value={features[activeIndex].title.toLowerCase().replace(/\s+/g, "-")}
            onValueChange={(value) => {
              const newIndex = features.findIndex(
                (feature) => feature.title.toLowerCase().replace(/\s+/g, "-") === value,
              )
              if (newIndex !== -1) setActiveIndex(newIndex)
            }}
          >
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1">
              {features.map((feature, index) => (
                <TabsTrigger
                  key={feature.title}
                  value={feature.title.toLowerCase().replace(/\s+/g, "-")}
                  className={cn(
                    "py-2 px-3 rounded-lg transition-all duration-300",
                    activeIndex === index
                      ? "bg-white dark:bg-gray-700 shadow-md text-primary dark:text-primary-dark cyber-border hover-glow"
                      : "text-gray-600 dark:text-gray-400",
                  )}
                >
                  <span className="flex items-center space-x-2">
                    {feature.icon}
                    <span className="hidden lg:inline">{feature.title}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            <AnimatePresence mode="wait">
              {features.map((feature, index) => (
                <TabsContent
                  key={feature.title}
                  value={feature.title.toLowerCase().replace(/\s+/g, "-")}
                  className={`mt-8 ${activeIndex === index ? "" : "hidden"}`}
                >
                  <CyberContainer
                    variant="glow"
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 matrix-scan relative overflow-hidden transform hover:scale-105 hover:rotate-1 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,203,221,0.3)]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center neon-glow">
                      <span className="cyber-rotate inline-block mr-3">{feature.icon}</span>
                      <span className="cyber-glitch">{feature.title}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg relative z-10">{feature.description}</p>
                    <div className="cyber-grid absolute inset-0 opacity-10"></div>
                  </CyberContainer>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

