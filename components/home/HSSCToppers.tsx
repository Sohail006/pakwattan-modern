'use client'

import { useState } from 'react'
import Image from 'next/image'

const HSSCToppers = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "HSSC Board Toppers 2024",
      image: "/images/hssc-toppers/1.jpg",
      description: "Celebrating our outstanding HSSC Board results and top achievers",
      achievements: [
        "Qasim Zaib - 1035 Marks (Computer Science)",
        "Umme Habiba - 534 Marks (Pre Medical)",
        "Rashail Waheed - 524 Marks (Pre Engineering)"
      ]
    },
    {
      title: "Academic Excellence",
      image: "/images/hssc-toppers/2.jpg", 
      description: "Our students continue to excel in HSSC Board examinations",
      achievements: [
        "Multiple position holders in Havelian Circle",
        "Outstanding performance across all groups",
        "Consistent academic excellence"
      ]
    },
    {
      title: "Top Achievers",
      image: "/images/hssc-toppers/3.jpg",
      description: "Recognizing our top performers and their dedication",
      achievements: [
        "First positions in various groups",
        "High marks across all subjects",
        "Exemplary academic performance"
      ]
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-6 py-3 text-sm font-medium text-primary-700 mb-6">
            <span>🏆</span>
            <span>Top Achievers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              HSSC Board Toppers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating our outstanding HSSC Board results and top achievers
          </p>
        </div>

        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 opacity-5"></div>
          
          <div className="relative">
            {/* Carousel */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-3xl font-bold text-primary-800">
                            {slide.title}
                          </h3>
                          <p className="text-lg text-gray-600">
                            {slide.description}
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          {slide.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <span>⭐</span>
                              <span className="text-gray-700 font-medium">{achievement}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 bg-accent-100 rounded-full px-4 py-2">
                            <span>🏅</span>
                            <span className="text-accent-700 font-semibold">Top Positions</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-2">
                            <span>🏆</span>
                            <span className="text-primary-700 font-semibold">Academic Excellence</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              ←
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              →
            </button>

            {/* Indicators */}
            <div className="flex justify-center space-x-2 pb-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HSSCToppers
