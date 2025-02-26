"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GlowingEffect } from "@/components/ui/glowing-effect"

// Industry data structure
interface SubIndustry {
  title: string
  useCases: Array<{
    title: string
    description: string
  }>
}

interface Industry {
  id: string
  title: string
  summary: string
  useCases: Array<{
    title: string
    description: string
  }>
  subIndustries?: SubIndustry[]
  transition?: string
}

// Industry data from the provided text
const industries: Industry[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    summary:
      "From patient care to research, healthcare organizations leverage AI to improve clinical outcomes and reduce administrative burdens.",
    useCases: [
      {
        title: "Patient Record Analysis",
        description: "Extract actionable insights from Electronic Health Records (EHRs).",
      },
      {
        title: "Diagnosis Support",
        description: "Analyze symptoms and suggest potential treatments",
      },
      {
        title: "Drug Discovery",
        description: "Accelerate research with automated literature synthesis",
      },
      {
        title: "Clinical Trial Matching",
        description: "Pinpoint eligible patients using structured/unstructured data",
      },
      {
        title: "Virtual Health Assistants",
        description: "Answer patient queries about medications or appointments",
      },
      {
        title: "Medical Coding Automation",
        description: "Convert doctor notes into billing codes (ICD-10)",
      },
      {
        title: "Epidemiology Tracking",
        description: "Predict disease spread using public health data",
      },
      {
        title: "Mental Health Chatbots",
        description: "Offer preliminary counseling and crisis support",
      },
    ],
  },
  {
    id: "finance",
    title: "Finance",
    summary:
      "Financial institutions benefit from AI in risk assessment, fraud detection, and personalized customer experiences.",
    useCases: [
      {
        title: "Fraud Detection",
        description: "Monitor transactions in real time to spot anomalies",
      },
      {
        title: "Credit Scoring",
        description: "Assess borrower risk using traditional and alternative data",
      },
      {
        title: "Algorithmic Trading",
        description: "Predict market trends by analyzing news and social media",
      },
      {
        title: "Regulatory Reporting",
        description: "Automate compliance tasks for SEC/FINRA filings",
      },
      {
        title: "Personalized Wealth Management",
        description: "Generate investment strategies tailored to individual needs",
      },
      {
        title: "Customer Sentiment Analysis",
        description: "Track feedback from calls and emails to improve services",
      },
      {
        title: "Loan Underwriting",
        description: "Automate verification of documents like tax returns",
      },
      {
        title: "ESG Reporting",
        description: "Parse corporate disclosures for sustainability metrics",
      },
    ],
  },
  {
    id: "retail",
    title: "Retail",
    summary:
      "Retailers use AI to optimize inventory, personalize shopping experiences, and improve supply chain efficiency.",
    useCases: [
      {
        title: "Inventory Optimization",
        description: "Predict demand to minimize stockouts and overstocking",
      },
      {
        title: "Personalized Recommendations",
        description: "Suggest products based on browsing history and purchase patterns",
      },
      {
        title: "Price Optimization",
        description: "Adjust prices dynamically based on competitor data",
      },
      {
        title: "Chatbots for Customer Service",
        description: "Answer FAQs and resolve issues via automated chat",
      },
      {
        title: "Visual Search",
        description: "Allow customers to find products using images",
      },
      {
        title: "Supply Chain Optimization",
        description: "Improve logistics and reduce transportation costs",
      },
      {
        title: "Fraud Prevention",
        description: "Detect fraudulent transactions and prevent losses",
      },
      {
        title: "Loyalty Program Management",
        description: "Personalize rewards and incentives for loyal customers",
      },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    summary: "Law firms and legal departments leverage AI for document review, legal research, and contract analysis.",
    useCases: [
      {
        title: "Document Review",
        description: "Automate the review of large volumes of documents for relevant information",
      },
      {
        title: "Legal Research",
        description: "Quickly find relevant case law and statutes",
      },
      {
        title: "Contract Analysis",
        description: "Identify key clauses and potential risks in contracts",
      },
      {
        title: "Predictive Policing",
        description: "Predict crime hotspots and allocate resources accordingly",
      },
      {
        title: "E-Discovery",
        description: "Streamline the process of identifying and collecting electronic evidence",
      },
      {
        title: "Compliance Monitoring",
        description: "Monitor regulatory changes and ensure compliance",
      },
      {
        title: "Intellectual Property Protection",
        description: "Detect and prevent infringement of intellectual property rights",
      },
      {
        title: "Legal Chatbots",
        description: "Provide basic legal information and answer FAQs",
      },
    ],
  },
  {
    id: "education",
    title: "Education",
    summary:
      "Educational institutions use AI to personalize learning, automate administrative tasks, and improve student outcomes.",
    useCases: [
      {
        title: "Personalized Learning",
        description: "Tailor educational content to individual student needs",
      },
      {
        title: "Automated Grading",
        description: "Automate the grading of essays and other assignments",
      },
      {
        title: "Student Support Chatbots",
        description: "Answer student questions and provide support",
      },
      {
        title: "Early Warning Systems",
        description: "Identify students at risk of failing or dropping out",
      },
      {
        title: "Adaptive Testing",
        description: "Adjust the difficulty of tests based on student performance",
      },
      {
        title: "Curriculum Development",
        description: "Develop and update curricula based on student needs and industry trends",
      },
      {
        title: "Fraud Detection",
        description: "Detect and prevent academic dishonesty",
      },
      {
        title: "Accessibility Tools",
        description: "Provide tools to make educational content accessible to students with disabilities",
      },
    ],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    summary: "Manufacturers use AI to optimize production processes, improve quality control, and reduce downtime.",
    useCases: [
      {
        title: "Predictive Maintenance",
        description: "Predict equipment failures and schedule maintenance proactively",
      },
      {
        title: "Quality Control",
        description: "Detect defects in products using computer vision",
      },
      {
        title: "Process Optimization",
        description: "Optimize production processes to improve efficiency and reduce waste",
      },
      {
        title: "Supply Chain Optimization",
        description: "Improve logistics and reduce transportation costs",
      },
      {
        title: "Robotics and Automation",
        description: "Automate tasks using robots and other automated systems",
      },
      {
        title: "Demand Forecasting",
        description: "Predict demand to optimize production schedules",
      },
      {
        title: "Inventory Management",
        description: "Optimize inventory levels to minimize costs",
      },
      {
        title: "Worker Safety",
        description: "Monitor worker safety and prevent accidents",
      },
    ],
  },
  {
    id: "telecom",
    title: "Telecom",
    summary:
      "Telecommunications companies use AI to optimize network performance, improve customer service, and detect fraud.",
    useCases: [
      {
        title: "Network Optimization",
        description: "Optimize network performance to improve speed and reliability",
      },
      {
        title: "Customer Service Chatbots",
        description: "Answer customer questions and resolve issues via automated chat",
      },
      {
        title: "Fraud Detection",
        description: "Detect fraudulent activity and prevent losses",
      },
      {
        title: "Predictive Maintenance",
        description: "Predict equipment failures and schedule maintenance proactively",
      },
      {
        title: "Personalized Recommendations",
        description: "Recommend products and services based on customer needs",
      },
      {
        title: "Churn Prediction",
        description: "Predict which customers are likely to churn and take steps to retain them",
      },
      {
        title: "Network Security",
        description: "Detect and prevent cyberattacks",
      },
      {
        title: "Automated Billing",
        description: "Automate the billing process",
      },
    ],
  },
  {
    id: "technology",
    title: "Technology",
    summary: "Technology companies use AI to develop new products, improve customer service, and optimize operations.",
    useCases: [
      {
        title: "Product Development",
        description: "Develop new products and features using AI",
      },
      {
        title: "Customer Service Chatbots",
        description: "Answer customer questions and resolve issues via automated chat",
      },
      {
        title: "Personalized Recommendations",
        description: "Recommend products and services based on customer needs",
      },
      {
        title: "Fraud Detection",
        description: "Detect fraudulent activity and prevent losses",
      },
      {
        title: "Cybersecurity",
        description: "Detect and prevent cyberattacks",
      },
      {
        title: "Data Analysis",
        description: "Analyze large datasets to identify trends and insights",
      },
      {
        title: "Machine Translation",
        description: "Translate text and speech from one language to another",
      },
      {
        title: "Image Recognition",
        description: "Recognize objects and people in images",
      },
    ],
  },
  {
    id: "nonprofit",
    title: "Non-Profit",
    summary:
      "Non-profit organizations use AI to improve fundraising, personalize donor engagement, and optimize program delivery.",
    useCases: [
      {
        title: "Fundraising Optimization",
        description: "Identify potential donors and personalize fundraising appeals",
      },
      {
        title: "Donor Engagement",
        description: "Personalize donor communications and build relationships",
      },
      {
        title: "Program Delivery",
        description: "Optimize program delivery to improve outcomes",
      },
      {
        title: "Volunteer Management",
        description: "Recruit and manage volunteers effectively",
      },
      {
        title: "Data Analysis",
        description: "Analyze data to identify trends and insights",
      },
      {
        title: "Grant Writing",
        description: "Automate the grant writing process",
      },
      {
        title: "Social Media Management",
        description: "Manage social media accounts and engage with followers",
      },
      {
        title: "Website Optimization",
        description: "Optimize website content and design to improve user experience",
      },
    ],
  },
  {
    id: "media",
    title: "Media",
    summary:
      "Media companies use AI to personalize content recommendations, automate content creation, and improve advertising effectiveness.",
    useCases: [
      {
        title: "Content Recommendations",
        description: "Recommend content based on user preferences",
      },
      {
        title: "Content Creation",
        description: "Automate the creation of news articles and other content",
      },
      {
        title: "Advertising Optimization",
        description: "Optimize advertising campaigns to improve effectiveness",
      },
      {
        title: "Fraud Detection",
        description: "Detect fraudulent activity and prevent losses",
      },
      {
        title: "Personalized News Feeds",
        description: "Create personalized news feeds for users",
      },
      {
        title: "Video Summarization",
        description: "Summarize videos automatically",
      },
      {
        title: "Sentiment Analysis",
        description: "Analyze sentiment in news articles and social media posts",
      },
      {
        title: "Copyright Protection",
        description: "Detect and prevent copyright infringement",
      },
    ],
  },
  {
    id: "government",
    title: "Government",
    summary:
      "Agencies and public institutions adopt AI to enhance national security, streamline services, and guide policy decisions.",
    subIndustries: [
      {
        title: "Defense",
        useCases: [
          {
            title: "Threat Detection",
            description: "Examine intelligence data for potential risks",
          },
          {
            title: "Classified Doc Analysis",
            description: "Summarize sensitive documents",
          },
          {
            title: "Simulation Training",
            description: "Generate realistic military or emergency scenarios",
          },
        ],
      },
      {
        title: "Home Affairs",
        useCases: [
          {
            title: "Immigration Processing",
            description: "Automate visa applications and background checks",
          },
          {
            title: "Disaster Response",
            description: "Use social data to identify crisis hotspots",
          },
          {
            title: "Public Safety",
            description: "Predict crime trends and deploy resources effectively",
          },
        ],
      },
      {
        title: "Urban Planning",
        useCases: [
          {
            title: "Traffic Optimization",
            description: "Model traffic flow using citizen feedback",
          },
          {
            title: "Policy Impact Modeling",
            description: "Forecast outcomes of housing or transport initiatives",
          },
        ],
      },
    ],
  },
  {
    id: "consulting",
    title: "Consulting",
    summary:
      "Consulting firms use AI to improve data analysis, automate report generation, and provide better insights to clients.",
    useCases: [
      {
        title: "Data Analysis",
        description: "Analyze large datasets to identify trends and insights",
      },
      {
        title: "Report Generation",
        description: "Automate the generation of reports",
      },
      {
        title: "Market Research",
        description: "Conduct market research and identify opportunities",
      },
      {
        title: "Competitive Analysis",
        description: "Analyze competitors and identify their strengths and weaknesses",
      },
      {
        title: "Risk Management",
        description: "Identify and assess risks",
      },
      {
        title: "Financial Modeling",
        description: "Create financial models to forecast future performance",
      },
      {
        title: "Customer Segmentation",
        description: "Segment customers based on their needs and preferences",
      },
      {
        title: "Pricing Optimization",
        description: "Optimize pricing strategies to maximize profits",
      },
    ],
  },
  {
    id: "research",
    title: "Research",
    summary:
      "Research institutions use AI to accelerate scientific discovery, analyze large datasets, and automate experiments.",
    useCases: [
      {
        title: "Data Analysis",
        description: "Analyze large datasets to identify trends and insights",
      },
      {
        title: "Experiment Automation",
        description: "Automate experiments and data collection",
      },
      {
        title: "Scientific Discovery",
        description: "Accelerate scientific discovery by identifying new patterns and relationships",
      },
      {
        title: "Drug Discovery",
        description: "Accelerate the drug discovery process",
      },
      {
        title: "Materials Science",
        description: "Discover new materials with desired properties",
      },
      {
        title: "Climate Modeling",
        description: "Model climate change and its impacts",
      },
      {
        title: "Genomics",
        description: "Analyze genomic data to understand disease and develop new treatments",
      },
      {
        title: "Astronomy",
        description: "Analyze astronomical data to discover new planets and galaxies",
      },
    ],
  },
]

