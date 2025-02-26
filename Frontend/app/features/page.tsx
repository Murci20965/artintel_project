"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Brain,
  Scale,
  Wand2,
  PlugIcon as Pipeline,
  Cloud,
  Shield,
  BarChart3,
  Layers,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ModelCard } from "@/components/model-card-feat"
import { ScrollIndicator } from "@/components/scroll-indicator"

const sections = [
  {
    id: "directory",
    title: "Comprehensive LLM & SLM Directory",
    summary: "Access a curated catalog of state-of-the-art language models, from lightweight SLMs to powerful LLMs.",
    icon: <Brain className="w-6 h-6" />,
    description:
      "At the core of our platform is a curated catalog of both Large Language Models (LLMs) and Small Language Models (SLMs). The directory features popular open-source models, such as Llama-3, Mistral, BERT, and DistilBERT, alongside newer, emerging technologies.",
    whyItMatters: [
      "All-in-One Resource: Consolidates diverse models into one easily searchable space",
      "Choice & Flexibility: Offers cutting-edge solutions as well as lightweight options",
      "Detailed Documentation: Comprehensive guides and API references",
      "Regular Updates: Stay current with the latest model releases",
    ],
    features: ["Performance benchmarks", "Recommended use cases", "Easy documentation access", "Version history"],
  },
  {
    id: "comparison",
    title: "Advanced Model Comparison",
    summary: "Make informed decisions with side-by-side model comparisons across key performance metrics.",
    icon: <Scale className="w-6 h-6" />,
    description:
      "Our powerful comparison tool simplifies model selection by allowing you to filter models by parameters like accuracy, latency, industry focus, and resource requirements.",
    keyHighlights: [
      "Industry-Specific Templates: Quickly spin up solutions for different sectors",
      "Performance-Based Filters: Optimize based on speed, precision, or size",
      "Cost Analysis: Compare running costs and resource requirements",
      "Integration Guides: Step-by-step setup instructions",
    ],
    templates: [
      { name: "Healthcare", use: "Medical record analysis" },
      { name: "Finance", use: "Risk assessment" },
      { name: "Retail", use: "Sentiment analysis" },
      { name: "Legal", use: "Document processing" },
    ],
  },
  {
    id: "fine-tuning",
    title: "Fine-Tuning Process",
    summary: "Optimize AI models with domain-specific data for enhanced performance and accuracy.",
    icon: <Wand2 className="w-6 h-6" />,
    description:
      "Fine-tuning adapts pre-trained models to your specific use case, improving accuracy and relevance while maintaining efficiency.",
    benefits: [
      "Domain-Specific Adaptation",
      "Improved Accuracy",
      "Efficient Resource Utilization",
      "Customizable Model Behavior",
    ],
    workflows: [
      {
        name: "Fine-Tuning Steps",
        steps: [
          "Data Collection",
          "Data Preprocessing",
          "Model Selection",
          "Training with Custom Data",
          "Hyperparameter Tuning",
          "Evaluation & Validation",
          "Deployment & Monitoring",
        ],
      },
    ],
  },

  {
    id: "pipelines",
    title: "Custom Pipelines",
    summary: "Build end-to-end ML workflows with our visual pipeline builder.",
    icon: <Pipeline className="w-6 h-6" />,
    description: "Create custom data processing and training pipelines with our intuitive visual builder.",
    features: ["Flexible Data Sources", "Synthetic Data Tools", "Multi-Task Processing", "Version Control"],
    dataSources: ["CRM Systems", "Data Lakes", "File Systems", "API Endpoints"],
  },
  {
    id: "deployment",
    title: "Seamless Deployment",
    summary: "Deploy models to production with confidence using our automated deployment tools.",
    icon: <Cloud className="w-6 h-6" />,
    description:
      "Deploy your models to any environment with minimal friction, supporting major cloud providers and on-premises setups.",
    highlights: [
      "One-Click Cloud Deployments",
      "On-Prem & Hybrid Options",
      "Real-Time Monitoring",
      "Auto-scaling Support",
    ],
    platforms: [
      { name: "AWS", type: "Cloud" },
      { name: "Azure", type: "Cloud" },
      { name: "GCP", type: "Cloud" },
      { name: "On-Premises", type: "Local" },
    ],
  },
  {
    id: "security",
    title: "Enterprise Security",
    summary: "Protect your models and data with comprehensive security features.",
    icon: <Shield className="w-6 h-6" />,
    description: "Our platform offers GDPR and HIPAA-ready pipelines with enterprise-grade security features.",
    features: ["End-to-end encryption", "Role-based access control", "Audit logging", "Compliance reporting"],
    compliance: ["GDPR", "HIPAA", "SOC2", "ISO 27001"],
  },
  {
    id: "cost",
    title: "Cost Management",
    summary: "Optimize costs and resource utilization with advanced monitoring tools.",
    icon: <BarChart3 className="w-6 h-6" />,
    description: "Track and optimize your AI infrastructure costs with real-time monitoring and alerts.",
    features: ["Real-time cost tracking", "Usage analytics", "Budget alerts", "Resource optimization"],
    metrics: [
      { name: "Compute", trend: "down" },
      { name: "Storage", trend: "up" },
      { name: "API Calls", trend: "stable" },
      { name: "Training", trend: "down" },
    ],
  },
  {
    id: "tiers",
    title: "Flexible Pricing Tiers",
    summary: "Choose the perfect plan for your AI journey, from startups to enterprises.",
    icon: <Layers className="w-6 h-6" />,
    description:
      "Our three-tier structure ensures that everyone has access to the right level of AI power and support.",
    tiers: [
      {
        name: "Free",
        features: ["Access to SLMs", "Model comparisons", "Community support"],
      },
      {
        name: "Advanced",
        features: ["All Free features", "Mid-sized LLMs", "Cloud deployment", "Cost tracking"],
      },
      {
        name: "Enterprise",
        features: ["All Advanced features", "Custom deployments", "Dedicated support", "Advanced security"],
      },
    ],
  },
  {
    id: "ecosystem",
    title: "Complete AI Ecosystem",
    summary: "Access everything you need to build, deploy, and scale AI solutions.",
    icon: <Sparkles className="w-6 h-6" />,
    description:
      "A unified ecosystem that addresses the entire AI lifecycle, from model selection to production deployment.",
    benefits: ["Streamlined workflows", "Integrated tools", "Comprehensive support", "Regular updates"],
    components: ["Model Directory", "Fine-tuning Tools", "Deployment Options", "Security Controls"],
  },
]

