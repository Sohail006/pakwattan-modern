'use client'

import Image from 'next/image'

const VideoGalleryHero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold font-josefin leading-tight">
                Video Gallery
                <span className="block text-gradient">
                  School Life in Motion
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Experience our school through videos
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Watch our collection of videos showcasing school events, activities, 
                achievements, and daily life at Pak Wattan School & College of Sciences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent text-center">
                Watch Videos
              </button>
              <button className="btn-secondary text-center">
                Subscribe Channel
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/video-gallery/video-gallery-hero.jpg"
                alt="Video Gallery"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoGalleryHero
