"use client"

import { useState } from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, FileText, AlertCircle } from "lucide-react"

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How do I get started with Artintelllms?",
      answer:
        "Sign up for an account, choose your plan, and follow our quick-start guide to begin using our AI models.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and wire transfers for enterprise customers.",
    },
    {
      question: "How do I upgrade my plan?",
      answer: "Log into your account, go to Settings > Billing, and select 'Upgrade Plan' to view available options.",
    },
    // Add more FAQs as needed
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How Can We Help?</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers, submit tickets, and get the support you need.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <MessageCircle className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Live Chat</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Chat with our support team for immediate assistance.
            </p>
            <Button className="w-full">Start Chat</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <FileText className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Documentation</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Browse our detailed documentation and guides.</p>
            <Button className="w-full" variant="outline">
              View Docs
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <AlertCircle className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Submit Ticket</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Create a support ticket for complex issues.</p>
            <Button className="w-full" variant="outline">
              New Ticket
            </Button>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage

