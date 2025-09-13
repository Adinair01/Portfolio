"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
            onClick={onClose}
          />

          {/* Popup - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[85] w-[90vw] max-w-md"
          >
            <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Get In Touch</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 sm:h-14 text-base sm:text-lg"
                  size="lg"
                >
                  <a href="https://www.linkedin.com/in/adityanair01/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 mr-3" />
                    Connect on LinkedIn
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 h-12 sm:h-14 text-base sm:text-lg"
                  size="lg"
                >
                  <a href="mailto:adityanair5002@gmail.com">
                    <Mail className="w-5 h-5 mr-3" />
                    Send Email
                  </a>
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm sm:text-base">
                  I'd love to hear from you! Let's discuss opportunities and collaborations.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
