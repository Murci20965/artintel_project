"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "./ui/ThemeToggle"
import { Facebook, Twitter, LinkedinIcon as LinkedIn, GitlabIcon as GitHub } from "lucide-react"
import NavbarLogo from "./ui/NavbarLogo"

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "How it Works", href: "/how-it-works" },
      { name: "Features", href: "/features" },
      { name: "Use Cases", href: "/use-cases" },
      { name: "Model Catalog", href: "/model-catalog" },
      { name: "Pricing", href: "/pricing" },
      { name: "Community", href: "/community" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
      { name: "Status", href: "/status" },
      { name: "Support", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "/privacy-policy" },
      { name: "Terms", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "GDPR", href: "/gdpr" },
    ],
  },
]

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12 mt-auto border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="relative w-40 h-12">
                <NavbarLogo />
              </motion.div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Democratizing AI with enterprise-grade LLM solutions for everyone.
            </p>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <LinkedIn size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <GitHub size={20} />
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer Row */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Artintelllms. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/privacy-policy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

