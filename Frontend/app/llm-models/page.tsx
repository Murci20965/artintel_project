"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ModelCard, type ModelCardProps } from "@/components/ui/ModelCard"
import { PixelCanvas } from "@/components/ui/pixel-canvas"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Database } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"

// Sample LLM data
const llmModels: Omit<ModelCardProps, "onDeploy" | "onLearnMore">[] = [
  {
    name: "T5",
    description: "Text generation and summarization model for content creation and education.",
    version: "1.0.0",
    type: "LLM",
    stats: {
      parameters: "1.5B",
      contextWindow: "512 tokens",
      trainingTokens: "750B",
      latency: "Moderate",
    },
    tags: ["Text Generation", "Summarization", "Content Creation", "Education"],
    status: "ready",
  },
  {
    name: "Flan-T5",
    description: "Instruction-following model for customer support and automation tasks.",
    version: "1.0.0",
    type: "LLM",
    stats: {
      parameters: "2B",
      contextWindow: "512 tokens",
      trainingTokens: "1.2T",
      latency: "Moderate",
    },
    tags: ["Instruction-Following", "Customer Support", "Automation"],
    status: "ready",
  },
  {
    name: "UL2",
    description: "Multi-task language understanding model for research and general AI applications.",
    version: "1.0.0",
    type: "LLM",
    stats: {
      parameters: "3B",
      contextWindow: "512 tokens",
      trainingTokens: "1.5T",
      latency: "Moderate",
    },
    tags: ["Multi-task", "Language Understanding", "Research", "General AI"],
    status: "ready",
  },
  {
    name: "Mistral 7B",
    description: "Fast and very high accuracy model for chatbots and code generation in tech and SaaS industries.",
    version: "1.0.0",
    type: "LLM",
    stats: {
      parameters: "7B",
      contextWindow: "8192 tokens",
      trainingTokens: "2T",
      latency: "Fast",
    },
    tags: ["Chatbots", "Code Generation", "Tech", "SaaS"],
    status: "ready",
  },
  {
    name: "Falcon 7B",
    description: "Fast and high accuracy model for reasoning and content creation in finance and legal industries.",
    version: "1.0.0",
    type: "LLM",
    stats: {
      parameters: "7B",
      contextWindow: "4096 tokens",
      trainingTokens: "1.5T",
      latency: "Fast",
    },
    tags: ["Reasoning", "Content Creation", "Finance", "Legal"],
    status: "ready",
  },
]

export default function LLMModels() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredModels, setFilteredModels] = useState(llmModels)
  const [isLoaded, setIsLoaded] = useState(false)
  const { currentTheme } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = llmModels.filter(
      (model) =>
        model.name.toLowerCase().includes(query.toLowerCase()) ||
        model.description.toLowerCase().includes(query.toLowerCase()) ||
        model.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
    )
    setFilteredModels(filtered)
  }

  return (
    <section className={`min-h-screen ${currentTheme.background} py-20 px-6 relative overflow-hidden`}>
      <PixelCanvas
        gap={20}
        speed={30}
        colors={["#00f2fe", "#4facfe", "#00f2fe"]}
        variant="icon"
        className="absolute inset-0 opacity-30"
      />
      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1
            className={`text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 ${currentTheme.text}`}
          >
            Large Language Models
          </h1>
          <p className={`text-lg ${currentTheme.text} dark:text-white max-w-2xl mx-auto text-center mb-8`}>
            Explore our collection of state-of-the-art large language models, ranging from efficient 1.5B parameter
            models to our powerful 7B parameter flagship.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <Input
            type="search"
            placeholder="Search models by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className={`max-w-md ${currentTheme.input}`}
          />
          <Link href="/slm-models" className="ml-4">
            <Button
              variant="outline"
              className="border-2 border-blue-400 dark:border-cyan-400 text-blue-500 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-900/20 rounded-xl"
            >
              <Database className="w-4 h-4 mr-2" />
              View Small Models
            </Button>
          </Link>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredModels.map((model) => (
              <ModelCard
                key={model.name}
                {...model}
                onDeploy={() => console.log(`Deploy ${model.name}`)}
                onLearnMore={() => console.log(`Learn more about ${model.name}`)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <p className={currentTheme.text}>No models found matching your search criteria.</p>
          </div>
        )}
      </div>
      <GlowingEffect className="absolute inset-0 z-0" />
    </section>
  )
}

