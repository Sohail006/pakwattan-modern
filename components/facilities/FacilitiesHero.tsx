'use client'

import { Shield, Wifi, BookOpen, Users, Award, Heart } from 'lucide-react'

const FacilitiesHero = () => {
  const facilityCategories = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security & Safety',
      description: '24/7 security system and safety measures'
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: 'Technology',
      description: 'Modern computer labs and smart boards'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Academic',
      description: 'Well-equipped classrooms and science labs'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Physical',
      description: 'Sports facilities and physical training'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Medical',
      description: 'On-campus medical facilities'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Religious',
      description: 'Religious training and guidance'
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
                World-Class{' '}
                <span className="text-gradient">
                  Facilities
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                State-of-the-art infrastructure for modern education
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                At Pak Wattan School & College of Sciences, we provide comprehensive 
                facilities to ensure our students receive the best possible education 
                in a safe, modern, and well-equipped environment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent text-center">
                Explore Facilities
              </button>
              <button className="btn-secondary text-center">
                Schedule Visit
              </button>
            </div>
          </div>

          {/* Facility Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {facilityCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group text-center"
              >
                <div className="text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {category.title}
                </h3>
                <p className="text-xs text-white/80">
                  {category.description}
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

export default FacilitiesHero
