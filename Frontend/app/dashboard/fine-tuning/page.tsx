"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { LineChart, BarChart } from "@tremor/react"
import { Play, Pause, Save, AlertTriangle, Settings, Database, Cpu } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"
import { api } from "@/lib/api"

const mockTrainingData = Array.from({ length: 50 }, (_, i) => ({
  epoch: i + 1,
  loss: Math.max(0.1, 1 - i * 0.02 + Math.random() * 0.1),
  accuracy: Math.min(0.98, 0.5 + i * 0.01 + Math.random() * 0.05),
  validation_loss: Math.max(0.15, 1.1 - i * 0.02 + Math.random() * 0.1),
  validation_accuracy: Math.min(0.95, 0.45 + i * 0.01 + Math.random() * 0.05),
}))

export default function FineTuningStudio() {
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedDataset, setSelectedDataset] = useState("")
  const [epochs, setEpochs] = useState(10)
  const [batchSize, setBatchSize] = useState(32)
  const [learningRate, setLearningRate] = useState(0.001)
  const [isTraining, setIsTraining] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("configuration")
  const { currentTheme } = useTheme()

  const handleStartTraining = async () => {
    try {
      setIsTraining(true)
      setProgress(0)

      const config = {
        model: selectedModel,
        dataset: selectedDataset,
        epochs,
        batchSize,
        learningRate,
      }

      await api.training.start(config)

      // Simulate training progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsTraining(false)
            return 100
          }
          return prev + 1
        })
      }, 500)
    } catch (error) {
      console.error("Training failed:", error)
      setIsTraining(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Fine-Tuning Studio
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setActiveTab("configuration")}>
            <Settings className="w-4 h-4" /> Configuration
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => setActiveTab("monitoring")}>
            <Cpu className="w-4 h-4" /> Monitoring
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsContent value="configuration">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" /> Model & Dataset
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Base Model</label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="llama-7b">LLaMA 7B</SelectItem>
                        <SelectItem value="mistral-7b">Mistral 7B</SelectItem>
                        <SelectItem value="falcon-7b">Falcon 7B</SelectItem>
                        <SelectItem value="phi-2">Phi-2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Dataset</label>
                    <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a dataset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance">Finance Dataset</SelectItem>
                        <SelectItem value="healthcare">Healthcare Dataset</SelectItem>
                        <SelectItem value="legal">Legal Dataset</SelectItem>
                        <SelectItem value="custom">Custom Dataset</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" /> Training Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Number of Epochs</label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[epochs]}
                        onValueChange={([value]) => setEpochs(value)}
                        max={50}
                        min={1}
                        step={1}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{epochs}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Batch Size</label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[batchSize]}
                        onValueChange={([value]) => setBatchSize(value)}
                        max={128}
                        min={8}
                        step={8}
                        className="flex-1"
                      />
                      <span className="w-12 text-center">{batchSize}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Learning Rate</label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[learningRate * 1000]}
                        onValueChange={([value]) => setLearningRate(value / 1000)}
                        max={10}
                        min={0.1}
                        step={0.1}
                        className="flex-1"
                      />
                      <span className="w-16 text-center">{learningRate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch id="advanced" />
                      <label htmlFor="advanced" className="text-sm font-medium">
                        Advanced Options
                      </label>
                    </div>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Enterprise Tier
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-background/60 backdrop-blur-xl border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Estimated Resources</h3>
                  <p className="text-sm text-muted-foreground">Based on your configuration</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">GPU Hours</div>
                    <div className="text-2xl font-bold text-primary">4.5</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Est. Cost</div>
                    <div className="text-2xl font-bold text-primary">$12.80</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-4">
            <Button
              className="flex-1 bg-gradient-to-r from-blue-400 to-cyan-300 hover:from-blue-500 hover:to-cyan-400"
              onClick={handleStartTraining}
              disabled={!selectedModel || !selectedDataset || isTraining}
            >
              {isTraining ? (
                <>
                  <Pause className="w-4 h-4 mr-2" /> Pause Training
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" /> Start Training
                </>
              )}
            </Button>
            <Button variant="outline" className="gap-2" disabled={!isTraining}>
              <Save className="w-4 h-4" /> Save Checkpoint
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
              <CardHeader>
                <CardTitle>Training Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isTraining ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>

                    <div className="h-[300px]">
                      <LineChart
                        data={mockTrainingData}
                        index="epoch"
                        categories={["loss", "validation_loss"]}
                        colors={["blue", "cyan"]}
                        valueFormatter={(value) => value.toFixed(4)}
                        yAxisWidth={60}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <Play className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Ready to Train</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure your training parameters and click Start Training
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
              <CardHeader>
                <CardTitle>Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isTraining ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Current Loss</div>
                        <div className="text-2xl font-bold">0.245</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Validation Loss</div>
                        <div className="text-2xl font-bold">0.312</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Training Accuracy</div>
                        <div className="text-2xl font-bold">87.5%</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Validation Accuracy</div>
                        <div className="text-2xl font-bold">85.2%</div>
                      </div>
                    </div>

                    <div className="h-[300px]">
                      <BarChart
                        data={mockTrainingData.slice(-10)}
                        index="epoch"
                        categories={["accuracy", "validation_accuracy"]}
                        colors={["blue", "cyan"]}
                        valueFormatter={(value) => `${(value * 100).toFixed(1)}%`}
                        yAxisWidth={60}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <Cpu className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">No Active Training</h3>
                      <p className="text-sm text-muted-foreground">Metrics will appear here once training begins</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

