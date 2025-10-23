'use client'

import { Play, Youtube } from 'lucide-react'

const YouTubeVideo = () => {
  return (
    <section id="youtube-video" className="section-padding bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">School Video</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Watch our school video to get a glimpse of our facilities, activities, and the vibrant learning environment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="relative">
              {/* YouTube Video Embed */}
              <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-xl overflow-hidden bg-gray-100">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/B5HXn5sZRXM?autoplay=0&mute=1&controls=1&showinfo=0&modestbranding=1&loop=1&playlist=B5HXn5sZRXM"
                  title="Pak Wattan School & College of Sciences - School Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl"
                ></iframe>
              </div>
              
              {/* Video Overlay Info */}
              <div className="absolute top-4 right-4">
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-2">
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </div>
              </div>
            </div>

            {/* Video Information */}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Play className="w-6 h-6 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-secondary-800 mb-2">School Tour</h4>
                  <p className="text-sm text-secondary-600">Virtual tour of our campus</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Youtube className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-secondary-800 mb-2">HD Quality</h4>
                  <p className="text-sm text-secondary-600">High definition video</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Play className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-secondary-800 mb-2">Activities</h4>
                  <p className="text-sm text-secondary-600">Student activities showcase</p>
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
