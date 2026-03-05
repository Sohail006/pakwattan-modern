'use client'

import { Award, Heart, Users, BookOpen, Star } from 'lucide-react'
import { scholarshipTypes } from '@/lib/scholarship-data'

const ScholarshipTypes = () => {
  const typeIcons: Record<string, JSX.Element> = {
    'Pakians Scholarship': <Award className="w-6 h-6" />,
    'Merit Based Scholarship': <Star className="w-6 h-6" />,
    'Orphans Scholarship': <Heart className="w-6 h-6" />,
    'Special child Scholarship': <Users className="w-6 h-6" />,
    'Hafiz ul Quran Scholarship': <BookOpen className="w-6 h-6" />
  }

  const typeColors: Record<string, string> = {
    'Pakians Scholarship': 'from-primary-500 to-primary-600',
    'Merit Based Scholarship': 'from-accent-500 to-accent-600',
    'Orphans Scholarship': 'from-red-500 to-red-600',
    'Special child Scholarship': 'from-blue-500 to-blue-600',
    'Hafiz ul Quran Scholarship': 'from-green-500 to-green-600'
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6">
            <span className="text-gradient">Scholarship Types</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Various scholarship programs available for deserving students
          </p>
        </div>

        {/* Scholarship Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {scholarshipTypes.map((type, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 hover:shadow-xl active:shadow-lg transition-all duration-300 group"
            >
              {/* Icon and Title */}
              <div className="flex items-center mb-4 sm:mb-6">
                <div className={`bg-gradient-to-br ${typeColors[type.type] || 'from-primary-500 to-primary-600'} rounded-lg sm:rounded-xl p-3 sm:p-4 mr-3 sm:mr-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {typeIcons[type.type] || <Award className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-secondary-800 truncate min-w-0 flex-1">
                  {type.type}
                </h3>
              </div>

              {/* Criteria */}
              <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Criteria</p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">
                  {type.criteria}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Description</p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">
                  {type.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ScholarshipTypes
