import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

/**
 * POST /api/registrations/upload-receipt
 * Proxy to backend: POST /api/registrations/upload-receipt
 * Upload receipt image (images only - JPG, JPEG, PNG)
 */
export async function POST(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    
    // Get FormData from request
    const formData = await request.formData()
    
    // Validate file type (images only, no PDF)
    const file = formData.get('file') as File | null
    if (file) {
      const fileType = file.type.toLowerCase()
      const fileName = file.name.toLowerCase()
      
      // Reject PDFs
      if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        return NextResponse.json(
          { error: 'PDF files are not supported. Please upload an image (JPG, JPEG, or PNG) of your receipt.' },
          { status: 400 }
        )
      }
      
      // Validate image types
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowedTypes.includes(fileType) && !fileName.match(/\.(jpg|jpeg|png)$/)) {
        return NextResponse.json(
          { error: 'Invalid file type. Please upload an image (JPG, JPEG, or PNG).' },
          { status: 400 }
        )
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB. Please compress your image or take a new photo.` },
          { status: 400 }
        )
      }
    }
    
    const response = await fetch(`${backendUrl}/api/registrations/upload-receipt`, {
      method: 'POST',
      headers: {
        ...(authHeader && { Authorization: authHeader }),
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: formData,
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to upload receipt' }))
      return NextResponse.json(
        { error: error.message || 'Unable to upload receipt' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in receipt upload API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
