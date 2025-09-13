"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github, Send } from "lucide-react"
import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendEmail = () => {
    const { name, email, message } = formData

    // Validate form
    if (!name || !email || !message) {
      alert("Please fill in all fields before sending.")
      return
    }

    // Create email content
    const subject = `Portfolio Contact: Message from ${name}`
    const body = `Hi Aditya,

I'm reaching out through your portfolio website.

Name: ${name}
Email: ${email}

Message:
${message}

Best regards,
${name}`

    // Create mailto link
    const mailtoLink = `mailto:adityanair5002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Open email client
    window.location.href = mailtoLink

    // Clear form after sending
    setFormData({
      name: "",
      email: "",
      message: "",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let's collaborate on your next project or discuss opportunities
          </p>
        </motion.div>

        <Card className="bg-black/40 border-gray-700">
          <CardContent className="p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="What's your name?"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="What's your email?"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Drop your message here..."
                  rows={6}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 resize-none"
                  required
                />
              </div>

              <Button
                type="button"
                onClick={handleSendEmail}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col justify-center"
      >
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
          <div className="space-y-4">
            <a
              href="mailto:adityanair5002@gmail.com"
              className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-700/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Email</p>
                <p className="text-gray-400 text-sm">adityanair5002@gmail.com</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/adityanair01/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-700/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">LinkedIn</p>
                <p className="text-gray-400 text-sm">Connect professionally</p>
              </div>
            </a>

            <a
              href="https://github.com/Adinair01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-700/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">GitHub</p>
                <p className="text-gray-400 text-sm">Check out my code</p>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300 text-center">
            <span className="text-cyan-400">💡 Tip:</span> The contact form will open your email client with a
            pre-filled message!
          </p>
        </div>
      </motion.div>
    </div>
  )
}
