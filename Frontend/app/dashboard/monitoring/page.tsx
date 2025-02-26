"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell, AlertTriangle, Activity, Clock, DollarSign, ArrowUpRight } from "lucide-react"
import { LineChart, BarChart, AreaChart } from "@tremor/react"

const performanceData = [
  { timestamp: "00:00", latency: 150, requests: 100, errors: 2, cost: 0.5 },
  { timestamp: "04:00", latency: 180, requests: 150, errors: 3, cost: 0.75 },
  { timestamp: "08:00", latency: 220, requests: 300, errors: 5, cost: 1.5 },
  { timestamp: "12:00", latency: 160, requests: 450, errors: 4, cost: 2.25 },
  { timestamp: "16:00", latency: 140, requests: 380, errors: 3, cost: 1.9 },
  { timestamp: "20:00", latency: 130, requests: 200, errors: 2, cost: 1.0 },
]

const alerts = [
  {
    id: 1,
    title: "High Latency Detected",
    description: "Average latency exceeded 200ms threshold",
    severity: "warning",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Error Rate Spike",
    description: "Error rate increased by 150% in the last hour",
    severity: "error",
    time: "45 minutes ago",
  },
]

export default function MonitoringDashboard() {
  const [activeTab, setActiveTab] = useState("performance")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Monitoring Dashboard
        </h1>
        <Button className="bg-gradient-to-r from-blue-400 to-cyan-300 hover:from-blue-500 hover:to-cyan-400">
          <Bell className="w-4 h-4 mr-2" />
          Configure Alerts
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Average Latency" value="156ms" change="+12%" icon={Clock} trend="up" />
        <MetricCard title="Request Rate" value="342/min" change="+28%" icon={Activity} trend="up" />
        <MetricCard title="Error Rate" value="0.8%" change="-3%" icon={AlertTriangle} trend="down" />
        <MetricCard title="Cost/Hour" value="$1.85" change="+15%" icon={DollarSign} trend="up" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={performanceData}
                index="timestamp"
                categories={["latency", "requests"]}
                colors={["cyan", "blue"]}
                yAxisWidth={40}
                className="h-72"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Resource Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={performanceData}
                index="timestamp"
                categories={["requests"]}
                colors={["blue"]}
                yAxisWidth={40}
                className="h-72"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Cost Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={performanceData}
                index="timestamp"
                categories={["cost"]}
                colors={["cyan"]}
                yAxisWidth={40}
                className="h-72"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Input placeholder="Search logs..." className="flex-1" />
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <Alert key={alert.id} variant={alert.severity === "error" ? "destructive" : "default"}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="flex items-center gap-2">
                    {alert.title}
                    <Badge variant="outline" className="ml-2">
                      {alert.time}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({ title, value, change, icon: Icon, trend }) {
  const isPositive = trend === "up"
  const changeColor = isPositive ? "text-red-500" : "text-green-500"

  return (
    <Card className="bg-background/80 backdrop-blur">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <ArrowUpRight className={`w-4 h-4 ${changeColor}`} />
          <span className={`text-sm ${changeColor}`}>{change}</span>
        </div>
      </CardContent>
    </Card>
  )
}

