"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, AlertTriangle } from "lucide-react"

const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "art_prod_1234567890",
    created: "2024-02-20",
    lastUsed: "2024-02-23",
  },
  {
    id: 2,
    name: "Development API Key",
    key: "art_dev_0987654321",
    created: "2024-02-15",
    lastUsed: "2024-02-22",
  },
]

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Developer",
    status: "pending",
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [copiedKey, setCopiedKey] = useState<number | null>(null)

  const copyApiKey = (id: number, key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Settings
        </h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Two-Factor Authentication</Label>
                  <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-4">
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for accessing Artintel services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Your API Keys</h3>
                  <p className="text-sm text-muted-foreground">
                    Keep your API keys secure. Don't share them in public places.
                  </p>
                </div>
                <Button>Create New Key</Button>
              </div>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-background/40"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{apiKey.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <code className="px-2 py-1 rounded bg-secondary">{apiKey.key}</code>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => copyApiKey(apiKey.id, apiKey.key)}>
                        {copiedKey === apiKey.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button variant="destructive" size="icon">
                        <AlertTriangle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Billing & Plan</CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4 bg-background/40">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Current Plan: Free Tier</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Access to models ≤7B parameters, limited datasets, basic monitoring
                    </p>
                  </div>
                  <Badge variant="secondary">Free</Badge>
                </div>
                <Button className="mt-4 w-full bg-gradient-to-r from-blue-400 to-cyan-300 hover:from-blue-500 hover:to-cyan-400">
                  Upgrade Plan
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Usage This Month</h3>
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-4 rounded-lg border bg-background/40">
                    <div>
                      <p className="font-medium">API Calls</p>
                      <p className="text-sm text-muted-foreground">1,234 / 5,000 calls</p>
                    </div>
                    <div className="w-32 h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="w-1/4 h-full bg-blue-400" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg border bg-background/40">
                    <div>
                      <p className="font-medium">Storage</p>
                      <p className="text-sm text-muted-foreground">2.1 GB / 10 GB</p>
                    </div>
                    <div className="w-32 h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="w-1/5 h-full bg-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage team members and their access levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Team Members</h3>
                  <p className="text-sm text-muted-foreground">Invite and manage team members</p>
                </div>
                <Button>Invite Member</Button>
              </div>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-background/40"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>{member.status}</Badge>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about your account via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Slack Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts in your Slack workspace</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Performance Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about significant performance changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

