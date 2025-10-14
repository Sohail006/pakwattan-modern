'use client'

import Image from 'next/image'

const PakiansCoachingAcademyHero = () => {
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
                Pakians Coaching Academy
                <span className="block text-gradient">
                  (PCA)
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Excellence in Education & Coaching
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Pakians Coaching Academy (PCA) is dedicated to providing quality education and coaching 
                to help students achieve their academic goals and excel in their studies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent text-center">
                Learn More
              </button>
              <button className="btn-secondary text-center">
                Contact Us
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/pakians-coaching-academy/pca-hero.jpg"
                alt="Pakians Coaching Academy"
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

export default PakiansCoachingAcademyHero
