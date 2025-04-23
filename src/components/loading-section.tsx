export function LoadingSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-48 bg-gray-700 rounded mb-4"></div>
        <div className="h-4 w-64 bg-gray-700 rounded"></div>
      </div>
    </div>
  )
}
