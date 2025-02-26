"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertCircle,
  FileText,
  DatabaseIcon,
  Upload,
  Trash2,
  RefreshCw,
  FileSpreadsheet,
  FileJson,
  FileCode,
  Check,
  X,
} from "lucide-react"
import { DatasetCardSkeleton } from "@/components/loading/DatasetCardSkeleton"
import { LoadingSpinner } from "@/components/loading/LoadingSpinner"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { api } from "@/lib/api"
import { useWebSocket } from "@/hooks/useWebSocket"
import { useOptimisticUpdate } from "@/hooks/useOptimisticUpdate"
import { toast } from "sonner"

interface Dataset {
  id: string
  name: string
  description: string
  format: "csv" | "json" | "text" | "parquet" | "other"
  size: string
  records: number
  createdAt: string
  updatedAt: string
  status: "ready" | "processing" | "error"
  tags: string[]
}

// Dummy data for datasets
const dummyDatasets: Dataset[] = [
  {
    id: "1",
    name: "Customer Support Conversations",
    description: "Cleaned dataset of customer support conversations for training chatbots",
    format: "json",
    size: "1.2 GB",
    records: 250000,
    createdAt: "2023-10-15T10:30:00Z",
    updatedAt: "2023-10-15T10:30:00Z",
    status: "ready",
    tags: ["customer-support", "conversations", "english"],
  },
  {
    id: "2",
    name: "Financial News Articles",
    description: "Collection of financial news articles from major publications",
    format: "text",
    size: "800 MB",
    records: 120000,
    createdAt: "2023-09-22T14:15:00Z",
    updatedAt: "2023-09-25T09:45:00Z",
    status: "ready",
    tags: ["finance", "news", "articles"],
  },
  {
    id: "3",
    name: "Medical Terminology Database",
    description: "Comprehensive database of medical terms and definitions",
    format: "csv",
    size: "450 MB",
    records: 75000,
    createdAt: "2023-11-05T08:20:00Z",
    updatedAt: "2023-11-05T08:20:00Z",
    status: "ready",
    tags: ["medical", "terminology", "healthcare"],
  },
  {
    id: "4",
    name: "E-commerce Product Reviews",
    description: "User reviews for various e-commerce products with sentiment labels",
    format: "json",
    size: "2.5 GB",
    records: 500000,
    createdAt: "2023-08-18T16:40:00Z",
    updatedAt: "2023-08-20T11:25:00Z",
    status: "ready",
    tags: ["e-commerce", "reviews", "sentiment-analysis"],
  },
  {
    id: "5",
    name: "Code Documentation Corpus",
    description: "Programming documentation from multiple languages and frameworks",
    format: "text",
    size: "1.8 GB",
    records: 320000,
    createdAt: "2023-10-30T13:10:00Z",
    updatedAt: "2023-10-30T13:10:00Z",
    status: "processing",
    tags: ["code", "documentation", "programming"],
  },
  {
    id: "6",
    name: "Legal Contract Templates",
    description: "Collection of legal contract templates and clauses",
    format: "text",
    size: "350 MB",
    records: 45000,
    createdAt: "2023-11-12T09:30:00Z",
    updatedAt: "2023-11-12T09:30:00Z",
    status: "error",
    tags: ["legal", "contracts", "templates"],
  },
]

const allTags = Array.from(new Set(dummyDatasets.flatMap((dataset) => dataset.tags)))
const allFormats = Array.from(new Set(dummyDatasets.map((dataset) => dataset.format)))

