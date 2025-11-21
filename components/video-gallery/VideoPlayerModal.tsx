'use client'

import { useState, useEffect } from 'react'
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
    isYouTube?: boolean
  }
}

const VideoPlayerModal = ({ isOpen, onClose, video }: VideoPlayerModalProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [shareCount, setShareCount] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">📹</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{video.title}</h2>
              <p className="text-sm text-gray-500">{video.channelTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-gray-900 relative">
          {video.isYouTube ? (
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
    </div>
  )
}

export default VideoPlayerModal
