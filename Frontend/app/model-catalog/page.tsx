"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ModelCard, type ModelCardProps } from "@/components/ui/ModelCard"
import { PixelCanvas } from "@/components/ui/pixel-canvas"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Cpu, Database } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"

// Combined LLM and SLM data
const allModels: Omit<ModelCardProps, "onDeploy" | "onLearnMore">[] = [
  // LLM Models
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
  // SLM Models
  {
    name: "BERT",
    description:
      "Fast and high accuracy model for text classification and Q&A in healthcare, legal, and finance industries.",
    version: "1.0.0",
    type: "SLM",
    stats: {
      parameters: "110M",
      contextWindow: "512 tokens",
      trainingTokens: "3.3B",
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
      trainingTokens: "3.3B",
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
      contextWindow: "2048 tokens",
      trainingTokens: "1.4T",
      latency: "Very Fast",
    },
    tags: ["Edge AI", "Mobile Apps", "IoT", "Healthcare"],
    status: "ready",
  },
]

export default function ModelCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredModels, setFilteredModels] = useState(allModels)
  const [selectedType, setSelectedType] = useState<"ALL" | "LLM" | "SLM">("ALL")
  const [isLoaded, setIsLoaded] = useState(false)
  const { currentTheme } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterModels(query, selectedType)
  }

  const handleTypeFilter = (type: "ALL" | "LLM" | "SLM") => {
    setSelectedType(type)
    filterModels(searchQuery, type)
  }

  const filterModels = (query: string, type: "ALL" | "LLM" | "SLM") => {
    const filtered = allModels.filter(
      (model) =>
        (type === "ALL" || model.type === type) &&
        (model.name.toLowerCase().includes(query.toLowerCase()) ||
          model.description.toLowerCase().includes(query.toLowerCase()) ||
          model.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))),
    )
    setFilteredModels(filtered)
  }

  return (
    <section id="models" className={`min-h-screen ${currentTheme.background} py-20 px-6 relative overflow-hidden`}>
      <PixelCanvas
        gap={20}
        speed={30}
        colors={["#00f2fe", "#4facfe", "#00f2fe"]}
        variant="icon"
        className="absolute inset-0 opacity-30"
      />
      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2
            className={`text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 ${currentTheme.text}`}
          >
            Model Catalog
          </h2>
          <p className={`text-lg ${currentTheme.text} max-w-2xl mx-auto text-center mb-8`}>
            Explore our comprehensive catalog of language models, including both Large Language Models (LLMs) and Small
            Language Models (SLMs).
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
          <Input
            type="search"
            placeholder="Search models by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className={`max-w-md ${currentTheme.input}`}
          />
          <div className="flex gap-2">
            <Button
              variant={selectedType === "ALL" ? "default" : "outline"}
              onClick={() => handleTypeFilter("ALL")}
              className={
                selectedType === "ALL"
                  ? "bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl"
                  : "border-2 border-blue-400 dark:border-cyan-400 text-blue-500 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-900/20 rounded-xl"
              }
            >
              All Models
            </Button>
            <Button
              variant={selectedType === "LLM" ? "default" : "outline"}
              onClick={() => handleTypeFilter("LLM")}
              className={
                selectedType === "LLM"
                  ? "bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl"
                  : "border-2 border-blue-400 dark:border-cyan-400 text-blue-500 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-900/20 rounded-xl"
              }
            >
              <Cpu className="w-4 h-4 mr-2" />
              LLMs
            </Button>
            <Button
              variant={selectedType === "SLM" ? "default" : "outline"}
              onClick={() => handleTypeFilter("SLM")}
              className={
                selectedType === "SLM"
                  ? "bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl"
                  : "border-2 border-blue-400 dark:border-cyan-400 text-blue-500 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-900/20 rounded-xl"
              }
            >
              <Database className="w-4 h-4 mr-2" />
              SLMs
            </Button>
          </div>
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

