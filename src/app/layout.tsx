import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

// Define site URL for canonical links and social sharing
const siteUrl = "https://martinshaw.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Martin Shaw | Solutions Architect",
    template: "%s | Martin Shaw",
  },
  description:
    "Solutions Architect and Engineer specialising in MACH architecture and digital solutions for Fortune 500 clients.",
  keywords: [
    "Solutions Architect",
    "Engineer",
    "MACH",
    "Microservices",
    "API-first",
    "Cloud-native",
    "Headless",
    "Digital Experience",
    "Enterprise Solutions",
    "Frontend Development",
  ],
  authors: [{ name: "Martin Shaw", url: siteUrl }],
  creator: "Martin Shaw",
  publisher: "Martin Shaw",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-GB": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  // Open Graph metadata for Facebook, LinkedIn, etc.
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Martin Shaw Portfolio",
    title: "Martin Shaw | Solutions Architect",
    description:
      "Solutions Architect and Engineer specialising in MACH architecture and digital solutions for Fortune 500 clients.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Martin Shaw - Solutions Architect",
      },
    ],
  },
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Martin Shaw | Solutions Architect",
    description:
      "Solutions Architect and Engineer specialising in MACH architecture and digital solutions for Fortune 500 clients.",
    images: [`${siteUrl}/twitter-image.png`],
    creator: "@martinshaw",
  },
  category: "technology",
  applicationName: "Martin Shaw Portfolio",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  archives: [`${siteUrl}/archive`],
  bookmarks: [`${siteUrl}/bookmarks`],
  assets: [`${siteUrl}/assets`],
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon set */}
        <link rel="icon" href="/thinking-emoji.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/thinking-emoji-180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/thinking-emoji-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/thinking-emoji-16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>

        {/* Structured data for rich results */}
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Martin Shaw",
              jobTitle: "Solutions Architect / Engineer",
              url: siteUrl,
              sameAs: ["http://linkedin.com/in/martshaw", "https://github.com/martshaw"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Edinburgh",
                addressRegion: "Scotland",
                addressCountry: "UK",
              },
              description:
                "Solutions Architect and Engineer specialising in MACH architecture and digital solutions for Fortune 500 clients.",
            }),
          }}
        />
      </body>
    </html>
  )
}
