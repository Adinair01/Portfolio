"use client"

import { motion } from "framer-motion"

export default function FloatingObjects() {
  const objects = [
    { id: 1, size: 120, color: "from-cyan-400/10 to-blue-500/10", delay: 0, blur: "blur-2xl" },
    { id: 2, size: 90, color: "from-purple-400/10 to-pink-500/10", delay: 4, blur: "blur-3xl" },
    { id: 3, size: 150, color: "from-indigo-400/8 to-cyan-500/8", delay: 8, blur: "blur-2xl" },
    { id: 4, size: 100, color: "from-violet-400/10 to-purple-500/10", delay: 2, blur: "blur-3xl" },
    { id: 5, size: 80, color: "from-teal-400/12 to-blue-500/12", delay: 6, blur: "blur-xl" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {objects.map((obj) => (
        <motion.div
          key={obj.id}
          className={`absolute rounded-full bg-gradient-to-br ${obj.color} ${obj.blur}`}
          style={{
            width: obj.size,
            height: obj.size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.05, 0.95, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 35 + Math.random() * 20, // Very slow, soothing movement
            repeat: Number.POSITIVE_INFINITY,
            delay: obj.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Add some gentle light rays */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 60,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-1 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 80,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    </div>
  )
}
