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
import { AlertCircle, Check, Scale } from "lucide-react"
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
}

// Dummy data for models (replace with actual data fetching)
const models: Model[] = [
  {
    id: "1",
    name: "Model A",
    size: "small",
    parameters: "1B",
    license: "MIT",
    commercial: true,
    metrics: { accuracy: 0.95, latency: "10ms", memory: "1GB" },
    domain: ["finance", "healthcare"],
    description: "A small model for general use.",
    tier: "free",
  },
  {
    id: "2",
    name: "Model B",
    size: "large",
    parameters: "10B",
    license: "Apache 2.0",
    commercial: false,
    metrics: { accuracy: 0.98, latency: "50ms", memory: "5GB" },
    domain: ["finance", "technology"],
    description: "A large model for advanced tasks.",
    tier: "advanced",
  },
  {
    id: "3",
    name: "Model C",
    size: "medium",
    parameters: "5B",
    license: "Proprietary",
    commercial: true,
    metrics: { accuracy: 0.97, latency: "25ms", memory: "3GB" },
    domain: ["healthcare", "research"],
    description: "A medium model for specialized applications.",
    tier: "enterprise",
  },
]

const domains = Array.from(new Set(models.flatMap((m) => m.domain)))
const sizes = Array.from(new Set(models.map((m) => m.size)))

/**
 * ModelsPage component displays a catalog of available models with filtering,
 * comparison, and deployment capabilities.
 */
export default function ModelsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [models, setModels] = useState<Model[]>([])
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [compareModels, setCompareModels] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compare">("grid")
  const userTier = "free" // This would come from auth context

  // Optimistic updates for model deployment
  const { update: deployModel, isUpdating: isDeploying } = useOptimisticUpdate({
    onUpdate: async (modelId: string) => {
      await api.models.deploy(modelId, {})
      toast.success("Model deployed successfully")
      return modelId
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
        const data = await api.models.list()
        setModels(data)
      } catch (error) {
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

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Model Catalog
            </h2>
            <p className="text-muted-foreground">Browse and compare AI models for your use case</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-400 to-cyan-300 hover:from-blue-500 hover:to-cyan-400">
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
                    className={selectedDomains.includes(domain) ? "bg-blue-500 hover:bg-blue-600" : ""}
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
                    className={selectedSizes.includes(size) ? "bg-blue-500 hover:bg-blue-600" : ""}
                  >
                    {size}
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
                  <Card key={model.id} className="backdrop-blur-xl bg-background/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{model.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{model.description}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleModelComparison(model.id)}
                          className={compareModels.includes(model.id) ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
                        >
                          {compareModels.includes(model.id) ? "Selected" : "Compare"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {model.domain.map((domain) => (
                          <Badge key={domain} variant="secondary">
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

                      {userTier === "free" && model.tier !== "free" && (
                        <Alert variant="warning">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Upgrade Required</AlertTitle>
                          <AlertDescription>
                            This model requires {model.tier} tier. Please upgrade your plan to access it.
                          </AlertDescription>
                        </Alert>
                      )}

                      <Button
                        aria-label={`Deploy model ${model.name}`}
                        className="w-full bg-gradient-to-r from-blue-400 to-cyan-300 hover:from-blue-500 hover:to-cyan-400"
                        onClick={() => deployModel(model.id)}
                        disabled={isDeploying}
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
                    </CardContent>
                  </Card>
                ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  )
}

