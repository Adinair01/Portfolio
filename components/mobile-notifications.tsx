"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, X } from "lucide-react"

export default function MobileNotifications() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Show notifications after page load on mobile
    const timer = setTimeout(() => {
      if (window.innerWidth < 768) {
        setShowNotifications(true)
      }
    }, 1500) // Reduced delay for better UX

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showNotifications) {
      // Step through animations to capture attention
      const stepTimer = setTimeout(() => {
        setCurrentStep(1)

        // Auto-hide after showing both notifications
        const hideTimer = setTimeout(() => {
          setShowNotifications(false)
        }, 4000) // Show for 4 seconds total

        return () => clearTimeout(hideTimer)
      }, 800) // Show second notification after 800ms

      return () => clearTimeout(stepTimer)
    }
  }, [showNotifications])

  if (!showNotifications) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-[75] md:hidden">
        {/* Left notification with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: [0.8, 1.1, 1],
            rotate: [0, -2, 2, 0],
          }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            scale: { duration: 0.8, times: [0, 0.6, 1] },
            rotate: { duration: 1, times: [0, 0.3, 0.6, 1] },
          }}
          className="absolute top-20 left-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-400/40 rounded-xl p-4 pointer-events-auto max-w-52 shadow-2xl"
          style={{
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.3), 0 0 60px rgba(6, 182, 212, 0.1)",
          }}
        >
          <button
            onClick={() => setShowNotifications(false)}
            className="absolute -top-2 -right-2 bg-gray-800/90 rounded-full p-1.5 hover:bg-gray-700 transition-colors shadow-lg"
          >
            <X className="w-3 h-3 text-gray-300" />
          </button>

          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                x: [-5, 5, -5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <div>
              <span className="text-sm font-medium text-white block">Social Links</span>
              <span className="text-xs text-cyan-300">Tap to connect!</span>
            </div>
          </div>
        </motion.div>

        {/* Right notification with staggered animation */}
        <AnimatePresence>
          {currentStep >= 1 && (
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: [0.8, 1.1, 1],
                rotate: [0, 2, -2, 0],
              }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                scale: { duration: 0.8, times: [0, 0.6, 1] },
                rotate: { duration: 1, times: [0, 0.3, 0.6, 1] },
              }}
              className="absolute top-20 right-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-400/40 rounded-xl p-4 pointer-events-auto max-w-52 shadow-2xl"
              style={{
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)",
              }}
            >
              <button
                onClick={() => setShowNotifications(false)}
                className="absolute -top-2 -right-2 bg-gray-800/90 rounded-full p-1.5 hover:bg-gray-700 transition-colors shadow-lg"
              >
                <X className="w-3 h-3 text-gray-300" />
              </button>

              <div className="flex items-center gap-3">
                <div>
                  <span className="text-sm font-medium text-white block">Navigation</span>
                  <span className="text-xs text-purple-300">Explore sections!</span>
                </div>
                <motion.div
                  animate={{
                    x: [5, -5, 5],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <ArrowRight className="w-5 h-5 text-purple-400" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle pulse overlay for extra attention */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{
            duration: 2,
            repeat: 2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 pointer-events-none"
        />
      </div>
    </AnimatePresence>
  )
}
