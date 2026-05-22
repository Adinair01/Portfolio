"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

const experiences = [
  {
    title: "SWE Intern",
    company: "AlgoUniversity",
    location: "Remote",
    period: "June 2025 - Present",
    type: "Internship",
    description: [
      "Built CodeArena, a full-stack MERN online judge, from the ground up, compiling and running hundreds of code submissions safely",
      "Engineered sandboxed execution and a submission queue so concurrent submissions run in isolation without one bad infinite loop taking down the system",
      "Applied distributed systems thinking to keep the judge stable under contest load when many users submit at the same time",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Docker", "Distributed Systems"],
    reflection:
      "CodeArena was where distributed systems stopped being a resume buzzword for me. Watching the queue hold steady while fifty people submit at once during a contest taught me more than any lecture could.",
  },
  {
    title: "Research Intern",
    company: "IIT Indore",
    location: "Remote",
    period: "2026 - Present",
    type: "Research",
    description: [
      "Working under Associate Professor Somnath Dey and PhD scholar Priyanka on a computer vision project, modifying YOLO11 for traffic sign detection",
      "Built FPDConv from scratch, a custom module fusing pixel-difference convolution with Haar wavelet frequency analysis, and integrated it into the Ultralytics YOLO11 framework",
      "Benchmarking baseline and modified architectures on GTSDB, running an ablation study across 5 model variants with transfer learning",
    ],
    technologies: ["Python", "PyTorch", "YOLO11", "Ultralytics", "Computer Vision", "Object Detection"],
    reflection:
      "This is the project that pulled me into research the hard way: realizing a paper's architecture never just drops into an existing codebase, and learning more about rigorous experiment design than any course taught me.",
  },
  {
    title: "Software Engineering Intern",
    company: "RelationsAI",
    location: "Remote",
    period: "Mar 2026 - May 2026",
    type: "Internship",
    description: [
      "Built a real-time voice AI agent for live phone calls, where half a second of dead air is the difference between natural and broken",
      "Reduced text-to-speech time-to-first-byte from 691ms to 200ms by switching the TTS provider to ElevenLabs",
      "Brought the full speech pipeline under 800ms end to end by rethinking how STT and TTS buffer and stream instead of waiting on each other",
      "Tracked down and fixed a production echo bug that only ever surfaced on live calls, never in testing",
      "Built the campaign engine now driving 1000+ outbound calls and cutting manual collections work by 60%",
    ],
    technologies: ["Voice AI", "ElevenLabs", "STT/TTS", "Real-time Streaming", "Latency Optimization", "Node.js"],
    reflection:
      "The echo bug taught me to respect the gap between a clean test harness and a live phone line, because it never reproduced anywhere except real calls. Shaving milliseconds off latency sounds trivial until you are the one sitting in the dead air.",
  },
  {
    title: "SDE Intern",
    company: "Steel Authority of India (SAIL)",
    location: "Bhilai, CG",
    period: "Jun 2025 - Jul 2025",
    type: "Internship",
    description: [
      "Consolidated four disconnected team dashboards into a single real-time view that told one coherent story",
      "Built a Python and Streamlit analytics dashboard on OracleDB with parameterized queries so reports run live instead of being pulled by hand each shift",
      "Cut manual reporting time by 50% and lifted floor operational performance by 40% through real-time visibility",
    ],
    technologies: ["Python", "Streamlit", "OracleDB", "SQL", "Data Analytics"],
    reflection:
      "Seeing four teams stare at four dashboards that never talked to each other made the real problem obvious in a way no spec could. The win was less about the code and more about getting everyone looking at the same numbers.",
  },
  {
    title: "Full Stack Developer Intern",
    company: "Verr Group",
    location: "Chennai, TN",
    period: "Feb 2025 - Aug 2025",
    type: "Internship",
    description: [
      "Hardened the client's REST APIs against injection and broken-auth gaps with proper JWT handling and input validation instead of trusting the frontend",
      "Cut API latency by 35% through caching and cleaning up SQL queries that were doing far more work than they needed to",
      "Built client-facing React dashboards and shipped in Agile sprints with CI/CD",
    ],
    technologies: ["React", "REST APIs", "JWT", "SQL", "Caching", "CI/CD"],
    reflection:
      "This was my first time securing APIs that real users' data depended on, and it reset how seriously I take input validation. It also drove home that a fast backend means nothing if the UI rendering it feels sluggish.",
  },
  {
    title: "Founder",
    company: "Webnify Official",
    location: "Chennai, India",
    period: "Sep 2025 - Present",
    type: "Founder",
    description: [
      "Founded and leading a web development agency specializing in modern web solutions",
      "Managing end-to-end project delivery for clients across various industries",
      "Building scalable web applications using cutting-edge technologies",
      "Leading a team of developers and designers to deliver high-quality digital solutions",
    ],
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Team Leadership"],
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

                      {exp.reflection && (
                        <p className="text-sm italic text-gray-400 leading-relaxed mb-4 pl-3 border-l-2 border-cyan-500/40">
                          {exp.reflection}
                        </p>
                      )}

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
