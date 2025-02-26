"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronUp } from "lucide-react"
import * as Icons from "lucide-react"

interface PricingTier {
  name: string
  description: string
  monthlyPrice: string | number
  keyFeatures: string[]
  allFeatures: string[]
  highlighted?: boolean
  buttonText: string
  icon: keyof typeof Icons
}

export const PricingCard = ({ tier }: { tier: PricingTier }) => {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = Icons[tier.icon]

  return (
    <motion.div
      className={`relative transition-all duration-300 ${isExpanded ? "z-10" : ""}`}
      whileHover={{ scale: 1.05 }}
      layout
    >
      <motion.div
        className={`border ${
          tier.highlighted ? "border-blue-500" : "border-gray-700"
        } bg-gray-800 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden
        ${isExpanded ? "shadow-2xl" : "shadow-lg"} transition-shadow duration-300`}
        layout
      >
        {tier.highlighted && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        )}

        <div className="mb-6 flex items-center">
          <Icon className="w-8 h-8 text-blue-400 mr-3" />
          <div>
            <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
            <p className="text-gray-400">{tier.description}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-white">
              {typeof tier.monthlyPrice === "number" ? `$${tier.monthlyPrice}` : tier.monthlyPrice}
            </span>
            <span className="text-gray-400 ml-2">/mo</span>
          </div>
        </div>

        <ul className="space-y-4 mb-6 flex-grow">
          {(isExpanded ? tier.allFeatures : tier.keyFeatures).map((feature, i) => (
            <motion.li
              key={i}
              initial={isExpanded ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex items-center text-gray-300"
            >
              <span className="mr-2 text-blue-400">✓</span>
              {feature}
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto space-y-4">
          <Button
            className={`w-full ${
              tier.highlighted ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
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

        {/* Shimmering effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-600/10 animate-shimmer"></div>
        </div>
      </motion.div>
    </motion.div>
  )
}

