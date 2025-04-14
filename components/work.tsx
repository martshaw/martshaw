"use client"

import { memo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { fetchMoreWorkData } from "@/app/actions"

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
  const [data, setData] = useState<WorkItem[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "cards">("grid")
  const [selectedCard, setSelectedCard] = useState<string | null>(initialData[0]?.id || null)

  // Load more work examples
  const loadMoreWork = async () => {
    if (showAll) {
      // If already showing all, just toggle back to initial data
      setData(initialData)
      setShowAll(false)
      return
    }

    setLoading(true)
    try {
      const moreWork = await fetchMoreWorkData()
      setData([...initialData, ...moreWork])
      setShowAll(true)
    } catch (error) {
      console.error("Error loading more work:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle card selection
  const handleCardSelect = (id: string) => {
    setSelectedCard(id)
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
              onClick={() => setViewMode(viewMode === "grid" ? "cards" : "grid")}
              className="text-black border-black hover:bg-black/5"
            >
              {viewMode === "grid" ? "Card View" : "Grid View"}
            </Button>
            <Button variant="link" className="text-black p-0 uppercase" onClick={loadMoreWork} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : showAll ? (
                "Show Less"
              ) : (
                "View All"
              )}
            </Button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ${loading ? "opacity-50" : "opacity-100"}`}
          >
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`group transition-all duration-500 ease-in-out ${
                  loading ? "translate-y-4 opacity-0" : `translate-y-0 opacity-100 transition-delay-${index * 100}`
                }`}
                style={{ transitionDelay: loading ? "0ms" : `${index * 100}ms` }}
              >
                <Link href={item.link} className="block overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src={item.image || "/placeholder.svg?height=600&width=800"}
                      alt={`${item.client} - ${item.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.client}</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                    <span className="text-sm font-medium">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Card View */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-500">
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${
                  selectedCard === item.id ? "opacity-100 scale-105 z-10" : "opacity-50 scale-100"
                }`}
                onClick={() => handleCardSelect(item.id)}
                onMouseEnter={() => handleCardSelect(item.id)}
              >
                <Image
                  src={item.image || "/placeholder.svg?height=600&width=800"}
                  alt={`${item.client} - ${item.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.client}</p>
                  <p className="text-xs mt-2 line-clamp-3">{item.description}</p>
                  <Link
                    href={item.link}
                    className="mt-3 text-xs font-medium bg-white text-black px-3 py-1 rounded inline-block hover:bg-gray-200 transition-colors"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button
            variant="outline"
            className="text-black border-black hover:bg-black/5 uppercase"
            onClick={loadMoreWork}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : showAll ? (
              "Show Less"
            ) : (
              "View All"
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const Work = memo(WorkComponent)
