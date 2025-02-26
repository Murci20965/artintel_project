"use client"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Model {
  id: string
  name: string
  description: string
  industry: string[]
  size: "small" | "medium" | "large"
  metrics: {
    accuracy: number
    latency: string
    throughput: string
  }
  features: string[]
}

// Dummy data for demonstration. Replace with your actual data fetching mechanism.
const llmModels = [
  {
    name: "LLM Model A",
    description: "A large language model for various tasks.",
    tags: ["LLM", "Text Generation", "Translation", "Finance"],
    type: "LLM",
    stats: { latency: "150ms" },
  },
  {
    name: "LLM Model B",
    description: "Another large language model with enhanced capabilities.",
    tags: ["LLM", "Code Generation", "Summarization", "Healthcare"],
    type: "LLM",
    stats: { latency: "200ms" },
  },
]

const slmModels = [
  {
    name: "SLM Model C",
    description: "A small language model for specific tasks.",
    tags: ["SLM", "Sentiment Analysis", "Chatbot", "Customer Support"],
    type: "SLM",
    stats: { latency: "50ms" },
  },
  {
    name: "SLM Model D",
    description: "Another small language model optimized for speed.",
    tags: ["SLM", "Text Classification", "Question Answering", "E-commerce"],
    type: "SLM",
    stats: { latency: "75ms" },
  },
]

const models: Model[] = [
  ...(llmModels.map((model) => ({
    id: model.name.toLowerCase().replace(/\s+/g, "-"),
    name: model.name,
    description: model.description,
    industry: model.tags.filter((tag) => !["LLM", "SLM"].includes(tag)),
    size: model.type === "LLM" ? "large" : "small",
    metrics: {
      accuracy: Number.parseFloat((Math.random() * (0.99 - 0.85) + 0.85).toFixed(2)),
      latency: model.stats.latency,
      throughput: `${Math.floor(Math.random() * 100) + 1} req/s`,
    },
    features: model.tags,
  })) as Model[]),
  ...(slmModels.map((model) => ({
    id: model.name.toLowerCase().replace(/\s+/g, "-"),
    name: model.name,
    description: model.description,
    industry: model.tags.filter((tag) => !["LLM", "SLM"].includes(tag)),
    size: "small",
    metrics: {
      accuracy: Number.parseFloat((Math.random() * (0.99 - 0.85) + 0.85).toFixed(2)),
      latency: model.stats.latency,
      throughput: `${Math.floor(Math.random() * 100) + 1} req/s`,
    },
    features: model.tags,
  })) as Model[]),
]

const allIndustries = Array.from(new Set(models.flatMap((model) => model.industry))).sort()

const allSizes = Array.from(new Set(models.map((model) => model.size))).sort()

const ModelCard = ({ model }: { model: Model }) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const sizeColor = {
    small: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    large: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }[model.size]

  return (
    <motion.div
      layout
      initial={{ opacity: 1, scale: 0.9 }}
      animate={{ opacity: 3, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-artintell-primary rounded-xl shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-artintell-primary dark:text-white">{model.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${sizeColor}`}>
            {model.size.charAt(0).toUpperCase() + model.size.slice(1)}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">{model.description}</p>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">Accuracy</div>
            <div className="font-semibold text-artintell-primary dark:text-white">
              {(model.metrics.accuracy * 100).toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">Latency</div>
            <div className="font-semibold text-artintell-primary dark:text-white">{model.metrics.latency}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">Throughput</div>
            <div className="font-semibold text-artintell-primary dark:text-white">{model.metrics.throughput}</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Industries</div>
          <div className="flex flex-wrap gap-2">
            {model.industry.map((ind) => (
              <span key={ind} className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs">
                {ind}
              </span>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Features</div>
              <ul className="space-y-1">
                {model.features.map((feature) => (
                  <li key={feature} className="text-muted-foreground text-sm flex items-center">
                    <span className="mr-2 text-secondary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <Button className="w-full bg-secondary hover:bg-secondary/90 text-white" onClick={() => router.push("/Signup")}>
          Deploy Model
        </Button>
      </div>
    </motion.div>
  )
}

export function ModelCatalog() {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const industryMatch =
        selectedIndustries.length === 0 || model.industry.some((ind) => selectedIndustries.includes(ind))
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(model.size)
      return industryMatch && sizeMatch
    })
  }, [selectedIndustries, selectedSizes])

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry],
    )
  }

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  return (
    <section id="models" className="min-h-screen bg-secondary/10 dark:bg-background py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Model Catalog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of pre-trained models ready for deployment
          </p>
        </motion.div>

        <div className="mb-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Filter by Industry</h3>
            <div className="flex flex-wrap gap-2">
              {allIndustries.map((industry) => (
                <Button
                  key={industry}
                  variant={selectedIndustries.includes(industry) ? "default" : "outline"}
                  className={`${selectedIndustries.includes(industry) ? "bg-secondary hover:bg-secondary/90" : ""}`}
                  onClick={() => toggleIndustry(industry)}
                >
                  {industry}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Filter by Size</h3>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSizes.includes(size) ? "default" : "outline"}
                  className={`${selectedSizes.includes(size) ? "bg-secondary hover:bg-secondary/90" : ""}`}
                  onClick={() => toggleSize(size)}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Showing {filteredModels.length} models</div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                className={`${viewMode === "grid" ? "bg-secondary hover:bg-secondary/90" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                className={`${viewMode === "list" ? "bg-secondary hover:bg-secondary/90" : ""}`}
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
          >
            {filteredModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredModels.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-muted-foreground text-lg">No models match your filters. Try adjusting your selection.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

