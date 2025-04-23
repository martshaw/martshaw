import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { shuffleArray } from "./utils"

const contentDirectory = path.join(process.cwd(), "content")

// Add this function at the top of the file
async function fetchWithCache(url: string) {
  return fetch(url, { cache: "force-cache" })
}

// Use React's cache to prevent redundant data fetching
export const getProfileData = async () => {
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
}

export const getCapabilitiesData = async () => {
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
}

export const getExperienceData = async () => {
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
}

// Unified function to get all work data from a single source
export const getAllWorkData = async () => {
  try {
    const filePath = path.join(contentDirectory, "all-work.md")

    // Try to read from the unified file first
    try {
      const fileContents = await fs.readFile(filePath, "utf8")
      const { data } = matter(fileContents)

      // Map and return the projects with unique IDs
      return shuffleArray(
        data.projects.map((project: any, index: number) => ({
          id: `project-${index + 1}`,
          title: project.title,
          client: project.client,
          description: project.description,
          image: project.image,
          link: project.link,
        })),
      )
    } catch (fileError) {
      // If the unified file doesn't exist yet, fall back to combining the two separate files
      console.log("Unified work file not found, falling back to separate files")
      return await getLegacyWorkData()
    }
  } catch (error) {
    console.error("Error fetching work data:", error)
    return []
  }
}

// Legacy function to combine data from separate files (for backward compatibility)
const getLegacyWorkData = async () => {
  try {
    // Read from both files
    const mainWorkPath = path.join(contentDirectory, "work.md")
    const moreWorkPath = path.join(contentDirectory, "more-work.md")

    const mainFileContents = await fs.readFile(mainWorkPath, "utf8")
    const moreFileContents = await fs.readFile(moreWorkPath, "utf8")

    const mainData = matter(mainFileContents).data
    const moreData = matter(moreFileContents).data

    // Combine and map projects
    const mainProjects = mainData.projects.map((project: any, index: number) => ({
      id: `project-${index + 1}`,
      title: project.title,
      client: project.client,
      description: project.description,
      image: project.image,
      link: project.link,
    }))

    const moreProjects = moreData.projects.map((project: any, index: number) => ({
      id: `more-project-${index + 1}`,
      title: project.title,
      client: project.client,
      description: project.description,
      image: project.image,
      link: project.link,
    }))

    // Combine and shuffle
    return shuffleArray([...mainProjects, ...moreProjects])
  } catch (error) {
    console.error("Error in legacy work data fetching:", error)
    return []
  }
}

// For backward compatibility - will be deprecated
export const getMainWorkData = getAllWorkData
export const getMoreWorkData = async () => []
export const getWorkData = getAllWorkData
