'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react'

const BreakingNews = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const newsItems = [
    {
      id: 1,
      title: "Summer Timing Announced",
      content: "Summer morning timing of PWSCS is: 07:30 am – 02:10 pm",
      date: "26 June, 2024",
      type: "timing"
    },
    {
      id: 2,
      title: "Winter Timing",
      content: "Winter timing of PWSCS is: 08:00 am – 01:45 pm",
      date: "26 June, 2024",
      type: "timing"
    },
    {
      id: 3,
      title: "Scholarship Test",
      content: "Girls Campus Havelian - 08:30 AM",
      date: "23 March, 2024",
      type: "test"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [newsItems.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length)
  }

  return (
    <section className="bg-gradient-to-r from-primary-50 to-accent-50 py-8 sm:py-12 lg:py-16">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-3 sm:mb-4 break-words">
            Breaking News & Updates
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-2xl mx-auto break-words">
            Stay updated with the latest news and announcements from Pak Wattan School & College of Sciences
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-48 sm:h-56 lg:h-64">
              {newsItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentSlide
                      ? 'opacity-100 translate-x-0'
                      : index < currentSlide
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="h-full flex items-center p-4 sm:p-6 lg:p-8">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
                        <div className="flex items-center space-x-2 text-primary-600">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium">Breaking News</span>
                        </div>
                        <div className="flex items-center space-x-2 text-secondary-500">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{item.date}</span>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-800 mb-2 sm:mb-3 break-words">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-secondary-600 leading-relaxed break-words">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4">
              <button
                onClick={prevSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-white active:bg-white/80 text-secondary-700 hover:text-primary-600 active:text-primary-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 touch-target min-h-[44px] min-w-[44px]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4">
              <button
                onClick={nextSlide}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-white active:bg-white/80 text-secondary-700 hover:text-primary-600 active:text-primary-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 touch-target min-h-[44px] min-w-[44px]"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    index === currentSlide
                      ? 'bg-primary-600'
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
    </section>
  )
}

export default BreakingNews
