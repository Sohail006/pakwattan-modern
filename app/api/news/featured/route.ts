import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

/**
 * GET /api/news/featured
 * Proxy to backend: GET /api/news/featured?limit=X
 * Get featured news items
 */
export async function GET(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '10'
    
    const response = await fetch(
      `${backendUrl}/api/news/featured?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(authHeader && { Authorization: authHeader }),
        },
        cache: 'no-store',
        next: { revalidate: 0 },
      }
    )
    
    if (!response.ok) {
      // If backend returns 404 or error, return empty array as fallback
      if (response.status === 404) {
        return NextResponse.json([])
      }
      const error = await response.json().catch(() => ({ message: 'Failed to fetch featured news' }))
      return NextResponse.json(
        { error: error.message || 'Unable to fetch featured news' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in news featured API route:', error)
    // Return empty array as fallback to prevent page crash
    return NextResponse.json([])
  }
}
