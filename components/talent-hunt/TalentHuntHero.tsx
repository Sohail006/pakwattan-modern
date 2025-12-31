'use client'

// import Image from 'next/image'
import { Trophy, Star, Users, Award } from 'lucide-react'

const TalentHuntHero = () => {
  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Uncover Hidden Talents',
      description: 'Discover and nurture unique abilities in every student'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Build Self-Esteem',
      description: 'Boost confidence through recognition and encouragement'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Inspire Young Minds',
      description: 'Create a platform for creative expression and growth'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Explore Full Potential',
      description: 'Help students reach their maximum capabilities'
    }
  ]

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
                Talent Hunt with{' '}
                <span className="text-gradient">
                  Pak Wattan
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed break-words">
                A vibrant platform launched to uncover hidden talents, build self-esteem, 
                and inspire young minds to explore their full potential.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed break-words">
                After the remarkable success of <strong>Season-I</strong> in the academic year 
                <strong> 2024–25</strong>, that had featured talented participants 
                <strong> exclusively from Pak Wattan</strong>. We are proud to fulfill our 
                promise by <strong>expanding Season-II to the district level in 2025–26</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="btn-accent text-center touch-target min-h-[44px]">
                Register Now
              </button>
              <button className="btn-secondary text-center touch-target min-h-[44px]">
                Learn More
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/20 active:bg-white/15 transition-all duration-300 group"
              >
                <div className="text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2 break-words">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed break-words">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/10 rounded-full animate-bounce-slow hidden sm:block"></div>
      <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-accent-500/20 rounded-full animate-bounce-slow delay-1000 hidden sm:block"></div>
    </section>
  )
}

export default TalentHuntHero
