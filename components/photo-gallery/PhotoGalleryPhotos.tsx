'use client'

import { useState } from 'react'
import Image from 'next/image'

const PhotoGalleryPhotos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState<{
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    date: string;
  } | null>(null)

  const categories = [
    { id: 'all', name: 'All Photos', icon: '📸' },
    { id: 'events', name: 'Events', icon: '🎉' },
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'cultural', name: 'Cultural', icon: '🎭' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' }
  ]

  const photos = [
    {
      id: 1,
      title: "School Activities",
      description: "Students participating in various school activities",
      image: "/images/photo-gallery/1.JPG",
      category: "events",
      date: "March 15, 2024"
    },
    {
      id: 2,
      title: "Academic Excellence",
      description: "Students showcasing their academic achievements",
      image: "/images/photo-gallery/2.JPG",
      category: "academic",
      date: "February 20, 2024"
    },
    {
      id: 3,
      title: "Cultural Programs",
      description: "Traditional performances and cultural activities",
      image: "/images/photo-gallery/3.JPG",
      category: "cultural",
      date: "January 10, 2024"
    },
    {
      id: 4,
      title: "Sports Activities",
      description: "Students engaged in sports and physical activities",
      image: "/images/photo-gallery/4.JPG",
      category: "sports",
      date: "December 5, 2023"
    },
    {
      id: 5,
      title: "School Events",
      description: "Various school events and celebrations",
      image: "/images/photo-gallery/5.JPG",
      category: "events",
      date: "November 25, 2023"
    },
    {
      id: 6,
      title: "Student Life",
      description: "Daily school life and student activities",
      image: "/images/photo-gallery/6.JPG",
      category: "academic",
      date: "October 15, 2023"
    },
    {
      id: 7,
      title: "Achievements",
      description: "Student achievements and recognitions",
      image: "/images/photo-gallery/7.JPG",
      category: "achievements",
      date: "September 20, 2023"
    },
    {
      id: 8,
      title: "School Facilities",
      description: "School facilities and infrastructure",
      image: "/images/photo-gallery/8.JPG",
      category: "events",
      date: "August 10, 2023"
    },
    {
      id: 9,
      title: "Educational Activities",
      description: "Educational and learning activities",
      image: "/images/photo-gallery/9.JPG",
      category: "academic",
      date: "July 5, 2023"
    }
  ]

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Photo Collection
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto break-words">
            Explore our photo collection showcasing school life, events, and achievements
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 text-xs sm:text-sm touch-target min-h-[44px] ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg active:bg-primary-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 active:bg-primary-200'
              }`}
              aria-label={`Filter by ${category.name}`}
              aria-pressed={selectedCategory === category.id}
            >
              <span className="text-sm sm:text-base">{category.icon}</span>
              <span className="truncate">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl active:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 active:border-primary-300 cursor-pointer hover-lift touch-target"
              onClick={() => setSelectedPhoto(photo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedPhoto(photo)
                }
              }}
              aria-label={`View ${photo.title}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 active:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white text-lg sm:text-xl">🔍</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-primary-700 transition-colors duration-300 truncate">
                  {photo.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 break-words">
                  {photo.description}
                </p>
                <p className="text-gray-500 text-xs">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📷</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">No photos found</h3>
            <p className="text-sm sm:text-base text-gray-500">Try selecting a different category</p>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Viewing ${selectedPhoto.title}`}
          >
            <div 
              className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video sm:aspect-video">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain sm:object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 transition-colors duration-300 touch-target"
                  aria-label="Close photo modal"
                >
                  <span className="text-lg sm:text-xl">✕</span>
                </button>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words">{selectedPhoto.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 break-words">{selectedPhoto.description}</p>
                <p className="text-xs sm:text-sm text-gray-500">{selectedPhoto.date}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PhotoGalleryPhotos
