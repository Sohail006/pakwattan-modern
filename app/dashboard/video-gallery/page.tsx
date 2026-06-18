'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, CheckCircle, Loader2, Video } from 'lucide-react'
import { isAuthenticated, canPerform } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { GalleryVideo } from '@/lib/api/galleryVideos'
import GalleryVideosTable from '@/components/gallery-videos/GalleryVideosTable'
import GalleryVideoForm from '@/components/gallery-videos/GalleryVideoForm'

export default function VideoGalleryDashboardPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingVideo, setEditingVideo] = useState<GalleryVideo | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated()) {
          router.push('/login')
          return
        }
        const hasAccess = canPerform(PERMISSIONS.NEWS_VIEW, ['Admin', 'Staff', 'ManagerialStaff'])
        if (!hasAccess) {
          setAuthError('You do not have permission to manage the video gallery.')
        }
      } catch {
        setAuthError('Unable to verify authentication. Please try again.')
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  if (checkingAuth) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (authError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
          <AlertCircle className="mx-auto mb-3 h-10 w-10 text-amber-600" />
          <p className="text-gray-700">{authError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <div className="mb-6 rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-50 to-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-primary-600 p-3 text-white shadow-md">
            <Video className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-josefin text-gray-900">Video Gallery</h1>
            <p className="mt-1 max-w-2xl text-sm sm:text-base text-gray-600">
              Add YouTube links from the Pak Wattan channel. Published videos appear automatically on the public
              video gallery page.
            </p>
          </div>
        </div>
      </div>

      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <CheckCircle className="h-4 w-4 shrink-0" />
          {success}
        </div>
      )}

      <GalleryVideosTable
        refreshKey={refreshKey}
        onAdd={() => {
          setEditingVideo(null)
          setIsFormOpen(true)
        }}
        onEdit={(video) => {
          setEditingVideo(video)
          setIsFormOpen(true)
        }}
      />

      {isFormOpen && (
        <GalleryVideoForm
          mode={editingVideo ? 'edit' : 'create'}
          video={editingVideo}
          onClose={() => {
            setIsFormOpen(false)
            setEditingVideo(null)
          }}
          onSuccess={(message) => {
            if (message) {
              setSuccess(message)
              setTimeout(() => setSuccess(null), 3000)
            }
            setRefreshKey((prev) => prev + 1)
            setIsFormOpen(false)
            setEditingVideo(null)
          }}
        />
      )}
    </div>
  )
}
