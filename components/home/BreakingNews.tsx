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
    <section className="bg-gradient-to-r from-primary-50 to-accent-50 py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4">
            Breaking News & Updates
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Stay updated with the latest news and announcements from Pak Wattan School & College of Sciences
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-64">
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
                  <div className="h-full flex items-center p-8">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2 text-primary-600">
                          <Clock className="w-5 h-5" />
                          <span className="text-sm font-medium">Breaking News</span>
                        </div>
                        <div className="flex items-center space-x-2 text-secondary-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{item.date}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-secondary-800 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-lg text-secondary-600 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 bg-white/90 hover:bg-white text-secondary-700 hover:text-primary-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <button
                onClick={nextSlide}
                className="w-10 h-10 bg-white/90 hover:bg-white text-secondary-700 hover:text-primary-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-primary-600'
                      : 'bg-white/50 hover:bg-white/80'
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

export default BreakingNews
