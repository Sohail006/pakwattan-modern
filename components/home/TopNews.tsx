'use client'

import { useState, useEffect } from 'react'
import { 
  Trophy, 
  GraduationCap, 
  Award, 
  Users, 
  Calendar, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play,
  ExternalLink
} from 'lucide-react'

const TopNews = () => {
  const [currentNews, setCurrentNews] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const newsItems = [
    {
      id: 1,
      title: "مسلسل پانچ سال میں پانچ مرتبہ حویلیاں سرکل ٹاپ",
      subtitle: "Five consecutive years topping Havelian Circle",
      type: "achievement",
      urgent: true,
      icon: Trophy,
      color: "from-yellow-400 to-yellow-600",
      action: "View Details",
      href: "/about#achievements"
    },
    {
      id: 2,
      title: "Admission Open for Session 2025-26",
      subtitle: "Apply Now! Limited seats available",
      type: "admission",
      urgent: true,
      icon: GraduationCap,
      color: "from-green-400 to-green-600",
      action: "Apply Now",
      href: "/admission"
    },
    {
      id: 3,
      title: "Scholarship Test Results Announced",
      subtitle: "Check Your Results Online",
      type: "results",
      urgent: false,
      icon: Award,
      color: "from-blue-400 to-blue-600",
      action: "Check Results",
      href: "/scholarships"
    },
    {
      id: 4,
      title: "Talent Hunt Season 2 Registration",
      subtitle: "Join Now! Show your talent",
      type: "talent",
      urgent: false,
      icon: Users,
      color: "from-purple-400 to-purple-600",
      action: "Register",
      href: "/talent-hunt"
    },
    {
      id: 5,
      title: "Annual Prize Distribution Ceremony",
      subtitle: "March 2024 - Celebrating Excellence",
      type: "event",
      urgent: false,
      icon: Calendar,
      color: "from-pink-400 to-pink-600",
      action: "Learn More",
      href: "/about#prize-distribution"
    },
    {
      id: 6,
      title: "Pakians Coaching Academy",
      subtitle: "New Batch Starting Soon",
      type: "academy",
      urgent: false,
      icon: BookOpen,
      color: "from-indigo-400 to-indigo-600",
      action: "Enroll Now",
      href: "/pakians-coaching-academy"
    }
  ]

  useEffect(() => {
    if (!isPaused && !isHovered) {
      const interval = setInterval(() => {
        setCurrentNews((prev) => (prev + 1) % newsItems.length)
      }, 6000) // Increased duration for better readability
      return () => clearInterval(interval)
    }
  }, [isPaused, isHovered, newsItems.length])

  const nextNews = () => {
    setCurrentNews((prev) => (prev + 1) % newsItems.length)
  }

  const prevNews = () => {
    setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  // const currentItem = newsItems[currentNews]
  // const IconComponent = currentItem.icon

  return (
    <div 
      className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-2 sm:py-3 shadow-lg relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>
      
      <div className="container-custom relative z-10 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          {/* Left Section - Breaking News Badge */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <div className="bg-gradient-to-r from-accent-400 to-accent-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse">
              🔥 BREAKING
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-bounce"></div>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Latest News</span>
            </div>
          </div>
          
          {/* Center Section - News Content */}
          <div className="flex-1 mx-2 sm:mx-4 lg:mx-8 min-w-0">
            <div className="relative min-h-[2.5rem] sm:min-h-[3rem] overflow-hidden">
              <div 
                className="absolute inset-0 flex items-center transition-all duration-700 ease-in-out"
                style={{ transform: `translateY(-${currentNews * 100}%)` }}
              >
                {newsItems.map((item) => {
                  const ItemIcon = item.icon
                  return (
                    <div
                      key={item.id}
                      className="w-full flex items-center justify-center min-h-[2.5rem] sm:min-h-[3rem] px-2 sm:px-4"
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3 max-w-4xl w-full">
                        {/* Icon */}
                        <div className={`bg-gradient-to-r ${item.color} p-1.5 sm:p-2 rounded-full shadow-lg flex-shrink-0`}>
                          <ItemIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 text-center min-w-0">
                          <h3 className={`text-xs sm:text-sm lg:text-base font-bold truncate ${
                            item.urgent ? 'blink text-yellow-300' : 'text-white'
                          }`}>
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1 hidden sm:block truncate">
                            {item.subtitle}
                          </p>
                        </div>
                        
                        {/* Action Button */}
                        <a
                          href={item.href}
                          className={`bg-white/20 hover:bg-white/30 active:bg-white/40 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 flex items-center space-x-1 group flex-shrink-0 touch-target min-h-[44px]`}
                        >
                          <span className="hidden xs:inline">{item.action}</span>
                          <span className="xs:hidden">→</span>
                          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform hidden xs:inline" />
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Right Section - Controls and Indicators */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Navigation Controls */}
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <button
                onClick={prevNews}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 group touch-target min-h-[44px] min-w-[44px]"
                aria-label="Previous news"
              >
                <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={togglePause}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 group touch-target min-h-[44px] min-w-[44px]"
                aria-label={isPaused ? "Resume news" : "Pause news"}
              >
                {isPaused ? (
                  <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                ) : (
                  <Pause className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
              </button>
              
              <button
                onClick={nextNews}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full flex items-center justify-center transition-all duration-300 group touch-target min-h-[44px] min-w-[44px]"
                aria-label="Next news"
              >
                <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            
            {/* Progress Indicators */}
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNews(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    index === currentNews
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/80 active:bg-white/90'
                  }`}
                  aria-label={`Go to news item ${index + 1}`}
                  aria-current={index === currentNews ? 'true' : 'false'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNews
