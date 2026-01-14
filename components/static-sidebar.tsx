"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, FileText, Instagram, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/Adinair01",
    color: "hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-500/20",
    bgColor: "bg-gray-800",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/adityanair01/",
    color: "hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20",
    bgColor: "bg-blue-700",
  },
  {
    name: "LeetCode",
    icon: Code,
    url: "https://leetcode.com/u/adiii01/",
    color: "hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20",
    bgColor: "bg-orange-700",
  },
  {
    name: "CodeChef",
    icon: Code,
    url: "https://www.codechef.com/users/adiop",
    color: "hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-500/20",
    bgColor: "bg-amber-800",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:adityanair5002@gmail.com",
    color: "hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/20",
    bgColor: "bg-red-700",
  },
  {
    name: "Resume",
    icon: FileText,
    url: "https://drive.google.com/file/d/1wCxrqx-OynOyg2VxaoWGUZRSINncExWC/view?usp=sharing",
    color: "hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/20",
    bgColor: "bg-green-700",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/adityaanairrr?igsh=MTJmbTlpd2YyZzJzcA==",
    color: "hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/20",
    bgColor: "bg-pink-700",
  },
]

export default function StaticSidebar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isEmailOpen, setIsEmailOpen] = useState(false)

  const handleEmailOk = () => {
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText("adityanair5002@gmail.com").catch(() => {})
    }
    setIsEmailOpen(false)
  }

  return (
    <>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed left-4 top-16 xl:top-20 z-40 hidden lg:block"
        style={{ marginLeft: "0px" }} // Ensure no overlap with main content
      >
        <div className="flex flex-col space-y-4 bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
          {socialLinks.map((link, index) => {
            const isEmail = link.name === "Email"

            return (
              <motion.div
                key={link.name}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Button
                  asChild={!isEmail}
                  size="sm"
                  variant="ghost"
                  className={`w-14 h-14 p-0 rounded-xl ${link.bgColor}/50 ${link.color} transition-all duration-300 group relative flex items-center justify-center`}
                  onClick={isEmail ? () => setIsEmailOpen(true) : undefined}
                >
                  {isEmail ? (
                    <div className="flex items-center justify-center w-full h-full">
                      <link.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                    </div>
                  ) : (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" title={link.name}>
                      <link.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
                    </a>
                  )}
                </Button>

                {/* Label under icon */}
                <span className="mt-2 block text-xs text-center text-gray-300">{link.name}</span>

                {/* Tooltip */}
                {hoveredLink === link.name && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium border border-gray-700 shadow-lg whitespace-nowrap z-50"
                  >
                    {link.name}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900/95"></div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {isEmailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-cyan-500/60 rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <p className="text-gray-300 mb-4 break-all">adityanair5002@gmail.com</p>
            <div className="flex justify-end">
              <Button size="sm" onClick={handleEmailOk}>
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

