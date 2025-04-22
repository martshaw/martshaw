
import Script from "next/script"

interface StructuredDataProps {
  type: "Person" | "WebSite" | "WebPage" | "Project" | "Organization" | "Article" | "BreadcrumbList" | string
  data: Record<string, any>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData = {}

  switch (type) {
    case "Person":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        ...data,
      }
      break
    case "WebSite":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        ...data,
      }
      break
    case "WebPage":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        ...data,
      }
      break
    case "Project":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        ...data,
      }
      break
    case "Organization":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        ...data,
      }
      break
    case "Article":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        ...data,
      }
      break
    case "BreadcrumbList":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        ...data,
      }
      break
    default:
      structuredData = {
        "@context": "https://schema.org",
        "@type": type,
        ...data,
      }
  }

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}-${Math.random().toString(36).substring(2, 9)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
