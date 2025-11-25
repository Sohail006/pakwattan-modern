'use client'

import EnvTest from '@/components/EnvTest'
import ApiTest from '@/components/ApiTest'

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Debug Information</h1>
          
          <div className="space-y-6">
            <ApiTest />
            
            <EnvTest />
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">System Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-mono text-sm text-gray-600">Build Time:</span>
                  <span className="font-mono text-sm text-gray-900">
                    {new Date().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-mono text-sm text-gray-600">Node Version:</span>
                  <span className="font-mono text-sm text-gray-900">
                    {process.env.NODE_VERSION || 'Unknown'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-mono text-sm text-gray-600">Platform:</span>
                  <span className="font-mono text-sm text-gray-900">
                    {typeof window !== 'undefined' ? navigator.platform : 'Server'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
