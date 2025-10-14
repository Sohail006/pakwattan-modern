'use client'

import { useState, useEffect } from 'react'

const TopNews = () => {
  const [currentNews, setCurrentNews] = useState(0)
  
  const newsItems = [
    {
      id: 1,
      title: "مسلسل چار سال میں چار مرتبہ حویلیاں سرکل ٹاپ",
      type: "achievement",
      urgent: true
    },
    {
      id: 2,
      title: "Admission Open for Session 2025-26",
      type: "admission",
      urgent: false
    },
    {
      id: 3,
      title: "Scholarship Test Results Announced",
      type: "results",
      urgent: false
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [newsItems.length])

  return (
    <div className="bg-primary-600 text-white py-2 overflow-hidden">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
              BREAKING
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <span className="text-sm font-medium">Latest News</span>
            </div>
          </div>
          
          <div className="flex-1 mx-8">
            <div className="relative h-8 overflow-hidden">
              <div 
                className="absolute inset-0 flex items-center transition-transform duration-500 ease-in-out"
                style={{ transform: `translateY(-${currentNews * 100}%)` }}
              >
                {newsItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="w-full flex items-center justify-center h-8"
                  >
                    <span className={`text-sm font-medium ${
                      item.urgent ? 'blink' : ''
                    }`}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNews
