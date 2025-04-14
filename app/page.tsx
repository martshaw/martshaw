import { Suspense } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Profile } from "@/components/profile"
import { AboutCapabilities } from "@/components/about-capabilities"
import { Work } from "@/components/work"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"
import { PersistentFooter } from "@/components/persistent-footer"
import { getProfileData, getCapabilitiesData, getExperienceData, getWorkData, getMoreWorkData } from "@/lib/data"
import { LoadingSection } from "@/components/loading-section"

export const dynamic = "force-static"
export const revalidate = 3600 // Revalidate at most every hour

export default async function Home() {
  // Parallel data fetching for better performance
  const [profile, capabilities, experience, work] = await Promise.all([
    getProfileData(),
    getCapabilitiesData(),
    getExperienceData(),
    getWorkData(),
  ])

  // Prefetch more work data to warm up the cache
  getMoreWorkData()

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll pb-16">
      <Header />
      <main>
        <section id="home" className="snap-start h-screen">
          <Hero />
        </section>

        <Suspense fallback={<LoadingSection />}>
          <section id="profile" className="snap-start min-h-screen">
            <Profile data={profile} />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <section id="work" className="snap-start min-h-screen">
            <Work data={work} />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <section id="about" className="snap-start min-h-screen">
            <AboutCapabilities capabilities={capabilities} profile={{ summary: profile.summary }} />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <section id="experience" className="snap-start min-h-screen">
            <Experience data={experience} />
          </section>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <section id="contact" className="snap-start min-h-screen">
            <Contact />
          </section>
        </Suspense>
      </main>
      <PersistentFooter />
    </div>
  )
}
