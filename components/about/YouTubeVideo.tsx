'use client'

import { Play, Youtube } from 'lucide-react'

const YouTubeVideo = () => {
  return (
    <section id="youtube-video" className="section-padding bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
            <span className="text-gradient">School Video</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Watch our school video to get a glimpse of our facilities, activities, and the vibrant learning environment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="relative">
              {/* YouTube Video Embed */}
              <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/B5HXn5sZRXM?autoplay=0&mute=1&controls=1&showinfo=0&modestbranding=1&loop=1&playlist=B5HXn5sZRXM"
                  title="Pak Wattan School & College of Sciences - School Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg sm:rounded-xl"
                ></iframe>
              </div>
              
              {/* Video Overlay Info */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                <div className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-1 sm:space-x-2">
                  <Youtube className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-words">YouTube</span>
                </div>
              </div>
            </div>

            {/* Video Information */}
            <div className="mt-6 sm:mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">School Tour</h4>
                  <p className="text-xs sm:text-sm text-secondary-600 break-words">Virtual tour of our campus</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">HD Quality</h4>
                  <p className="text-xs sm:text-sm text-secondary-600 break-words">High definition video</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Activities</h4>
                  <p className="text-xs sm:text-sm text-secondary-600 break-words">Student activities showcase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default YouTubeVideo
