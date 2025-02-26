"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { PixelCanvas } from "@/components/ui/pixel-canvas"
import { Send, User, Mail, MessageSquare } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const { theme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted", { name, email, message })
    // Here you would typically send the form data to your backend
  }

  const catchyLines = [
    "Shape the future of AI with us",
    "Unleash the power of next-gen LLMs",
    "Join the AI revolution",
    "Transforming industries, one model at a time",
  ]

  return (
    <div className={`min-h-screen bg-background  text-foreground pt-5 relative overflow-hidden`}>
      <PixelCanvas
        gap={20}
        speed={30}
        colors={["#00f2fe", "#4facfe", "#00f2fe"]}
        variant="icon"
        className="absolute inset-0 opacity-30"
      />
      <div className="container mx-auto px-1 py-12 max-w-4xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 bg-primary  bg-clip-text text-primary">The Future of AI is Here</h2>
            <ul className="space-y-4">
              {catchyLines.map((line, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center text-lg text-muted-foreground"
                >
                  <span className="text-secondary mr-2">•</span> {line}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/50 backdrop-blur-md border-border">
              <CardContent className="p-6">
                <img src="/Icon - PNG.png" alt="Contact" width={20} height={20} />
                <h1 className="text-3xl font-bold mb-2 bg-secondary  bg-clip-text text-transparent">Contact Us</h1>
                <p className="text-muted-foreground mb-6">We'd love to hear from you. Send us a message.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-background border-border text-foreground placeholder-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background border-border text-foreground placeholder-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-muted-foreground flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={6}
                      className="bg-background border-border text-foreground placeholder-muted-foreground"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

