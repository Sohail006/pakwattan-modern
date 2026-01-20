'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Award, ZoomIn, Laptop } from 'lucide-react'

const LaptopDistribution = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  const laptopRecipients = [
    {
      name: "MISS AQEELA SHAHEEN",
      image: "/images/achievements/MISS AQEELA SHAHEEN Laptop Receive.jpg",
      achievement: "Received laptop for outstanding academic performance and dedication to studies",
      position: "Academic Excellence Award"
    },
    {
      name: "MISS UM E HANI REHMAN", 
      image: "/images/achievements/MISS UM E HANI REHMAN Receiving Laptop.jpg",
      achievement: "Recognized for exceptional performance and commitment to education",
      position: "Merit Scholarship Recipient"
    },
    {
      name: "Laptop Distribution Program",
      image: "/images/achievements/Laptops/1.jpg",
      achievement: "Pak Wattan's initiative to provide laptops to deserving students",
      position: "Educational Support Program"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % laptopRecipients.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + laptopRecipients.length) % laptopRecipients.length)
  }

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-50 via-accent-50 to-primary-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full px-6 sm:px-8 py-2 sm:py-3 mb-6 shadow-lg">
              <Laptop className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span className="text-sm sm:text-base md:text-lg font-bold text-white">Technology Support</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                Laptop Distribution
              </span>
            </h2>
            <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto">
              Supporting our students with laptops to enhance their learning experience and academic success
            </p>
          </div>

          {/* Enhanced Card Display */}
          <div className="relative max-w-7xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 border-purple-300/30">
              <div className="relative min-h-[600px] sm:min-h-[700px] overflow-hidden bg-gradient-to-br from-purple-50/50 to-accent-50/50">
                {laptopRecipients.map((recipient, index) => (
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
                                  <Award className="w-5 h-5 text-purple-300" />
                                  <span className="text-sm font-medium text-purple-300">{recipient.position}</span>
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
                            <div className="absolute top-4 left-4 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              💻 Laptop Recipient
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced Content */}
                        <div className="order-1 lg:order-2 flex flex-col justify-center space-y-6">
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl">
                            <div className="space-y-6">
                              <div className="p-4 bg-gradient-to-r from-purple-100 to-accent-100 rounded-lg border-l-4 border-purple-500">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Laptop className="w-5 h-5 text-purple-600" />
                                  <span className="text-sm font-medium text-secondary-600">Award</span>
                                </div>
                                <p className="text-lg font-bold text-secondary-800 break-words">{recipient.position}</p>
                              </div>
                              
                              <div className="p-4 bg-gradient-to-br from-accent-50 to-primary-50 rounded-lg">
                                <p className="text-base text-secondary-700 leading-relaxed break-words">
                                  {recipient.achievement}
                                </p>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex items-center space-x-2 bg-purple-100 rounded-full px-4 py-2 flex-1 justify-center">
                                  <Laptop className="w-5 h-5 text-purple-600" />
                                  <span className="text-sm font-semibold text-purple-700">Technology Support</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-accent-100 rounded-full px-4 py-2 flex-1 justify-center">
                                  <Award className="w-5 h-5 text-accent-600" />
                                  <span className="text-sm font-semibold text-accent-700">Educational Excellence</span>
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
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-purple-50 active:bg-purple-100 text-secondary-700 hover:text-purple-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 z-20 hover:scale-110 active:scale-95 touch-target min-h-[44px] min-w-[44px] border-2 border-purple-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-purple-50 active:bg-purple-100 text-secondary-700 hover:text-purple-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 z-20 hover:scale-110 active:scale-95 touch-target min-h-[44px] min-w-[44px] border-2 border-purple-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Enhanced Indicators */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                {laptopRecipients.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      index === currentSlide
                        ? 'bg-purple-500 scale-125 shadow-lg'
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
                  {currentSlide + 1} / {laptopRecipients.length}
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

export default LaptopDistribution
