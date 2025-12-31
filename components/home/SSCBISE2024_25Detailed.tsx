'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import AnimatedFireworksBackground from './AnimatedFireworksBackground'

const SSCBISE2024_25Detailed = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const resultImages = [
    { id: 1, left: '/images/ssc-results/566.jpg', right: '/images/ssc-results/1105.jpg' },
    { id: 2, left: '/images/ssc-results/565.jpg', right: '/images/ssc-results/1101.jpg' },
    { id: 3, left: '/images/ssc-results/565_2.jpg', right: '/images/ssc-results/1094.jpg' },
    { id: 4, left: '/images/ssc-results/552.jpg', right: '/images/ssc-results/1078.jpg' },
    { id: 5, left: '/images/ssc-results/538.jpg', right: '/images/ssc-results/1063.jpg' },
    { id: 6, left: '/images/ssc-results/531.jpg', right: '/images/ssc-results/1061.jpg' },
    { id: 7, left: '/images/ssc-results/531_1.jpg', right: '/images/ssc-results/1041.jpg' },
    { id: 8, left: '/images/ssc-results/530.jpg', right: '/images/ssc-results/1033.jpg' },
    { id: 9, left: '/images/ssc-results/528.jpg', right: '/images/ssc-results/1032.jpg' },
    { id: 10, left: '/images/ssc-results/527.jpg', right: '/images/ssc-results/1023.jpg' },
    { id: 11, left: '/images/ssc-results/521.jpg', right: '/images/ssc-results/1022.jpg' },
    { id: 12, left: '/images/ssc-results/508.jpg', right: '/images/ssc-results/1014.jpg' },
    { id: 13, left: '/images/ssc-results/506.jpg', right: '/images/ssc-results/1014_1.jpg' },
    { id: 14, left: '/images/ssc-results/505.jpg', right: '/images/ssc-results/1007.jpg' },
    { id: 15, left: '/images/ssc-results/503.jpg', right: '/images/ssc-results/1005.jpg' },
    { id: 16, left: '/images/ssc-results/500.jpg', right: '/images/ssc-results/1005.jpg' }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % resultImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + resultImages.length) % resultImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <Container className="px-4 sm:px-0">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-secondary-800 font-josefin mb-3 sm:mb-4 break-words">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl">
              5th time in a row - SSC Havelian Circle&apos;s top achiever!
            </span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
            <AnimatedFireworksBackground className="bg-black/20 backdrop-blur-sm">
                <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                  {resultImages.map((slide, index) => (
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
                          {/* Left Image */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg">
                            <div className="aspect-square rounded-lg overflow-hidden">
                              <Image
                                src={slide.left}
                                alt="SSC Result 2024-25"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                          </div>
                          
                          {/* Right Image */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg">
                            <div className="aspect-square rounded-lg overflow-hidden">
                              <Image
                                src={slide.right}
                                alt="SSC Result 2024-25"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
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
                  {resultImages.map((_, index) => (
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
            </AnimatedFireworksBackground>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SSCBISE2024_25Detailed
