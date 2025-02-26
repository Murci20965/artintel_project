"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Book, Code, Terminal, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const DocsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const sections = [
    {
      title: "Getting Started",
      icon: <Book className="h-6 w-6" />,
      items: [
        { title: "Quick Start Guide", href: "/docs/quickstart" },
        { title: "Installation", href: "/docs/installation" },
        { title: "Basic Concepts", href: "/docs/concepts" },
      ],
    },
    {
      title: "API Reference",
      icon: <Code className="h-6 w-6" />,
      items: [
        { title: "Authentication", href: "/docs/api/auth" },
        { title: "Endpoints", href: "/docs/api/endpoints" },
        { title: "Error Handling", href: "/docs/api/errors" },
      ],
    },
    {
      title: "CLI Tools",
      icon: <Terminal className="h-6 w-6" />,
      items: [
        { title: "Command Reference", href: "/docs/cli/commands" },
        { title: "Configuration", href: "/docs/cli/config" },
        { title: "Plugins", href: "/docs/cli/plugins" },
      ],
    },
    {
      title: "Advanced Features",
      icon: <Zap className="h-6 w-6" />,
      items: [
        { title: "Model Training", href: "/docs/advanced/training" },
        { title: "Custom Deployments", href: "/docs/advanced/deployments" },
        { title: "Performance Tuning", href: "/docs/advanced/performance" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
          <p className="text-lg text-muted-foreground">Everything you need to build with Artintelllms</p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary">{section.icon}</div>
                    <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DocsPage

