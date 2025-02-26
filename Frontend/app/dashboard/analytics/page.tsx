"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChart, BarChart, DonutChart } from "@tremor/react"
import { Calendar, Download, Filter, BarChart3, PieChart, TrendingUp, Zap } from "lucide-react"
import { addDays, format } from "date-fns"

// Mock data for charts
const usageData = Array.from({ length: 30 }, (_, i) => ({
  date: format(addDays(new Date(2024, 1, 1), i), "MMM dd"),
  apiCalls: Math.floor(Math.random() * 1000) + 500,
  computeHours: Math.floor(Math.random() * 24) + 1,
  storage: Math.floor(Math.random() * 100) + 50,
  cost: Math.floor(Math.random() * 100) + 20,
}))

const modelUsage = [
  { model: "LLaMA-7B", usage: 35 },
  { model: "Mistral-7B", usage: 25 },
  { model: "Falcon-7B", usage: 20 },
  { model: "BERT", usage: 15 },
  { model: "DistilBERT", usage: 5 },
]

const endpointData = [
  {
    endpoint: "/v1/completions",
    calls: "45,678",
    latency: "156ms",
    errors: "0.2%",
    cost: "$123.45",
  },
  {
    endpoint: "/v1/chat",
    calls: "34,567",
    latency: "145ms",
    errors: "0.3%",
    cost: "$98.76",
  },
  {
    endpoint: "/v1/embeddings",
    calls: "23,456",
    latency: "89ms",
    errors: "0.1%",
    cost: "$67.89",
  },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 1, 1),
    to: new Date(2024, 1, 30),
  })
  const [selectedMetric, setSelectedMetric] = useState("apiCalls")

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Usage Analytics
        </h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apiCalls">API Calls</SelectItem>
            <SelectItem value="computeHours">Compute Hours</SelectItem>
            <SelectItem value="storage">Storage (GB)</SelectItem>
            <SelectItem value="cost">Cost ($)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Total API Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">103.7k</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              +12.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Compute Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">342h</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              +8.7% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Storage Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.2TB</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              +15.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Monthly Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$2,847</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              +10.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle>Usage Over Time</CardTitle>
            <CardDescription>Daily {selectedMetric} usage for the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={usageData}
              index="date"
              categories={[selectedMetric]}
              colors={["blue"]}
              className="h-72"
              showLegend={false}
            />
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle>Model Distribution</CardTitle>
            <CardDescription>Usage distribution across different models</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={modelUsage}
              category="usage"
              index="model"
              colors={["blue", "cyan", "indigo", "violet", "purple"]}
              className="h-72"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
        <CardHeader>
          <CardTitle>Resource Utilization</CardTitle>
          <CardDescription>Breakdown of resource usage by type</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={usageData}
            index="date"
            categories={["computeHours", "storage"]}
            colors={["blue", "cyan"]}
            className="h-72"
          />
        </CardContent>
      </Card>

      <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
        <CardHeader>
          <CardTitle>Endpoint Analytics</CardTitle>
          <CardDescription>Detailed breakdown of API endpoint usage</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead>Total Calls</TableHead>
                <TableHead>Avg. Latency</TableHead>
                <TableHead>Error Rate</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpointData.map((endpoint) => (
                <TableRow key={endpoint.endpoint}>
                  <TableCell className="font-medium">{endpoint.endpoint}</TableCell>
                  <TableCell>{endpoint.calls}</TableCell>
                  <TableCell>{endpoint.latency}</TableCell>
                  <TableCell>{endpoint.errors}</TableCell>
                  <TableCell className="text-right">{endpoint.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

