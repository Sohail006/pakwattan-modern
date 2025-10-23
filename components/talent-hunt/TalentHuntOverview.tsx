'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trophy, Users, Target, Award, Sparkles } from 'lucide-react'

const TalentHuntOverview = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-6 py-3 text-sm font-medium text-primary-700 mb-6">
            <span><Trophy className="w-4 h-4" /></span>
            <span>Discover Your Hidden Talents</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Talent Hunt with Pak Wattan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A vibrant platform to uncover hidden talents, build self-esteem, and inspire young minds to explore their full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Building Global Stars
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                At <strong className="text-primary-600">Pak Watan School and College of Sciences, Havelian</strong>, 
                we are committed to nurturing the creativity, confidence, and capabilities of our students.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We strive to uncover and uplift young talents by providing a confident platform that grows from 
                local roots to global recognition because when <strong className="text-accent-600">Talent Rises, Dreams Take Flight</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Season-I Success</h4>
                <p className="text-sm text-gray-600">2024-25 featured talented participants exclusively from Pak Wattan</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Season-II Expansion</h4>
                <p className="text-sm text-gray-600">2025-26 expanded to district level, reaching wider audience</p>
              </div>
            </div>
          </div>

          {/* Flyer Images */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="group">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    src="/images/talent-hunt/Flyer1.jpg"
                    alt="Talent Hunt Flyer 1"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="group">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    src="/images/talent-hunt/Flyer2.jpg"
                    alt="Talent Hunt Flyer 2"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Season Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Season I */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Season-I</h3>
                  <p className="text-white/90">2024-25 Academic Year</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">
                The remarkable success of Season-I featured talented participants exclusively from Pak Wattan, 
                setting the foundation for our talent discovery platform.
              </p>
              <Link
                href="/talent-hunt/season-1"
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                <span>View Season-I Details</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Season II */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-accent-200 relative">
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                NEW
              </div>
            </div>
            <div className="bg-gradient-to-r from-accent-500 to-primary-500 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Season-II</h3>
                  <p className="text-white/90">2025-26 District Level</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Expanded to district level in 2025-26, featuring 10 exciting contest streams to reach a wider 
                audience and encourage more young learners to participate.
              </p>
              <Link
                href="/talent-hunt/season-2"
                className="inline-flex items-center space-x-2 bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                <span>View Season-II Details</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
