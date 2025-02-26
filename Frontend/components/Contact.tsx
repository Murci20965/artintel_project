import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Get in Touch</h2>
        <div className="max-w-3xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-input bg-background"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-input bg-background"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-input bg-background"
              ></textarea>
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

