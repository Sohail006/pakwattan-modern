import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

/**
 * POST /api/news/upload-image
 * Proxy to backend: POST /api/news/upload-image
 * Upload image for news item
 */
export async function POST(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    
    // Get FormData from request
    const formData = await request.formData()
    
    const response = await fetch(`${backendUrl}/api/news/upload-image`, {
      method: 'POST',
      headers: {
        ...(authHeader && { Authorization: authHeader }),
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: formData,
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to upload image' }))
      return NextResponse.json(
        { error: error.message || 'Unable to upload image' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in news image upload API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

