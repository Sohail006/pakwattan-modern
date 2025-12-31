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
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
      <Container className="px-4 sm:px-0">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-secondary-800 font-josefin mb-3 sm:mb-4 break-words">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl">
              Annual Distribution Ceremony 2024-25
            </span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Celebrating the achievements and excellence of our students in a grand ceremony
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
            {/* Carousel Container */}
            <div className="relative">
              {/* Background with animated fireworks */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
                style={{
                  backgroundImage: 'url(/images/pakians-coaching-academy/pca-hero.jpg/animatedfireworks.gif)',
                  borderRadius: '8px'
                }}
              />
              
              <div className="relative bg-black/20 backdrop-blur-sm">
                <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
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
                      <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full max-w-4xl">
                          {/* Image */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg">
                            <div className="aspect-video rounded-lg overflow-hidden">
                              <Image
                                src={slide.src}
                                alt={slide.title}
                                width={800}
                                height={450}
                                className="w-full h-full object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg flex flex-col justify-center">
                            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 flex-shrink-0" />
                              <span className="text-xs sm:text-sm font-medium text-primary-600 break-words">Annual Ceremony</span>
                            </div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-800 mb-2 sm:mb-3 break-words">
                              {slide.title}
                            </h3>
                            <p className="text-sm sm:text-base lg:text-lg text-secondary-600 mb-3 sm:mb-4 break-words">
                              {slide.description}
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-accent-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-secondary-600 break-words">Students & Staff</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-accent-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-secondary-600 break-words">Awards & Recognition</span>
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
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white active:bg-white/80 text-secondary-700 hover:text-primary-600 active:text-primary-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 touch-target min-h-[44px] min-w-[44px]"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white active:bg-white/80 text-secondary-700 hover:text-primary-600 active:text-primary-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 touch-target min-h-[44px] min-w-[44px]"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
                  {ceremonyImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center ${
                        index === currentSlide
                          ? 'bg-primary-600 scale-125'
                          : 'bg-white/50 hover:bg-white/80 active:bg-white/90'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={index === currentSlide ? 'true' : 'false'}
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
