'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getLatestVideos, getChannelInfo, YouTubeVideo, YouTubeChannel } from '@/lib/youtube-api'
import VideoSearch from './VideoSearch'
import VideoPlayerModal from './VideoPlayerModal'

const LatestVideos = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [filteredVideos, setFilteredVideos] = useState<YouTubeVideo[]>([])
  const [channelInfo, setChannelInfo] = useState<YouTubeChannel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [videosData, channelData] = await Promise.all([
          getLatestVideos(12),
          getChannelInfo()
        ])
        setVideos(videosData)
        setFilteredVideos(videosData)
        setChannelInfo(channelData)
      } catch (err) {
        setError('Failed to load videos')
        console.error('Error fetching videos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Search and filter functionality
  const handleSearch = (query: string) => {
    // setSearchQuery(query)
    if (!query.trim()) {
      setFilteredVideos(videos)
      return
    }
    
    const filtered = videos.filter(video =>
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredVideos(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    if (category === 'all') {
      setFilteredVideos(videos)
    } else {
      const filtered = videos.filter(video => {
        const title = video.title.toLowerCase()
        // const description = video.description.toLowerCase()
        
        switch (category) {
          case 'events':
            return title.includes('ceremony') || title.includes('event') || title.includes('celebration')
          case 'academic':
            return title.includes('academic') || title.includes('study') || title.includes('education') || title.includes('test')
          case 'sports':
            return title.includes('sports') || title.includes('athletic') || title.includes('game')
          case 'cultural':
            return title.includes('cultural') || title.includes('performance') || title.includes('dance') || title.includes('qirat')
          case 'achievements':
            return title.includes('award') || title.includes('achievement') || title.includes('success') || title.includes('prize')
          case 'announcements':
            return title.includes('message') || title.includes('announcement') || title.includes('news')
          case 'ceremonies':
            return title.includes('graduation') || title.includes('ceremony') || title.includes('prize')
          default:
            return true
        }
      })
      setFilteredVideos(filtered)
    }
  }

  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const categories = ['all', 'events', 'academic', 'sports', 'cultural', 'achievements', 'announcements', 'ceremonies']

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Latest Videos
              </span>
            </h2>
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 mt-4">Loading latest videos...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Unable to load videos</h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Latest Videos
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest school activities, events, and announcements
          </p>
          {channelInfo && (
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>{channelInfo.subscriberCount} subscribers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>{channelInfo.videoCount} videos</span>
              </div>
            </div>
          )}
        </div>

        {/* Search and Filter */}
        <VideoSearch
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          categories={categories}
          activeCategory={activeCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div 
              key={video.id} 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 cursor-pointer"
              onClick={() => handleVideoClick(video)}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                  {video.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer hover:bg-red-700/90"
                  >
                    <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1"></div>
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <span>👁️</span>
                      <span>{video.views}</span>
                    </span>
                    <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1"
                  >
                    <span>Watch</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {channelInfo && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-red-50 to-primary-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-primary-800 mb-2">
                    {channelInfo.title}
                  </h3>
                  <p className="text-gray-600">
                    {channelInfo.subscriberCount} subscribers • {channelInfo.videoCount} videos
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Subscribe to stay updated with our latest school activities and events
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={channelInfo.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Subscribe on YouTube</span>
                </a>
                <button className="btn-secondary">
                  View All Videos
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <VideoPlayerModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            video={selectedVideo}
          />
        )}
      </div>
    </section>
  )
}

export default LatestVideos
