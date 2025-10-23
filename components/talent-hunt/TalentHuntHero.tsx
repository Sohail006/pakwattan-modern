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

      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold font-josefin leading-tight">
                Talent Hunt with{' '}
                <span className="text-gradient">
                  Pak Wattan
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                A vibrant platform launched to uncover hidden talents, build self-esteem, 
                and inspire young minds to explore their full potential.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                After the remarkable success of <strong>Season-I</strong> in the academic year 
                <strong> 2024–25</strong>, that had featured talented participants 
                <strong> exclusively from Pak Wattan</strong>. We are proud to fulfill our 
                promise by <strong>expanding Season-II to the district level in 2025–26</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent text-center">
                Register Now
              </button>
              <button className="btn-secondary text-center">
                Learn More
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {feature.description}
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

export default TalentHuntHero
