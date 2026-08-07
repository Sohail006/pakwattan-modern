'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { GalleryVideo, getGalleryVideos } from '@/lib/api/galleryVideos'
import { formatDate } from '@/lib/utils'
import VideoSearch from './VideoSearch'
import VideoPlayerModal from './VideoPlayerModal'

const categories = ['all', 'events', 'academic', 'sports', 'cultural', 'achievements', 'announcements']

export default function VideoGalleryGrid() {
  const [videos, setVideos] = useState<GalleryVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await getGalleryVideos({
          page: 1,
          pageSize: 100,
          isPublished: true,
          sortBy: 'displayOrder',
          sortOrder: 'asc',
        })
        setVideos(response.data)
      } catch (err) {
        setError('Unable to load videos. Please refresh the page and try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const filteredVideos = useMemo(() => {
    let result = videos

    if (activeCategory !== 'all') {
      result = result.filter((video) => video.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (video) =>
          video.title.toLowerCase().includes(q) ||
          (video.description?.toLowerCase().includes(q) ?? false)
      )
    }

    return result
  }, [videos, activeCategory, searchQuery])

  const featuredVideos = filteredVideos.filter((v) => v.isFeatured)
  const regularVideos = filteredVideos.filter((v) => !v.isFeatured)

  const handleVideoClick = (video: GalleryVideo) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const renderCard = (video: GalleryVideo) => (
    <div
      key={video.id}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:border-primary-200 hover:shadow-2xl"
      onClick={() => handleVideoClick(video)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/90 backdrop-blur-sm transition-transform group-hover:scale-110">
            <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white" />
          </div>
        </div>
        {video.isFeatured && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 group-hover:text-primary-700">
          {video.title}
        </h3>
        {video.description && (
          <p className="mb-3 line-clamp-2 text-sm text-gray-600">{video.description}</p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="capitalize">{video.category}</span>
          <span>{formatDate(video.createdAt)}</span>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <section id="video-gallery" className="scroll-mt-20 py-16 bg-white" aria-busy="true">
        <div className="container-custom text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          <p className="text-gray-600">Loading videos...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="video-gallery" className="scroll-mt-20 py-16 bg-white">
        <div className="container-custom text-center">
          <p className="mb-4 text-gray-600">{error}</p>
          <button type="button" onClick={() => window.location.reload()} className="btn-primary">
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="video-gallery" className="scroll-mt-20 py-16 bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="mb-6 font-josefin text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              School Videos
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Watch highlights from Pak Wattan School &amp; College of Sciences
          </p>
        </div>

        <VideoSearch
          onSearch={setSearchQuery}
          onCategoryChange={setActiveCategory}
          categories={categories}
          activeCategory={activeCategory}
        />

        {filteredVideos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
            <p className="text-lg font-medium text-gray-700">No videos found</p>
            <p className="mt-2 text-sm text-gray-500">
              {videos.length === 0
                ? 'Videos will appear here once they are added from the dashboard.'
                : 'Try a different search or category filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {featuredVideos.length > 0 && (
              <div>
                <h3 className="mb-6 text-2xl font-bold text-gray-900">Featured Videos</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {featuredVideos.map(renderCard)}
                </div>
              </div>
            )}
            <div>
              {featuredVideos.length > 0 && (
                <h3 className="mb-6 text-2xl font-bold text-gray-900">All Videos</h3>
              )}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {(featuredVideos.length > 0 ? regularVideos : filteredVideos).map(renderCard)}
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-r from-red-50 to-primary-50 p-8">
            <h3 className="mb-2 text-2xl font-bold text-primary-800">Subscribe on YouTube</h3>
            <p className="mb-6 text-gray-600">@pakwattanSchoolCollege</p>
            <a
              href="https://www.youtube.com/@pakwattanSchoolCollege"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Visit YouTube Channel
            </a>
          </div>
        </div>

        {selectedVideo && (
          <VideoPlayerModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
              setSelectedVideo(null)
            }}
            video={{
              id: selectedVideo.youtubeVideoId,
              title: selectedVideo.title,
              description: selectedVideo.description || '',
              thumbnail: selectedVideo.thumbnailUrl || '',
              duration: selectedVideo.duration || '—',
              views: '—',
              publishedAt: selectedVideo.publishedAt || selectedVideo.createdAt,
              channelTitle: 'Pak Wattan School & College of Sciences',
              videoUrl: selectedVideo.videoUrl,
              embedUrl: selectedVideo.embedUrl,
              isYouTube: true,
            }}
          />
        )}
      </div>
    </section>
  )
}
