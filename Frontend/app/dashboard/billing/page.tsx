"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, DollarSign, Zap, Package, AlertTriangle, ChevronRight, Download } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals and small projects",
    features: [
      "Access to models ≤7B parameters",
      "Limited datasets (up to 100MB)",
      "Basic monitoring",
      "Community support",
    ],
    limits: {
      models: "Up to 7B",
      storage: "100MB",
      requests: "1000/month",
    },
  },
  {
    name: "Advance",
    price: "Custom",
    description: "For growing teams and applications",
    features: [
      "Access to models up to 13B",
      "Advanced datasets (up to 1GB)",
      "Advanced monitoring",
      "Email support",
      "Team collaboration",
    ],
    limits: {
      models: "Up to 13B",
      storage: "1GB",
      requests: "10000/month",
    },
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Access to all models",
      "Unlimited datasets",
      "Advanced security",
      "24/7 support",
      "Custom deployment",
      "SLA guarantee",
    ],
    limits: {
      models: "Unlimited",
      storage: "Unlimited",
      requests: "Unlimited",
    },
  },
]

const mockUsage = {
  currentPlan: "Pro",
  billing: {
    nextBilling: "March 24, 2024",
    amount: "$1259.00",
  },
  usage: {
    apiCalls: {
      used: 7500,
      limit: 10000,
      percentage: 75,
    },
    storage: {
      used: 750,
      limit: 1000,
      percentage: 75,
    },
    compute: {
      used: 15,
      limit: 20,
      percentage: 75,
    },
  },
  recentInvoices: [
    {
      id: "INV-001",
      date: "Feb 24, 2024",
      amount: "$3049.00",
      status: "Paid",
    },
    {
      id: "INV-002",
      date: "Jan 24, 2024",
      amount: "$2049.00",
      status: "Paid",
    },
    {
      id: "INV-003",
      date: "Dec 24, 2023",
      amount: "$1349.00",
      status: "Paid",
    },
  ],
}

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState(mockUsage.currentPlan)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpgrade = async (plan: string) => {
    setIsUpdating(true)
    try {
      // await api.billing.upgrade(plan)
      setCurrentPlan(plan)
    } catch (error) {
      console.error("Failed to upgrade plan:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Billing & Usage
        </h1>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download Invoice
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{currentPlan}</div>
            <p className="text-sm text-muted-foreground">Next billing: {mockUsage.billing.nextBilling}</p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              API Calls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                {mockUsage.usage.apiCalls.used.toLocaleString()} / {mockUsage.usage.apiCalls.limit.toLocaleString()}
              </span>
              <span>{mockUsage.usage.apiCalls.percentage}%</span>
            </div>
            <Progress value={mockUsage.usage.apiCalls.percentage} />
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Monthly Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockUsage.billing.amount}</div>
            <p className="text-sm text-muted-foreground">Current billing period</p>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="success" className="bg-green-500/10 text-green-500">
              Active
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">Visa ending in 4242</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
        <CardHeader>
          <CardTitle>Usage Overview</CardTitle>
          <CardDescription>Monitor your resource usage and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage Usage</span>
                <span>
                  {mockUsage.usage.storage.used}MB / {mockUsage.usage.storage.limit}MB
                </span>
              </div>
              <Progress value={mockUsage.usage.storage.percentage} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Compute Hours</span>
                <span>
                  {mockUsage.usage.compute.used}h / {mockUsage.usage.compute.limit}h
                </span>
              </div>
              <Progress value={mockUsage.usage.compute.percentage} />
            </div>

            {mockUsage.usage.storage.percentage > 80 && (
              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>
                  You are approaching your storage limit. Consider upgrading your plan.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Choose the plan that best fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} className="relative">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.name === currentPlan
                        ? "bg-primary/20 text-primary"
                        : "bg-gradient-to-r from-blue-400 to-cyan-300 hover:from-blue-500 hover:to-cyan-400"
                    }`}
                    disabled={plan.name === currentPlan || isUpdating}
                    onClick={() => handleUpgrade(plan.name)}
                  >
                    {plan.name === currentPlan ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background/60 backdrop-blur-xl border-primary/20">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>View and download your recent invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsage.recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

