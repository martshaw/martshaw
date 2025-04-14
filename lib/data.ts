import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { cache } from "react"

const contentDirectory = path.join(process.cwd(), "content")

// Use React's cache to prevent redundant data fetching
export const getProfileData = cache(async () => {
  try {
    const filePath = path.join(contentDirectory, "profile.md")
    const fileContents = await fs.readFile(filePath, "utf8")

    const { data, content } = matter(fileContents)

    return {
      name: data.name,
      title: data.title,
      location: data.location,
      email: data.email,
      summary: content.trim().replace(/```/g, ""),
    }
  } catch (error) {
    console.error("Error fetching profile data:", error)
    return {
      name: "Martin Shaw",
      title: "Solutions Architect / Engineer",
      location: "EDINBURGH, UK",
      email: "info@martinshaw.com",
      summary: "A forward-thinking technologist with a focus on designing and delivering cutting-edge solutions.",
    }
  }
})

export const getCapabilitiesData = cache(async () => {
  try {
    const filePath = path.join(contentDirectory, "capabilities.md")
    const fileContents = await fs.readFile(filePath, "utf8")

    const { data } = matter(fileContents)

    return data.capabilities.map((capability: any, index: number) => ({
      id: `capability-${index + 1}`,
      title: capability.title,
      description: capability.description,
    }))
  } catch (error) {
    console.error("Error fetching capabilities data:", error)
    return []
  }
})

export const getExperienceData = cache(async () => {
  try {
    const filePath = path.join(contentDirectory, "experience.md")
    const fileContents = await fs.readFile(filePath, "utf8")

    const { data } = matter(fileContents)

    return data.experience.map((job: any, index: number) => ({
      id: `job-${index + 1}`,
      company: job.company,
      position: job.position,
      period: job.period,
      description: job.description,
      website: job.website || null,
    }))
  } catch (error) {
    console.error("Error fetching experience data:", error)
    return []
  }
})

export const getWorkData = cache(async () => {
  try {
    const filePath = path.join(contentDirectory, "work.md")
    const fileContents = await fs.readFile(filePath, "utf8")

    const { data } = matter(fileContents)

    return data.projects.map((project: any, index: number) => ({
      id: `project-${index + 1}`,
      title: project.title,
      client: project.client,
      description: project.description,
      image: project.image,
      link: project.link,
    }))
  } catch (error) {
    console.error("Error fetching work data:", error)
    return []
  }
})

export const getMoreWorkData = cache(async () => {
  try {
    const filePath = path.join(contentDirectory, "more-work.md")
    const fileContents = await fs.readFile(filePath, "utf8")

    const { data } = matter(fileContents)

    return data.projects.map((project: any, index: number) => ({
      id: `more-project-${index + 1}`,
      title: project.title,
      client: project.client,
      description: project.description,
      image: project.image,
      link: project.link,
    }))
  } catch (error) {
    console.error("Error fetching more work data:", error)
    // Return fallback data if file doesn't exist yet
    return [
      {
        id: "more-project-1",
        title: "Digital Transformation",
        client: "Financial Services Company",
        description: "Complete digital transformation of legacy systems, improving customer experience by 40%.",
        image: "/placeholder.svg?height=600&width=800",
        link: "#",
      },
      {
        id: "more-project-2",
        title: "Mobile App Development",
        client: "Retail Brand",
        description: "Developed a mobile app that increased customer engagement by 35% and sales by 20%.",
        image: "/placeholder.svg?height=600&width=800",
        link: "#",
      },
      {
        id: "more-project-3",
        title: "E-commerce Platform",
        client: "Fashion Retailer",
        description: "Built a scalable e-commerce platform handling 10,000+ concurrent users during peak sales.",
        image: "/placeholder.svg?height=600&width=800",
        link: "#",
      },
      {
        id: "more-project-4",
        title: "CMS Implementation",
        client: "Media Company",
        description: "Implemented a headless CMS that reduced content publishing time by 60%.",
        image: "/placeholder.svg?height=600&width=800",
        link: "#",
      },
    ]
  }
})
