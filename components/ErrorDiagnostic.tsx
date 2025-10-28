'use client'

import { useEffect, useState } from 'react'

const ErrorDiagnostic = () => {
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Catch any unhandled errors
    const handleError = (event: ErrorEvent) => {
      console.error('Client-side error caught:', event.error)
      setError(event.error?.message || 'Unknown error')
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      setError(event.reason?.message || 'Promise rejection')
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  if (!isClient) {
    return <div>Loading diagnostic...</div>
  }

  if (error) {
    return (
      <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 max-w-md">
        <h3 className="font-bold">Client Error Detected:</h3>
        <p className="text-sm">{error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
          Dismiss
        </button>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
      <p className="text-sm">✅ No client errors detected</p>
    </div>
  )
}

export default ErrorDiagnostic
