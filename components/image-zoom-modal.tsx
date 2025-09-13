"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface ImageZoomModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
}

export default function ImageZoomModal({ isOpen, onClose, imageSrc, imageAlt }: ImageZoomModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[95] flex items-center justify-center p-4"
          >
            <div className="relative max-w-[95vw] max-h-[95vh] w-full h-full flex items-center justify-center">
              {/* Close Button - Mobile Optimized */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black/70 hover:bg-black/90 text-white border border-white/30 rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 touch-target"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>

              {/* Image Container */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src={imageSrc || "/placeholder.svg"}
                  alt={imageAlt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{
                    maxWidth: "calc(100vw - 2rem)",
                    maxHeight: "calc(100vh - 2rem)",
                  }}
                />
              </motion.div>

              {/* Mobile Instructions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:hidden">
                <div className="bg-black/70 backdrop-blur-sm rounded-full px-4 py-2">
                  <p className="text-white text-sm">Tap outside to close</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
