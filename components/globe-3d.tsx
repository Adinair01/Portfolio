"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Point3D {
  x: number
  y: number
  z: number
  lat: number
  lng: number
}

export default function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const rotationRef = useRef({ x: 0, y: 0 })
  const targetRotationRef = useRef({ x: 0, y: 0 })
  const lastMousePos = useRef({ x: 0, y: 0 })
  const dragStartPos = useRef({ x: 0, y: 0 })
  const autoRotationRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 100

    // Generate globe points (latitude/longitude grid)
    const points: Point3D[] = []

    // Create latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lng = 0; lng < 360; lng += 12) {
        const latRad = (lat * Math.PI) / 180
        const lngRad = (lng * Math.PI) / 180

        points.push({
          x: Math.cos(latRad) * Math.cos(lngRad),
          y: Math.sin(latRad),
          z: Math.cos(latRad) * Math.sin(lngRad),
          lat: latRad,
          lng: lngRad,
        })
      }
    }

    // Create longitude lines
    for (let lng = 0; lng < 360; lng += 30) {
      for (let lat = -90; lat <= 90; lat += 8) {
        const latRad = (lat * Math.PI) / 180
        const lngRad = (lng * Math.PI) / 180

        points.push({
          x: Math.cos(latRad) * Math.cos(lngRad),
          y: Math.sin(latRad),
          z: Math.cos(latRad) * Math.sin(lngRad),
          lat: latRad,
          lng: lngRad,
        })
      }
    }

    // Major cities coordinates
    const cities = [
      { name: "New York", lat: 40.7128, lng: -74.006 },
      { name: "London", lat: 51.5074, lng: -0.1278 },
      { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
      { name: "Sydney", lat: -33.8688, lng: 151.2093 },
      { name: "Mumbai", lat: 19.076, lng: 72.8777 },
      { name: "Chennai", lat: 13.0827, lng: 80.2707 }, // Your city!
    ]

    const cityPoints = cities.map((city) => {
      const latRad = (city.lat * Math.PI) / 180
      const lngRad = (city.lng * Math.PI) / 180
      return {
        name: city.name,
        x: Math.cos(latRad) * Math.cos(lngRad),
        y: Math.sin(latRad),
        z: Math.cos(latRad) * Math.sin(lngRad),
        lat: latRad,
        lng: lngRad,
      }
    })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })

      if (isDragging) {
        // Much more responsive dragging
        const deltaX = (x - lastMousePos.current.x) * 0.015 // Increased sensitivity
        const deltaY = (y - lastMousePos.current.y) * 0.015 // Increased sensitivity

        // Direct rotation control - more intuitive
        targetRotationRef.current.y += deltaX
        targetRotationRef.current.x = Math.max(
          -Math.PI / 2.5, // Slightly more freedom
          Math.min(Math.PI / 2.5, targetRotationRef.current.x + deltaY),
        )

        lastMousePos.current = { x, y }
      } else if (isHovering) {
        // Responsive hover effect - globe follows cursor
        const mouseInfluenceX = (x - centerX) * 0.003 // More responsive
        const mouseInfluenceY = (y - centerY) * 0.003

        targetRotationRef.current.x = mouseInfluenceY * 0.8 // Reduced to prevent over-rotation
        targetRotationRef.current.y = autoRotationRef.current + mouseInfluenceX * 1.2
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      lastMousePos.current = { x, y }
      dragStartPos.current = { x, y }

      // Stop auto-rotation when dragging starts
      autoRotationRef.current = targetRotationRef.current.y
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setIsDragging(false)
      // Resume gentle auto-rotation
      if (!isDragging) {
        autoRotationRef.current = targetRotationRef.current.y
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length === 1) {
        setIsDragging(true)
        const touch = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top

        lastMousePos.current = { x, y }
        dragStartPos.current = { x, y }
        autoRotationRef.current = targetRotationRef.current.y
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length === 1 && isDragging) {
        const touch = e.touches[0]
        const rect = canvas.getBoundingClientRect()
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top

        const deltaX = (x - lastMousePos.current.x) * 0.012 // Slightly reduced for touch
        const deltaY = (y - lastMousePos.current.y) * 0.012

        targetRotationRef.current.y += deltaX
        targetRotationRef.current.x = Math.max(
          -Math.PI / 2.5,
          Math.min(Math.PI / 2.5, targetRotationRef.current.x + deltaY),
        )

        lastMousePos.current = { x, y }
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const rotatePoint = (point: Point3D, rotX: number, rotY: number) => {
      // Rotate around Y axis
      const x = point.x * Math.cos(rotY) - point.z * Math.sin(rotY)
      let z = point.x * Math.sin(rotY) + point.z * Math.cos(rotY)

      // Rotate around X axis
      const y = point.y * Math.cos(rotX) - z * Math.sin(rotX)
      z = point.y * Math.sin(rotX) + z * Math.cos(rotX)

      return { x, y, z }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Ultra-smooth rotation interpolation
      const lerpFactor = isDragging ? 0.25 : isHovering ? 0.12 : 0.08
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * lerpFactor
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * lerpFactor

      // Gentle auto rotation when not interacting
      if (!isDragging && !isHovering) {
        autoRotationRef.current += 0.003 // Very slow auto-rotation
        targetRotationRef.current.y = autoRotationRef.current
        targetRotationRef.current.x *= 0.95 // Gradually return to center
      }

      // Enhanced globe outline with dynamic glow
      const glowIntensity = isDragging ? 0.8 : isHovering ? 0.6 : 0.4
      const outlineGradient = ctx.createRadialGradient(centerX - 20, centerY - 20, 0, centerX, centerY, radius)
      outlineGradient.addColorStop(0, `rgba(139, 92, 246, ${glowIntensity})`)
      outlineGradient.addColorStop(1, `rgba(139, 92, 246, ${glowIntensity * 0.3})`)

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = outlineGradient
      ctx.lineWidth = isDragging ? 3 : 2
      ctx.stroke()

      // Dynamic surface gradient
      const surfaceGradient = ctx.createRadialGradient(centerX - 30, centerY - 30, 0, centerX, centerY, radius)
      surfaceGradient.addColorStop(0, `rgba(139, 92, 246, ${0.15 + glowIntensity * 0.1})`)
      surfaceGradient.addColorStop(0.4, `rgba(6, 182, 212, ${0.08 + glowIntensity * 0.05})`)
      surfaceGradient.addColorStop(0.8, "rgba(0, 0, 0, 0.1)")
      surfaceGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)")

      ctx.fillStyle = surfaceGradient
      ctx.fill()

      // Enhanced grid points with better depth
      points.forEach((point) => {
        const rotated = rotatePoint(point, rotationRef.current.x, rotationRef.current.y)

        if (rotated.z > -0.3) {
          const screenX = centerX + rotated.x * radius
          const screenY = centerY - rotated.y * radius
          const depth = (rotated.z + 1) / 2
          const opacity = Math.max(0.15, depth * 0.8)
          const size = Math.max(0.8, depth * 2)

          ctx.beginPath()
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`
          ctx.fill()
        }
      })

      // Enhanced cities with better interaction feedback
      cityPoints.forEach((city) => {
        const rotated = rotatePoint(city, rotationRef.current.x, rotationRef.current.y)

        if (rotated.z > -0.4) {
          const screenX = centerX + rotated.x * radius
          const screenY = centerY - rotated.y * radius
          const depth = (rotated.z + 1) / 2
          const opacity = Math.max(0.4, depth * 0.95)

          // Enhanced glow for cities
          ctx.shadowColor = "rgba(6, 182, 212, 0.9)"
          ctx.shadowBlur = isDragging ? 12 : 8
          ctx.beginPath()
          ctx.arc(screenX, screenY, 3.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`
          ctx.fill()
          ctx.shadowBlur = 0

          // Special highlighting for Chennai
          if (city.name === "Chennai") {
            ctx.shadowColor = "rgba(255, 215, 0, 0.9)"
            ctx.shadowBlur = isDragging ? 15 : 10
            ctx.beginPath()
            ctx.arc(screenX, screenY, 4.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 215, 0, ${opacity})`
            ctx.fill()
            ctx.shadowBlur = 0

            // City name with better visibility
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`
            ctx.font = "12px Arial"
            ctx.textAlign = "center"
            ctx.fillText(city.name, screenX, screenY - 12)
          }
        }
      })

      // Smoother latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180
        const linePoints = []

        for (let lng = 0; lng <= 360; lng += 2) {
          const lngRad = (lng * Math.PI) / 180
          const point = {
            x: Math.cos(latRad) * Math.cos(lngRad),
            y: Math.sin(latRad),
            z: Math.cos(latRad) * Math.sin(lngRad),
            lat: latRad,
            lng: lngRad,
          }
          const rotated = rotatePoint(point, rotationRef.current.x, rotationRef.current.y)
          linePoints.push({
            ...rotated,
            screenX: centerX + rotated.x * radius,
            screenY: centerY - rotated.y * radius,
          })
        }

        ctx.beginPath()
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.25 + glowIntensity * 0.1})`
        ctx.lineWidth = 1

        let isDrawing = false
        linePoints.forEach((point, i) => {
          if (point.z > -0.6) {
            if (!isDrawing) {
              ctx.moveTo(point.screenX, point.screenY)
              isDrawing = true
            } else {
              ctx.lineTo(point.screenX, point.screenY)
            }
          } else {
            isDrawing = false
          }
        })
        ctx.stroke()
      }

      // Smoother longitude lines
      for (let lng = 0; lng < 360; lng += 30) {
        const lngRad = (lng * Math.PI) / 180
        const linePoints = []

        for (let lat = -90; lat <= 90; lat += 2) {
          const latRad = (lat * Math.PI) / 180
          const point = {
            x: Math.cos(latRad) * Math.cos(lngRad),
            y: Math.sin(latRad),
            z: Math.cos(latRad) * Math.sin(lngRad),
            lat: latRad,
            lng: lngRad,
          }
          const rotated = rotatePoint(point, rotationRef.current.x, rotationRef.current.y)
          linePoints.push({
            ...rotated,
            screenX: centerX + rotated.x * radius,
            screenY: centerY - rotated.y * radius,
          })
        }

        ctx.beginPath()
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.25 + glowIntensity * 0.1})`
        ctx.lineWidth = 1

        let isDrawing = false
        linePoints.forEach((point, i) => {
          if (point.z > -0.6) {
            if (!isDrawing) {
              ctx.moveTo(point.screenX, point.screenY)
              isDrawing = true
            } else {
              ctx.lineTo(point.screenX, point.screenY)
            }
          } else {
            isDrawing = false
          }
        })
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false })
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false })

    // Prevent context menu on right click
    canvas.addEventListener("contextmenu", (e) => e.preventDefault())

    animate()

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
      canvas.removeEventListener("contextmenu", (e) => e.preventDefault())
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDragging, isHovering])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative gold-hover-globe"
    >
      <canvas
        ref={canvasRef}
        width={250}
        height={250}
        className={`${isDragging ? "cursor-grabbing" : "cursor-grab"} transition-all duration-300 select-none`}
        style={{
          filter: `drop-shadow(0 0 ${isDragging ? "40px" : "30px"} rgba(139, 92, 246, ${isDragging ? "0.6" : "0.4"}))`,
          borderRadius: "50%",
        }}
      />
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs text-gray-400 glow-text-subtle">
          {isDragging ? "🌍 Exploring..." : isHovering ? "🌍 Move to explore" : "🌍 Interactive Globe"}
        </p>
      </div>
    </motion.div>
  )
}
