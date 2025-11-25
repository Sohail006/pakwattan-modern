'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api/client'

interface TestResult {
  name: string
  status: 'pending' | 'success' | 'error'
  message: string
  responseTime?: number
  data?: unknown
}

export default function ApiTest() {
  const [apiBaseUrl, setApiBaseUrl] = useState<string>('')
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    // Get the API base URL from the client
    if (typeof window !== 'undefined') {
      const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'https://localhost:7210'
          : 'http://sohailghsno4-001-site8.rtempurl.com')
      setApiBaseUrl(url)
    }
  }, [])

  const runTests = async () => {
    setIsRunning(true)
    setTestResults([])

    const results: TestResult[] = []

    // Test 1: API Base URL Detection
    results.push({
      name: 'API Base URL Detection',
      status: 'success',
      message: `Detected: ${apiBaseUrl}`,
      data: { url: apiBaseUrl }
    })

    // Test 2: Health Check Endpoint
    try {
      const healthStart = Date.now()
      const healthResponse = await fetch(`${apiBaseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const healthTime = Date.now() - healthStart
      const healthData = await healthResponse.json()

      if (healthResponse.ok) {
        results.push({
          name: 'Health Check (/health)',
          status: 'success',
          message: `API is healthy`,
          responseTime: healthTime,
          data: healthData
        })
      } else {
        results.push({
          name: 'Health Check (/health)',
          status: 'error',
          message: `HTTP ${healthResponse.status}: ${healthResponse.statusText}`,
          responseTime: healthTime
        })
      }
    } catch (error) {
      results.push({
        name: 'Health Check (/health)',
        status: 'error',
        message: error instanceof Error ? error.message : 'Connection failed',
      })
    }

    // Test 3: API Health Endpoint
    try {
      const apiHealthStart = Date.now()
      const apiHealthResponse = await fetch(`${apiBaseUrl}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const apiHealthTime = Date.now() - apiHealthStart
      const apiHealthData = await apiHealthResponse.json()

      if (apiHealthResponse.ok) {
        results.push({
          name: 'API Health (/api/health)',
          status: 'success',
          message: `API endpoint is healthy`,
          responseTime: apiHealthTime,
          data: apiHealthData
        })
      } else {
        results.push({
          name: 'API Health (/api/health)',
          status: 'error',
          message: `HTTP ${apiHealthResponse.status}: ${apiHealthResponse.statusText}`,
          responseTime: apiHealthTime
        })
      }
    } catch (error) {
      results.push({
        name: 'API Health (/api/health)',
        status: 'error',
        message: error instanceof Error ? error.message : 'Connection failed',
      })
    }

    // Test 4: CORS Test
    try {
      const corsStart = Date.now()
      const corsResponse = await fetch(`${apiBaseUrl}/api/health`, {
        method: 'OPTIONS',
        headers: {
          'Origin': window.location.origin,
          'Access-Control-Request-Method': 'GET',
        },
      })
      const corsTime = Date.now() - corsStart

      if (corsResponse.ok || corsResponse.status === 0) {
        results.push({
          name: 'CORS Configuration',
          status: 'success',
          message: 'CORS is properly configured',
          responseTime: corsTime
        })
      } else {
        results.push({
          name: 'CORS Configuration',
          status: 'error',
          message: `CORS check returned: ${corsResponse.status}`,
          responseTime: corsTime
        })
      }
    } catch (error) {
      results.push({
        name: 'CORS Configuration',
        status: 'error',
        message: error instanceof Error ? error.message : 'CORS check failed',
      })
    }

    // Test 5: API Client Test
    try {
      const clientStart = Date.now()
      const clientResponse = await api.get<{ status: string; service: string }>('/api/health')
      const clientTime = Date.now() - clientStart

      results.push({
        name: 'API Client Test',
        status: 'success',
        message: 'API client is working correctly',
        responseTime: clientTime,
        data: clientResponse
      })
    } catch (error) {
      results.push({
        name: 'API Client Test',
        status: 'error',
        message: error instanceof Error ? error.message : 'API client test failed',
      })
    }

    // Test 6: Network Connectivity
    try {
      const networkStart = Date.now()
      const networkResponse = await fetch(`${apiBaseUrl}/health`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      })
      const networkTime = Date.now() - networkStart

      if (networkResponse.ok) {
        results.push({
          name: 'Network Connectivity',
          status: 'success',
          message: 'Network connection successful',
          responseTime: networkTime
        })
      } else {
        results.push({
          name: 'Network Connectivity',
          status: 'error',
          message: `Network error: ${networkResponse.status}`,
          responseTime: networkTime
        })
      }
    } catch (error) {
      results.push({
        name: 'Network Connectivity',
        status: 'error',
        message: error instanceof Error ? error.message : 'Network connection failed',
      })
    }

    setTestResults(results)
    setIsRunning(false)
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    }
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      default:
        return '⏳'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">API Connection Test</h3>
        <button
          onClick={runTests}
          disabled={isRunning}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </button>
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600">
          <strong>API Base URL:</strong>{' '}
          <span className="font-mono text-primary-600">{apiBaseUrl}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Environment Variable: {process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'Not set (using fallback)'}
        </p>
      </div>

      {testResults.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">Test Results:</h4>
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{getStatusIcon(result.status)}</span>
                    <span className="font-semibold">{result.name}</span>
                    {result.responseTime && (
                      <span className="text-xs opacity-75">
                        ({result.responseTime}ms)
                      </span>
                    )}
                  </div>
                  <p className="text-sm mt-1">{result.message}</p>
                  {result.data !== undefined && result.data !== null && (
                    <details className="mt-2">
                      <summary className="text-xs cursor-pointer hover:underline">
                        View Response Data
                      </summary>
                      <pre className="mt-2 text-xs bg-black/10 p-2 rounded overflow-auto max-h-40">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Summary:</strong>{' '}
              {testResults.filter(r => r.status === 'success').length} passed,{' '}
              {testResults.filter(r => r.status === 'error').length} failed
            </p>
          </div>
        </div>
      )}

      {testResults.length === 0 && !isRunning && (
        <div className="text-center py-8 text-gray-500">
          <p>Click &quot;Run Tests&quot; to test the API connection</p>
        </div>
      )}
    </div>
  )
}

