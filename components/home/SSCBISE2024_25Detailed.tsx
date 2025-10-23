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
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg">
              5th time in a row - SSC Havelian Circle's top achiever!
            </span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <AnimatedFireworksBackground className="bg-black/20 backdrop-blur-sm">
                <div className="relative h-96 overflow-hidden">
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
                      <div className="h-full flex items-center justify-center p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                          {/* Left Image */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                            <div className="aspect-square rounded-lg overflow-hidden">
                              <Image
                                src={slide.left}
                                alt="SSC Result 2024-25"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          
                          {/* Right Image */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                            <div className="aspect-square rounded-lg overflow-hidden">
                              <Image
                                src={slide.right}
                                alt="SSC Result 2024-25"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
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
                  {resultImages.map((_, index) => (
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
            </AnimatedFireworksBackground>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SSCBISE2024_25Detailed
