'use client'

import Image from 'next/image'
import { Trophy, Calendar, Users, Award, Sparkles, Clock } from 'lucide-react'

const TalentHuntSeason2Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-accent-600 via-primary-700 to-primary-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span>District Level Expansion</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-josefin leading-tight">
                Talent Hunt
                <span className="block text-gradient">
                  Season-II
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                2025-26 Academic Year
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Expanded to district level featuring 10 exciting contest streams to reach a wider 
                audience and encourage more young learners to participate, compete, and shine.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">Academic Year</span>
                </div>
                <p className="text-2xl font-bold">2025-26</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Scope</span>
                </div>
                <p className="text-2xl font-bold">District Level</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent text-center">
                View Contests
              </button>
              <button className="btn-secondary text-center">
                Register Now
              </button>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
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
                  <div className="text-center text-white">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                    <h3 className="text-2xl font-bold mb-2">Talent Hunt Season-II</h3>
                    <p className="text-lg opacity-90">10 Contest Streams</p>
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
