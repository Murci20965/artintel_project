"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Check, Scale, Brain, Bot, ArrowRight } from "lucide-react"
import { ModelCardSkeleton } from "@/components/loading/ModelCardSkeleton"
import { LoadingSpinner } from "@/components/loading/LoadingSpinner"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { api } from "@/lib/api"
import { useWebSocket } from "@/hooks/useWebSocket"
import { useOptimisticUpdate } from "@/hooks/useOptimisticUpdate"
import { toast } from "sonner"

interface Model {
  id: string
  name: string
  size: string
  parameters: string
  license: string
  commercial: boolean
  metrics: {
    accuracy: number
    latency: string
    memory: string
  }
  domain: string[]
  description: string
  tier: "free" | "advanced" | "enterprise"
  version: string
  type: "LLM" | "SLM"
  status: "ready" | "preparing" | "training"
}

// Dummy data for models (replace with actual data fetching)
const dummyModels: Model[] = [
  {
    id: "1",
    name: "ArtIntel GPT-4",
    size: "large",
    parameters: "175B",
    license: "Commercial",
    commercial: true,
    metrics: { accuracy: 0.95, latency: "150ms", memory: "16GB" },
    domain: ["finance", "healthcare", "general"],
    description: "Our flagship large language model for advanced reasoning and generation tasks.",
    tier: "enterprise",
    version: "1.2",
    type: "LLM",
    status: "ready",
  },
  {
    id: "2",
    name: "ArtIntel GPT-3",
    size: "medium",
    parameters: "6B",
    license: "Apache 2.0",
    commercial: true,
    metrics: { accuracy: 0.92, latency: "50ms", memory: "4GB" },
    domain: ["customer-service", "content-generation"],
    description: "A balanced model for most business applications with good performance.",
    tier: "advanced",
    version: "2.1",
    type: "LLM",
    status: "ready",
  },
  {
    id: "3",
    name: "ArtIntel SLM-1",
    size: "small",
    parameters: "1B",
    license: "MIT",
    commercial: true,
    metrics: { accuracy: 0.89, latency: "15ms", memory: "1GB" },
    domain: ["classification", "summarization"],
    description: "A lightweight model optimized for specific tasks with minimal resource requirements.",
    tier: "free",
    version: "3.0",
    type: "SLM",
    status: "ready",
  },
  {
    id: "4",
    name: "ArtIntel Code-LLM",
    size: "large",
    parameters: "20B",
    license: "Commercial",
    commercial: true,
    metrics: { accuracy: 0.94, latency: "120ms", memory: "8GB" },
    domain: ["code-generation", "debugging"],
    description: "Specialized for code generation and understanding across multiple programming languages.",
    tier: "enterprise",
    version: "1.0",
    type: "LLM",
    status: "preparing",
  },
  {
    id: "5",
    name: "ArtIntel Medical",
    size: "medium",
    parameters: "7B",
    license: "Research Only",
    commercial: false,
    metrics: { accuracy: 0.96, latency: "80ms", memory: "6GB" },
    domain: ["healthcare", "medical-research"],
    description: "Fine-tuned for medical terminology and healthcare applications.",
    tier: "advanced",
    version: "1.5",
    type: "LLM",
    status: "ready",
  },
  {
    id: "6",
    name: "ArtIntel Finance-SLM",
    size: "small",
    parameters: "800M",
    license: "MIT",
    commercial: true,
    metrics: { accuracy: 0.91, latency: "10ms", memory: "800MB" },
    domain: ["finance", "trading"],
    description: "Specialized small language model for financial text analysis and predictions.",
    tier: "free",
    version: "2.2",
    type: "SLM",
    status: "ready",
  },
]

const domains = Array.from(new Set(dummyModels.flatMap((m) => m.domain)))
const sizes = Array.from(new Set(dummyModels.map((m) => m.size)))

/**
 * ModelCatalogPage component displays a catalog of available models with filtering,
 * comparison, and deployment capabilities.
 */
