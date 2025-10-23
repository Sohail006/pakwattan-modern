'use client'

import { Users, BookOpen, Trophy, Heart } from 'lucide-react'

const SchoolLifeHero = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Vibrant Community',
      description: 'A diverse community of scholars and learners committed to serving humanity'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Academic Excellence',
      description: 'Nationally recognized institute providing outstanding education'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Student Activities',
      description: 'Rich extracurricular activities and student life programs'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Character Building',
      description: 'Focus on developing well-rounded individuals with strong values'
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
                School{' '}
                <span className="text-gradient">
                  Life
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                A Vibrant Community of Scholars and Learners
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                PAK WATTAN School & College of Sciences Havelian is a nationally recognized 
                institute providing academic excellence, and a vibrant community of scholars 
                and learners committed to serve the nation and humanity across the world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent text-center">
                Explore Activities
              </button>
              <button className="btn-secondary text-center">
                View Schedule
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group hover-lift"
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
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

export default SchoolLifeHero
