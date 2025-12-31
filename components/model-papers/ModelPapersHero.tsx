'use client'

import Image from 'next/image'

const ModelPapersHero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container-custom relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-josefin leading-tight break-words">
                Model Papers
                <span className="block text-gradient">
                  Session 2025-26
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed break-words">
                Practice papers for exam preparation
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed break-words">
                Access our comprehensive collection of model papers designed to help students 
                prepare effectively for their examinations. These papers follow the latest 
                curriculum and examination patterns.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="btn-accent text-center touch-target min-h-[44px]">
                View Papers
              </button>
              <button className="btn-secondary text-center touch-target min-h-[44px]">
                Download All
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/model-papers/model-papers-hero.jpg"
                alt="Model Papers"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl sm:rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModelPapersHero
