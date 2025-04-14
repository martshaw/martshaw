import { Button } from "@/components/ui/button"

interface Capability {
  id: string
  title: string
  description: string
}

interface CapabilitiesProps {
  data: Capability[]
}

export function Capabilities({ data }: CapabilitiesProps) {
  return (
    <section className="py-20 bg-[#c5bfad]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Core capabilities
            <br />
            and services
          </h2>
          <div className="flex space-x-4">
            <Button variant="link" className="text-black p-0">
              Index
            </Button>
            <Button variant="link" className="text-black p-0">
              Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {data.map((capability, index) => (
            <div key={capability.id} className="border-t border-black/20 pt-6">
              <div className="flex items-start mb-4">
                <span className="text-sm font-medium mr-2">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-bold">{capability.title}</h3>
              </div>
              <p className="text-sm text-black/70">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
