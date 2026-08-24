import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/lib/server/backendFetch'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '5'

    const response = await backendFetch(`/api/events/upcoming?limit=${limit}`, {
      method: 'GET',
      headers: {
        ...(authHeader && { Authorization: authHeader }),
      },
    })

    if (!response.ok) {
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
    return NextResponse.json(
      { error: 'Unable to reach the events API. Please try again shortly.' },
      { status: 502 }
    )
  }
}
