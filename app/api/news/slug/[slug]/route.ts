import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

interface Params {
  slug: string
}

/**
 * GET /api/news/slug/[slug]
 * Proxy to backend: GET /api/news/slug/{slug}
 * Get news item by slug
 */
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { slug } = params
    
    const response = await fetch(`${backendUrl}/api/news/slug/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch news' }))
      return NextResponse.json(
        { error: error.message || 'Unable to fetch news' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in news slug API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
