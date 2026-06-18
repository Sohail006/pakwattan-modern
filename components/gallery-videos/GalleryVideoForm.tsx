'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, Loader2, Save, X } from 'lucide-react'
import Image from 'next/image'
import {
  GalleryVideo,
  CreateGalleryVideoRequest,
  UpdateGalleryVideoRequest,
  createGalleryVideo,
  updateGalleryVideo,
  GALLERY_VIDEO_CATEGORIES,
} from '@/lib/api/galleryVideos'
import { buildYouTubeThumbnail, extractYouTubeVideoId } from '@/lib/utils/youtube'
import FormField from '@/components/ui/FormField'

interface GalleryVideoFormProps {
  video?: GalleryVideo | null
  mode: 'create' | 'edit'
  onClose: () => void
  onSuccess: (message?: string) => void
}

export default function GalleryVideoForm({ video, mode, onClose, onSuccess }: GalleryVideoFormProps) {
  const [formData, setFormData] = useState<CreateGalleryVideoRequest>({
    youtubeUrl: '',
    title: '',
    description: '',
    category: 'events',
    displayOrder: 0,
    isPublished: true,
    isFeatured: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const previewId = extractYouTubeVideoId(formData.youtubeUrl)

  useEffect(() => {
    if (video && mode === 'edit') {
      setFormData({
        youtubeUrl: video.youtubeUrl,
        title: video.title,
        description: video.description || '',
        category: video.category,
        displayOrder: video.displayOrder,
        isPublished: video.isPublished,
        isFeatured: video.isFeatured,
      })
    }
  }, [video, mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!extractYouTubeVideoId(formData.youtubeUrl)) {
      setError('Please enter a valid YouTube video link.')
      return
    }

    setLoading(true)
    try {
      if (mode === 'create') {
        await createGalleryVideo({
          ...formData,
          title: formData.title?.trim() || undefined,
          description: formData.description?.trim() || undefined,
        })
        onSuccess('Video added to gallery successfully.')
      } else if (video) {
        const payload: UpdateGalleryVideoRequest = {
          id: video.id,
          youtubeUrl: formData.youtubeUrl,
          title: formData.title?.trim() || undefined,
          description: formData.description,
          category: formData.category,
          displayOrder: formData.displayOrder,
          isPublished: formData.isPublished,
          isFeatured: formData.isFeatured,
        }
        await updateGalleryVideo(payload)
        onSuccess('Video updated successfully.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save video.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'create' ? 'Add YouTube Video' : 'Edit Gallery Video'}
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <FormField label="YouTube Link" required htmlFor="youtube-url">
            <input
              id="youtube-url"
              type="url"
              required
              value={formData.youtubeUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, youtubeUrl: e.target.value }))}
              placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 min-h-[44px]"
            />
            <p className="mt-1 text-xs text-gray-500">
              Paste any YouTube watch, share, or Shorts link. Title and thumbnail are fetched automatically if left blank.
            </p>
          </FormField>

          {previewId && (
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={buildYouTubeThumbnail(previewId)}
                  alt="YouTube preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          )}

          <FormField label="Title (optional)" htmlFor="video-title">
            <input
              id="video-title"
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Auto-filled from YouTube if empty"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 min-h-[44px]"
            />
          </FormField>

          <FormField label="Description (optional)" htmlFor="video-description">
            <textarea
              id="video-description"
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Category" htmlFor="video-category">
              <select
                id="video-category"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 min-h-[44px]"
              >
                {GALLERY_VIDEO_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Display Order" htmlFor="display-order">
              <input
                id="display-order"
                type="number"
                min={0}
                value={formData.displayOrder ?? 0}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, displayOrder: Number(e.target.value) || 0 }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 min-h-[44px]"
              />
            </FormField>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))}
              />
              Published on website
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
              />
              Featured video
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary min-h-[44px]">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary min-h-[44px] disabled:opacity-50">
              {loading ? (
                <>
                  <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 inline h-4 w-4" />
                  {mode === 'create' ? 'Add Video' : 'Save Changes'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
