"use client"

import { useState, useEffect, useCallback, memo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define the navigation style options
type NavStyle = "gradient" | "background" | "shadow" | "fixed" | "dynamic"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [navStyle, setNavStyle] = useState<NavStyle>("dynamic") // Default style
  const headerRef = useRef<HTMLElement>(null)

  // Get the current section's background color for dynamic styling
  const getSectionColor = useCallback((section: string) => {
    switch (section) {
      case "work":
        return "bg-white text-black"
      case "profile":
        return "bg-[#4a5d50]/90 text-white"
      case "about":
        return "bg-[#c5bfad]/90 text-black"
      case "experience":
        return "bg-[#1a1a1a]/90 text-white"
      case "contact":
      case "home":
      default:
        return "bg-black/90 text-white"
    }
  }, [])

  // Memoize the scroll handler to prevent recreation on each render
  const handleScroll = useCallback(() => {
    // Update header background
    setIsScrolled(window.scrollY > 10)

    // Determine active section
    const sections = ["home", "profile", "work", "about", "experience", "contact"]

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        // If the section is in view (with some tolerance)
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection((prev) => (prev !== section ? section : prev))
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    // Throttled scroll event listener
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", scrollListener, { passive: true })
    return () => window.removeEventListener("scroll", scrollListener)
  }, [handleScroll])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  // Get the appropriate header style based on the selected navigation style
  const getHeaderStyle = useCallback(() => {
    const baseStyle = "fixed top-0 w-full z-50 transition-all duration-300"

    if (!isScrolled) {
      return `${baseStyle} bg-transparent py-5`
    }

    switch (navStyle) {
      case "gradient":
        return `${baseStyle} bg-gradient-to-b from-black/90 to-black/60 backdrop-blur-sm py-3`

      case "background":
        return `${baseStyle} bg-black/90 backdrop-blur-sm py-3`

      case "shadow":
        return `${baseStyle} bg-black/80 backdrop-blur-sm py-3 shadow-lg shadow-black/20`

      case "fixed":
        return `${baseStyle} bg-black py-3`

      case "dynamic":
        return `${baseStyle} ${getSectionColor(activeSection)} backdrop-blur-sm py-3`

      default:
        return `${baseStyle} bg-black/90 backdrop-blur-sm py-3`
    }
  }, [isScrolled, navStyle, activeSection, getSectionColor])

  // Get the appropriate text color based on the active section and nav style
  const getLinkStyle = useCallback(
    (section: string) => {
      const isActive = activeSection === section

      // For dynamic style, adjust text color based on section
      if (navStyle === "dynamic") {
        const isDarkSection = ["work", "about"].includes(activeSection)

        if (isActive) {
          return isDarkSection ? "text-black font-bold" : "text-white font-bold"
        }
        return isDarkSection ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white"
      }

      // For other styles
      if (isActive) {
        return "text-white font-bold"
      }
      return "text-gray-300 hover:text-white"
    },
    [activeSection, navStyle],
  )

  return (
    <header ref={headerRef} className={getHeaderStyle()}>
      <div className="flex column container mx-auto px-4 flex items-center justify-between max-sm:flex-col">
        <div className="flex items-center w-full mb-2 justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className={cn(
              "text-xl font-bold mr-4 md:mr-8 uppercase",
              navStyle === "dynamic" && ["work", "about"].includes(activeSection) ? "text-black" : "text-white",
            )}
          >
            martin shaw
          </button>
        </div>

        <nav className="flex space-x-2 md:space-x-6 w-full justify-end">
          {/* Hide Welcome and About on mobile */}
          <button
            onClick={() => scrollToSection("home")}
            className={`hidden md:block text-sm transition-colors uppercase cursor-pointer ${getLinkStyle("home")}`}
          >
            Welcome
          </button>
          <button
            onClick={() => scrollToSection("profile")}
            className={`text-sm transition-colors uppercase cursor-pointer ${getLinkStyle("profile")}`}
          >
            Profile
          </button>
          <button
            onClick={() => scrollToSection("work")}
            className={`text-sm transition-colors uppercase cursor-pointer ${getLinkStyle("work")}`}
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`hidden md:block text-sm transition-colors uppercase cursor-pointer ${getLinkStyle("about")}`}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className={`text-sm transition-colors uppercase cursor-pointer ${getLinkStyle("experience")}`}
          >
            Exp
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={`text-sm transition-colors uppercase cursor-pointer ${getLinkStyle("contact")}`}
          >
            Contact
          </button>

          {/* Say Hello button for desktop */}
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "md:inline-flex text-xs bg-transparent border-white hover:bg-white/10 uppercase",
              navStyle === "dynamic" && ["work", "about"].includes(activeSection)
                ? "border-black text-black hover:bg-black/10"
                : "border-white text-white hover:bg-white/10",
            )}
            asChild
          >
            <a href="mailto:info@martinshaw.com?subject=martshaw.com:Hey%20(👋)"><span className="mr-1">👋</span> Say Hello</a>
          </Button>
        </nav>
      </div>
    </header>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const MemoizedHeader = memo(Header)
export { MemoizedHeader as Header }
