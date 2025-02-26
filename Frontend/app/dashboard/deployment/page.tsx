"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Cloud, Server, Key, AlertTriangle, Check } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"

export default function DeploymentPage() {
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const { currentTheme } = useTheme()

  const handleDeploy = () => {
    setIsDeploying(true)
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Deployment Hub
        </h1>
        <Button variant="outline" className="gap-2">
          <Key className="w-4 h-4" /> Manage API Keys
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle>Deploy Model</CardTitle>
            <CardDescription>Configure and deploy your fine-tuned model</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Model Version</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="llama-7b-finance-v1">llama-7b-finance-v1</SelectItem>
                    <SelectItem value="mistral-7b-health-v2">mistral-7b-health-v2</SelectItem>
                    <SelectItem value="falcon-7b-legal-v1">falcon-7b-legal-v1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Deployment Provider</label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aws">AWS</SelectItem>
                    <SelectItem value="gcp">Google Cloud</SelectItem>
                    <SelectItem value="azure">Azure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <h4 className="font-medium">Configuration</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Auto-scaling</label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">High Availability</label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Request Logging</label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-400 to-cyan-300 hover:from-blue-500 hover:to-cyan-400"
              onClick={handleDeploy}
              disabled={!selectedModel || !selectedProvider || isDeploying}
            >
              {isDeploying ? (
                <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Cloud className="w-4 h-4 animate-bounce" />
                  Deploying...
                </motion.div>
              ) : (
                <>
                  <Cloud className="w-4 h-4 mr-2" /> Deploy Model
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle>Active Deployments</CardTitle>
            <CardDescription>Monitor and manage your deployed models</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">llama-7b-finance-v1</h4>
                      <p className="text-sm text-muted-foreground">aws-us-east-1</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    <Check className="w-3 h-3 mr-1" /> Active
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Requests</p>
                    <p className="font-medium">1.2K/hour</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Latency</p>
                    <p className="font-medium">245ms</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Error Rate</p>
                    <p className="font-medium">0.1%</p>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertTitle>Resource Usage Warning</AlertTitle>
                <AlertDescription>
                  You are approaching your Free Tier GPU usage limit. Consider upgrading to avoid service interruption.
                </AlertDescription>
              </Alert>
            </div>

            <Tabs defaultValue="endpoints">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
              </TabsList>
              <TabsContent value="endpoints" className="space-y-4">
                <div className="text-sm font-mono p-2 bg-muted rounded">
                  <p>POST https://api.artintel.ai/v1/models/llama-7b-finance-v1/predict</p>
                  <p className="text-muted-foreground mt-1">API Key Required</p>
                </div>
              </TabsContent>
              <TabsContent value="logs" className="space-y-2">
                <div className="text-sm font-mono p-2 bg-muted rounded">
                  <p className="text-green-500">[INFO] Model deployed successfully</p>
                  <p className="text-muted-foreground">2024-02-23 15:30:45</p>
                </div>
                <div className="text-sm font-mono p-2 bg-muted rounded">
                  <p className="text-blue-500">[INFO] Scaling up instances</p>
                  <p className="text-muted-foreground">2024-02-23 15:30:40</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

