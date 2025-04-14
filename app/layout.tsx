import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

export const metadata: Metadata = {
  title: "Martin Shaw | Solutions Architect",
  description:
    "Portfolio of Martin Shaw, Solutions Architect and Engineer specialising in MACH architecture and digital solutions for Fortune 500 clients.",
  keywords: ["Solutions Architect", "Engineer", "MACH", "Microservices", "API-first", "Cloud-native", "Headless"],
  authors: [{ name: "Martin Shaw" }],
  creator: "Martin Shaw",
  publisher: "Martin Shaw",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://martinshaw.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased scroll-smooth">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
