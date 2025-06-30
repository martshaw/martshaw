import { memo } from "react"
import Link from "next/link"

const ContactComponent = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase">Get in touch</h2>
          <p className="text-xl text-gray-300 max-w-2xl">
            Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
          </p>
          <div className="mt-8">
            <Link
              href="mailto:info@martinshaw.com?subject=martshaw.com:Hey%20(👋)"
              className="inline-block bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors uppercase"
            >
              info@martinshaw.com
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-medium mb-4 uppercase">Location</h3>
            <p className="text-sm text-gray-400 uppercase">London / Edinburgh, UK</p>
            <p className="text-sm text-gray-400">51.5099° N, 0.1181° W / 55.9533° N, 3.1883° W</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4 uppercase">Availability</h3>
            <p className="text-sm text-gray-400">Open to new opportunities</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4 uppercase">Expertise</h3>
            <p className="text-sm text-gray-400">Solutions Architecture</p>
            <p className="text-sm text-gray-400">MACH, DXP, Cloud</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const Contact = memo(ContactComponent)
