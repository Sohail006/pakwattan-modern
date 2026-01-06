'use client'

import { Coins, Users, Calendar, MapPin, TrendingUp, Award } from 'lucide-react'
import { ScholarshipStats as ScholarshipStatsType } from '@/types/scholarship'

interface ScholarshipStatsProps {
  stats: ScholarshipStatsType
}

const ScholarshipStats = ({ stats }: ScholarshipStatsProps) => {
  const formatAmount = (amount: number) => {
    if (amount >= 100000) {
      return `PKR ${(amount / 100000).toFixed(1)} Lacs`
    }
    return `PKR ${amount.toLocaleString()}`
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-josefin mb-4 sm:mb-6">
            <span className="text-gradient text-white">Scholarship Statistics</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto break-words">
            Comprehensive overview of our scholarship program achievements
          </p>
        </div>

        {/* Main Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:bg-white/20 active:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
              <Coins className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 break-words">{formatAmount(stats.totalAmount)}</h3>
            <p className="text-white/80 text-xs sm:text-sm lg:text-lg break-words">Total Scholarship Amount</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:bg-white/20 active:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">{stats.totalStudents}+</h3>
            <p className="text-white/80 text-xs sm:text-sm lg:text-lg break-words">Students Benefited</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:bg-white/20 active:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 break-words">{formatAmount(stats.averageAmount)}</h3>
            <p className="text-white/80 text-xs sm:text-sm lg:text-lg break-words">Average Amount</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:bg-white/20 active:bg-white/15 transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
              <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 truncate">{stats.topCategory}</h3>
            <p className="text-white/80 text-xs sm:text-sm lg:text-lg break-words">Top Category</p>
          </div>
        </div>

        {/* Test Information */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3 sm:mb-4">
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white mr-2 sm:mr-3 flex-shrink-0" />
                <h3 className="text-xl sm:text-2xl font-bold text-white truncate">Scholarship Test</h3>
              </div>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-2 break-words">
                <span className="font-semibold">Date:</span> {stats.testDate}
              </p>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg break-words">
                <span className="font-semibold">Location:</span> {stats.testLocation}
              </p>
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white mr-2 sm:mr-3 flex-shrink-0" />
                <h3 className="text-xl sm:text-2xl font-bold text-white truncate">Test Center</h3>
              </div>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg break-words">
                The scholarship test has always been conducted on <strong>{stats.testDate}</strong> 
                in the girl&apos;s campus Havelian. This ensures fair and transparent evaluation 
                of all applicants.
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Highlights */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center break-words">
            Program Highlights
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2 break-words">Merit-Based Excellence</h4>
              <p className="text-white/80 text-xs sm:text-sm break-words">
                Scholarships awarded based on academic performance and entrance test results
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2 break-words">Inclusive Support</h4>
              <p className="text-white/80 text-xs sm:text-sm break-words">
                Special categories for orphan, special needs, and deserving students
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2 break-words">Continuous Growth</h4>
              <p className="text-white/80 text-xs sm:text-sm break-words">
                Regular evaluation and improvement of scholarship programs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScholarshipStats
