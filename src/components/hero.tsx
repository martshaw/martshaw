"use client"

import { useEffect, useRef, useCallback, memo } from "react"
import { ChevronDown } from "lucide-react"

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 })
  const particlesRef = useRef<Particle[]>([])

  // Particle class definition
  class Particle {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    color: string
    baseX: number
    baseY: number
    density: number

    constructor(canvas: HTMLCanvasElement) {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.baseX = this.x
      this.baseY = this.y
      this.density = Math.random() * 30 + 1
      this.vx = Math.random() * 0.3 - 0.15
      this.vy = Math.random() * 0.3 - 0.15
      this.radius = Math.random() * 2 + 1
      this.color = "rgba(255, 255, 255, 0.8)"
    }

    update(canvas: HTMLCanvasElement, mouse: { x: number; y: number; radius: number }) {
      // Move back to original position if no mouse interaction
      if (mouse.x === 0 && mouse.y === 0) {
        const dx = this.baseX - this.x
        const dy = this.baseY - this.y
        this.x += dx * 0.02
        this.y += dy * 0.02
      } else {
        // Mouse interaction
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 0) {
          // Prevent division by zero
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const maxDistance = mouse.radius
          const force = (maxDistance - distance) / maxDistance
          const directionX = forceDirectionX * force * this.density
          const directionY = forceDirectionY * force * this.density

          if (distance < mouse.radius) {
            this.x -= directionX
            this.y -= directionY
          } else {
            if (this.x !== this.baseX) {
              const dx = this.baseX - this.x
              this.x += dx * 0.05
            }
            if (this.y !== this.baseY) {
              const dy = this.baseY - this.y
              this.y += dy * 0.05
            }
          }
        }
      }

      // Slow drift
      this.baseX += this.vx
      this.baseY += this.vy

      // Bounce off edges
      if (this.baseX < 0 || this.baseX > canvas.width) {
        this.vx = -this.vx
      }
      if (this.baseY < 0 || this.baseY > canvas.height) {
        this.vy = -this.vy
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
    }
  }

  // Function to draw lines between particles
  const drawLines = useCallback((particles: Particle[], ctx: CanvasRenderingContext2D, maxDistance: number) => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - distance / maxDistance
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }
  }, [])

  // Setup canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Function to update dimensions without state
    const updateCanvasDimensions = () => {
      if (container && canvas) {
        const { clientWidth, clientHeight } = container
        canvas.width = clientWidth
        canvas.height = clientHeight
      }
    }

    // Mouse move handler with throttling
    let lastMoveTime = 0
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastMoveTime < 16) return // Throttle to ~60fps

      lastMoveTime = now
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    // Mouse leave handler
    const handleMouseLeave = () => {
      mouseRef.current.x = 0
      mouseRef.current.y = 0
    }

    // Add mouse event listeners
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true })
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Create particles
    const initParticles = () => {
      const particleCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000))
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(canvas))
      }
    }

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas with a dark background
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update(canvas, mouseRef.current)
        particle.draw(ctx)
      })

      // Draw lines between particles
      drawLines(particlesRef.current, ctx, 120)

      animationRef.current = requestAnimationFrame(animate)
    }

    // Initial setup
    updateCanvasDimensions()
    initParticles()

    // Start animation
    animate()

    // Setup resize observer with debouncing
    let resizeTimeout: NodeJS.Timeout
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        updateCanvasDimensions()
        initParticles()
      }, 100)
    })

    resizeObserver.observe(container)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(resizeTimeout)
      resizeObserver.disconnect()
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [drawLines]) // Only depend on drawLines which is memoized

  const scrollToNextSection = useCallback(() => {
    const profileSection = document.getElementById("profile")
    if (profileSection) {
      profileSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen flex items-center bg-black pb-24">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="container mx-auto px-4 z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white">
          Designing and delivering cutting-edge
          solutions within dynamic digital
          environments for Fortune 500 clients.
        </h1>
      </div>
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-10"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const MemoizedHero = memo(Hero)
export { MemoizedHero as Hero }
