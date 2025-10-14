'use client'

import Image from 'next/image'

const GoldMedalsHero = () => {
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
                Gold Medals
                <span className="block text-gradient">
                  Academic Excellence
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Recognizing outstanding achievements
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Our gold medal recipients represent the pinnacle of academic excellence, 
                demonstrating exceptional dedication, hard work, and outstanding performance 
                in their studies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent text-center">
                View Recipients
              </button>
              <button className="btn-secondary text-center">
                Learn More
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/achievements/Gold Medals.jpeg"
                alt="Gold Medals Recognition"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoldMedalsHero
