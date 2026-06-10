"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Quote, ExternalLink, ZoomIn, BadgeCheck } from "lucide-react"
import { useState } from "react"
import ImageZoomModal from "./image-zoom-modal"

const highlights = [
  "Owned the full lifecycle: planning, build, deployment, SEO, and handover",
  "Shipped to a real client on a real deadline, not a sandbox",
  "Responsive and fast across every device the client tested",
]

export default function BuiltForClientsSection() {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <section id="clients" className="py-16 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent glow-text">
            Built for Clients
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto glow-text-subtle px-4">
            Not just side projects. Real production websites shipped for paying businesses, owned end to end from the
            first planning call to deployment and the fixes that come after launch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-5xl mx-auto"
        >
          <Card className="bg-black/40 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 gold-hover-card">
            <CardContent className="p-5 sm:p-8">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
                {/* Quote + attribution + CTA */}
                <div className="flex-1 flex flex-col justify-center order-2 lg:order-1">
                  <Quote className="w-8 h-8 text-cyan-400/70 mb-4" />
                  <blockquote className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                    "The website is responsive, fast, and user-friendly across all devices. Communication throughout the
                    project was seamless, and the final product exceeded expectations."
                  </blockquote>
                  <div className="mb-6">
                    <p className="text-white font-semibold">Mili Nair</p>
                    <p className="text-cyan-400 text-sm">GM, Devi Enterprises</p>
                    <p className="text-gray-400 text-sm mt-1">Delivered and handed over devipumps.in</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {highlights.map((h) => (
                      <li key={h} className="text-gray-300 text-sm flex items-start gap-2">
                        <BadgeCheck className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div>
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 glow-button"
                    >
                      <a href="https://devipumps.in" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View live site
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Testimonial screenshot (zoomable) */}
                <div className="flex-1 order-1 lg:order-2">
                  <div
                    className="relative rounded-lg overflow-hidden border border-gray-700 cursor-pointer group/image"
                    onClick={() =>
                      setZoomImage({
                        src: "/clients/devipumps-testimonial.png",
                        alt: "Client testimonial email from Devi Enterprises",
                      })
                    }
                  >
                    <img
                      src="/clients/devipumps-testimonial.png"
                      alt="Client testimonial email from Devi Enterprises"
                      className="w-full h-auto bg-white group-hover/image:scale-[1.02] transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.src !== window.location.origin + "/placeholder.svg") {
                          e.currentTarget.src = "/placeholder.svg"
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover/image:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                        Verified client
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs text-center mt-2 sm:hidden">Tap to zoom</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
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
