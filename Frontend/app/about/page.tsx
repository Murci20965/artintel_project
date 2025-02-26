"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const About: FC = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-foreground"
        >
          About Artintel LLMs
        </motion.h1>

        {/* Section: Democratizing Enterprise AI */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16 border border-border rounded-lg p-8 bg-card"
        >
          <h2 className="text-3xl font-semibold mb-4 text-foreground">Democratizing Enterprise AI</h2>
          <p className="text-xl mb-4 text-muted-foreground">
            A No-Code Platform for Language Model Discovery, Fine-Tuning & Seamless Deployment
          </p>
          <p className="mb-4 text-muted-foreground">
            Empowering enterprises to harness open-source AI models with simplicity and confidence.
          </p>

          <div className="bg-muted h-64 mb-8 flex items-center justify-center rounded-lg">
            [Placeholder for Hero Image/Video]
          </div>

          <p className="mb-4 text-muted-foreground">
            In today's fast-paced digital landscape, businesses across industries—finance, healthcare, customer support,
            and more—are looking for AI solutions that are not only powerful but also tailored to their specific needs.
          </p>
          <p className="mb-4 text-muted-foreground">
            Our solution enables companies to fine-tune Large Language Models (LLMs) and Small Language Models (SLMs) to
            align with their unique data, workflows, and compliance requirements.
          </p>
        </motion.section>

        {/* Section: Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold mb-4 text-foreground">Introduction</h2>
          <p className="mb-4 text-muted-foreground">
            Artintel LLMs is a cutting-edge platform designed to simplify the adoption of open-source large language
            models (LLMs) and small language models (SLMs) for enterprises.
          </p>
          <p className="mb-4 text-muted-foreground">
            With robust tools for model comparison, secure fine-tuning, and seamless integration, Artintel bridges the
            gap between advanced AI capabilities and enterprise readiness.
          </p>
        </motion.section>

        {/* Section: What We Do */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold mb-4 text-foreground">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Model Access",
                description: "Offering access to powerful, transparent, open-source LLM/SLM alternatives.",
              },
              {
                title: "Fine-tuning & Deployment",
                description:
                  "Facilitate easy fine-tuning & deployment of LLMs/SLMs to meet unique industry or operational needs.",
              },
              {
                title: "Tailored Solutions",
                description:
                  "Empower organizations to create tailored solutions that drive better performance and user satisfaction.",
              },
              {
                title: "Innovation",
                description:
                  "Encourage cutting-edge AI solutions across diverse fields like automation, customer service, and healthcare.",
              },
            ].map(({ title, description }) => (
              <Card key={title} className="bg-card border border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Section: Our Goals */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold mb-4 text-foreground">Our Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Rapid Experimentation",
                description:
                  "Provide a supportive environment for rapid experimentation and continuous refinement of AI-driven ideas.",
              },
              {
                title: "Enhance Accessibility",
                description:
                  "Enable businesses with limited AI expertise to tap into powerful LLMs/SLMs without steep learning curves.",
              },
              {
                title: "Cost-Effectiveness",
                description: "Ensure cost-effectiveness by offering affordable AI solutions for smaller enterprises.",
              },
            ].map(({ title, description }) => (
              <Card key={title} className="bg-card border border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Section: The Problem We Solve */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-16 "
        >
          <h2 className="text-3xl font-semibold mb-4 text-foreground">The Problem We Solve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Enterprise Pain Points:</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground">
                <li>Overwhelmed by AI complexity: Model selection, deployment, and compliance.</li>
                <li>High costs and risks of trial-and-error experimentations.</li>
                <li>Lack of expertise to fine-tune models for business-specific needs.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Our Solution:</h3>
              <p className="text-muted-foreground">
                A unified platform for discovery, fine-tuning, and deployment of open-source language models.
              </p>
              <div className="bg-muted h-48 mt-4 flex items-center justify-center rounded-lg">
                [Placeholder for Solution Image/Video]
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Started with Artintel LLMs
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default About

