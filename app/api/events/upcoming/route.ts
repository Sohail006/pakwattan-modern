import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

/**
 * GET /api/events/upcoming
 * Proxy to backend: GET /api/events/upcoming?limit=X
 * Get upcoming events
 */
export async function GET(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '5'
    
    const response = await fetch(
      `${backendUrl}/api/events/upcoming?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(authHeader && { Authorization: authHeader }),
        },
      }
    )
    
    if (!response.ok) {
      // If backend returns 404 or error, return empty array as fallback
      if (response.status === 404) {
        return NextResponse.json([])
      }
      const error = await response.json().catch(() => ({ message: 'Failed to fetch upcoming events' }))
      return NextResponse.json(
        { error: error.message || 'Unable to fetch upcoming events' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in events upcoming API route:', error)
    // Return empty array as fallback to prevent page crash
    return NextResponse.json([])
  }
}
