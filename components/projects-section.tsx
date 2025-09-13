"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Calendar, ZoomIn } from "lucide-react"
import { useState } from "react"
import ImageZoomModal from "./image-zoom-modal"

const projects = [
  {
    title: "LexiSense",
    description:
      "Intelligent document analysis platform that extracts intelligence from PDFs using advanced AI analytics. Processes domain-specific documents and returns structured, explainable JSON responses with Gemini AI.",
    period: "2025",
    technologies: ["Python", "Gemini AI", "PDF Processing", "Natural Language Processing", "JSON", "Machine Learning"],
    highlights: [
      "Advanced AI analytics for document intelligence extraction",
      "Structured JSON responses with decision logic and confidence scores",
      "Support for domain-specific documents (insurance, legal, HR, compliance)",
      "Natural language querying with source references",
    ],
    image: "/projects/lexisense.png",
    status: "Ongoing",
    github: "https://github.com/Adinair01/lexisense",
  },
  {
    title: "SkillSage",
    description:
      "AI-powered career development platform providing personalized career assessments, skill gap analysis, and tailored recommendations for career paths, courses, and internships.",
    period: "2025",
    technologies: ["React", "AI/ML", "Career Analytics", "Assessment Tools", "Data Visualization", "Responsive Design"],
    highlights: [
      "Comprehensive skills evaluation and career assessment",
      "AI-powered career path recommendations with match scores",
      "Visual skills gap analysis with actionable insights",
      "Professional UI/UX with elegant typography and warm color palette",
    ],
    image: "/projects/skillsage.jpg",
    status: "Ongoing",
    github: "https://github.com/Adinair01/Skill-Sage",
  },
  {
    title: "Sorting Visualizer",
    description:
      "Java application that visualizes four sorting algorithms (Bubble Sort, Merge Sort, Insertion Sort, Quick Sort) through interactive bar graphs and scatter charts for intuitive algorithm understanding.",
    period: "2024",
    technologies: ["Java", "Swing", "Data Structures", "Algorithms", "GUI", "Visualization"],
    highlights: [
      "Interactive visualization of 4 different sorting algorithms",
      "Real-time bar graphs and scatter chart representations",
      "Algorithm step-by-step breakdown with code display",
      "Educational tool for understanding sorting algorithm mechanics",
    ],
    image: "/projects/sorting-visualizer.png",
    status: "Completed",
    github: "https://github.com/Adinair01/Sorting-Visualizer",
  },
]

export default function ProjectsSection() {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null)

  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setZoomImage({ src: imageSrc, alt: imageAlt })
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing my skills and experience through real-world applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="bg-black/40 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 h-full group">
                <CardContent className="p-0">
                  {/* Enhanced Clickable Image Section */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div
                      className="relative cursor-pointer"
                      onClick={() => handleImageClick(project.image!, project.title)}
                    >
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Desktop Zoom Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4"
                        >
                          <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </motion.div>
                      </div>

                      {/* Mobile Zoom Indicator */}
                      <div className="absolute bottom-2 right-2 sm:hidden">
                        <div className="bg-black/60 backdrop-blur-sm rounded-full p-2">
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Mobile Instruction Text */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs text-center">Tap to zoom</p>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className={`${
                          project.status === "Completed"
                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                            : "bg-orange-500/20 text-orange-300 border-orange-500/30"
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Calendar className="w-3 h-3" />
                        <span>{project.period}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {project.highlights.slice(0, 2).map((highlight, i) => (
                          <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        asChild
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3 h-3 mr-1" />
                          View Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Zoom Modal */}
      <ImageZoomModal
        isOpen={!!zoomImage}
        onClose={() => setZoomImage(null)}
        imageSrc={zoomImage?.src || ""}
        imageAlt={zoomImage?.alt || ""}
      />
    </section>
  )
}
