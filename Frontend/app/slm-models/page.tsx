"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ModelCard, type ModelCardProps } from "@/components/ui/ModelCard"
import { PixelCanvas } from "@/components/ui/pixel-canvas"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Cpu } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"

// Sample SLM data
const slmModels: Omit<ModelCardProps, "onDeploy" | "onLearnMore">[] = [
  {
    name: "BERT",
    description:
      "Fast and high accuracy model for text classification and Q&A in healthcare, legal, and finance industries.",
    version: "1.0.0",
    type: "SLM",
    stats: {
      parameters: "110M",
      contextWindow: "512 tokens",
      trainingTokens: "Not specified",
      latency: "Fast",
    },
    tags: ["Text Classification", "Q&A", "Healthcare", "Legal", "Finance"],
    status: "ready",
  },
  {
    name: "DistilBERT",
    description: "Very fast model for lightweight NLP tasks in retail and marketing industries.",
    version: "1.0.0",
    type: "SLM",
    stats: {
      parameters: "66M",
      contextWindow: "512 tokens",
      trainingTokens: "Not specified",
      latency: "Very Fast",
    },
    tags: ["Lightweight NLP", "Retail", "Marketing"],
    status: "ready",
  },
  {
    name: "Phi-2",
    description: "Very fast and high accuracy model for edge AI and mobile apps in IoT and healthcare industries.",
    version: "1.0.0",
    type: "SLM",
    stats: {
      parameters: "2.7B",
      contextWindow: "Not specified",
      trainingTokens: "Not specified",
      latency: "Very Fast",
    },
    tags: ["Edge AI", "Mobile Apps", "IoT", "Healthcare"],
    status: "ready",
  },
  {
    name: "StableLM 3B",
    description: "Very fast model for lightweight chatbots in retail and hospitality industries.",
    version: "1.0.0",
    type: "SLM",
    stats: {
      parameters: "3B",
      contextWindow: "Not specified",
      trainingTokens: "Not specified",
      latency: "Very Fast",
    },
    tags: ["Lightweight Chatbots", "Retail", "Hospitality"],
    status: "ready",
  },
  {
    name: "CodeGen 2.7B",
    description: "Fast and high accuracy model for code autocompletion in software development.",
    version: "1.0.0",
    type: "SLM",
    stats: {
      parameters: "2.7B",
      contextWindow: "Not specified",
      trainingTokens: "Not specified",
      latency: "Fast",
    },
    tags: ["Code Autocompletion", "Software Development"],
    status: "ready",
  },
]

export default function SLMModels() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredModels, setFilteredModels] = useState(slmModels)
  const [isLoaded, setIsLoaded] = useState(false)
  const { currentTheme } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = slmModels.filter(
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
            Small Language Models
          </h1>
          <p className={`text-lg ${currentTheme.text} dark:text-white max-w-2xl mx-auto text-center mb-8`}>
            Discover our range of efficient small language models, perfect for edge deployment and applications
            requiring minimal latency.
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
          <Link href="/llm-models" className="ml-4">
            <Button
              variant="outline"
              className="border-2 border-blue-400 dark:border-cyan-400 text-blue-500 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-900/20 rounded-xl"
            >
              <Cpu className="w-4 h-4 mr-2" />
              View Large Models
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

