"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Mail, MapPin, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import StarField from "@/components/star-field"
import StaticSidebar from "@/components/static-sidebar"
import ContactPopup from "@/components/contact-popup"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import ContactSection from "@/components/contact-section"
import AchievementsSection from "@/components/achievements-section"
import Globe3D from "@/components/globe-3d"
import MobileHamburger from "@/components/mobile-hamburger"
import MobileNotifications from "@/components/mobile-notifications"

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const [showContactPopup, setShowContactPopup] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <StarField />
      <StaticSidebar />
      <ContactPopup isOpen={showContactPopup} onClose={() => setShowContactPopup(false)} />
      <MobileNotifications />

      {/* Mobile Hamburger Menus */}
      <MobileHamburger side="left" />
      <MobileHamburger side="right" />

      {/* Navigation - Adjusted padding to avoid hamburger overlap */}
      <nav className="fixed top-0 left-0 right-0 z-[40] bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-16 sm:px-20 md:px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent glow-text"
            >
              Aditya Nair
            </motion.div>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {[
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Experience", href: "#experience" },
                { name: "Projects", href: "#projects" },
                { name: "Achievements", href: "#achievements" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(item.href)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }}
                  className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer glow-text-hover text-sm lg:text-base"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with proper margin to avoid sidebar overlap */}
      <div className="lg:ml-24 relative">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between relative pt-20 md:pt-24 px-4 sm:px-6">
          <motion.div style={{ y }} className="flex-1 text-left z-10 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 glow-text"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Aditya</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-300 max-w-3xl glow-text-subtle"
            >
              A passionate Full Stack Developer with expertise in modern web technologies, building scalable
              applications and solving complex problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-3 sm:gap-4 mb-8"
            >
              <Badge
                variant="secondary"
                className="text-sm sm:text-lg py-2 px-3 sm:px-4 bg-cyan-500/20 text-cyan-300 border-cyan-500/30 glow-text-subtle"
              >
                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                SRM University - CGPA 9.24
              </Badge>
              <Badge
                variant="secondary"
                className="text-sm sm:text-lg py-2 px-3 sm:px-4 bg-purple-500/20 text-purple-300 border-purple-500/30 glow-text-subtle"
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Chennai, India
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Button
                size="lg"
                onClick={() => setShowContactPopup(true)}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 glow-button"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Get In Touch
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 bg-transparent glow-button-outline"
              >
                <a href="https://github.com/Adinair01" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  GitHub
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Photo with Curtain Unfold Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0 mt-8 lg:mt-0 lg:ml-8 xl:ml-12 flex justify-center lg:justify-end"
          >
            <div className="relative overflow-hidden rounded-full">
              {/* Curtain overlay that slides away */}
              <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ transformOrigin: "top" }}
                className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 z-10 rounded-full"
              />

              {/* Profile image */}
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                src="/profile.jpg"
                alt="Aditya Nair"
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full object-cover shadow-2xl"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))",
                }}
              />

              {/* Optional: Add a subtle glow ring that appears after curtain */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute inset-0 rounded-full border-2 border-cyan-400/20 pointer-events-none"
                style={{
                  boxShadow: "0 0 20px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.1)",
                }}
              />
            </div>
          </motion.div>
        </section>
        {/* Spacer */}
        <div className="py-12"></div>
        {/* What Defines My Journey Section */}
        <section className="py-16 sm:py-20 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-400 glow-text-subtle">
                What Defines My Journey
              </h2>
              <blockquote className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative glow-text">
                "Convince your{" "}
                <span className="underline decoration-yellow-400 decoration-2 sm:decoration-4 underline-offset-4 sm:underline-offset-8">
                  mind
                </span>
                , and your{" "}
                <span className="underline decoration-yellow-400 decoration-2 sm:decoration-4 underline-offset-4 sm:underline-offset-8">
                  body
                </span>{" "}
                will{" "}
                <span className="underline decoration-yellow-400 decoration-2 sm:decoration-4 underline-offset-4 sm:underline-offset-8">
                  rewrite limits
                </span>
                ⚓"
              </blockquote>
            </motion.div>
          </div>
        </section>
        {/* Spacer */}
        <div className="py-12"></div>
        {/* About Section */}
        <section id="about" className="py-16 sm:py-20 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent glow-text">
                About Me
              </h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed glow-text-subtle">
                  I'm Aditya Nair, a passionate and adaptable Full Stack Developer with a strong foundation in both
                  frontend and backend technologies. My experience spans across building dynamic web applications,
                  solving algorithmic challenges, and architecting efficient systems with a focus on scalability and
                  clean design. With a keen interest in data structures, algorithms, and system design, I consistently
                  aim to create performant applications that not only meet business requirements but also enhance user
                  experience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex-shrink-0 flex justify-center lg:justify-end"
              >
                <div className="relative">
                  <img
                    src="/about-photo.jpg"
                    alt="Aditya Nair"
                    className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl object-cover shadow-2xl"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.3))",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Skills Section */}
        <SkillsSection />
        {/* Experience Section */}
        <ExperienceSection />
        {/* Projects Section */}
        <ProjectsSection />
        {/* Achievements Section */}
        <AchievementsSection />
        {/* Contact Section with Globe */}
        <section id="contact" className="py-16 sm:py-20 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col xl:flex-row items-start justify-between gap-16">
              <div className="flex-1 w-full">
                <ContactSection />
              </div>
              <div className="flex-shrink-0 xl:ml-12 self-center">
                <Globe3D />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
