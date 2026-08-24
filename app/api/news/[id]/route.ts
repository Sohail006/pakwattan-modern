import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/lib/server/backendFetch'

export const dynamic = 'force-dynamic'

interface Params {
  id: string
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const authHeader = request.headers.get('authorization')
    const { id } = params

    const response = await backendFetch(`/api/news/${id}`, {
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
    console.error('Error in news get API route:', error)
    return NextResponse.json(
      { error: 'Unable to reach the news API. Please try again shortly.' },
      { status: 502 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const authHeader = request.headers.get('authorization')
    const { id } = params
    const body = await request.json()

    const response = await backendFetch(`/api/news/${id}`, {
      method: 'PUT',
      headers: {
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update news' }))
      return NextResponse.json(
        { error: error.message || 'Unable to update news' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in news update API route:', error)
    return NextResponse.json(
      { error: 'Unable to reach the news API. Please try again shortly.' },
      { status: 502 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const authHeader = request.headers.get('authorization')
    const { id } = params

    const response = await backendFetch(`/api/news/${id}`, {
      method: 'DELETE',
      headers: {
        ...(authHeader && { Authorization: authHeader }),
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete news' }))
      return NextResponse.json(
        { error: error.message || 'Unable to delete news' },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in news delete API route:', error)
    return NextResponse.json(
      { error: 'Unable to reach the news API. Please try again shortly.' },
      { status: 502 }
    )
  }
}
