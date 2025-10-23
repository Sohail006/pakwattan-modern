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
    <section className="py-16 bg-gradient-to-br from-accent-50 to-primary-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg">
              BISE HSSC Toppers
            </span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Celebrating our outstanding students who achieved top positions in HSSC Board Results
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
                      <div className="h-full flex items-center justify-center p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                          {/* Image */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                            <div className="aspect-square rounded-lg overflow-hidden">
                              <Image
                                src={slide.src}
                                alt={slide.name}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg flex flex-col justify-center">
                            <div className="flex items-center space-x-3 mb-4">
                              <Award className="w-6 h-6 text-primary-600" />
                              <span className="text-sm font-medium text-primary-600">HSSC Topper</span>
                            </div>
                            <h3 className="text-2xl font-bold text-secondary-800 mb-2">
                              {slide.name}
                            </h3>
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center space-x-2">
                                <Star className="w-5 h-5 text-accent-600" />
                                <span className="text-lg font-semibold text-accent-600">
                                  {slide.position}
                                </span>
                              </div>
                              <div className="text-lg text-secondary-600">
                                <strong>Marks:</strong> {slide.marks}
                              </div>
                              <div className="text-lg text-secondary-600">
                                <strong>Group:</strong> {slide.group}
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg p-3">
                              <p className="text-sm text-secondary-700 font-medium">
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
                  {topperImages.map((_, index) => (
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

export default BISEHSSCTopers
