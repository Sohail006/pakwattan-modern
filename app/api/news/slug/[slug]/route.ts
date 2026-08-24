import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/lib/server/backendFetch'

export const dynamic = 'force-dynamic'

interface Params {
  slug: string
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const authHeader = request.headers.get('authorization')
    const { slug } = params

    const response = await backendFetch(`/api/news/slug/${slug}`, {
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
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in news slug API route:', error)
    return NextResponse.json(
      { error: 'Unable to reach the news API. Please try again shortly.' },
      { status: 502 }
    )
  }
}