export default function DataIntegrationPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedFormats, setSelectedFormats] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "ready" | "processing" | "error">("all")
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Optimistic updates for dataset deletion
  const { update: deleteDataset, isUpdating: isDeleting } = useOptimisticUpdate({
    onUpdate: async (datasetId: string) => {
      try {
        await api.datasets.delete(datasetId)
        toast.success("Dataset deleted successfully")
        return datasetId
      } catch (error) {
        console.error("Deletion error:", error)
        throw error
      }
    },
    onError: (error) => {
      toast.error("Failed to delete dataset")
    },
  })

  // Real-time updates for dataset processing status
  useWebSocket("dataset:status", (payload) => {
    setDatasets((prevDatasets) =>
      prevDatasets.map((dataset) =>
        dataset.id === payload.datasetId ? { ...dataset, status: payload.status } : dataset,
      ),
    )
  })

  useEffect(() => {
    const loadDatasets = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // In a real app, this would be an API call
        // const data = await api.datasets.list();

        // Using dummy data for demonstration
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setDatasets(dummyDatasets)
      } catch (error) {
        console.error("Failed to load datasets:", error)
        setError("Failed to load datasets. Please try again later.")
        toast.error("Failed to load datasets")
      } finally {
        setIsLoading(false)
      }
    }

    loadDatasets()
  }, [])

  const filteredDatasets = datasets.filter((dataset) => {
    const tagMatch = selectedTags.length === 0 || dataset.tags.some((tag) => selectedTags.includes(tag))
    const formatMatch = selectedFormats.length === 0 || selectedFormats.includes(dataset.format)
    const statusMatch = activeTab === "all" || dataset.status === activeTab
    const searchMatch =
      searchQuery === "" ||
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase())

    return tagMatch && formatMatch && statusMatch && searchMatch
  })

  const handleDeleteDataset = async (datasetId: string) => {
    try {
      await deleteDataset(datasetId)
      setDatasets(datasets.filter((dataset) => dataset.id !== datasetId))
    } catch (error) {
      console.error("Error deleting dataset:", error)
    }
  }

  const handleUploadDataset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate file upload with progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 0
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      // Add new dataset to the list
      const newDataset: Dataset = {
        id: `new-${Date.now()}`,
        name: "Newly Uploaded Dataset",
        description: "This dataset was just uploaded",
        format: "csv",
        size: "1.5 GB",
        records: 300000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "processing",
        tags: ["new", "uploaded"],
      }

      setDatasets([newDataset, ...datasets])
      setIsUploading(false)
      setUploadProgress(null)
      toast.success("Dataset uploaded successfully")
    }, 5000)
  }

  const formatIcon = (format: string) => {
    switch (format) {
      case "csv":
        return <FileSpreadsheet className="h-5 w-5" />
      case "json":
        return <FileJson className="h-5 w-5" />
      case "text":
        return <FileText className="h-5 w-5" />
      default:
        return <FileCode className="h-5 w-5" />
    }
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <Check className="h-5 w-5 text-green-500" />
      case "processing":
        return <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />
      case "error":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return null
    }
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
              Data Integration
            </h2>
            <p className="text-muted-foreground">Manage your datasets for training and fine-tuning</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#00031b] to-[#00cbdd] hover:from-[#000428] hover:to-[#00e1f5] text-white">
                <Upload className="mr-2 h-4 w-4" />
                Upload Dataset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Dataset</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUploadDataset} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="dataset-name" className="text-sm font-medium">
                    Dataset Name
                  </label>
                  <Input id="dataset-name" placeholder="Enter dataset name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="dataset-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input id="dataset-description" placeholder="Enter dataset description" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="dataset-file" className="text-sm font-medium">
                    File
                  </label>
                  <Input id="dataset-file" type="file" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="dataset-tags" className="text-sm font-medium">
                    Tags (comma separated)
                  </label>
                  <Input id="dataset-tags" placeholder="e.g., finance, news, english" />
                </div>

                {uploadProgress !== null && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end">
                  <Button type="submit" disabled={isUploading} className="bg-[#00cbdd] hover:bg-[#00b5c5]">
                    {isUploading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Uploading...
                      </>
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as typeof activeTab)}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-4 w-full md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="ready">Ready</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="error">Error</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="space-y-2 mr-4">
              <h3 className="text-sm font-medium">Filter by Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${selectedTags.includes(tag) ? "bg-[#00cbdd] hover:bg-[#00b5c5]" : ""}`}
                    onClick={() => {
                      setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Filter by Format</h3>
              <div className="flex flex-wrap gap-2">
                {allFormats.map((format) => (
                  <Badge
                    key={format}
                    variant={selectedFormats.includes(format) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedFormats.includes(format) ? "bg-[#00cbdd] hover:bg-[#00b5c5]" : ""
                    }`}
                    onClick={() => {
                      setSelectedFormats((prev) =>
                        prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format],
                      )
                    }}
                  >
                    {format}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredDatasets.length} of {datasets.length} datasets
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {isLoading
              ? // Show skeletons while loading
                Array.from({ length: 6 }).map((_, i) => <DatasetCardSkeleton key={i} />)
              : // Show actual datasets when loaded
                filteredDatasets.map((dataset) => (
                  <Card key={dataset.id} className="backdrop-blur-xl bg-background/50 hover:shadow-lg transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-[#00cbdd]/10 p-2">{formatIcon(dataset.format)}</div>
                          <div>
                            <CardTitle className="text-lg">{dataset.name}</CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(dataset.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {statusIcon(dataset.status)}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteDataset(dataset.id)}
                            disabled={isDeleting}
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{dataset.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Format</p>
                          <p className="font-medium">{dataset.format.toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Size</p>
                          <p className="font-medium">{dataset.size}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Records</p>
                          <p className="font-medium">{dataset.records.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p
                            className={`font-medium ${
                              dataset.status === "ready"
                                ? "text-green-500"
                                : dataset.status === "processing"
                                  ? "text-yellow-500"
                                  : "text-red-500"
                            }`}
                          >
                            {dataset.status.charAt(0).toUpperCase() + dataset.status.slice(1)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {dataset.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-[#00cbdd]/10 text-[#00cbdd] hover:bg-[#00cbdd]/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          className="flex-1 bg-[#00cbdd] hover:bg-[#00b5c5] text-white"
                          disabled={dataset.status !== "ready"}
                        >
                          <DatabaseIcon className="mr-2 h-4 w-4" />
                          Use Dataset
                        </Button>
                        <Button variant="outline" className="flex gap-2">
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </motion.div>
        </AnimatePresence>

        {!isLoading && filteredDatasets.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <DatabaseIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-lg mt-4">No datasets match your filters.</p>
            <p className="text-muted-foreground">Try adjusting your search or filters, or upload a new dataset.</p>
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  )
}

