import type { NextApiRequest, NextApiResponse } from "next"
import { getAllWorkData } from "../lib/data"

const SITE_URL = "https://martinshaw.com"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set the appropriate content type
  res.setHeader("Content-Type", "text/xml")

  // Get the current date in ISO format (YYYY-MM-DD)
  const date = new Date().toISOString().split("T")[0]

  // Define the main pages/sections
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "monthly" },
    { url: "/#profile", priority: "0.8", changefreq: "monthly" },
    { url: "/#work", priority: "0.8", changefreq: "weekly" },
    { url: "/#about", priority: "0.7", changefreq: "monthly" },
    { url: "/#experience", priority: "0.7", changefreq: "monthly" },
    { url: "/#contact", priority: "0.6", changefreq: "monthly" },
  ]

  // Start building the sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`

  // Add static pages to the sitemap
  staticPages.forEach((page) => {
    sitemap += `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  })

  // If you have dynamic pages (like work examples with their own pages),
  // you could add them here
  try {
    const workData = await getAllWorkData()

    // If you have individual project pages, you could add them like this:
    // workData.forEach((project) => {
    //   sitemap += `  <url>
    //     <loc>${SITE_URL}/work/${project.id}</loc>
    //     <lastmod>${date}</lastmod>
    //     <changefreq>monthly</changefreq>
    //     <priority>0.6</priority>
    //   </url>
    // `;
    // });
  } catch (error) {
    console.error("Error fetching work data:", error)
  }

  // Close the sitemap XML
  sitemap += `</urlset>`

  // Send the sitemap as the response
  res.status(200).send(sitemap)
}
