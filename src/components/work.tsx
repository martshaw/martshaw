"use client"

import { memo, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2, Share2, Linkedin, Twitter, Facebook, Link2, Shuffle } from "lucide-react"
import { shuffleArray } from "@/lib/utils"
import { StructuredData } from "@/components/structured-data"

interface WorkItem {
  id: string
  title: string
  client: string
  description: string
  image: string
  link: string
}

interface WorkProps {
  data: WorkItem[]
}

const WorkComponent = ({ data: initialData }: WorkProps) => {
  // State for the displayed work items
  const [data, setData] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null)

  // Initialize with shuffled data on component mount
  useEffect(() => {
    setData(shuffleArray(initialData))
    if (initialData.length > 0) {
      setSelectedCard(initialData[0].id)
    }
  }, [initialData])

  // Reshuffle the current data
  const reshuffleData = () => {
    setLoading(true)

    // Add a small delay to show the loading state
    setTimeout(() => {
      setData((prevData) => shuffleArray([...prevData]))
      setLoading(false)
    }, 300)
  }

  // Handle card selection
  const handleCardSelect = (id: string) => {
    setSelectedCard(id)
  }

  // Toggle share menu
  const toggleShareMenu = (id: string) => {
    setShowShareMenu(showShareMenu === id ? null : id)
  }

  // Share project
  const shareProject = (platform: string, item: WorkItem) => {
    const projectTitle = `${item.client} - ${item.title} | Martin Shaw Portfolio`
    const projectUrl = item.link !== "#" ? item.link : "https://martinshaw.com"
    const description = item.description

    let shareUrl = ""

    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}&title=${encodeURIComponent(projectTitle)}&summary=${encodeURIComponent(description)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(projectUrl)}&text=${encodeURIComponent(projectTitle)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl)}&quote=${encodeURIComponent(projectTitle)}`
        break
      case "copy":
        navigator.clipboard.writeText(projectUrl)
        alert("Link copied to clipboard!")
        setShowShareMenu(null)
        return
      default:
        return
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer")
    setShowShareMenu(null)
  }

  return (
    <section className="min-h-screen flex items-center bg-white text-black py-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black uppercase">Selected Work</h2>
          <div className="flex space-x-4 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={reshuffleData}
              className="text-black border-black bg-transparent hover:bg-black/5"
              title="Shuffle projects"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Shuffle className="h-4 w-4 mr-2" />}
              Shuffle
            </Button>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

        {/* Mobile: Grid View */}
        <div className="block md:hidden">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-8 transition-all duration-500 ${loading ? "opacity-50" : "opacity-100"}`}
          >
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`group transition-all duration-500 ease-in-out ${
                  loading ? "translate-y-4 opacity-0" : `translate-y-0 opacity-100`
                }`}
                style={{ transitionDelay: loading ? "0ms" : `${Math.min(index * 100, 800)}ms` }}
              >
                <div className="block overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-gray-100">
                    <Link href={item.link}>
                      <Image
                        src={item.image || "/placeholder.svg?height=600&width=800"}
                        alt={`${item.client} - ${item.title} project by Martin Shaw`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index < 2}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                    </Link>
                    <button
                      onClick={() => toggleShareMenu(item.id)}
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
                      aria-label="Share this project"
                    >
                      <Share2 className="h-4 w-4 text-black" />
                    </button>
                    {showShareMenu === item.id && (
                      <div className="absolute top-14 right-4 bg-white rounded-md shadow-lg p-2 z-20 flex flex-col gap-2">
                        <button
                          onClick={() => shareProject("linkedin", item)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Share on LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" /> <span className="text-sm">LinkedIn</span>
                        </button>
                        <button
                          onClick={() => shareProject("twitter", item)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Share on Twitter"
                        >
                          <Twitter className="h-4 w-4" /> <span className="text-sm">Twitter</span>
                        </button>
                        <button
                          onClick={() => shareProject("facebook", item)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Share on Facebook"
                        >
                          <Facebook className="h-4 w-4" /> <span className="text-sm">Facebook</span>
                        </button>
                        <button
                          onClick={() => shareProject("copy", item)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Copy link"
                        >
                          <Link2 className="h-4 w-4" /> <span className="text-sm">Copy Link</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        <Link href={item.link} className="hover:underline">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{item.client}</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                    <span className="text-sm font-medium">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Card View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500">
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${
                  selectedCard === item.id ? "opacity-100 scale-105 z-10" : "opacity-70 scale-100"
                }`}
                onClick={() => handleCardSelect(item.id)}
                onMouseEnter={() => handleCardSelect(item.id)}
              >
                <Image
                  src={item.image || "/placeholder.svg?height=600&width=800"}
                  alt={`${item.client} - ${item.title} project by Martin Shaw`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.client}</p>
                  <p className="text-xs mt-2 line-clamp-3">{item.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <Link
                      href={item.link}
                      className="text-xs font-medium bg-white text-black px-3 py-1 rounded inline-block hover:bg-gray-200 transition-colors"
                    >
                      View Project
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleShareMenu(item.id)
                      }}
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                      aria-label="Share this project"
                    >
                      <Share2 className="h-3 w-3 text-white" />
                    </button>
                    {showShareMenu === item.id && (
                      <div
                        className="absolute top-4 right-4 bg-white rounded-md shadow-lg p-2 z-20 flex flex-col gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => shareProject("linkedin", item)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Share on LinkedIn"
                        >
                          <Linkedin className="h-4 w-4 text-black" />{" "}
                          <span className="text-sm text-black">LinkedIn</span>
                        </button>
                        <button
                          onClick={() => shareProject("twitter", item)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Share on Twitter"
                        >
                          <Twitter className="h-4 w-4 text-black" /> <span className="text-sm text-black">Twitter</span>
                        </button>
                        <button
                          onClick={() => shareProject("facebook", item)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Share on Facebook"
                        >
                          <Facebook className="h-4 w-4 text-black" />{" "}
                          <span className="text-sm text-black">Facebook</span>
                        </button>
                        <button
                          onClick={() => shareProject("copy", item)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Copy link"
                        >
                          <Link2 className="h-4 w-4 text-black" /> <span className="text-sm text-black">Copy Link</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Structured Data for Projects */}
      {data.map((project) => (
        <StructuredData
          key={project.id}
          type="Project"
          data={{
            name: `${project.client} - ${project.title}`,
            description: project.description,
            url: project.link,
            image: project.image,
            creator: {
              "@type": "Person",
              name: "Martin Shaw",
              url: "https://martinshaw.com",
            },
            datePublished: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
            provider: {
              "@type": "Organization",
              name: project.client,
            },
          }}
        />
      ))}
    </section>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const Work = memo(WorkComponent)
