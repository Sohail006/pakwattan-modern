import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/lib/server/backendFetch'

export const dynamic = 'force-dynamic'

/**
 * GET /api/news
 * Proxy to backend with pagination and filters
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()

    const response = await backendFetch(`/api/news${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
      headers: {
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
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error in news API route:', error)
    return NextResponse.json(
      { error: 'Unable to reach the news API. Please try again shortly.' },
      { status: 502 }
    )
  }
}

/**
 * POST /api/news
 * Proxy to backend: create news item
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const body = await request.json()

    const response = await backendFetch('/api/news', {
      method: 'POST',
      headers: {
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create news' }))
      return NextResponse.json(
        { error: error.message || 'Unable to create news' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in news create API route:', error)
    return NextResponse.json(
      { error: 'Unable to reach the news API. Please try again shortly.' },
      { status: 502 }
    )
  }
}
