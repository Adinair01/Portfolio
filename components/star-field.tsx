"use client"

import { useEffect, useRef, useState } from "react"

interface Star {
  x: number
  y: number
  z: number
  prevX: number
  prevY: number
  speed: number
}

interface CursorTrail {
  x: number
  y: number
  opacity: number
  size: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const cursorTrailRef = useRef<CursorTrail[]>([])
  const animationRef = useRef<number>()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      const stars: Star[] = []
      for (let i = 0; i < 800; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          prevX: 0,
          prevY: 0,
          speed: 0.2 + Math.random() * 0.8, // Slower speed
        })
      }
      starsRef.current = stars
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      // Add cursor trail
      cursorTrailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        size: 15 + Math.random() * 8,
      })

      // Limit trail length
      if (cursorTrailRef.current.length > 12) {
        cursorTrailRef.current.shift()
      }
    }

    const animate = () => {
      // Create space background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width,
      )
      gradient.addColorStop(0, "rgba(15, 23, 42, 1)")
      gradient.addColorStop(0.5, "rgba(30, 27, 75, 1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw moving stars (slower)
      starsRef.current.forEach((star) => {
        star.prevX = (star.x / star.z) * 200 + centerX
        star.prevY = (star.y / star.z) * 200 + centerY

        star.z -= star.speed * 0.7 // Much slower movement

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2
          star.y = Math.random() * canvas.height - canvas.height / 2
          star.z = 1000
          star.prevX = (star.x / star.z) * 200 + centerX
          star.prevY = (star.y / star.z) * 200 + centerY
        }

        const x = (star.x / star.z) * 200 + centerX
        const y = (star.y / star.z) * 200 + centerY

        const opacity = Math.max(0, 1 - star.z / 1000)
        const size = Math.max(0, (1 - star.z / 1000) * 2.5)

        // Draw star trail
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`
        ctx.lineWidth = size
        ctx.beginPath()
        ctx.moveTo(star.prevX, star.prevY)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Draw star point
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw cursor trail
      cursorTrailRef.current.forEach((trail, index) => {
        trail.opacity -= 0.08
        trail.size *= 0.92

        if (trail.opacity > 0) {
          const gradient = ctx.createRadialGradient(trail.x, trail.y, 0, trail.x, trail.y, trail.size)
          gradient.addColorStop(0, `rgba(139, 92, 246, ${trail.opacity * 0.8})`)
          gradient.addColorStop(0.5, `rgba(6, 182, 212, ${trail.opacity * 0.4})`)
          gradient.addColorStop(1, `rgba(139, 92, 246, 0)`)

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Remove faded trails
      cursorTrailRef.current = cursorTrailRef.current.filter((trail) => trail.opacity > 0)

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createStars()
    animate()

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
