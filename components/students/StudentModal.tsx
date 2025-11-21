'use client'

import { X, Users, Mail, Phone } from 'lucide-react'
import { Student } from '@/lib/api/students'
import Image from 'next/image'
import { formatDate, formatDateTime } from '@/lib/utils'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'
import { useState, useEffect } from 'react'
import { getGuardianById, Guardian } from '@/lib/api/guardians'

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

interface StudentModalProps {
  student: Student
  onClose: () => void
}

export default function StudentModal({ student, onClose }: StudentModalProps) {
  const [imageError, setImageError] = useState(false)
  const [guardian, setGuardian] = useState<Guardian | null>(null)
  const [loadingGuardian, setLoadingGuardian] = useState(false)
  const imageUrls = getImageUrlWithFallback(student.profileImageUrl)
  const imageUrl = imageUrls[0] || null

  // Fetch guardian details if we only have guardianId but not the full guardian object
  useEffect(() => {
    const fetchGuardian = async () => {
      // If we already have the full guardian object, use it
      if (student.guardian) {
        return
      }
      
      // If we have guardianId but not the full object, fetch it
      if (student.guardianId && !student.guardian) {
        try {
          setLoadingGuardian(true)
          const guardianData = await getGuardianById(student.guardianId)
          setGuardian(guardianData)
        } catch (error) {
          console.error('Error fetching guardian details:', error)
          // Don't show error to user, just log it
        } finally {
          setLoadingGuardian(false)
        }
      }
    }

    fetchGuardian()
  }, [student.guardianId, student.guardian])

  // Use the fetched guardian or the one from student object
  const guardianData = student.guardian || guardian

  // Debug logging in development
  if (process.env.NODE_ENV === 'development' && student.profileImageUrl) {
    console.log('[StudentModal] Profile Image Debug:', {
      originalUrl: student.profileImageUrl,
      constructedUrl: imageUrl,
      hasExtension: hasExtension(imageUrl || ''),
      imageError
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Student Details</h2>
          <button
            onClick={onClose}
            aria-label="Close student details"
            className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 rounded-lg p-1 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
            {imageUrl && !imageError ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={student.name}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={(e) => {
                    console.error('[StudentModal] Image load error:', {
                      src: imageUrl,
                      error: e
                    })
                    setImageError(true)
                  }}
                />
              </div>
            ) : (
              <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <span className="text-5xl text-white">
                  {student.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h3>
              <p className="text-lg text-gray-600 mb-4">Son/Daughter of {student.fatherName}</p>
              <StatusBadge status={student.status} size="md" />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <p className="text-gray-900">{student.email}</p>
                </div>
                {student.phone && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Phone:</span>
                    <p className="text-gray-900">{student.phone}</p>
                  </div>
                )}
                {student.whatsApp && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">WhatsApp:</span>
                    <p className="text-gray-900">{student.whatsApp}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-gray-600">Gender:</span>
                  <p className="text-gray-900">{student.gender}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Date of Birth:</span>
                  <p className="text-gray-900">{formatDate(student.dateOfBirth)}</p>
                </div>
                {student.address && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Address:</span>
                    <p className="text-gray-900">{student.address}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Academic Information</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Grade:</span>
                  <p className="text-gray-900">
                    {student.gradeName || student.grade?.name || `Grade ${student.gradeId}`}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Section:</span>
                  <p className="text-gray-900">
                    {student.sectionName || student.section?.name || `Section ${student.sectionId}`}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Campus:</span>
                  <p className="text-gray-900">
                    {student.campusName || student.campus?.name || `Campus ${student.campusId}`}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Session:</span>
                  <p className="text-gray-900">
                    {student.sessionName || student.session?.name || `Session ${student.sessionId}`}
                  </p>
                </div>
                {student.previousSchool && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Previous School:</span>
                    <p className="text-gray-900">{student.previousSchool}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          {(guardianData || (student.guardianName && student.guardianId)) && (
            <div className="mt-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6 border border-primary-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary-600" />
                <span>Guardian Information</span>
                {loadingGuardian && (
                  <span className="text-sm text-gray-500 font-normal">(Loading...)</span>
                )}
              </h4>
              {loadingGuardian ? (
                <div className="text-center py-4">
                  <p className="text-gray-600">Loading guardian details...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-600">Name:</span>
                      <p className="text-gray-900">
                        {guardianData ? (
                          <Link
                            href={`/dashboard/guardians/${guardianData.id}`}
                            className="text-primary-600 hover:text-primary-700 hover:underline font-semibold"
                          >
                            {guardianData.fullName}
                          </Link>
                        ) : student.guardianId ? (
                          <Link
                            href={`/dashboard/guardians/${student.guardianId}`}
                            className="text-primary-600 hover:text-primary-700 hover:underline font-semibold"
                          >
                            {student.guardianName}
                          </Link>
                        ) : (
                          <span className="font-semibold">{student.guardianName}</span>
                        )}
                      </p>
                      {guardianData?.relation && (
                        <p className="text-sm text-gray-500">({guardianData.relation})</p>
                      )}
                    </div>
                  </div>
                  {guardianData?.email && (
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-gray-600">Email:</span>
                        <p className="text-gray-900">{guardianData.email}</p>
                      </div>
                    </div>
                  )}
                  {guardianData?.phone && (
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-gray-600">Phone:</span>
                        <p className="text-gray-900">{guardianData.phone}</p>
                      </div>
                    </div>
                  )}
                  {guardianData?.whatsApp && (
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-gray-600">WhatsApp:</span>
                        <p className="text-gray-900">{guardianData.whatsApp}</p>
                      </div>
                    </div>
                  )}
                  {guardianData?.occupation && (
                    <div className="flex items-start space-x-3">
                      <span className="text-sm font-medium text-gray-600">Occupation:</span>
                      <p className="text-gray-900">{guardianData.occupation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Timestamps */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Created At:</span>{' '}
                {formatDateTime(student.createdAt)}
              </div>
              {student.updatedAt && (
                <div>
                  <span className="font-medium">Last Updated:</span>{' '}
                  {formatDateTime(student.updatedAt)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

