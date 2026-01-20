'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const WelcomeMessage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-8 sm:py-10 lg:py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4 mb-6 sm:mb-8">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <Image
                  src="/images/AlhumdullahImage.png"
                  alt="Alhumdullah"
                  width={80}
                  height={80}
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex-shrink-0 drop-shadow-lg"
                  priority
                  unoptimized
                />
              </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-josefin animate-pulse-subtle break-words rtl:text-right" dir="rtl">
              <strong className="bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent">
                مسلسل چار سال میں چار مرتبہ حویلیاں سرکل ٹاپ
              </strong>
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed break-words px-4 sm:px-0 font-medium">
            Four consecutive years of being the top school in Havelian Circle
          </p>
        </div>
      </div>
    </section>
  )
}

export default WelcomeMessage
