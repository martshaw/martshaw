
import { memo } from "react"
import Link from "next/link"
import { formatDateRange } from "@/lib/utils"
import { StructuredData } from "@/components/structured-data"

interface Experience {
  id: string
  company: string
  position: string
  period: string
  description: string[]
  startDate?: string // ISO date string
  endDate?: string // ISO date string or "Present"
  website?: string // Company website URL
}

interface ExperienceProps {
  data: Experience[]
}

const ExperienceComponent = ({ data }: ExperienceProps) => {
  return (
    <section className="min-h-screen flex items-center bg-[#1a1a1a] text-white py-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">WORK EXPERIENCE</h2>
        </div>

        <div className="space-y-16">
          {data.map((job) => {
            // Format the date range if startDate is available
            const formattedPeriod = job.startDate
              ? formatDateRange(
                  new Date(job.startDate),
                  job.endDate === "Present" ? "Present" : new Date(job.endDate || ""),
                )
              : job.period

            return (
              <div key={job.id} className="border-t border-white/20 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {job.website ? (
                        <Link
                          href={job.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-300 transition-colors"
                        >
                          {job.company}
                        </Link>
                      ) : (
                        job.company
                      )}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {job.position} | {formattedPeriod}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <ul className="space-y-2">
                      {job.description.map((item, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Structured data for each job */}
                <StructuredData
                  type="Organization"
                  data={{
                    name: job.company,
                    url: job.website || null,
                    employee: {
                      "@type": "Person",
                      name: "Martin Shaw",
                      jobTitle: job.position,
                      description: job.description.join(" "),
                    },
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const Experience = memo(ExperienceComponent)

