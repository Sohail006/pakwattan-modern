'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trophy, BookOpen, Award, Users, Building2, Calendar, Briefcase, CalendarDays, ArrowDown, GraduationCap } from 'lucide-react'
import { TALENT_HUNT_SEASON3_OPENING, TALENT_HUNT_SEASON3_TAGLINE, TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'
import { HERO_QUICK_LINKS } from '@/lib/constants'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const HeroSection = () => {
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const quickLinkIcons = [Briefcase, Award, Trophy, BookOpen, CalendarDays]

  const quickLinks = HERO_QUICK_LINKS.map((link, index) => {
    const IconComponent = quickLinkIcons[index]
    return {
      ...link,
      icon: IconComponent ? <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" /> : null
    }
  })

  const handleVideoError = () => {
    setVideoError(true)
  }

  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] flex items-center overflow-hidden">
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
        
        {/* Video background with optimized loading (desktop only to reduce mobile load) */}
        {!videoError && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/logo/logo_150x150.png"
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
            className={`hidden md:block w-full h-full object-cover transition-opacity duration-700 ease-out ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
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

      <Container className="relative z-10 py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          {/* Main Content - Mobile Optimized */}
          <div className="lg:col-span-2">
            <div className="text-white space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in-up">
              <div className="space-y-2 sm:space-y-3">
                {/* Session Badge - Prominent */}
                <Link
                  href="/admission"
                  className="inline-flex items-center space-x-2 bg-accent-500/90 backdrop-blur-sm rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-bold text-white shadow-lg mb-3 sm:mb-4 animate-pulse transition-transform hover:scale-105 hover:bg-accent-400/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800"
                  aria-label="Admissions Open for Session 2026-27 — view admission details and apply"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
                  <span>Admissions Open for Session 2026-27</span>
                </Link>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent">
                    Pak Wattan
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                  School & College of Sciences
                </p>
                {/* Talent Hunt with Pak Wattan-Season 3 — Prominent */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/20 shadow-xl">
                  <p className="text-base sm:text-lg md:text-xl text-white font-semibold mb-2 sm:mb-3 leading-tight">
                    {TALENT_HUNT_SEASON3_TITLE}
                  </p>
                  <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                    <span className="tracking-wide text-accent-300">{TALENT_HUNT_SEASON3_TAGLINE}</span>. A district-wide
                    inter-school talent platform for literary, science, entrepreneurship, and sports streams.
                    Opening ceremony {TALENT_HUNT_SEASON3_OPENING.date} at {TALENT_HUNT_SEASON3_OPENING.venue}.
                    <span className="inline-flex items-center ml-2 text-accent-300 animate-pulse" aria-hidden="true">
                      <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce-y" />
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                <Button
                  href="/talent-hunt/season-3#register-participant"
                  variant="accent"
                  size="lg"
                  className="group relative shadow-2xl hover:shadow-accent-500/50 hover:scale-105 active:scale-100 touch-target min-h-[48px] focus:outline-none focus:ring-4 focus:ring-accent-300 focus:ring-offset-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold animate-pulse-subtle border-2 border-accent-300/50 transition-all duration-300 transform-gpu"
                  aria-label={`Register as a ${TALENT_HUNT_SEASON3_TITLE} participant`}
                >
                  <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">Participants Registration</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                <Button
                  href="/talent-hunt/season-3#register-institution"
                  variant="primary"
                  size="lg"
                  className="group relative shadow-2xl hover:shadow-primary-400/45 hover:scale-105 active:scale-100 touch-target min-h-[48px] focus:outline-none focus:ring-4 focus:ring-primary-300 focus:ring-offset-2 font-bold border-2 border-white/40 ring-2 ring-white/25 animate-pulse-subtle transition-all duration-300 transform-gpu sm:ring-[3px]"
                  aria-label={`Register your institution for ${TALENT_HUNT_SEASON3_TITLE}`}
                >
                  <Building2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span>Institution Registration</span>
                </Button>
                <Button
                  href="/pakians-faculty-registration"
                  variant="secondary"
                  size="lg"
                  className="group relative shadow-2xl hover:shadow-white/30 hover:scale-105 active:scale-100 touch-target min-h-[48px] focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 font-bold border-2 border-white/50 bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-all duration-300 transform-gpu text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5"
                  aria-label="Register as Pak Wattan faculty — teaching or non-teaching staff"
                >
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-300 shrink-0" />
                  <span className="leading-tight">Pakians Faculty Registration</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links — compact 5-item layout (fixed visual height) */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-2xl border-2 border-primary-200/50 hover:border-primary-300/50 transition-all duration-300 animate-fade-in-right">
              <div className="space-y-1">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="group flex items-center gap-2.5 sm:gap-3 px-2 py-2 sm:px-2.5 sm:py-2 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 active:from-primary-100 active:to-accent-100 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-1 touch-target min-h-[40px]"
                    title={link.title}
                    aria-label={`Navigate to ${link.title}`}
                  >
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 group-hover:from-primary-200 group-hover:to-accent-200 transition-all duration-300">
                      <div className="text-primary-600 group-hover:text-primary-700 transition-colors">
                        {link.icon}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors leading-snug line-clamp-2">
                        {link.title}
                      </h3>
                    </div>

                    <div className="shrink-0 text-primary-500 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all duration-300">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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