const models = [
  { name: "GPT-4", description: "Advanced language model", vendor: "openai" },
  { name: "DALL-E 2", description: "Image generation model", vendor: "openai" },
  { name: "PaLM", description: "Large language model", vendor: "google" },
  // Add more models as needed
]

export default function FeaturesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const [activeSection, setActiveSection] = useState("directory")
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: 0.3,
      },
    )

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative bg-background dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container relative z-10 px-4 py-32 text-center"
        >
          <Badge
            variant="outline"
            className="mb-8 text-primary border-primary dark:text-primary-dark dark:border-primary-dark"
          >
            Enterprise Features
          </Badge>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#008a99] dark:from-primary-dark dark:to-[#00cbdd]"
            animate={{
              letterSpacing: ["0em", "0.02em", "0em"],
            }}
            transition={{
              duration: 4,
              ease: [0.87, 0, 0.13, 1],
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            Power Your AI Journey
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Everything you need to build, deploy, and scale production-ready LLMs and SLMs solutions
          </p>
        </motion.div>
        <ScrollIndicator />
      </section>

      {/* Updated Navigation - Collapsible Side Menu */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
        <motion.nav
          className={`relative ${
            isNavExpanded
              ? "w-64 bg-background/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-gray-800"
              : "w-12"
          } transition-all duration-300 ease-in-out`}
        >
          {/* Collapsed State - Shows only current section icon */}
          <motion.button
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className={`${
              isNavExpanded ? "hidden" : "flex"
            } items-center justify-center w-12 h-12 rounded-full bg-background/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary-dark transition-colors duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sections.find((section) => section.id === activeSection)?.icon}
          </motion.button>

          {/* Expanded State - Full Navigation Menu */}
          <motion.div
            initial={false}
            animate={{
              opacity: isNavExpanded ? 1 : 0,
              height: isNavExpanded ? "auto" : 0,
            }}
            className={`${isNavExpanded ? "block" : "hidden"} p-2`}
          >
            <div className="flex items-center justify-between mb-4 px-2 pt-2">
              <span className="text-sm font-medium dark:text-white">Navigation</span>
              <button
                onClick={() => setIsNavExpanded(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {sections.map((section) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(section.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                    setIsNavExpanded(false)
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                    activeSection === section.id
                      ? "bg-primary/10 text-primary dark:bg-primary-dark/10 dark:text-primary-dark"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {section.icon}
                  <span className="text-sm font-medium whitespace-nowrap">{section.title}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.nav>
      </div>

      {/* Feature Sections */}
      <div className="container px-4 py-16 space-y-32">
        {/* Directory Section */}
        <section id="directory" className="relative min-h-[80vh]">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge
                  variant="outline"
                  className="mb-8 text-primary border-primary dark:text-primary-dark dark:border-primary-dark"
                >
                  Model Directory
                </Badge>
                <h2 className="text-4xl font-bold mb-6 dark:text-white">{sections[0].title}</h2>
                <p className="text-xl text-muted-foreground dark:text-gray-300">{sections[0].description}</p>
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                {sections[0].whyItMatters?.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Brain className="w-5 h-5 text-primary dark:text-primary-dark mt-1" />
                    <p className="text-sm dark:text-gray-300">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {["Llama-3", "Mistral", "BERT", "DistilBERT"].map((model, i) => (
                  <ModelCard
                    key={model}
                    title={model}
                    description="Advanced language model for enterprise use"
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section - Diagonal Layout */}
        <section id="comparison" className="relative min-h-[80vh] transform -skew-y-3">
          <div className="transform skew-y-3">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="sticky top-32"
                >
                  <Badge
                    variant="outline"
                    className="mb-8 text-primary border-primary dark:text-primary-dark dark:border-primary-dark"
                  >
                    Compare Models
                  </Badge>
                  <h2 className="text-4xl font-bold mb-6 dark:text-white">{sections[1].title}</h2>
                  <p className="text-xl text-muted-foreground dark:text-gray-300">{sections[1].description}</p>
                </motion.div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                {sections[1].templates?.map((template, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.1,
                      ease: [0.87, 0, 0.13, 1],
                    }}
                    className="relative bg-background/50 dark:bg-gray-800 backdrop-blur-sm p-8 rounded-[24px] border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{
                        background: [
                          "radial-gradient(circle at 0% 0%, var(--primary) 0%, transparent 50%)",
                          "radial-gradient(circle at 100% 100%, var(--primary) 0%, transparent 50%)",
                        ],
                      }}
                      transition={{
                        duration: 4,
                        ease: [0.87, 0, 0.13, 1],
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary dark:bg-primary" />
                    <div className="relative">
                      <h3 className="text-xl font-semibold mb-4 dark:text-white">{template.name}</h3>
                      <p className="text-muted-foreground dark:text-gray-300">{template.use}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fine-tuning Section - Zigzag Layout */}
        <section id="fine-tuning" className="relative min-h-[80vh]">
          <div className="flex flex-col gap-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge
                variant="outline"
                className="mb-8 text-primary border-primary dark:text-primary-dark dark:border-primary-dark"
              >
                Fine-tuning Studio
              </Badge>
              <h2 className="text-4xl font-bold mb-6 dark:text-white">{sections[2].title}</h2>
              <p className="text-xl text-muted-foreground dark:text-gray-300">{sections[2].description}</p>
            </motion.div>
            <div className="space-y-16">
              {sections[2].workflows?.map((workflow, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${i % 2 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 items-center`}
                >
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-4 dark:text-white">{workflow.name}</h3>
                    <div className="flex gap-4">
                      {workflow.steps.map((step, j) => (
                        <div
                          key={j}
                          className="flex-1 relative bg-background/50 dark:bg-gray-800 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-700"
                        >
                          <div className="absolute -top-3 left-4 bg-primary dark:bg-primary text-primary-foreground text-sm px-2 py-1 rounded-full">
                            Step {j + 1}
                          </div>
                          <p className="mt-4 text-sm dark:text-gray-300">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full lg:w-1/3">
                    <div className="relative bg-background/50 dark:bg-gray-800 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary-dark/5 rounded-2xl" />
                      <div className="relative space-y-4">
                        <h4 className="font-semibold dark:text-white">Workflow Benefits</h4>
                        {sections[2].benefits?.slice(0, 3).map((benefit, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <Brain className="w-4 h-4 text-primary dark:text-primary-dark" />
                            <span className="text-sm dark:text-gray-300">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pipelines Section - Hexagonal Grid */}
        <section id="pipelines" className="relative min-h-[80vh]">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(#00cbdd_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge
              variant="outline"
              className="mb-8 text-primary border-primary dark:text-primary-dark dark:border-primary-dark"
            >
              Custom Pipelines
            </Badge>
            <h2 className="text-4xl font-bold mb-6 dark:text-white">{sections[3].title}</h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300">{sections[3].description}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sections[3].dataSources?.map((source, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: i * 0.1,
                  ease: [0.87, 0, 0.13, 1],
                }}
                className="group relative aspect-square bg-background/50 dark:bg-gray-800 backdrop-blur-sm rounded-[24px] border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-dark/50 transition-all p-6 flex flex-col items-center justify-center text-center overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_100%)]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.1, 0],
                  }}
                  transition={{
                    duration: 4,
                    ease: [0.87, 0, 0.13, 1],
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      ease: [0.87, 0, 0.13, 1],
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Pipeline className="w-8 h-8 text-primary dark:text-primary-dark mb-4" />
                  </motion.div>
                  <h3 className="font-semibold mb-2 dark:text-white">{source}</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    Connect and process data seamlessly
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Deployment Section - Updated with company logos */}
        <section id="deployment" className="relative min-h-[80vh] overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary-dark/5" />
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
              <Badge
                variant="outline"
                className="mb-8 text-primary border-primary dark:text-primary-dark dark:border-primary-dark"
              >
                Deployment
              </Badge>
              <h2 className="text-4xl font-bold mb-6 dark:text-white">{sections[4].title}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{sections[4].description}</p>
              <div className="space-y-4">
                {sections[4].highlights?.map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Brain className="w-5 h-5 text-primary dark:text-primary-dark" />
                    <span className="dark:text-gray-300">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { name: "AWS", logo: "/placeholder.svg?height=80&width=160" },
                { name: "Azure", logo: "/placeholder.svg?height=80&width=160" },
                { name: "GCP", logo: "/placeholder.svg?height=80&width=160" },
                { name: "On-Premises", logo: "/placeholder.svg?height=80&width=160" },
              ].map((platform, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-dark/50 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary-dark/5 rounded-2xl" />
                  <div className="relative flex flex-col items-center">
                    <img
                      src={platform.logo || "/placeholder.svg"}
                      alt={`${platform.name} logo`}
                      className="h-20 w-40 object-contain mb-4"
                    />
                    <h3 className="font-semibold dark:text-white">{platform.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section - Radial Layout */}
        <section id="security" className="relative min-h-[80vh]">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00cbdd1a_0,transparent_100%)]" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge
              variant="outline"
              className="mb-8 text-primary border-primary dark:text-primary-dark dark:border-primary-dark"
            >
              Security
            </Badge>
            <h2 className="text-4xl font-bold mb-6 dark:text-white">{sections[5].title}</h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300">{sections[5].description}</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sections[5].compliance?.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-square bg-background/50 dark:bg-gray-800 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary-dark/5 rounded-full" />
                <div className="relative text-center">
                  <Shield className="w-8 h-8 text-primary dark:text-primary-dark mx-auto mb-2" />
                  <p className="font-semibold dark:text-white">{cert}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cost Management Section - Timeline Layout */}
        <section id="cost" className="relative min-h-[80vh]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
              <Badge
                variant="outline"
                className="mb-8 text-primary border-primary dark:text-primary-dark dark:border-primary-dark"
              >
                Cost Management
              </Badge>
              <h2 className="text-4xl font-bold mb-6 dark:text-white">{sections[6].title}</h2>
              <p className="text-xl text-muted-foreground dark:text-gray-300">{sections[6].description}</p>
            </motion.div>
            <div className="space-y-8">
              {sections[6].metrics?.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative bg-background/50 dark:bg-gray-800 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary dark:bg-primary rounded-l-full" />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1 dark:text-white">{metric.name}</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">Trending {metric.trend}</p>
                    </div>
                    <BarChart3
                      className={`w-6 h-6 ${
                        metric.trend === "down"
                          ? "text-green-500"
                          : metric.trend === "up"
                            ? "text-red-500"
                            : "text-yellow-500"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tiers Section - Fixed spacing */}
        <section id="tiers" className="relative min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge
              variant="outline"
              className="mb-8 text-primary border-primary dark:text-primary-dark dark:border-primary-dark"
            >
              Pricing Tiers
            </Badge>
            <h2 className="text-4xl font-bold mb-6 dark:text-white">{sections[7].title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{sections[7].description}</p>
          </motion.div>
          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections[7].tiers?.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-dark/50 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary-dark/5 rounded-2xl" />
                  <div className="relative text-center">
                    <Layers className="w-12 h-12 text-primary dark:text-primary-dark mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">{tier.name}</h3>
                    <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-center justify-center gap-2">
                          <Brain className="w-4 h-4 text-primary dark:text-primary-dark" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Section - Fixed spacing */}
        <section id="ecosystem" className="relative min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge
              variant="outline"
              className="mb-8 text-primary border-primary dark:text-primary-dark dark:border-primary-dark"
            >
              Ecosystem
            </Badge>
            <h2 className="text-4xl font-bold mb-6 dark:text-white">{sections[8].title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{sections[8].description}</p>
          </motion.div>
          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections[8].components?.map((component, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary-dark/50 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary-dark/5 rounded-2xl" />
                  <div className="relative text-center">
                    <Sparkles className="w-12 h-12 text-primary dark:text-primary-dark mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">{component}</h3>
                    <p className="text-gray-600 dark:text-gray-300">Integrated solution for your AI workflow</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

