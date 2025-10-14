'use client'

import { useState } from 'react'

const GraduationCeremonyVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent-500 to-primary-500 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">Graduation Ceremony</h3>
        </div>
      </div>

      {/* Video Content */}
      <div className="p-6">
        <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-video mb-4">
          {!isPlaying ? (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Click to play video</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                </div>
                <p className="text-sm">Video Player Placeholder</p>
                <p className="text-xs text-gray-300 mt-2">Video content will be loaded here</p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="text-center">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold text-accent-600">Alhamdulillah!</span>
          </p>
          <p className="text-gray-700 leading-relaxed mt-2 text-sm">
            تقریب دستار فضیلت پاک وطن سکول اینڈ کالج آف سائنسز حویلیاں حفاظ کرام کے اعزاز میں بابرکت تقریب کا انعقاد
          </p>
          <p className="text-gray-500 text-xs mt-2 italic">
            (The blessed ceremony of Dastar-e-Fazilat of Pak Watan School and College of Sciences Havelian was held in honor of the Huffaz)
          </p>
        </div>
      </div>
    </div>
  )
}

export default GraduationCeremonyVideo
