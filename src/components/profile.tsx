import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ProfileProps {
  data: {
    name: string
    title: string
    location: string
    email: string
  }
}

const ProfileComponent = ({ data }: ProfileProps) => {
  return (
    <section className="min-h-screen flex items-center bg-[#4a5d50] py-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div>
            <h2 className="text-2xl font-medium mb-2 uppercase">Profile</h2>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
              Solutions Architect
              <br />
              Engineer
            </h1>
            <p className="text-lg text-gray-200 max-w-xl">
              Specialising in designing and implementing scalable, resilient systems for Fortune 500 clients.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex items-start space-x-8">
            <Button variant="link" className="text-white p-0 uppercase" asChild>
              <Link href="#about">About</Link>
            </Button>
            <Button variant="link" className="text-white p-0 uppercase" asChild>
              <Link href="#experience">Experience</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="text-gray-300 mb-1 uppercase">Location</p>
            <p className="uppercase">London / Edinburgh, UK</p>
            <p className="text-sm text-gray-400">51.5099° N, 0.1181° W / 55.9533° N, 3.1883° W</p>
          </div>
          <div>
            <p className="text-gray-300 mb-1 uppercase">Specialisation</p>
            <p>MACH Architecture</p>
            <p>Digital Experience Platforms</p>
          </div>
          <div>
            <p className="text-gray-300 mb-1 uppercase">Industries</p>
            <p>E-commerce</p>
            <p>Enterprise Solutions</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const Profile = memo(ProfileComponent)
