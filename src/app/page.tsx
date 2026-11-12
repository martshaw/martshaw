import { Suspense } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Profile } from "@/components/profile"
import { AboutCapabilities } from "@/components/about-capabilities"
import { Work } from "@/components/work"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"
import { PersistentFooter } from "@/components/persistent-footer"
import { StructuredData } from "@/components/structured-data"
import { getAllWorkData } from "@/lib/data"
import { getProfileData, getCapabilitiesData, getExperienceData } from "@/lib/data"
import { LoadingSection } from "@/components/loading-section"
import { PERSON_ID, SITE_URL } from "@/lib/site"

// Set to force-dynamic to ensure fresh data on each page load
export const dynamic = "force-dynamic"
export const fetchCache = "default-cache" // New in Next.js 15 to enable caching

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<Record<string, string>>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  // Resolve params and searchParams (Next.js 15 change)
  await params
  await searchParams

  // Parallel data fetching for better performance
  const [profile, capabilities, experience, workData] = await Promise.all([
    getProfileData(),
    getCapabilitiesData(),
    getExperienceData(),
    getAllWorkData(),
  ])

  return (
    <div>
      <Header />
      <main>
        <section id="home" className="min-h-screen">
          <Hero />
        </section>

        <Suspense fallback={<LoadingSection />}>
          <section id="profile" className="min-h-screen">
            <Profile />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <section id="work" className="min-h-screen">
            <Work data={workData} />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <section id="about" className="min-h-screen">
            <AboutCapabilities capabilities={capabilities} profile={{ summary: profile.summary }} />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <section id="experience" className="min-h-screen">
            <Experience data={experience} />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <section id="contact" className="min-h-screen">
            <Contact />
          </section>
        </Suspense>
      </main>
      <PersistentFooter />

      <StructuredData
        type="WebSite"
        data={{
          name: "Martin Shaw Portfolio",
          url: SITE_URL,
          description:
            "Solutions Architect and Engineer specialising in MACH architecture and digital solutions for Fortune 500 clients.",
          author: { "@id": PERSON_ID },
        }}
      />

      <StructuredData
        type="WebPage"
        data={{
          "@type": "ProfilePage",
          name: "Martin Shaw Portfolio",
          description: "Portfolio of Martin Shaw, Solutions Architect and Engineer",
          mainEntity: { "@id": PERSON_ID },
          specialty: [
            "Solutions Architecture",
            "MACH Architecture",
            "Digital Experience Platforms",
            "Frontend Development",
          ],
        }}
      />
    </div>
  )
}