export default function ModelCatalogPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [models, setModels] = useState<Model[]>([])
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [compareModels, setCompareModels] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [error, setError] = useState<string | null>(null)
  const userTier = "free" // This would come from auth context

  // Optimistic updates for model deployment
  const { update: deployModel, isUpdating: isDeploying } = useOptimisticUpdate({
    onUpdate: async (modelId: string) => {
      try {
        await api.models.deploy(modelId, {})
        toast.success("Model deployed successfully")
        return modelId
      } catch (error) {
        console.error("Deployment error:", error)
        throw error
      }
    },
    onError: (error) => {
      toast.error("Failed to deploy model")
    },
  })

  // Real-time updates for model status
  useWebSocket("model:status", (payload) => {
    setModels((prevModels) =>
      prevModels.map((model) => (model.id === payload.modelId ? { ...model, status: payload.status } : model)),
    )
  })

  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // In a real app, this would be an API call
        // const data = await api.models.list();

        // Using dummy data for demonstration
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setModels(dummyModels)
      } catch (error) {
        console.error("Failed to load models:", error)
        setError("Failed to load models. Please try again later.")
        toast.error("Failed to load models")
      } finally {
        setIsLoading(false)
      }
    }

    loadModels()
  }, [])

  const filteredModels = models.filter((model) => {
    const domainMatch = selectedDomains.length === 0 || model.domain.some((d) => selectedDomains.includes(d))
    const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(model.size)
    return domainMatch && sizeMatch
  })

  const toggleModelComparison = (modelId: string) => {
    setCompareModels((prev) =>
      prev.includes(modelId) ? prev.filter((id) => id !== modelId) : [...prev, modelId].slice(-2),
    )
  }

  const handleDeployModel = async (modelId: string) => {
    try {
      await deployModel(modelId)
    } catch (error) {
      console.error("Error deploying model:", error)
    }
  }

  const handleLearnMore = (modelId: string) => {
    // In a real app, this would navigate to a model details page
    console.log(`Learn more about model ${modelId}`)
    toast.info(`Viewing details for model ${modelId}`)
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => window.location.reload()} className="mt-4 bg-blue-500 hover:bg-blue-600">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="space-y-8 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#00031b] to-[#00cbdd] bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
              Model Catalog
            </h2>
            <p className="text-muted-foreground">Browse and deploy AI models for your use case</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-[#00031b] to-[#00cbdd] hover:from-[#000428] hover:to-[#00e1f5] text-white"
                disabled={compareModels.length === 0}
              >
                Compare Models ({compareModels.length}/2)
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Model Comparison</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[600px]">
                {compareModels.length === 2 ? (
                  <div className="grid grid-cols-3 gap-4">
                    <div />
                    {compareModels.map((modelId) => {
                      const model = models.find((m) => m.id === modelId)!
                      return (
                        <div key={model.id} className="space-y-4">
                          <h3 className="font-semibold text-lg">{model.name}</h3>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Size: {model.size}</p>
                            <p className="text-sm text-muted-foreground">Parameters: {model.parameters}</p>
                            <p className="text-sm text-muted-foreground">License: {model.license}</p>
                            <div className="flex gap-2">
                              {model.domain.map((d) => (
                                <Badge key={d} variant="secondary">
                                  {d}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div className="font-medium">Metrics</div>
                    {compareModels.map((modelId) => {
                      const model = models.find((m) => m.id === modelId)!
                      return (
                        <div key={model.id} className="space-y-2">
                          <p>Accuracy: {(model.metrics.accuracy * 100).toFixed(1)}%</p>
                          <p>Latency: {model.metrics.latency}</p>
                          <p>Memory: {model.metrics.memory}</p>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">Select two models to compare</p>
                )}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Domains</h3>
              <div className="flex flex-wrap gap-2">
                {domains.map((domain) => (
                  <Button
                    key={domain}
                    variant={selectedDomains.includes(domain) ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setSelectedDomains((prev) =>
                        prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain],
                      )
                    }
                    className={selectedDomains.includes(domain) ? "bg-[#00cbdd] hover:bg-[#00b5c5]" : ""}
                  >
                    {domain}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Model Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSizes.includes(size) ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setSelectedSizes((prev) =>
                        prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
                      )
                    }
                    className={selectedSizes.includes(size) ? "bg-[#00cbdd] hover:bg-[#00b5c5]" : ""}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredModels.length} of {models.length} models
            </p>
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)}>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
          >
            {isLoading
              ? // Show skeletons while loading
                Array.from({ length: 6 }).map((_, i) => <ModelCardSkeleton key={i} />)
              : // Show actual models when loaded
                filteredModels.map((model) => (
                  <Card key={model.id} className="backdrop-blur-xl bg-background/50 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-[#00cbdd]/10 p-2">
                            {model.type === "LLM" ? (
                              <Brain className="h-5 w-5 text-[#00cbdd]" />
                            ) : (
                              <Bot className="h-5 w-5 text-[#00cbdd]" />
                            )}
                          </div>
                          <div>
                            <CardTitle>{model.name}</CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">v{model.version}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleModelComparison(model.id)}
                          className={
                            compareModels.includes(model.id) ? "bg-[#00cbdd] text-white hover:bg-[#00b5c5]" : ""
                          }
                        >
                          {compareModels.includes(model.id) ? "Selected" : "Compare"}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{model.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {model.domain.map((domain) => (
                          <Badge
                            key={domain}
                            variant="secondary"
                            className="bg-[#00cbdd]/10 text-[#00cbdd] hover:bg-[#00cbdd]/20"
                          >
                            {domain}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Size</p>
                          <p className="font-medium">{model.size}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Accuracy</p>
                          <p className="font-medium">{(model.metrics.accuracy * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Latency</p>
                          <p className="font-medium">{model.metrics.latency}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4" />
                          <span className="text-sm">{model.license}</span>
                        </div>
                        {model.commercial && (
                          <div className="flex items-center gap-2 text-green-500">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Commercial use</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            model.status === "ready"
                              ? "bg-green-500/10 text-green-500"
                              : model.status === "preparing"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            model.tier === "free"
                              ? "bg-green-500/10 text-green-500"
                              : model.tier === "advanced"
                                ? "bg-purple-500/10 text-purple-500"
                                : "bg-orange-500/10 text-orange-500"
                          }`}
                        >
                          {model.tier.charAt(0).toUpperCase() + model.tier.slice(1)} tier
                        </span>
                      </div>

                      {userTier === "free" && model.tier !== "free" && (
                        <Alert
                          variant="warning"
                          className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                        >
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Upgrade Required</AlertTitle>
                          <AlertDescription>
                            This model requires {model.tier} tier. Please upgrade your plan to access it.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="flex gap-3">
                        <Button
                          aria-label={`Deploy model ${model.name}`}
                          className="flex-1 bg-[#00cbdd] hover:bg-[#00b5c5] text-white"
                          onClick={() => handleDeployModel(model.id)}
                          disabled={
                            isDeploying || model.status !== "ready" || (userTier === "free" && model.tier !== "free")
                          }
                        >
                          {isDeploying ? (
                            <>
                              <LoadingSpinner size="sm" className="mr-2" />
                              Deploying...
                            </>
                          ) : (
                            "Deploy Model"
                          )}
                        </Button>
                        <Button variant="outline" onClick={() => handleLearnMore(model.id)} className="flex gap-2">
                          Details
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </motion.div>
        </AnimatePresence>

        {!isLoading && filteredModels.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-muted-foreground text-lg">No models match your filters. Try adjusting your selection.</p>
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  )
}

