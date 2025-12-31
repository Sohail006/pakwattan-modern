export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
      <div className="container-custom">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-semibold text-gray-700">Loading awards...</p>
          <p className="text-sm text-gray-500">Please wait while we load the content</p>
        </div>
      </div>
    </div>
  )
}

