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

      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold font-josefin leading-tight">
                <span className="text-gradient">Scholarships</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Making Quality Education Accessible
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                PWSCS gives scholarships to students every year, including Pakians Scholarship, 
                merit-based, orphan, special child, and Hafiz e Quran scholarships. Our 
                <strong> 15 Lacs Scholarship Program</strong> supports deserving students. 
                The scholarship test has always been conducted on <strong>March 23rd</strong> 
                in the girl's campus Havelian.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent text-center">
                Apply for Scholarship
              </button>
              <button className="btn-secondary text-center">
                Learn More
              </button>
            </div>
          </div>

          {/* Scholarship Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarshipTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {type.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {type.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
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
