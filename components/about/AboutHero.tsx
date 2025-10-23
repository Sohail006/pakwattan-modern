'use client'

import { Calendar, Users, Award, MapPin } from 'lucide-react'

const AboutHero = () => {
  const stats = [
    {
      icon: <Calendar className="w-6 h-6" />,
      value: '2020',
      label: 'Established'
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: '1750+',
      label: 'Students'
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: '1100+',
      label: 'Awards'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      value: '3',
      label: 'Campuses'
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
                Welcome to the home of{' '}
                <span className="text-gradient">
                  Pakians
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Pak Wattan School & College of Sciences
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Established in <strong>November 2nd, 2020</strong>, with the mission of providing 
                quality education with affordable expenses. PWSCS gives scholarships to students 
                every year, including Pakians Scholarship, merit-based, orphan, special child, 
                and Hafiz e Quran scholarships.
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

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 group hover-lift"
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 font-medium">
                  {stat.label}
                </div>
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

export default AboutHero
