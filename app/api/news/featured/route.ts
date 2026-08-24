import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/lib/server/backendFetch'

export const dynamic = 'force-dynamic'

/**
 * GET /api/news/featured
 * Proxy to backend: GET /api/news/featured?limit=X
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '10'

    const response = await backendFetch(`/api/news/featured?limit=${limit}`, {
      method: 'GET',
      headers: {
        ...(authHeader && { Authorization: authHeader }),
      },
    })

    if (!response.ok) {
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
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error in news featured API route:', error)
    return NextResponse.json(
      { error: 'Unable to reach the news API. Please try again shortly.' },
      { status: 502 }
    )
  }
}
