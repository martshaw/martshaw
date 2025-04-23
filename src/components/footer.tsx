import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="min-h-screen flex flex-col justify-center bg-black border-t border-white/10 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Get in touch</h2>
          <p className="text-xl text-gray-300 max-w-2xl">
            Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
          </p>
          <div className="mt-8">
            <Link
              href="mailto:info@martinshaw.com?subject=martshaw.com:Hey%20(👋)"
              className="inline-block bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              info@martinshaw.com
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-medium mb-4">Contact</h3>
            <p className="text-sm text-gray-400">
              <Link href="mailto:info@martinshaw.com?subject=martshaw.com:Hey%20(👋)" className="hover:text-white transition-colors">
                info@martinshaw.com
              </Link>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Social</h3>
            <div className="flex space-x-4">
              <Link
                href="http://linkedin.com/in/martshaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/martshaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Github
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Location</h3>
            <p className="text-sm text-gray-400">Edinburgh, UK</p>
            <p className="text-sm text-gray-400">55.9533° N, 3.1883° W</p>
          </div>
        </div>
        <div className="text-xs text-gray-500">© {currentYear} Martin Shaw. All rights reserved.</div>
      </div>
    </footer>
  )
}
