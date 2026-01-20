'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Calendar, Users, Trophy, ZoomIn } from 'lucide-react'
import Container from '@/components/ui/Container'

const AnnualDistributionCeremony2024_25 = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

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
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-accent-50 via-primary-50 to-secondary-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
        </div>

        <Container className="px-4 sm:px-0 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full px-6 sm:px-8 py-2 sm:py-3 mb-6 shadow-lg">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span className="text-sm sm:text-base md:text-lg font-bold text-white">Grand Ceremony</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
              <span className="bg-gradient-to-r from-accent-600 via-primary-600 to-accent-600 bg-clip-text text-transparent">
                Annual Distribution Ceremony
              </span>
              <br />
              <span className="text-secondary-800">2024-25</span>
            </h2>
            <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto">
              Celebrating the achievements and excellence of our students in a grand ceremony
            </p>
          </div>

          {/* Enhanced Image Display - Hero Style */}
          <div className="relative max-w-7xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 border-accent-300/30">
              <div className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] overflow-hidden bg-gradient-to-br from-accent-50/50 to-primary-50/50">
                {ceremonyImages.map((slide, index) => {
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentSlide
                          ? 'opacity-100 translate-x-0 scale-100'
                          : index < currentSlide
                          ? 'opacity-0 -translate-x-full scale-95'
                          : 'opacity-0 translate-x-full scale-95'
                      }`}
                    >
                    <div className="h-full flex items-center justify-center p-6 sm:p-8 lg:p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full max-w-6xl">
                        {/* Large Prominent Image */}
                        <div className="lg:col-span-2 group relative">
                          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl cursor-pointer" onClick={() => setZoomedImage(slide.src)}>
                            <Image
                              src={slide.src}
                              alt={slide.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="(max-width: 1024px) 100vw, 66vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-8">
                              <div className="text-white w-full">
                                <div className="flex items-center space-x-2 mb-3">
                                  <Calendar className="w-5 h-5 text-accent-300" />
                                  <span className="text-sm font-medium text-accent-300">Annual Ceremony 2024-25</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 break-words">
                                  {slide.title}
                                </h3>
                                <p className="text-base sm:text-lg text-white/90 break-words">
                                  {slide.description}
                                </p>
                              </div>
                            </div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-sm font-semibold text-secondary-700 flex items-center space-x-2">
                                <ZoomIn className="w-4 h-4" />
                                <span>Click to enlarge</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Sidebar */}
                        <div className="lg:col-span-1 flex flex-col justify-center space-y-6">
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl">
                            <div className="space-y-6">
                              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-accent-100 to-primary-100 rounded-lg">
                                <Users className="w-6 h-6 text-accent-600 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-secondary-600">Participants</p>
                                  <p className="text-lg font-bold text-secondary-800">Students & Staff</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg">
                                <Trophy className="w-6 h-6 text-primary-600 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-secondary-600">Recognition</p>
                                  <p className="text-lg font-bold text-secondary-800">Awards & Excellence</p>
                                </div>
                              </div>
                              <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm text-secondary-600 leading-relaxed">
                                  A memorable event celebrating outstanding achievements and academic excellence of our students.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  )
                })}
                
                {/* Enhanced Navigation */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-accent-50 active:bg-accent-100 text-secondary-700 hover:text-primary-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 z-20 hover:scale-110 active:scale-95 touch-target min-h-[44px] min-w-[44px] border-2 border-accent-200"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-accent-50 active:bg-accent-100 text-secondary-700 hover:text-primary-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 z-20 hover:scale-110 active:scale-95 touch-target min-h-[44px] min-w-[44px] border-2 border-accent-200"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>

                {/* Enhanced Indicators */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  {ceremonyImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center ${
                        index === currentSlide
                          ? 'bg-accent-500 scale-125 shadow-lg'
                          : 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={index === currentSlide ? 'true' : 'false'}
                    />
                  ))}
                </div>

                {/* Slide Counter */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-20">
                  <span className="text-sm font-semibold text-secondary-700">
                    {currentSlide + 1} / {ceremonyImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Image Lightbox Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={zoomedImage}
              alt="Enlarged ceremony image"
              width={1400}
              height={900}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnnualDistributionCeremony2024_25
