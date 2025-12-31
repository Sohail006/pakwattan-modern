'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trophy, BookOpen, Award, GraduationCap, Calendar, Briefcase, FileText } from 'lucide-react'
import { HERO_QUICK_LINKS } from '@/lib/constants'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const HeroSection = () => {
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const quickLinks = HERO_QUICK_LINKS.map((link, index) => {
    const IconComponent = [Briefcase, Award, Trophy, BookOpen][index]
    return {
      ...link,
      icon: IconComponent ? <IconComponent className="w-6 h-6" /> : null
    }
  })

  const handleVideoError = () => {
    setVideoError(true)
  }

  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  return (
    <section className="relative h-[70vh] sm:h-[75vh] lg:h-[80vh] flex items-center overflow-hidden">
      {/* Enhanced Background with Video and Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Fallback background image */}
        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
            <Image
              src="/images/logo/logo_150x150.png"
              alt="Pak Wattan School"
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
          </div>
        )}
        
        {/* Video background */}
        {!videoError && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
            className={`w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Pak Wattan School background video"
          >
            <source src="/files/bannerImage.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-700/80"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      <Container className="relative z-10 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          {/* Main Content - Mobile Optimized */}
          <div className="lg:col-span-2">
            <div className="text-white space-y-4 sm:space-y-6 animate-fade-in-up">
              <div className="space-y-2 sm:space-y-3">
                {/* Session Badge - Prominent */}
                <div className="inline-flex items-center space-x-2 bg-accent-500/90 backdrop-blur-sm rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-bold text-white shadow-lg mb-3 sm:mb-4 animate-pulse">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Admissions Open for Session 2026-27</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent">
                    Pak Wattan
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                  School & College of Sciences
                </p>
                {/* Admission Content - Prominent */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 shadow-xl">
                  <p className="text-base sm:text-lg md:text-xl text-white font-semibold mb-2 sm:mb-3 leading-tight">
                    Join Pakistan&apos;s Leading Educational Institution
                  </p>
                  <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                    Experience quality education with affordable expenses and comprehensive scholarship programs. 
                    Admissions are now open for <strong className="text-accent-300">Academic Session 2026-27</strong>. 
                    Limited seats available - Apply today!
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  href="/admission" 
                  variant="accent" 
                  size="md"
                  className="group relative shadow-xl hover:shadow-accent-500/25 hover:scale-105 touch-target focus-ring bg-white text-primary-600 hover:bg-white/90 font-bold"
                >
                  <GraduationCap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Apply Now for 2026-27</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                <Button 
                  href="/entry-test-syllabus" 
                  variant="secondary"
                  size="md"
                  className="group relative bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/30 hover:scale-105 touch-target focus-ring font-semibold"
                >
                  <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span>Test Syllabus</span>
                </Button>
                <Button 
                  href="/admission#process" 
                  variant="outline"
                  size="md"
                  className="group relative bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:scale-105 touch-target focus-ring font-semibold"
                >
                  Learn More
                </Button>
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
                    className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 active:bg-gradient-to-r active:from-primary-100 active:to-accent-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-md touch-target min-h-[44px] focus-ring"
                    title={link.title}
                    aria-label={`Navigate to ${link.title}`}
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
      </Container>
    </section>
  )
}

export default HeroSection
