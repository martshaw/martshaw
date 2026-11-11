import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { shuffleArray } from "./utils"

const contentDirectory = path.join(process.cwd(), "content")

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

    return data.capabilities.map((capability: { title: string; description: string }, index: number) => ({
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

    return data.experience.map((job: { company: string; position: string; period: string; description: string; website?: string }, index: number) => ({
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

type WorkProject = {
  title: string
  client: string
  description: string
  image: string
  link: string
}

export const getAllWorkData = async () => {
  try {
    const filePath = path.join(contentDirectory, "work.md")
    const fileContents = await fs.readFile(filePath, "utf8")
    const { data } = matter(fileContents)

    return shuffleArray(
      (data.projects as WorkProject[]).map((project, index) => ({
        id: `project-${index + 1}`,
        title: project.title,
        client: project.client,
        description: project.description,
        image: project.image,
        link: project.link,
      })),
    )
  } catch (error) {
    console.error("Error fetching work data:", error)
    return []
  }
}
