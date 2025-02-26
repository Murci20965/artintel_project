"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp } from "lucide-react"

interface PricingTier {
  name: string
  description: string
  monthlyPrice: string | number
  keyFeatures: string[]
  allFeatures: string[]
  highlighted?: boolean
  buttonText: string
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free Tier",
    description: "Discover & Experiment",
    monthlyPrice: 0,
    keyFeatures: ["Limited Models & Features", "Basic Security & Compliance", "Community Forum Support"],
    allFeatures: [
      "Limited Models & Features",
      "Basic Security & Compliance",
      "Basic API Integrations",
      "Community Forum Support",
      "Setup Costs: None",
      "Best For: Individuals & Small Teams",
    ],
    buttonText: "Start Free",
  },
  {
    name: "Advanced",
    description: "Build & Deploy",
    monthlyPrice: "Custom",
    keyFeatures: [
      "More Models, including Mid-Tier & Specialized",
      "Fine-Tuning Available",
      "Standard Security & Compliance",
    ],
    allFeatures: [
      "More Models, including Mid-Tier & Specialized",
      "Fine-Tuning Available (X GB Storage Included)",
      "Limited Dataset Uploads & Experimentation",
      "Standard Performance Monitoring",
      "Basic Retrieval-Augmented Generation (RAG)",
      "Storage: Custom Pricing",
      "Standard Security & Compliance",
      "Flexible Deployments on Cloud",
      "Supports Preferred Data Science Libraries",
      "Email + Priority Slack Support",
      "Basic Model Insights for Auditing & Explainability",
      "Setup Costs: Based on Storage & Fine-Tuning Usage",
      "Best For: Startups & AI Businesses",
    ],
    highlighted: false,
    buttonText: "Start Trial",
  },
  {
    name: "Ultimate Enterprise",
    description: "Innovate & Scale",
    monthlyPrice: "Custom",
    keyFeatures: [
      "Full Access to All Models (Enterprise-Grade)",
      "Fully Customizable Fine-Tuning",
      "Enterprise-Grade Security & Compliance",
    ],
    allFeatures: [
      "Full Access to All Models (Enterprise-Grade)",
      "Fully Customizable Fine-Tuning",
      "Unlimited Dataset Uploads & Experimentation",
      "Enterprise-Grade Performance Monitoring",
      "Advanced Retrieval-Augmented Generation (RAG)",
      "Enterprise-Grade Storage",
      "Full Compliance (GDPR, HIPAA, SOC 2, ISO 27001)",
      "Any Infrastructure (AWS, On-Prem, Azure, Google Cloud, IBM Cloud)",
      "Seamless API-First Integrations",
      "24/7 Enterprise Support (Dedicated Engineers)",
      "Comprehensive Auditing & Explainability",
      "Setup Costs: Custom Pricing (Includes Solution Engineers & Hosting)",
      "Best For: Large Enterprises & AI-Driven Companies",
    ],
    buttonText: "Contact Sales",
  },
]

const PricingCard = ({ tier }: { tier: PricingTier }) => {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div className={`relative transition-all duration-300 ${isExpanded ? "scale-105 z-10" : ""}`} layout>
      <motion.div
        className={`border ${
          tier.highlighted ? "border-primary" : "border-gray-200 dark:border-gray-700"
        } bg-white dark:bg-gray-800 rounded-xl p-5 h-full flex flex-col relative 
        ${isExpanded ? "shadow-2xl" : "shadow-lg hover:shadow-xl"} transition-shadow duration-300`}
        layout
      >
        {tier.highlighted && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        )}

        <div className="mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tier.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">{tier.description}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold neon-glow cyber-glitch">
              {typeof tier.monthlyPrice === "number" ? `$${tier.monthlyPrice}` : tier.monthlyPrice}
            </span>
            <span className="text-gray-600 dark:text-gray-300 ml-2">/mo</span>
          </div>
        </div>

        <ul className="space-y-3 mb-4">
          {(isExpanded ? tier.allFeatures : tier.keyFeatures).map((feature, i) => (
            <motion.li
              key={i}
              initial={isExpanded ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex items-center text-gray-600 dark:text-gray-300"
            >
              <span className="mr-2 text-primary">✓</span>
              {feature}
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto space-y-4">
          <Button
            className={`w-full ${
              tier.highlighted
                ? "bg-primary hover:bg-primary/90"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            }`}
            onClick={() => router.push("/signup")}
          >
            {tier.buttonText}
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Show More
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="min-h-screen py-16 px-6 relative cyber-border">
      <div className="cyber-grid-overlay"></div>
      <div className="matrix-bg"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Choose Your AI Power</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 price-text">
            Unlock the full potential of AI with our flexible pricing options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-container">
          {pricingTiers.map((tier, i) => (
            <div
              key={i}
              className="pricing-card matrix-scan transform hover:scale-105 hover:-rotate-1 transition-all duration-500 cyber-float relative overflow-hidden hover:shadow-[0_0_50px_rgba(0,203,221,0.3)] hover:-translate-y-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              <PricingCard tier={tier} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

