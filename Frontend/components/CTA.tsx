"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const CTA = () => {
  return (
    <section id="cta" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Scale Your AI Intelligence?</h2>
          <p className="text-xl mb-8">Join Artintelllms today and transform your AI capabilities.</p>
          <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="bg-white text-black" />
            <Button size="lg" className="bg-white hover:bg-white/90 text-primary">
              Get Started
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA

