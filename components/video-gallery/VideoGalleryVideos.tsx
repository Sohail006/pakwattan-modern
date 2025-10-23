'use client'

import { useState } from 'react'
import Image from 'next/image'

const VideoGalleryVideos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Videos', icon: '🎬' },
    { id: 'events', name: 'School Events', icon: '🎉' },
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'cultural', name: 'Cultural', icon: '🎭' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' }
  ]

  const videos = [
    {
      id: 1,
      title: "MD Message - Managing Director",
      description: "Message of Managing Director, Sardar Abdul Aqeel - The Pakwattan School & College of Sciences, Havelian",
      thumbnail: "https://img.youtube.com/vi/edf2-HxPxxs/maxresdefault.jpg",
      duration: "10:25",
      category: "events",
      views: "2.5K",
      date: "January 15, 2024",
      youtubeId: "edf2-HxPxxs",
      isYouTube: true
    },
    {
      id: 2,
      title: "Graduation Ceremony - Dastar-e-Fazilat",
      description: "Alhamdulillah! تقریب دستار فضیلت پاک وطن سکول اینڈ کالج آف سائنسز حویلیاں حفاظ کرام کے اعزاز میں بابرکت تقریب کا انعقاد",
      thumbnail: "https://img.youtube.com/vi/OH7yYQdmsDg/maxresdefault.jpg",
      duration: "15:30",
      category: "events",
      views: "3.2K",
      date: "December 20, 2023",
      youtubeId: "OH7yYQdmsDg",
      isYouTube: true
    },
    {
      id: 3,
      title: "Annual Sports Day 2024",
      description: "Highlights from our annual sports day with various competitions and activities",
      thumbnail: "/images/video-gallery/53.jpg",
      duration: "5:30",
      category: "sports",
      views: "1.2K",
      date: "March 15, 2024",
      isYouTube: false
    },
    {
      id: 4,
      title: "Science Fair Exhibition",
      description: "Students showcasing their innovative science projects and experiments",
      thumbnail: "/images/video-gallery/54.jpg",
      duration: "8:45",
      category: "academic",
      views: "856",
      date: "February 20, 2024",
      isYouTube: false
    },
    {
      id: 5,
      title: "Cultural Day Celebration",
      description: "Colorful cultural performances and traditional dances by students",
      thumbnail: "/images/video-gallery/55.jpg",
      duration: "12:15",
      category: "cultural",
      views: "2.1K",
      date: "January 10, 2024",
      isYouTube: false
    },
    {
      id: 6,
      title: "Prize Distribution Ceremony",
      description: "Recognition of outstanding students and their achievements",
      thumbnail: "/images/video-gallery/56.jpg",
      duration: "15:20",
      category: "achievements",
      views: "3.5K",
      date: "December 5, 2023",
      isYouTube: false
    },
    {
      id: 7,
      title: "Qirat & Naat Competition 2024",
      description: "Beautiful recitation of Quran and Naat by our students in the annual competition",
      thumbnail: "/images/video-gallery/58.jpg",
      duration: "16:20",
      category: "cultural",
      views: "2.8K",
      date: "February 10, 2024",
      isYouTube: false
    },
    {
      id: 8,
      title: "Spelling Bee Competition 2024",
      description: "Students showcasing their vocabulary skills and spelling abilities",
      thumbnail: "/images/video-gallery/59.jpg",
      duration: "14:35",
      category: "academic",
      views: "1.5K",
      date: "March 5, 2024",
      isYouTube: false
    },
    {
      id: 9,
      title: "Art & Craft Competition 2024",
      description: "Creative artwork, paintings, and handicrafts by students",
      thumbnail: "/images/video-gallery/60.jpg",
      duration: "11:45",
      category: "cultural",
      views: "1.7K",
      date: "February 28, 2024",
      isYouTube: false
    },
    {
      id: 10,
      title: "Career Counseling Seminar 2024",
      description: "Career guidance and counseling session for students to help them choose the right path",
      thumbnail: "/images/video-gallery/61.jpg",
      duration: "35:20",
      category: "events",
      views: "2.3K",
      date: "January 30, 2024",
      isYouTube: false
    },
    {
      id: 11,
      title: "Scholarship Test 2024",
      description: "Annual scholarship test for deserving students to secure financial assistance",
      thumbnail: "/images/video-gallery/62.jpg",
      duration: "28:15",
      category: "academic",
      views: "3.1K",
      date: "March 10, 2024",
      isYouTube: false
    }
  ]

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory)

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Video Collection
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our video collection showcasing school life, events, and achievements
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div key={video.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 hover-lift">
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
                  {video.isYouTube ? (
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer hover:bg-red-700/90"
                    >
                      <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1"></div>
                    </a>
                  ) : (
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1"></div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <span>👁️</span>
                      <span>{video.views}</span>
                    </span>
                    <span>{video.date}</span>
                  </div>
                        {video.isYouTube ? (
                          <a
                            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1"
                          >
                            <span>Watch on YouTube</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          </a>
                        ) : (
                          <button className="text-primary-600 hover:text-primary-700 font-semibold">
                            Watch Now
                          </button>
                        )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📹</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No videos found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default VideoGalleryVideos
