"use client"

import { memo } from "react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Linkedin, Github, Mail } from "lucide-react"

const PersistentFooter = () => {
  // Get current year dynamically
  const currentYear = new Date().getFullYear()

  // Format today's date in British English format (DD/MM/YYYY)
  const today = formatDate(new Date())

  return (
    <footer className="md:fixed relative bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-t border-white/10 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold uppercase">Martin Shaw</h3>
            <p className="text-sm text-gray-400">Solutions Architect Engineer</p>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-8 items-center">
            <div className="mb-2 md:mb-0">
              <Link
                href="mailto:info@martinshaw.com?subject=martshaw.com:Hey%20(👋)"
                className="text-sm hover:text-white transition-colors flex items-center"
                aria-label="Email Martin Shaw"
              >
                <Mail className="inline-block mr-2 h-4 w-4" />
                info@martinshaw.com
              </Link>
            </div>

            <div className="flex space-x-4">
              <Link
                href="http://linkedin.com/in/martshaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="inline-block mr-2 h-4 w-4" />
                <span className="uppercase">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/martshaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center uppercase"
                aria-label="GitHub Profile"
              >
                <Github className="inline-block mr-2 h-4 w-4" />
                <span className="uppercase">Github</span>
              </Link>
              <span className="text-sm text-gray-500">© {currentYear}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const MemoizedPersistentFooter = memo(PersistentFooter)
export { MemoizedPersistentFooter as PersistentFooter }
