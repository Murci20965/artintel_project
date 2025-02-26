"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, Sliders, Cloud, Shield, Rocket, Zap } from "lucide-react"

export default function WhyChoose() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  const features = [
    {
      icon: Search,
      title: "One-Stop Hub",
      description: "Access a curated catalog of cutting-edge LLMs and resource-friendly SLMs.",
    },
    {
      icon: Sliders,
      title: "No-Code Fine-Tuning",
      description: "Easily customize AI models with our intuitive no-code studio.",
    },
    {
      icon: Cloud,
      title: "Flexible Deployment",
      description: "Deploy effortlessly across cloud, on-premise, or hybrid environments.",
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "GDPR and HIPAA compliant with advanced security features.",
    },
    {
      icon: Rocket,
      title: "Scalability",
      description: "Scale seamlessly from small teams to global enterprises.",
    },
    {
      icon: Zap,
      title: "Cost-Effective",
      description: "Affordable AI solutions for enterprises of all sizes.",
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent dark:from-primary/10" />

      <div className="container relative z-10 px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Why Choose Artintel LLMs?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Empowering your AI journey with cutting-edge solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-6 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform group-hover:scale-[1.02]" />
              <div className="relative flex flex-col items-center">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>

                <p className="mt-2 text-center text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

