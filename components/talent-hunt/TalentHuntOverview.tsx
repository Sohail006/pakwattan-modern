'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trophy, Users, Target, Award, Sparkles } from 'lucide-react'

const TalentHuntOverview = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-primary-700 mb-4 sm:mb-6">
            <span><Trophy className="w-3 h-3 sm:w-4 sm:h-4" /></span>
            <span>Discover Your Hidden Talents</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Talent Hunt with Pak Wattan
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed break-words">
            A vibrant platform to uncover hidden talents, build self-esteem, and inspire young minds to explore their full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-8 sm:mb-12 lg:mb-16">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 break-words">
                Building Global Stars
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed break-words">
                At <strong className="text-primary-600">Pak Watan School and College of Sciences, Havelian</strong>, 
                we are committed to nurturing the creativity, confidence, and capabilities of our students.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed break-words">
                We strive to uncover and uplift young talents by providing a confident platform that grows from 
                local roots to global recognition because when <strong className="text-accent-600">Talent Rises, Dreams Take Flight</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 break-words">Season-I Success</h4>
                <p className="text-xs sm:text-sm text-gray-600 break-words">2024-25 featured talented participants exclusively from Pak Wattan</p>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 break-words">Season-II Expansion</h4>
                <p className="text-xs sm:text-sm text-gray-600 break-words">2025-26 expanded to district level, reaching wider audience</p>
              </div>
            </div>
          </div>

          {/* Flyer Images */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex justify-center">
              <div className="group max-w-md w-full">
                <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    src="/images/talent-hunt/Flyer1.jpg"
                    alt="Talent Hunt Flyer 1"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Season Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Season I */}
          <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl active:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-white break-words">Season-I</h3>
                  <p className="text-sm sm:text-base text-white/90 break-words">2024-25 Academic Year</p>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed break-words">
                The remarkable success of Season-I featured talented participants exclusively from Pak Wattan, 
                setting the foundation for our talent discovery platform.
              </p>
              <Link
                href="/talent-hunt/season-1"
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-colors duration-200 touch-target min-h-[44px]"
              >
                <span className="text-sm sm:text-base">View Season-I Details</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Season II */}
          <div className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl active:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-accent-200 relative">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
              <div className="bg-accent-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold animate-pulse">
                NEW
              </div>
            </div>
            <div className="bg-gradient-to-r from-accent-500 to-primary-500 p-4 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-white break-words">Season-II</h3>
                  <p className="text-sm sm:text-base text-white/90 break-words">2025-26 District Level</p>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed break-words">
                Expanded to district level in 2025-26, featuring 10 exciting contest streams to reach a wider 
                audience and encourage more young learners to participate.
              </p>
              <Link
                href="/talent-hunt/season-2"
                className="inline-flex items-center space-x-2 bg-accent-600 hover:bg-accent-700 active:bg-accent-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-colors duration-200 touch-target min-h-[44px]"
              >
                <span className="text-sm sm:text-base">View Season-II Details</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntOverview
