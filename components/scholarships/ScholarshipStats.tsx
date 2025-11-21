'use client'

import { DollarSign, Users, Calendar, MapPin, TrendingUp, Award } from 'lucide-react'
import { ScholarshipStats as ScholarshipStatsType } from '@/types/scholarship'

interface ScholarshipStatsProps {
  stats: ScholarshipStatsType
}

const ScholarshipStats = ({ stats }: ScholarshipStatsProps) => {
  const formatAmount = (amount: number) => {
    if (amount >= 100000) {
      return `₨${(amount / 100000).toFixed(1)} Lacs`
    }
    return `₨${amount.toLocaleString()}`
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-josefin mb-6">
            <span className="text-gradient text-white">Scholarship Statistics</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive overview of our scholarship program achievements
          </p>
        </div>

        {/* Main Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{formatAmount(stats.totalAmount)}</h3>
            <p className="text-white/80 text-lg">Total Scholarship Amount</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{stats.totalStudents}+</h3>
            <p className="text-white/80 text-lg">Students Benefited</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{formatAmount(stats.averageAmount)}</h3>
            <p className="text-white/80 text-lg">Average Amount</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{stats.topCategory}</h3>
            <p className="text-white/80 text-lg">Top Category</p>
          </div>
        </div>

        {/* Test Information */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Calendar className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-bold text-white">Scholarship Test</h3>
              </div>
              <p className="text-white/90 text-lg mb-2">
                <span className="font-semibold">Date:</span> {stats.testDate}
              </p>
              <p className="text-white/90 text-lg">
                <span className="font-semibold">Location:</span> {stats.testLocation}
              </p>
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <MapPin className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-bold text-white">Test Center</h3>
              </div>
              <p className="text-white/90 text-lg">
                The scholarship test has always been conducted on <strong>{stats.testDate}</strong> 
                in the girl&apos;s campus Havelian. This ensures fair and transparent evaluation 
                of all applicants.
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Highlights */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Program Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Merit-Based Excellence</h4>
              <p className="text-white/80">
                Scholarships awarded based on academic performance and entrance test results
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Inclusive Support</h4>
              <p className="text-white/80">
                Special categories for orphan, special needs, and deserving students
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Continuous Growth</h4>
              <p className="text-white/80">
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