export function DetailedUseCases() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState("introduction")
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(window.scrollTimeout)
      window.scrollTimeout = setTimeout(() => setIsScrolling(false), 150)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-background">
      {/* Side Navigation */}
      <div
        className={cn(
          "fixed left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-300",
          isNavExpanded ? "w-64" : "w-12",
        )}
      >
        <motion.div
          initial={false}
          animate={{
            width: isNavExpanded ? "auto" : "3rem",
            backgroundColor: isNavExpanded ? "var(--background)" : "transparent",
          }}
          className="rounded-lg border shadow-lg backdrop-blur-sm"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className="w-12 h-12 p-3"
          >
            <Menu className="w-6 h-6" />
          </Button>

          <AnimatePresence>
            {isNavExpanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
                <ScrollArea className="h-[70vh]">
                  <nav className="space-y-2">
                    {["introduction", ...industries.map((i) => i.id)].map((id) => (
                      <Button
                        key={id}
                        variant="ghost"
                        className={cn("w-full justify-start", activeSection === id && "bg-primary/20")}
                        onClick={() => {
                          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
                          setActiveSection(id)
                          setIsNavExpanded(false)
                        }}
                      >
                        {id === "introduction" ? "Introduction" : industries.find((i) => i.id === id)?.title}
                      </Button>
                    ))}
                  </nav>
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Introduction */}
        <section id="introduction" className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Industry-Specific AI Use Cases</h1>
            <p className="text-xl text-muted-foreground">
              In a world driven by data and digital interactions, organizations across every sector are harnessing
              generative AI to streamline processes, enhance decision-making, and unlock new revenue streams.
            </p>
          </motion.div>
        </section>

        {/* Industry Sections */}
        {industries.map((industry, index) => (
          <section
            key={industry.id}
            id={industry.id}
            className={cn("py-20 relative", index % 2 === 0 ? "bg-background" : "bg-muted")}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn("grid gap-8", getLayoutForSection(index))}
              >
                {/* Title and Summary */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">{industry.title}</h2>
                  <p className="text-lg text-muted-foreground">{industry.summary}</p>
                </div>

                {/* Use Cases */}
                {industry.subIndustries ? (
                  <SubIndustriesSection subIndustries={industry.subIndustries} />
                ) : (
                  <UseCasesSection useCases={industry.useCases} layout={index} />
                )}
              </motion.div>

              {/* Transition Text */}
              {industry.transition && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-8 text-muted-foreground italic"
                >
                  {industry.transition}
                </motion.p>
              )}
            </div>
          </section>
        ))}

        {/* Conclusion */}
        <section className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Bringing It All Together</h2>
            <p className="text-lg text-muted-foreground">
              Across every industry and organizational type—from healthcare and finance to consulting and research—the
              possibilities for AI-driven transformation are limitless. This platform serves as a foundational hub,
              offering curated models, fine-tuning capabilities, secure deployment, and comprehensive compliance
              features.
            </p>
            <Button size="lg" className="mt-8">
              Start Your AI Journey
              <GlowingEffect />
            </Button>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

