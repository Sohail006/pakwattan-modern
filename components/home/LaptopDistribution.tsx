'use client'

import { useState } from 'react'
import Image from 'next/image'

const LaptopDistribution = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const laptopRecipients = [
    {
      name: "MISS AQEELA SHAHEEN",
      image: "/images/achievements/MISS AQEELA SHAHEEN Laptop Receive.jpg",
      achievement: "Received laptop for outstanding academic performance and dedication to studies",
      position: "Academic Excellence Award"
    },
    {
      name: "MISS UM E HANI REHMAN", 
      image: "/images/achievements/MISS UM E HANI REHMAN Receiving Laptop.jpg",
      achievement: "Recognized for exceptional performance and commitment to education",
      position: "Merit Scholarship Recipient"
    },
    {
      name: "Laptop Distribution Program",
      image: "/images/achievements/Laptops/1.jpg",
      achievement: "Pak Wattan's initiative to provide laptops to deserving students",
      position: "Educational Support Program"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % laptopRecipients.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + laptopRecipients.length) % laptopRecipients.length)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-accent-50 to-primary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-100 rounded-full px-6 py-3 text-sm font-medium text-accent-700 mb-6">
            <span>💻</span>
            <span>Laptop Distribution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
              Laptop Distribution
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Supporting our students with laptops to enhance their learning experience and academic success
          </p>
        </div>

        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500 to-primary-500 opacity-5"></div>
          
          <div className="relative">
            {/* Carousel */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {laptopRecipients.map((recipient, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-3xl font-bold text-primary-800">
                            {recipient.name}
                          </h3>
                          <p className="text-lg text-gray-600">
                            {recipient.achievement}
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <span>💻</span>
                            <span className="text-gray-700 font-medium">Laptop Recipient</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span>🏆</span>
                            <span className="text-gray-700 font-medium">Award: {recipient.position}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 bg-accent-100 rounded-full px-4 py-2">
                            <span>💻</span>
                            <span className="text-accent-700 font-semibold">Technology Support</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-2">
                            <span>🎓</span>
                            <span className="text-primary-700 font-semibold">Educational Excellence</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={recipient.image}
                            alt={recipient.name}
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
              {laptopRecipients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-accent-600 scale-125' 
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

export default LaptopDistribution
