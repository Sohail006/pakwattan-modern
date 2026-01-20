'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Award, ZoomIn, Star } from 'lucide-react'

const UmrahTickets = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  const umrahRecipients = [
    {
      name: "Muhammad Tayyab",
      image: "/images/achievements/UmrahTickets/1.jpg",
      achievement: "He received Umrah ticket for his highly appreciable performance",
      position: "Top Position Holder"
    },
    {
      name: "Manahil Toqueer", 
      image: "/images/achievements/UmrahTickets/2.jpg",
      achievement: "Outstanding academic performance in SSC Board Results",
      position: "Merit Scholar"
    },
    {
      name: "Aiman Batool",
      image: "/images/achievements/Aiman Batool.jpg",
      achievement: "Exceptional performance in HSSC Board examinations",
      position: "Academic Excellence"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % umrahRecipients.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + umrahRecipients.length) % umrahRecipients.length)
  }

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 via-accent-50 to-primary-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full px-6 sm:px-8 py-2 sm:py-3 mb-6 shadow-lg">
              <span className="text-2xl">🕋</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-white">Umrah Recognition</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
                Umrah Tickets
              </span>
            </h2>
            <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto">
              Top position holders in SSC and HSSC receiving Umrah tickets for their outstanding performance
            </p>
          </div>

          {/* Enhanced Card Display */}
          <div className="relative max-w-7xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 border-green-300/30">
              <div className="relative min-h-[600px] sm:min-h-[700px] overflow-hidden bg-gradient-to-br from-green-50/50 to-accent-50/50">
                {umrahRecipients.map((recipient, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 translate-x-0 scale-100'
                        : index < currentSlide
                        ? 'opacity-0 -translate-x-full scale-95'
                        : 'opacity-0 translate-x-full scale-95'
                    }`}
                  >
                    <div className="h-full flex items-center justify-center p-6 sm:p-8 lg:p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 w-full max-w-6xl">
                        {/* Large Prominent Image */}
                        <div className="group relative order-2 lg:order-1">
                          <div className="relative h-[450px] sm:h-[550px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl cursor-pointer" onClick={() => setZoomedImage(recipient.image)}>
                            <Image
                              src={recipient.image}
                              alt={recipient.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-8">
                              <div className="text-white w-full">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Award className="w-5 h-5 text-green-300" />
                                  <span className="text-sm font-medium text-green-300">{recipient.position}</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 break-words">
                                  {recipient.name}
                                </h3>
                              </div>
                            </div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-sm font-semibold text-secondary-700 flex items-center space-x-2">
                                <ZoomIn className="w-4 h-4" />
                                <span>Click to enlarge</span>
                              </span>
                            </div>
                            <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              🕋 Umrah Recipient
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced Content */}
                        <div className="order-1 lg:order-2 flex flex-col justify-center space-y-6">
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl">
                            <div className="space-y-6">
                              <div className="p-4 bg-gradient-to-r from-green-100 to-accent-100 rounded-lg border-l-4 border-green-500">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Star className="w-5 h-5 text-green-600" />
                                  <span className="text-sm font-medium text-secondary-600">Achievement</span>
                                </div>
                                <p className="text-lg font-bold text-secondary-800 break-words">{recipient.position}</p>
                              </div>
                              
                              <div className="p-4 bg-gradient-to-br from-accent-50 to-primary-50 rounded-lg">
                                <p className="text-base text-secondary-700 leading-relaxed break-words">
                                  {recipient.achievement}
                                </p>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 flex-1 justify-center">
                                  <Star className="w-5 h-5 text-green-600" />
                                  <span className="text-sm font-semibold text-green-700">Academic Excellence</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-accent-100 rounded-full px-4 py-2 flex-1 justify-center">
                                  <span className="text-xl">🕋</span>
                                  <span className="text-sm font-semibold text-accent-700">Umrah Recognition</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Navigation */}
              <button
                onClick={prevSlide}
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-green-50 active:bg-green-100 text-secondary-700 hover:text-green-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 z-20 hover:scale-110 active:scale-95 touch-target min-h-[44px] min-w-[44px] border-2 border-green-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-green-50 active:bg-green-100 text-secondary-700 hover:text-green-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 z-20 hover:scale-110 active:scale-95 touch-target min-h-[44px] min-w-[44px] border-2 border-green-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Enhanced Indicators */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                {umrahRecipients.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      index === currentSlide
                        ? 'bg-green-500 scale-125 shadow-lg'
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
                  {currentSlide + 1} / {umrahRecipients.length}
                </span>
              </div>
            </div>
          </div>
        </div>
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
              alt="Enlarged recipient image"
              width={1000}
              height={1200}
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

export default UmrahTickets
