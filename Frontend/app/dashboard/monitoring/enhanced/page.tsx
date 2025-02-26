"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LineChart } from "@tremor/react"
import {
  Activity,
  AlertTriangle,
  Bell,
  Clock,
  Cpu,
  Database,
  HardDrive,
  Heart,
  Plus,
  Settings,
  Zap,
} from "lucide-react"
import { useWebSocket } from "@/hooks/useWebSocket"

// Mock real-time data
const generateMetrics = () => ({
  timestamp: new Date().toISOString(),
  cpu: Math.random() * 100,
  memory: Math.random() * 100,
  latency: Math.random() * 200 + 100,
  requests: Math.random() * 1000,
})

const incidents = [
  {
    id: 1,
    title: "High Latency Detected",
    description: "API response time exceeded threshold of 200ms",
    severity: "warning",
    status: "active",
    timestamp: "2024-02-24T10:30:00Z",
  },
  {
    id: 2,
    title: "Memory Usage Spike",
    description: "Memory usage exceeded 85% threshold",
    severity: "error",
    status: "resolved",
    timestamp: "2024-02-24T09:15:00Z",
  },
]

export default function EnhancedMonitoringPage() {
  const [metrics, setMetrics] = useState<any[]>([])
  const [activeAlerts, setActiveAlerts] = useState(2)
  const [systemHealth, setSystemHealth] = useState(98)
  const [selectedTab, setSelectedTab] = useState("overview")

  // Simulated WebSocket updates
  useWebSocket("metrics", (payload) => {
    setMetrics((prev) => [...prev.slice(-29), payload])
  })

  // Initialize with some data
  useEffect(() => {
    const initialData = Array.from({ length: 30 }, () => generateMetrics())
    setMetrics(initialData)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics((prev) => [...prev.slice(-29), generateMetrics()])
      setSystemHealth(Math.random() * 2 + 97) // Random health between 97-99%
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Enhanced Monitoring
        </h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            New Dashboard
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Configure Alerts
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{systemHealth.toFixed(1)}%</div>
            <p className="text-sm text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeAlerts}</div>
            <p className="text-sm text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156ms</div>
            <p className="text-sm text-muted-foreground">Avg. over last hour</p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Request Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">342/s</div>
            <p className="text-sm text-muted-foreground">Current throughput</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
              <CardHeader>
                <CardTitle>Real-Time Metrics</CardTitle>
                <CardDescription>System performance over the last 30 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={metrics}
                  index="timestamp"
                  categories={["cpu", "memory", "latency"]}
                  colors={["blue", "cyan", "violet"]}
                  valueFormatter={(value) => `${value.toFixed(2)}`}
                  yAxisWidth={40}
                  className="h-72"
                />
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
              <CardHeader>
                <CardTitle>Active Incidents</CardTitle>
                <CardDescription>Current system alerts and issues</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  <div className="space-y-4">
                    {incidents.map((incident) => (
                      <Alert key={incident.id} variant={incident.severity === "error" ? "destructive" : "default"}>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="flex items-center gap-2">
                          {incident.title}
                          <Badge variant={incident.status === "active" ? "destructive" : "secondary"}>
                            {incident.status}
                          </Badge>
                        </AlertTitle>
                        <AlertDescription className="mt-2">
                          <p>{incident.description}</p>
                          <p className="text-sm mt-2 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(incident.timestamp).toLocaleString()}
                          </p>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
            <CardHeader>
              <CardTitle>System Components</CardTitle>
              <CardDescription>Status of individual system components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      <span className="font-medium">Database Cluster</span>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Healthy
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Connection Pool</span>
                      <span>24/50</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "48%" }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span className="font-medium">Compute Nodes</span>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Healthy
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>65%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "65%" }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4" />
                      <span className="font-medium">Storage</span>
                    </div>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                      Warning
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Disk Usage</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: "85%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>Configure monitoring thresholds and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-medium">Response Time Alerts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Warning Threshold</label>
                        <p className="text-sm text-muted-foreground">Alert when response time exceeds</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="number" className="w-24" defaultValue="200" />
                        <span className="text-sm text-muted-foreground">ms</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Critical Threshold</label>
                        <p className="text-sm text-muted-foreground">Alert when response time exceeds</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="number" className="w-24" defaultValue="500" />
                        <span className="text-sm text-muted-foreground">ms</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Email Notifications</label>
                        <p className="text-sm text-muted-foreground">Send alerts via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium">Slack Notifications</label>
                        <p className="text-sm text-muted-foreground">Send alerts to Slack channel</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