// Helper Components
function SubIndustriesSection({ subIndustries }: { subIndustries: SubIndustry[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {subIndustries.map((subIndustry) => (
        <div key={subIndustry.title} className="border rounded-lg p-4 transition-colors hover:border-primary">
          <button
            onClick={() => setExpanded(expanded === subIndustry.title ? null : subIndustry.title)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-xl font-semibold">{subIndustry.title}</h3>
            {expanded === subIndustry.title ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
          <AnimatePresence>
            {expanded === subIndustry.title && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2"
              >
                {subIndustry.useCases.map((useCase, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2 group"
                  >
                    <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      {i + 1}
                    </span>
                    <div>
                      <span className="font-medium">{useCase.title}</span>
                      <p className="text-muted-foreground">{useCase.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function UseCasesSection({
  useCases,
  layout,
}: {
  useCases: Array<{ title: string; description: string }>
  layout: number
}) {
  return (
    <ul className={cn("grid gap-4", getUseCasesLayout(layout))}>
      {useCases.map((useCase, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-start gap-2 group"
        >
          <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            {i + 1}
          </span>
          <div>
            <span className="font-medium">{useCase.title}</span>
            <p className="text-muted-foreground">{useCase.description}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

// Helper functions for layouts
function getLayoutForSection(index: number) {
  const layouts = [
    "grid-cols-1 md:grid-cols-2", // Healthcare
    "grid-cols-1", // Finance
    "grid-cols-1 md:grid-cols-3", // Retail
    "grid-cols-1 md:grid-cols-2", // Legal
    "grid-cols-1", // Education
    "grid-cols-1 md:grid-cols-3", // Manufacturing
    "grid-cols-1 md:grid-cols-2", // Telecom
    "grid-cols-1", // Technology
    "grid-cols-1 md:grid-cols-3", // Non-Profit
    "grid-cols-1 md:grid-cols-2", // Media
    "grid-cols-1", // Government
    "grid-cols-1 md:grid-cols-2", // Consulting
    "grid-cols-1", // Research
  ]
  return layouts[index % layouts.length]
}

function getUseCasesLayout(index: number) {
  const layouts = [
    "grid-cols-1", // Single column
    "grid-cols-1 md:grid-cols-2", // Two columns
    "grid-cols-1 md:grid-cols-3", // Three columns
    "grid-cols-1 md:grid-cols-2 lg:grid-cols-4", // Four columns
  ]
  return layouts[index % layouts.length]
}

export default DetailedUseCases

