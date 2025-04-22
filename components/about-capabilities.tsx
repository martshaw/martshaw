import { memo } from "react"
import { Button } from "@/components/ui/button"

interface Capability {
  id: string
  title: string
  description: string
}

interface AboutCapabilitiesProps {
  capabilities: Capability[]
  profile: {
    summary: string
  }
}

const AboutCapabilitiesComponent = ({ capabilities, profile }: AboutCapabilitiesProps) => {
  return (
    <section className="min-h-screen flex items-center bg-[#c5bfad] py-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 uppercase">About</h2>
            <div className="text-black/80 text-lg space-y-4">
              {profile.summary.split("\n").map((paragraph, i) => (
                <p key={i}>{paragraph.replace(/Edinburgh/g, "EDINBURGH")}</p>
              ))}
            </div>
          </div>
          <div className="flex items-end">
            <h2 className="text-3xl md:text-4xl font-bold text-black uppercase">
              I architect digital solutions and transform
              <br />
              
              enterprise businesses into,
              <br />
              modern future first organisations
            
            </h2>
          </div>
        </div>

        <div className="border-t border-black/20 pt-16">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black uppercase">
              Core capabilities
              <br />
              and services
            </h2>
  
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {capabilities.map((capability, index) => (
              <div key={capability.id} className="border-t border-black/20 pt-6">
                <div className="flex items-start mb-4">
                  <span className="text-sm font-medium mr-2">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-bold uppercase">{capability.title}</h3>
                </div>
                <p className="text-sm text-black/70">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const AboutCapabilities = memo(AboutCapabilitiesComponent)
