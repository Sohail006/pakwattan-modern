'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Award, Star } from 'lucide-react'
import Container from '@/components/ui/Container'

const BISEHSSCTopers = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const topperImages = [
    { id: 1, src: '/images/hssc-toppers/1.jpg', name: 'Qasim Zaib', marks: '1035', position: '1st Position', group: 'Computer Science' },
    { id: 2, src: '/images/hssc-toppers/2.jpg', name: 'Umme Habiba', marks: '534', position: '1st Position', group: 'Pre Medical' },
    { id: 3, src: '/images/hssc-toppers/3.jpg', name: 'Rashail Waheed', marks: '524', position: '1st Position', group: 'Pre Engineering' },
    { id: 4, src: '/images/hssc-toppers/4.jpg', name: 'Toheed Ahmed', marks: '528', position: '1st Position', group: 'Computer Science' },
    { id: 5, src: '/images/hssc-toppers/5.jpg', name: 'Haleema Waqar', marks: '1135', position: '2nd Position', group: 'Pre Medical' },
    { id: 6, src: '/images/hssc-toppers/6.jpg', name: 'Laiba Ashraf', marks: '1103', position: 'Top Performer', group: 'Science Group' },
    { id: 7, src: '/images/hssc-toppers/7.jpg', name: 'Umama Hafeez', marks: '1103', position: 'Top Performer', group: 'Science Group' },
    { id: 8, src: '/images/hssc-toppers/8.jpg', name: 'Aiman Batool', marks: 'A Grade', position: 'Excellence', group: 'Academic' },
    { id: 9, src: '/images/hssc-toppers/9.jpg', name: 'Zarnish Ejaz', marks: 'A+ Grade', position: 'Outstanding', group: 'Academic' },
    { id: 10, src: '/images/hssc-toppers/10.jpg', name: 'Eman Akram', marks: 'A Grade', position: 'Excellence', group: 'Academic' }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % topperImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + topperImages.length) % topperImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-accent-50 to-primary-50">
      <Container>
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-3 sm:mb-4 break-words">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base lg:text-lg">
              BISE HSSC Toppers
            </span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Celebrating our outstanding students who achieved top positions in HSSC Board Results
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-0">
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
                  {topperImages.map((slide, index) => (
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
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg">
                            <div className="aspect-square rounded-lg overflow-hidden">
                              <Image
                                src={slide.src}
                                alt={slide.name}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg flex flex-col justify-center min-w-0">
                            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 flex-shrink-0" />
                              <span className="text-xs sm:text-sm font-medium text-primary-600 truncate">HSSC Topper</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-2 break-words">
                              {slide.name}
                            </h3>
                            <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-accent-600 flex-shrink-0" />
                                <span className="text-base sm:text-lg font-semibold text-accent-600 break-words">
                                  {slide.position}
                                </span>
                              </div>
                              <div className="text-sm sm:text-base lg:text-lg text-secondary-600 break-words">
                                <strong>Marks:</strong> {slide.marks}
                              </div>
                              <div className="text-sm sm:text-base lg:text-lg text-secondary-600 break-words">
                                <strong>Group:</strong> {slide.group}
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg p-2 sm:p-3">
                              <p className="text-xs sm:text-sm text-secondary-700 font-medium break-words">
                                🏆 Outstanding achievement in Havelian Circle
                              </p>
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
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
                  {topperImages.map((_, index) => (
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

export default BISEHSSCTopers
