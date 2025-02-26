"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "@/components/ThemeProvider"

const About = () => {
  const { currentTheme } = useTheme()
  return (
    <section id="about" className={`py-20 ${currentTheme.background}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h2 className={`text-4xl font-bold mb-4 ${currentTheme.text}`}>About Artintelllms</h2>
            <p className={`text-lg ${currentTheme.mutedText}`}>
              Artintelllms is a cutting-edge platform that empowers businesses and developers to harness the full
              potential of AI. Our mission is to democratize AI by providing easy-to-use tools for pretraining,
              fine-tuning, and deploying large language models.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            {/* Add an animated illustration or image here */}
            <div className="w-full rounded-lg">
              <Link href="/" className="flex items-center ">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                  <Image
                    src="Icon - PNG.png"
                    alt="Artintellms Logo"
                    width={500}
                    height={450}
                    className="rounded-lg"
                    priority
                  />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

