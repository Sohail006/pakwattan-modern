'use client'

import { useState, useEffect } from 'react'

// This component demonstrates how to use environment variables
const EnvTest = () => {
  const [envVars, setEnvVars] = useState<Record<string, string | undefined>>({})

  useEffect(() => {
    // Get environment variables
    setEnvVars({
      'NODE_ENV': process.env.NODE_ENV,
      'NEXT_PUBLIC_SITE_URL': process.env.NEXT_PUBLIC_SITE_URL,
      'NEXT_PUBLIC_API_URL': process.env.NEXT_PUBLIC_API_URL,
      'NEXT_PUBLIC_APP_NAME': process.env.NEXT_PUBLIC_APP_NAME,
      'YOUTUBE_API_KEY': process.env.YOUTUBE_API_KEY ? '***HIDDEN***' : 'Not set',
      'NEXT_PUBLIC_GA_ID': process.env.NEXT_PUBLIC_GA_ID,
    })
  }, [])

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Environment Variables Test</h3>
      <div className="space-y-2">
        {Object.entries(envVars).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-mono text-sm text-gray-600">{key}:</span>
            <span className="font-mono text-sm text-gray-900">
              {value || 'undefined'}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This component shows how environment variables work. 
          In production, some values will be different from development.
        </p>
      </div>
    </div>
  )
}

export default EnvTest
