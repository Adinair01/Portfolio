"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Calendar, MapPin, ZoomIn } from "lucide-react"
import { useState } from "react"
import ImageZoomModal from "./image-zoom-modal"

const achievements = [
  {
    title: "PM Trophy MCM Scholarship",
    organization: "Government of India",
    description:
      "Awarded the prestigious PM TROPHY MCM Scholarship in recognition of exceptional academic performance at a competitive level.",
    date: "2024",
    type: "Scholarship",
    icon: Trophy,
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-500/20",
    borderColor: "border-yellow-500/30",
    imageStyle: "square",
  },
  {
    title: "1st Prize - Agent's Fest Hackathon",
    organization: "Amity University, Noida",
    description:
      "Won first place in the national-level hackathon organized by Amity School of Engineering and Technology, competing against teams from across the country.",
    date: "2025",
    type: "Hackathon",
    location: "Delhi NCR",
    icon: Award,
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-500/30",
    image: "/achievements/hackathon-win.png",
    imageStyle: "default",
  },
]

export default function AchievementsSection() {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null)

  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setZoomImage({ src: imageSrc, alt: imageAlt })
  }

  return (
    <section id="achievements" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent glow-text">
            Achievements & Recognition
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto glow-text-subtle px-4">
            Milestones that mark my journey of excellence and continuous learning
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="w-full"
            >
              <Card className="bg-black/40 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-cyan-500/10">
                <CardContent className="p-6 sm:p-8">
                  {/* Scholarship Achievement - Special Golden Design */}
                  {index === 0 && (
                    <motion.div
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      {/* Golden Square Container */}
                      <div className="inline-block mb-6">
                        <div className="relative p-1 rounded-2xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 shadow-2xl">
                          <div className="bg-gray-900 rounded-xl p-6 sm:p-8">
                            <div className="flex flex-col items-center">
                              <div className="inline-flex p-4 sm:p-6 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 shadow-xl mb-4">
                                <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                              </div>
                              <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-1">PM TROPHY MCM</h3>
                              <p className="text-sm text-yellow-300/80">Government Scholarship</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Achievement Details */}
                      <div className="text-center mb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4 mb-3">
                          <h4 className="text-xl sm:text-2xl font-bold text-white">{achievement.title}</h4>
                          <Badge
                            variant="secondary"
                            className={`${achievement.bgColor} text-white ${achievement.borderColor} self-center`}
                          >
                            {achievement.type}
                          </Badge>
                        </div>
                        <p className="text-cyan-400 font-semibold mb-3 text-base sm:text-lg">
                          {achievement.organization}
                        </p>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base text-center max-w-2xl mx-auto">
                        {achievement.description}
                      </p>

                      <div className="flex justify-center">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{achievement.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Hackathon Achievement - Image + Details Layout */}
                  {index === 1 && (
                    <motion.div
                      initial={{ scale: 0.95 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {/* Enhanced Mobile-Optimized Image Section */}
                      <div className="mb-6 rounded-lg overflow-hidden relative group/image">
                        <div
                          className="relative cursor-pointer"
                          onClick={() => handleImageClick(achievement.image!, achievement.title)}
                        >
                          <img
                            src={achievement.image || "/placeholder.svg"}
                            alt={achievement.title}
                            className="w-full h-48 sm:h-56 lg:h-64 object-contain bg-gray-800/30 group-hover/image:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />

                          {/* Mobile-Optimized Zoom Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileHover={{ opacity: 1, scale: 1 }}
                              className="bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4"
                            >
                              <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </motion.div>
                          </div>

                          {/* Mobile Tap Indicator */}
                          <div className="absolute bottom-2 right-2 sm:hidden">
                            <div className="bg-black/60 backdrop-blur-sm rounded-full p-2">
                              <ZoomIn className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Mobile Instruction Text */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:hidden">
                          <p className="text-white text-xs text-center">Tap to zoom</p>
                        </div>
                      </div>

                      {/* Achievement Details */}
                      <div className="text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} shadow-lg`}>
                            <achievement.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                              <h3 className="text-xl sm:text-2xl font-bold text-white glow-text-hover group-hover:text-cyan-300 transition-colors">
                                {achievement.title}
                              </h3>
                              <Badge
                                variant="secondary"
                                className={`${achievement.bgColor} text-white ${achievement.borderColor} self-center sm:self-auto`}
                              >
                                {achievement.type}
                              </Badge>
                            </div>
                            <p className="text-cyan-400 font-semibold glow-text-subtle text-base sm:text-lg">
                              {achievement.organization}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-4 leading-relaxed glow-text-subtle text-sm sm:text-base">
                          {achievement.description}
                        </p>

                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{achievement.date}</span>
                          </div>
                          {achievement.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{achievement.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageZoomModal
        isOpen={!!zoomImage}
        onClose={() => setZoomImage(null)}
        imageSrc={zoomImage?.src || ""}
        imageAlt={zoomImage?.alt || ""}
      />
    </section>
  )
}
