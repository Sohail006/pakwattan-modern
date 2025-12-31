'use client'

import { useState } from 'react'
import Image from 'next/image'

const HonorableFounders = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const founders = [
    {
      name: "Sardar Abdul Aqeel",
      title: "Managing Director",
      image: "/images/achievements/1.jpg",
      description: "Visionary leader and founder of Pak Wattan School & College of Sciences, dedicated to providing quality education",
      achievements: [
        "Established Pak Wattan in 2020",
        "Vision for educational excellence",
        "Commitment to student success"
      ]
    },
    {
      name: "Malik Ahsan Ali",
      title: "Principal",
      image: "/images/achievements/2.jpg", 
      description: "Experienced educator leading the academic excellence and student development at Pak Wattan",
      achievements: [
        "Academic leadership",
        "Student development focus",
        "Educational innovation"
      ]
    },
    {
      name: "Leadership Team",
      title: "Administrative Excellence",
      image: "/images/achievements/3.jpg",
      description: "Dedicated team of educators and administrators committed to student success and academic excellence",
      achievements: [
        "Administrative excellence",
        "Team collaboration",
        "Educational commitment"
      ]
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % founders.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + founders.length) % founders.length)
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-primary-700 mb-4 sm:mb-6">
            <span>👥</span>
            <span>Leadership Team</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Our Honorable Founders
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto break-words">
            Meet the visionary leaders who established and continue to guide Pak Wattan School & College of Sciences
          </p>
        </div>

        <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 opacity-5"></div>
          
          <div className="relative">
            {/* Carousel */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {founders.map((founder, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
                      <div className="space-y-4 sm:space-y-6">
                        <div className="space-y-3 sm:space-y-4">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-800 break-words">
                            {founder.name}
                          </h3>
                          <p className="text-base sm:text-lg lg:text-xl text-accent-600 font-semibold break-words">
                            {founder.title}
                          </p>
                          <p className="text-sm sm:text-base lg:text-lg text-gray-600 break-words">
                            {founder.description}
                          </p>
                        </div>
                        
                        <div className="space-y-2 sm:space-y-3">
                          {founder.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start space-x-2 sm:space-x-3">
                              <span className="flex-shrink-0">⭐</span>
                              <span className="text-sm sm:text-base text-gray-700 font-medium break-words">{achievement}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                          <div className="flex items-center space-x-2 bg-primary-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                            <span>🎓</span>
                            <span className="text-xs sm:text-sm text-primary-700 font-semibold break-words">Educational Leadership</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-accent-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                            <span>🌟</span>
                            <span className="text-xs sm:text-sm text-accent-700 font-semibold break-words">Visionary Leadership</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={founder.image}
                            alt={founder.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg sm:rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white active:bg-white/80 text-primary-600 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-100 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous slide"
            >
              <span className="text-lg sm:text-xl">←</span>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white active:bg-white/80 text-primary-600 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-100 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Next slide"
            >
              <span className="text-lg sm:text-xl">→</span>
            </button>

            {/* Indicators */}
            <div className="flex justify-center space-x-1.5 sm:space-x-2 pb-4 sm:pb-6">
              {founders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    index === currentSlide 
                      ? 'bg-primary-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentSlide ? 'true' : 'false'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HonorableFounders
