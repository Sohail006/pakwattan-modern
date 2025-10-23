'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Calendar, Users, Trophy } from 'lucide-react'
import Container from '@/components/ui/Container'

const AnnualDistributionCeremony2024_25 = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const ceremonyImages = [
    { id: 1, src: '/images/annual-ceremony/1.png', title: 'Annual Distribution Ceremony 2024-25', description: 'Celebrating excellence and achievements' },
    { id: 2, src: '/images/annual-ceremony/2.png', title: 'Award Distribution', description: 'Recognizing outstanding students' },
    { id: 3, src: '/images/annual-ceremony/3.png', title: 'Student Recognition', description: 'Honoring academic excellence' },
    { id: 4, src: '/images/annual-ceremony/4.png', title: 'Ceremony Highlights', description: 'Memorable moments from the event' },
    { id: 5, src: '/images/annual-ceremony/5.jpg', title: 'Group Photo', description: 'Students and staff together' },
    { id: 6, src: '/images/annual-ceremony/6.jpg', title: 'Award Presentation', description: 'Students receiving their awards' },
    { id: 7, src: '/images/annual-ceremony/7.jpg', title: 'Ceremony Venue', description: 'Beautiful ceremony setup' }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ceremonyImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ceremonyImages.length) % ceremonyImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg">
              Annual Distribution Ceremony 2024-25
            </span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Celebrating the achievements and excellence of our students in a grand ceremony
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Carousel Container */}
            <div className="relative">
              {/* Background with animated fireworks */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
                style={{
                  backgroundImage: 'url(/images/animatedfireworks.gif)',
                  borderRadius: '8px'
                }}
              />
              
              <div className="relative bg-black/20 backdrop-blur-sm">
                <div className="relative h-96 overflow-hidden">
                  {ceremonyImages.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-all duration-500 ${
                        index === currentSlide
                          ? 'opacity-100 translate-x-0'
                          : index < currentSlide
                          ? 'opacity-0 -translate-x-full'
                          : 'opacity-0 translate-x-full'
                      }`}
                    >
                      <div className="h-full flex items-center justify-center p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                          {/* Image */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                            <div className="aspect-video rounded-lg overflow-hidden">
                              <Image
                                src={slide.src}
                                alt={slide.title}
                                width={800}
                                height={450}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg flex flex-col justify-center">
                            <div className="flex items-center space-x-3 mb-4">
                              <Calendar className="w-6 h-6 text-primary-600" />
                              <span className="text-sm font-medium text-primary-600">Annual Ceremony</span>
                            </div>
                            <h3 className="text-2xl font-bold text-secondary-800 mb-3">
                              {slide.title}
                            </h3>
                            <p className="text-lg text-secondary-600 mb-4">
                              {slide.description}
                            </p>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Users className="w-5 h-5 text-accent-600" />
                                <span className="text-sm text-secondary-600">Students & Staff</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Trophy className="w-5 h-5 text-accent-600" />
                                <span className="text-sm text-secondary-600">Awards & Recognition</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-secondary-700 hover:text-primary-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-secondary-700 hover:text-primary-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {ceremonyImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-primary-600 scale-125'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default AnnualDistributionCeremony2024_25
