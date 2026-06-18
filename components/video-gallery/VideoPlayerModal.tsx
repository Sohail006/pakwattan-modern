'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, ExternalLink, Share2, ThumbsUp, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface VideoPlayerModalProps {
  isOpen: boolean
  onClose: () => void
  video: {
    id: string
    title: string
    description: string
    thumbnail: string
    duration: string
    views: string
    publishedAt: string
    channelTitle: string
    videoUrl: string
    embedUrl?: string
    isYouTube?: boolean
  }
}

const VideoPlayerModal = ({ isOpen, onClose, video }: VideoPlayerModalProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [shareCount, setShareCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, handleClose])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: video.videoUrl
        })
        setShareCount(prev => prev + 1)
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(video.videoUrl)
      setShareCount(prev => prev + 1)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  if (!isOpen || !mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="relative my-4 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6">
          <div className="flex min-w-0 items-center space-x-3 pr-12 sm:space-x-4 sm:pr-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 sm:h-12 sm:w-12">
              <span className="text-lg font-bold text-white">📹</span>
            </div>
            <div className="min-w-0">
              <h2 id="video-modal-title" className="truncate text-lg font-bold text-gray-900 sm:text-xl">
                {video.title}
              </h2>
              <p className="truncate text-sm text-gray-500">{video.channelTitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 sm:static sm:rounded-full sm:bg-transparent sm:hover:bg-gray-100"
            aria-label="Close video"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-gray-900">
          {video.isYouTube && video.embedUrl ? (
            <iframe
              src={`${video.embedUrl}?autoplay=1&rel=0`}
              title={video.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : video.isYouTube ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-2"></div>
                </div>
                <p className="text-white text-lg mb-4">Click to watch on YouTube</p>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in YouTube</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-2"></div>
                </div>
                <p className="text-white text-lg">Local Video Player</p>
                <p className="text-gray-300 text-sm">Video player would be implemented here</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition-colors hover:bg-black/90"
            aria-label="Close video player"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{video.views} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>📅</span>
                <span>{formatDate(video.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⏱️</span>
                <span>{video.duration}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share ({shareCount})</span>
              </button>
            </div>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{video.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {video.isYouTube ? (
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Watch on YouTube</span>
              </a>
            ) : (
              <button className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors">
                <span>▶️</span>
                <span>Play Video</span>
              </button>
            )}
            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default VideoPlayerModal
