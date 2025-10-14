'use client'

import Image from 'next/image'
import { Trophy, Calendar, Users, Award } from 'lucide-react'

const TalentHuntSeason1Hero = () => {
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
              <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3 text-sm font-medium backdrop-blur-sm">
                <Trophy className="w-4 h-4" />
                <span>Season-I Success Story</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-josefin leading-tight">
                Talent Hunt
                <span className="block text-gradient">
                  Season-I
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                2024-25 Academic Year
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                The remarkable success of Season-I featured talented participants exclusively from Pak Wattan, 
                setting the foundation for our talent discovery platform.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">Academic Year</span>
                </div>
                <p className="text-2xl font-bold">2024-25</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Participants</span>
                </div>
                <p className="text-2xl font-bold">Pak Wattan Only</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent text-center">
                View Results
              </button>
              <button className="btn-secondary text-center">
                Season-II Details
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/talent-hunt/season-1-hero.jpg"
                alt="Talent Hunt Season-I"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-yellow-300" />
                  <div>
                    <p className="font-semibold text-white">Season-I Champions</p>
                    <p className="text-sm text-white/80">Celebrating our talented students</p>
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
