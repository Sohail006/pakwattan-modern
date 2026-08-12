'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Award, Star, ZoomIn, Trophy } from 'lucide-react'
import Container from '@/components/ui/Container'

const BISEHSSCTopers = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

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
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-50 via-accent-50 to-yellow-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
        </div>

        <Container>
          {/* Enhanced Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 px-4 sm:px-0">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full px-6 sm:px-8 py-2 sm:py-3 mb-6 shadow-lg">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              <span className="text-sm sm:text-base md:text-lg font-bold text-black">Top Achievers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
              <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                BISE HSSC Toppers
              </span>
            </h2>
            <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto">
              Celebrating our outstanding students who achieved top positions in HSSC Board Results
            </p>
          </div>

          {/* Enhanced Image Display */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-300/30">
              <div className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] overflow-hidden bg-gradient-to-br from-yellow-50/50 to-primary-50/50">
                {topperImages.map((slide, index) => {
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
                    <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 w-full max-w-6xl items-center">
                        {/* Full poster image — object-contain so nothing is cropped */}
                        <div className="group relative order-2 lg:order-1">
                          <div
                            className="relative mx-auto w-full max-w-md aspect-[1143/1600] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl cursor-pointer bg-secondary-100 ring-1 ring-yellow-200/60"
                            onClick={() => setZoomedImage(slide.src)}
                          >
                            <Image
                              src={slide.src}
                              alt={slide.name}
                              fill
                              className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                              sizes="(max-width: 1024px) 90vw, 28rem"
                              priority={index === 0}
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-xs font-semibold text-secondary-700 flex items-center gap-1.5">
                                <ZoomIn className="w-3.5 h-3.5" />
                                <span>Enlarge</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced Content */}
                        <div className="order-1 lg:order-2 flex flex-col justify-center space-y-4 sm:space-y-5">
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-xl">
                            <div className="flex items-center space-x-3 mb-4 sm:mb-5">
                              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shrink-0">
                                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-secondary-600">HSSC Topper</p>
                                <p className="text-lg font-bold text-secondary-800 truncate">{slide.name}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5">
                              <div className="p-3 sm:p-4 bg-gradient-to-r from-yellow-100 to-primary-100 rounded-lg border-l-4 border-yellow-500">
                                <div className="flex items-center space-x-2 mb-1.5">
                                  <Star className="w-5 h-5 text-yellow-600 shrink-0" />
                                  <span className="text-sm font-medium text-secondary-600">Position</span>
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-secondary-800">{slide.position}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <div className="p-3 sm:p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg">
                                  <p className="text-xs font-medium text-secondary-600 mb-1">Marks</p>
                                  <p className="text-lg sm:text-xl font-bold text-primary-700">{slide.marks}</p>
                                </div>
                                <div className="p-3 sm:p-4 bg-gradient-to-br from-accent-50 to-primary-50 rounded-lg">
                                  <p className="text-xs font-medium text-secondary-600 mb-1">Group</p>
                                  <p className="text-base sm:text-lg font-bold text-accent-700 break-words">{slide.group}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-yellow-400/20 to-primary-400/20 rounded-lg p-3 sm:p-4 border-2 border-yellow-300/50">
                              <p className="text-sm font-semibold text-secondary-700 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-yellow-600 shrink-0" />
                                <span>Outstanding achievement in Havelian Circle</span>
                              </p>
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
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-white hover:bg-yellow-50 active:bg-yellow-100 text-secondary-700 hover:text-primary-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 z-20 hover:scale-110 active:scale-95 touch-target min-h-[44px] min-w-[44px] border-2 border-yellow-200"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-white hover:bg-yellow-50 active:bg-yellow-100 text-secondary-700 hover:text-primary-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 z-20 hover:scale-110 active:scale-95 touch-target min-h-[44px] min-w-[44px] border-2 border-yellow-200"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>

                {/* Enhanced Indicators */}
                <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  {topperImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-target min-h-[40px] min-w-[40px] flex items-center justify-center ${
                        index === currentSlide
                          ? 'bg-yellow-500 scale-125 shadow-lg'
                          : 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={index === currentSlide ? 'true' : 'false'}
                    />
                  ))}
                </div>

                {/* Slide Counter */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg z-20">
                  <span className="text-xs sm:text-sm font-semibold text-secondary-700">
                    {currentSlide + 1} / {topperImages.length}
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
              alt="Enlarged topper image"
              width={1143}
              height={1600}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
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

export default BISEHSSCTopers
