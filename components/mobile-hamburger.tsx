"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin, Mail, FileText, Instagram, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileHamburgerProps {
  side: "left" | "right"
  onToggle?: (isOpen: boolean) => void
}

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/Adinair01",
    color: "hover:bg-gray-700",
    bgColor: "bg-gray-800",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/adityanair01/",
    color: "hover:bg-blue-600",
    bgColor: "bg-blue-700",
  },
  {
    name: "LeetCode",
    icon: Code,
    url: "https://leetcode.com/u/adityanair01/",
    color: "hover:bg-orange-600",
    bgColor: "bg-orange-700",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:adityanair5002@gmail.com",
    color: "hover:bg-red-600",
    bgColor: "bg-red-700",
  },
  {
    name: "Resume",
    icon: FileText,
    url: "https://drive.google.com/file/d/1wCxrqx-OynOyg2VxaoWGUZRSINncExWC/view?usp=sharing",
    color: "hover:bg-green-600",
    bgColor: "bg-green-700",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/adityaanairrr?igsh=MTJmbTlpd2YyZzJzcA==",
    color: "hover:bg-pink-600",
    bgColor: "bg-pink-700",
  },
]

const navigationItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
]

export default function MobileHamburger({ side, onToggle }: MobileHamburgerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onToggle?.(newState)
  }

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    setIsOpen(false)
    onToggle?.(false)
  }

  return (
    <>
      {/* Hamburger Button - Positioned to avoid all overlaps */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className={`fixed ${side === "left" ? "left-2 sm:left-4" : "right-2 sm:right-4"} top-2 sm:top-4 z-[70] md:hidden bg-black/60 backdrop-blur-md border border-white/40 hover:bg-black/80 transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-xl shadow-xl`}
        style={{
          // Ensure it's always above everything
          position: "fixed",
          isolation: "isolate",
        }}
      >
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          )}
        </motion.div>
      </Button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[65] md:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: side === "left" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "left" ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 ${side === "left" ? "left-0" : "right-0"} h-full w-80 bg-gray-900/95 backdrop-blur-md border-${side === "left" ? "r" : "l"} border-gray-700 z-[68] md:hidden overflow-y-auto`}
          >
            <div className="p-6 pt-16">
              {side === "left" ? (
                // Social Links Sidebar
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 text-center">Connect With Me</h3>
                  <div className="space-y-4">
                    {socialLinks.map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-4 p-4 rounded-xl ${link.bgColor}/50 ${link.color} transition-all duration-300 group`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`p-3 rounded-lg ${link.bgColor} group-hover:scale-110 transition-transform`}>
                          <link.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-medium">{link.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              ) : (
                // Navigation Sidebar
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 text-center">Portfolio Navigation</h3>
                  <div className="space-y-3">
                    {navigationItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="w-full text-left p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 text-white font-medium transition-all duration-300 group"
                        whileHover={{ scale: 1.02, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="group-hover:text-cyan-400 transition-colors">{item.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
