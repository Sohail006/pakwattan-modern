'use client'

import { Edit, Trash2, Eye, Users } from 'lucide-react'
import { Student } from '@/lib/api/students'
import Image from 'next/image'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'
import { useState } from 'react'

// Helper to get API base URL
const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_BACKEND_BASE_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'https://localhost:7210'
    }
  }
  return 'http://localhost:5000'
}

// Helper to construct full image URL
const getImageUrl = (imageUrl: string | null | undefined): string | null => {
  if (!imageUrl) return null
  // If already a full URL, use it directly
  if (imageUrl.startsWith('http')) {
    // Check if it's a URL without extension
    if (!hasExtension(imageUrl)) {
      // Extract path from full URL
      try {
        const url = new URL(imageUrl)
        const path = url.pathname
        return `${url.origin}/api/images/serve?path=${encodeURIComponent(path)}`
      } catch {
        return imageUrl
      }
    }
    return imageUrl
  }
  // Construct full URL with API base
  const apiBase = getApiBaseUrl()
  // Ensure path starts with /
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
  return `${apiBase}${path}`
}

// Helper to check if URL has an extension
const hasExtension = (url: string): boolean => {
  const path = url.split('?')[0] // Remove query string
  const lastDot = path.lastIndexOf('.')
  const lastSlash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
  return lastDot > lastSlash && lastDot < path.length - 1
}

// Helper to try fallback extensions for old files without extensions
const getImageUrlWithFallback = (imageUrl: string | null | undefined): string[] => {
  if (!imageUrl) return []
  
  const baseUrl = getImageUrl(imageUrl)
  if (!baseUrl) return []
  
  // If URL already has extension, return as-is
  if (hasExtension(baseUrl)) {
    return [baseUrl]
  }
  
  // For old files without extensions, use the image serve endpoint
  // This endpoint will automatically detect the file type and serve it correctly
  const apiBase = getApiBaseUrl()
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
  return [`${apiBase}/api/images/serve?path=${encodeURIComponent(path)}`]
}

interface StudentCardProps {
  student: Student
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function StudentCard({ student, onView, onEdit, onDelete }: StudentCardProps) {
  const [imageError, setImageError] = useState(false)
  const imageUrls = getImageUrlWithFallback(student.profileImageUrl)
  const imageUrl = imageUrls[0] || null

  // Debug logging in development
  if (process.env.NODE_ENV === 'development' && student.profileImageUrl) {
    console.log('[StudentCard] Profile Image Debug:', {
      originalUrl: student.profileImageUrl,
      constructedUrl: imageUrl,
      hasExtension: hasExtension(imageUrl || ''),
      imageError
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Student Image/Header */}
      <div className="relative h-32 bg-gradient-to-br from-primary-500 to-accent-500">
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={student.name}
            fill
            className="object-cover"
            unoptimized
            onError={(e) => {
              console.error('[StudentCard] Image load error:', {
                src: imageUrl,
                error: e
              })
              setImageError(true)
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-4xl text-white">
                {student.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <StatusBadge status={student.status} size="sm" />
        </div>
      </div>

      {/* Student Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
        <p className="text-sm text-gray-600 mb-2">Father: {student.fatherName}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">Grade:</span>
            <span>{student.grade?.name || `Grade ${student.gradeId}`}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">Section:</span>
            <span>{student.section?.name || `Section ${student.sectionId}`}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">Email:</span>
            <span className="truncate">{student.email}</span>
          </div>
          {student.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-2">Phone:</span>
              <span>{student.phone}</span>
            </div>
          )}
          {student.guardian && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2 text-primary-600" />
              <span className="font-medium mr-2">Guardian:</span>
              <Link
                href={`/dashboard/guardians/${student.guardian.id}`}
                className="text-primary-600 hover:text-primary-700 hover:underline truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {student.guardian.fullName} ({student.guardian.relation})
              </Link>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={onView}
            aria-label={`View details for ${student.name}`}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg px-2 py-1 transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">View</span>
          </button>
          <button
            onClick={onEdit}
            aria-label={`Edit ${student.name}`}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1 transition-all duration-200"
          >
            <Edit className="w-4 h-4" />
            <span className="text-sm font-medium">Edit</span>
          </button>
          <button
            onClick={onDelete}
            aria-label={`Delete ${student.name}`}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg px-2 py-1 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}

