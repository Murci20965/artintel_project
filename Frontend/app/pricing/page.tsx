"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Pricing } from "@/components/Pricing"

export default function PricingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-center"
          >
            Pricing Plans
          </motion.h1>
        </div>
        <Pricing /> {/* Inheriting the Pricing component here */}
      </div>
    </div>
  )
}

