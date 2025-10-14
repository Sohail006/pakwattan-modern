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
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Photo Collection
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our photo collection showcasing school life, events, and achievements
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

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 cursor-pointer"
                 onClick={() => setSelectedPhoto(photo)}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🔍</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                  {photo.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {photo.description}
                </p>
                <p className="text-gray-500 text-xs">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No photos found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
               onClick={() => setSelectedPhoto(null)}>
            <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden"
                 onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-video">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPhoto.title}</h3>
                <p className="text-gray-600 mb-4">{selectedPhoto.description}</p>
                <p className="text-gray-500 text-sm">{selectedPhoto.date}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PhotoGalleryPhotos
