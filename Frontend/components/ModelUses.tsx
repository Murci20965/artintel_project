"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileUp, Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { theme } from "@/lib/theme"

const ModelUses = () => {
  const [activeTab, setActiveTab] = useState("chat")

  const tabs = [
    { id: "chat", label: "Chat" },
    { id: "code", label: "Code Generation" },
    { id: "analysis", label: "Data Analysis" },
  ]

  const features = {
    chat: (
      <Card className="max-w-3xl w-full mx-auto bg-card">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground">Maria Gonzalez</CardTitle>
          <CardDescription>You are chatting with a support agent.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/user.jpg" alt="User" />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="font-medium text-sm text-muted-foreground leading-none">You · 2:39pm</p>
                <p className="text-foreground">Hi. My order hasn't arrived yet. Can you help me?</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Support Agent" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="font-medium text-sm text-muted-foreground leading-none">
                  Alex Johnson (Support) · 2:40pm
                </p>
                <p className="text-foreground">
                  Hi Maria. I'm sorry to hear that. Let me check your order status. What's your order number?
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border">
          <form className="flex w-full items-center space-x-2">
            <Button size="icon" variant="ghost" className="rounded-full">
              <FileUp className="h-6 w-6" />
              <span className="sr-only">Attach</span>
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Smile className="h-6 w-6" />
              <span className="sr-only">Emoji</span>
            </Button>
            <Input id="message" placeholder="Type your message..." className="flex-1" autoComplete="off" />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    ),
    code: (
      <Card className="max-w-3xl w-full mx-auto bg-card">
        <CardHeader>
          <CardTitle>Code Generation</CardTitle>
          <CardDescription>Generate code snippets based on your requirements.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Describe the code you need..." />
            <Button className="w-full">Generate Code</Button>
          </div>
        </CardContent>
        <CardFooter>
          <pre className="w-full bg-muted p-4 rounded-md">
            <code className="text-sm text-foreground">
              {`// Generated code will appear here
function exampleFunction() {
  console.log("Hello, world!");
}`}
            </code>
          </pre>
        </CardFooter>
      </Card>
    ),
    analysis: (
      <Card className="max-w-3xl w-full mx-auto bg-card">
        <CardHeader>
          <CardTitle>Data Analysis</CardTitle>
          <CardDescription>Analyze your data with AI-powered insights.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input type="file" />
            <Button className="w-full">Analyze Data</Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full bg-muted p-4 rounded-md">
            <p className="text-sm text-muted-foreground">Analysis results will appear here...</p>
          </div>
        </CardFooter>
      </Card>
    ),
  }

  return (
    <div className={`min-h-screen ${theme.light.background} dark:${theme.dark.background} `}>
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-foreground"
        >
          Features
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex rounded-md shadow-sm">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </motion.div>
        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {features[activeTab as keyof typeof features]}
        </motion.div>
      </div>
    </div>
  )
}

export default ModelUses

