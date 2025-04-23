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

// Set to force-dynamic to ensure fresh data on each page load
export const dynamic = "force-dynamic"
export const revalidate = 0 // Disable cache to ensure randomization on each page load

export default async function Home() {
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
            <Profile data={profile} />
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

      {/* Structured data for the website */}
      <StructuredData
        type="WebSite"
        data={{
          name: "Martin Shaw Portfolio",
          url: "https://martinshaw.com",
          description:
            "Solutions Architect and Engineer specialising in MACH architecture and digital solutions for Fortune 500 clients.",
          author: {
            "@type": "Person",
            name: "Martin Shaw",
            url: "https://martinshaw.com",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: "https://martinshaw.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />

      {/* Structured data for the person */}
      <StructuredData
        type="Person"
        data={{
          name: "Martin Shaw",
          jobTitle: "Solutions Architect / Engineer",
          url: "https://martinshaw.com",
          sameAs: ["http://linkedin.com/in/martshaw", "https://github.com/martshaw"],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Edinburgh",
            addressRegion: "Scotland",
            addressCountry: "UK",
          },
          description:
            "Solutions Architect and Engineer specialising in MACH architecture and digital solutions for Fortune 500 clients.",
        }}
      />

      {/* Structured data for the portfolio */}
      <StructuredData
        type="WebPage"
        data={{
          "@type": "ProfilePage",
          name: "Martin Shaw Portfolio",
          description: "Portfolio of Martin Shaw, Solutions Architect and Engineer based in Edinburgh",
          mainEntity: {
            "@type": "Person",
            name: "Martin Shaw",
            jobTitle: "Solutions Architect / Engineer",
            url: "https://martinshaw.com",
            sameAs: ["http://linkedin.com/in/martshaw", "https://github.com/martshaw"],
          },
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
