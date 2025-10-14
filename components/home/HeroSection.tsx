'use client'

import Link from 'next/link'
import { GraduationCap, Trophy, BookOpen, Award, Users, Heart } from 'lucide-react'

const HeroSection = () => {
  const quickLinks = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Scholarships',
      href: '/scholarships'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Talent Hunt',
      href: '/talent-hunt'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Pakians Coaching Academy (PCA)',
      href: '/pakians-coaching-academy'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Awards',
      href: '/awards'
    }
  ]

  return (
    <section className="relative h-[70vh] sm:h-[75vh] lg:h-[80vh] flex items-center overflow-hidden">
      {/* Enhanced Background with Video and Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/files/bannerImage.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-700/80"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      <div className="container-custom relative z-10 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          {/* Main Content - Mobile Optimized */}
          <div className="lg:col-span-2">
            <div className="text-white space-y-4 sm:space-y-6 animate-fade-in-up">
              <div className="space-y-2 sm:space-y-3">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white/90 mb-3 sm:mb-4">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-400 rounded-full animate-pulse"></div>
                  <span className="hidden xs:inline">Established 2020 • Excellence in Education</span>
                  <span className="xs:hidden">Est. 2020 • Excellence</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent animate-pulse">
                    Pak Wattan
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                  School & College of Sciences
                </p>
                <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
                  Our mission is to establish a learning environment based on the principles of 
                  self-discipline and respect where each child may develop the skills necessary 
                  to help them succeed honorably in a rapidly changing world.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/admission" className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl shadow-2xl hover:shadow-accent-500/25 hover:scale-105 transition-all duration-300 touch-target">
                  <span className="relative z-10">Apply Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link href="/about" className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 touch-target">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile-Style Quick Links - Responsive Design */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20 animate-fade-in-right">
              <div className="space-y-2 sm:space-y-3">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md touch-target"
                    title={link.title}
                  >
                    {/* Icon with colored background */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:from-primary-200 group-hover:to-accent-200 transition-all duration-300 flex-shrink-0">
                      <div className="text-primary-600 group-hover:text-primary-700 transition-colors text-sm sm:text-base">
                        {link.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors leading-tight">
                        {link.title}
                      </h3>
                    </div>
                    
                    {/* Arrow */}
                    <div className="text-primary-500 group-hover:text-primary-600 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
