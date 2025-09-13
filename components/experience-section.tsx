"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

const experiences = [
  {
    title: "Frontend Developer Intern",
    company: "Verr Group",
    location: "Remote",
    period: "Feb 2025 - July 2025",
    type: "Internship",
    description: [
      "Developed and optimized responsive websites using HTML, CSS, JavaScript, and React, reducing load time by 30%",
      "Developed and optimized interactive UI components using React, enhancing functionality and reducing customer support requests by 25%",
      "Collaborated with cross-functional teams to integrate APIs and ensure seamless front-end performance, accessibility, and cross-browser compatibility, improving user retention by 30%",
    ],
    technologies: ["React", "HTML", "CSS", "JavaScript", "API Integration"],
  },
  {
    title: "Project Intern",
    company: "SAIL, BHILAI STEEL PLANT",
    location: "Bhilai, India",
    period: "June 2025",
    type: "Internship",
    description: [
      "Built Advanced IT Infrastructure Monitoring Dashboard with 90% reduction in manual monitoring time",
      "Implemented real-time monitoring dashboard for Bhilai Steel Plant",
      "Created 3-tier monitoring architecture handling CPU, memory, and filesystem utilization",
      "Deployed production-ready solution serving SAIL Bhilai Steel Plant's IT operations team",
    ],
    technologies: ["Python", "Streamlit", "Oracle Database", "SSH/Paramiko"],
  },
  {
    title: "Founder",
    company: "Webnify Official",
    location: "Chennai, India",
    period: "2025 - Present",
    type: "Founder",
    description: [
      "Founded and leading a web development agency specializing in modern web solutions",
      "Managing end-to-end project delivery for clients across various industries",
      "Building scalable web applications using cutting-edge technologies",
      "Leading a team of developers and designers to deliver high-quality digital solutions",
    ],
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Team Leadership"],
  },
  {
    title: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Chennai, India",
    period: "2024 - Present",
    type: "Freelance",
    description: [
      "Developed website for multispecialty hospital - www.getpharmo.com",
      "Created school management system - manavargalsms.com for a school in Chennai",
      "Multiple ongoing projects with focus on responsive design and user experience",
    ],
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    links: [
      { name: "Pharmo", url: "https://www.getpharmo.com" },
      { name: "Manavargal SMS", url: "https://manavargalsms.com" },
    ],
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My professional journey and contributions to various organizations
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full hidden lg:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full border-4 border-slate-900 z-10"></div>

                {/* Content */}
                <div className="w-full lg:w-5/12">
                  <Card className="bg-black/40 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 gold-hover-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 gold-hover-text">{exp.title}</h3>
                          <p className="text-lg text-cyan-400 font-semibold">{exp.company}</p>
                        </div>
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {exp.type}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-cyan-400 mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs border-gray-600 text-gray-300 gold-hover-badge"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {exp.links && (
                        <div className="flex gap-2">
                          {exp.links.map((link) => (
                            <a
                              key={link.name}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm transition-colors gold-hover-link"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {link.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for timeline */}
                <div className="hidden lg:block w-2/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
