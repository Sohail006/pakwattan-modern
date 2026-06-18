'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Edit, ExternalLink, Loader2, Plus, Search, Trash2, Video } from 'lucide-react'
import {
  GalleryVideo,
  deleteGalleryVideo,
  getGalleryVideos,
  GALLERY_VIDEO_CATEGORIES,
} from '@/lib/api/galleryVideos'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import { formatDate } from '@/lib/utils'

interface GalleryVideosTableProps {
  onEdit: (video: GalleryVideo) => void
  onAdd: () => void
  refreshKey: number
}

export default function GalleryVideosTable({ onEdit, onAdd, refreshKey }: GalleryVideosTableProps) {
  const [videos, setVideos] = useState<GalleryVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('')
  const [publishedFilter, setPublishedFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [deleteTarget, setDeleteTarget] = useState<GalleryVideo | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(timer)
  }, [search])

  const loadVideos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getGalleryVideos({
        page: 1,
        pageSize: 100,
        search: debouncedSearch || undefined,
        category: category || undefined,
        isPublished: publishedFilter === 'all' ? undefined : publishedFilter === 'published',
        sortBy: 'displayOrder',
        sortOrder: 'asc',
      })
      setVideos(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load videos.')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, category, publishedFilter])

  useEffect(() => {
    loadVideos()
  }, [loadVideos, refreshKey])

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteGalleryVideo(deleteTarget.id)
      setDeleteTarget(null)
      loadVideos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete video.')
    }
  }

  const categoryLabel = (id: string) =>
    GALLERY_VIDEO_CATEGORIES.find((c) => c.id === id)?.label || id

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search videos..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 min-h-[44px]"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2.5 min-h-[44px]"
          >
            <option value="">All categories</option>
            {GALLERY_VIDEO_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
          <select
            value={publishedFilter}
            onChange={(e) => setPublishedFilter(e.target.value as typeof publishedFilter)}
            className="rounded-lg border border-gray-300 px-3 py-2.5 min-h-[44px]"
          >
            <option value="all">All status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <button type="button" onClick={onAdd} className="btn-primary inline-flex items-center gap-2 min-h-[44px]">
          <Plus className="h-4 w-4" />
          Add YouTube Video
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      ) : videos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
          <Video className="mx-auto mb-3 h-10 w-10 text-gray-400" />
          <p className="font-medium text-gray-700">No gallery videos yet</p>
          <p className="mt-1 text-sm text-gray-500">Add a YouTube link to display it on the public video gallery page.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Video</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Added</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {videos.map((video) => (
                <tr key={video.id} className="hover:bg-gray-50/80">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 min-w-[240px]">
                      <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        {video.thumbnailUrl ? (
                          <Image
                            src={video.thumbnailUrl}
                            alt={video.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-gray-900">{video.title}</p>
                        <p className="truncate text-xs text-gray-500">{video.youtubeVideoId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{categoryLabel(video.category)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{video.displayOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          video.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {video.isPublished ? 'Published' : 'Draft'}
                      </span>
                      {video.isFeatured && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(video.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700"
                        aria-label={`Open ${video.title} on YouTube`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => onEdit(video)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700"
                        aria-label={`Edit ${video.title}`}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(video)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${video.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmationDialog
        isOpen={!!deleteTarget}
        title="Delete gallery video?"
        message={
          deleteTarget
            ? `Remove "${deleteTarget.title}" from the video gallery? This cannot be undone.`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  )
}
