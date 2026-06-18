'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trophy, Calendar, Users, Award } from 'lucide-react'
import { TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'

const TalentHuntSeason1Hero = () => {
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
              <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium backdrop-blur-sm">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Season-I Success Story</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-josefin leading-tight break-words">
                Talent Hunt
                <span className="block text-gradient">
                  Season-I
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed break-words">
                2024-25 Academic Year
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed break-words">
                The remarkable success of Season-I featured talented participants exclusively from Pak Wattan, 
                setting the foundation for our talent discovery platform.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold break-words">Academic Year</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold">2024-25</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold break-words">Participants</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold break-words">Pak Wattan Only</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="#results" className="btn-accent text-center touch-target min-h-[44px] text-sm sm:text-base">
                View Results
              </Link>
              <Link href="/talent-hunt/season-3" className="btn-secondary text-center touch-target min-h-[44px] text-sm sm:text-base">
                {TALENT_HUNT_SEASON3_TITLE}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/talent-hunt/season-1-hero.jpg"
                alt="Talent Hunt Season-I"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl sm:rounded-2xl"></div>
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/30">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-white break-words">Season-I Champions</p>
                    <p className="text-xs text-white/80 break-words">Celebrating our talented students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeason1Hero
