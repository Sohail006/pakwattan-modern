'use client'

import { Trophy, Calendar, Users, Sparkles } from 'lucide-react'

const TalentHuntSeason2Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-accent-600 via-primary-700 to-primary-600 text-white overflow-hidden">
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
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>District Level Expansion</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-josefin leading-tight break-words">
                Talent Hunt
                <span className="block text-gradient">
                  Season-II
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed break-words">
                2025-26 Academic Year
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed break-words">
                Expanded to district level featuring 10 exciting contest streams to reach a wider 
                audience and encourage more young learners to participate, compete, and shine.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold break-words">Academic Year</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold">2025-26</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold break-words">Scope</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold break-words">District Level</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="btn-accent text-center touch-target min-h-[44px] text-sm sm:text-base">
                View Contests
              </button>
              <button className="btn-secondary text-center touch-target min-h-[44px] text-sm sm:text-base">
                Register Now
              </button>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative">
            <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-black">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(1.1) contrast(1.2)' }}
                poster="/images/talent-hunt/season-2-hero.jpg"
              >
                <source src="/images/talent-hunt/talentHuntSeason2.mp4" type="video/mp4" />
                {/* Fallback image if video doesn't load */}
                <div className="w-full h-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-yellow-300" />
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 break-words">Talent Hunt Season-II</h3>
                    <p className="text-base sm:text-lg opacity-90 break-words">10 Contest Streams</p>
                  </div>
                </div>
              </video>
              
              {/* No overlays - clean video */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeason2Hero
