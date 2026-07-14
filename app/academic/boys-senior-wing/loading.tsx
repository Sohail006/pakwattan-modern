export default function Loading() {
  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
      <div className="container-custom">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto" />
          <p className="text-lg font-semibold text-gray-700">Loading wing page...</p>
          <p className="text-sm text-gray-500">Please wait while we load faculty and program details</p>
        </div>
      </div>
    </div>
  )
}
