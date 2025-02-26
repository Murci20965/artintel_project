"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Database, Eye, EyeOff, Tag, History, Trash2 } from "lucide-react"
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
  type: string
  size: string
  records: number
  tags: string[]
  lastModified: string
  versions: number
  status?: string
}

/**
 * DataPage component provides an interface for managing datasets,
 * including upload, processing, and cloud storage integration.
 */
export default function DataPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [piiRedaction, setPiiRedaction] = useState(true)
  const [deduplication, setDeduplication] = useState(true)

  // Optimistic updates for dataset deletion
  const { update: deleteDataset, isUpdating: isDeleting } = useOptimisticUpdate({
    onUpdate: async (datasetId: string) => {
      await api.datasets.delete(datasetId)
      setDatasets((prev) => prev.filter((d) => d.id !== datasetId))
      toast.success("Dataset deleted successfully")
      return datasetId
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
        const data = await api.datasets.list()
        setDatasets(data)
      } catch (error) {
        toast.error("Failed to load datasets")
      } finally {
        setIsLoading(false)
      }
    }

    loadDatasets()
  }, [])

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Data Integration
            </h2>
            <p className="text-muted-foreground">Manage and process your training datasets</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-400 to-cyan-300 hover:from-blue-500 hover:to-cyan-400">
            <Upload className="w-4 h-4 mr-2" />
            Upload Dataset
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="backdrop-blur-xl bg-background/50">
            <CardHeader>
              <CardTitle>Data Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>PII Redaction</Label>
                  <p className="text-sm text-muted-foreground">Automatically detect and mask sensitive information</p>
                </div>
                <Switch checked={piiRedaction} onCheckedChange={setPiiRedaction} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Deduplication</Label>
                  <p className="text-sm text-muted-foreground">Remove duplicate entries from datasets</p>
                </div>
                <Switch checked={deduplication} onCheckedChange={setDeduplication} />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-background/50">
            <CardHeader>
              <CardTitle>Cloud Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Connect Storage</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20">
                    <Database className="w-8 h-8 mb-2" />
                    AWS S3
                  </Button>
                  <Button variant="outline" className="h-20">
                    <Database className="w-8 h-8 mb-2" />
                    Google Cloud
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="backdrop-blur-xl bg-background/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Datasets</CardTitle>
              <Input className="w-64" placeholder="Search datasets..." />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {isLoading
                  ? // Show skeletons while loading
                    Array.from({ length: 3 }).map((_, i) => <DatasetCardSkeleton key={i} />)
                  : // Show actual datasets when loaded
                    datasets.map((dataset) => (
                      <motion.div
                        key={dataset.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg border bg-background/50"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{dataset.name}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>{dataset.type}</span>
                              <span>{dataset.size}</span>
                              <span>{dataset.records.toLocaleString()} records</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              {piiRedaction ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Tag className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <History className="w-4 h-4" />
                            </Button>
                            <Button
                              aria-label="Delete dataset"
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => deleteDataset(dataset.id)}
                              disabled={isDeleting}
                            >
                              {isDeleting ? <LoadingSpinner size="sm" /> : <Trash2 className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          {dataset.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                          <span>Last modified: {dataset.lastModified}</span>
                          <span>{dataset.versions} versions</span>
                        </div>
                      </motion.div>
                    ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  )
}

