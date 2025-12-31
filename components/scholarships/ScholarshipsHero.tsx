'use client'

import { Award, BookOpen, Heart, Star } from 'lucide-react'

const ScholarshipsHero = () => {
  const scholarshipTypes = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Pakians Scholarship',
      description: 'Merit-based scholarships for outstanding students'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Orphan Scholarship',
      description: 'Support for orphaned students'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Merit-Based',
      description: 'Academic excellence scholarships'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Hafiz e Quran',
      description: 'Scholarships for Quran memorizers'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container-custom relative z-10 py-8 sm:py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-josefin leading-tight break-words">
                <span className="text-gradient">Scholarships</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed break-words">
                Making Quality Education Accessible
              </p>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed break-words">
                PWSCS gives scholarships to students every year, including Pakians Scholarship, 
                merit-based, orphan, special child, and Hafiz e Quran scholarships. Our 
                <strong> 15 Lacs Scholarship Program</strong> supports deserving students. 
                The scholarship test has always been conducted on <strong>March 23rd</strong> 
                in the girl&apos;s campus Havelian.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="btn-accent text-center touch-target min-h-[44px]">
                Apply for Scholarship
              </button>
              <button className="btn-secondary text-center touch-target min-h-[44px]">
                Learn More
              </button>
            </div>
          </div>

          {/* Scholarship Types Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {scholarshipTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/20 active:bg-white/15 transition-all duration-300 group"
              >
                <div className="text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {type.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2 truncate">
                  {type.title}
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed break-words">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-accent-500/20 rounded-full animate-bounce-slow delay-1000"></div>
    </section>
  )
}

export default ScholarshipsHero
