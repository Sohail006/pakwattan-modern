'use client'

import { CheckCircle, Users, BookOpen, Award, Heart } from 'lucide-react'
import { ScholarshipCriteria as ScholarshipCriteriaType, ScholarshipType } from '@/types/scholarship'

interface ScholarshipCriteriaProps {
  criteria: ScholarshipCriteriaType
  scholarshipTypes: ScholarshipType[]
}

const ScholarshipCriteria = ({ criteria, scholarshipTypes }: ScholarshipCriteriaProps) => {
  const criteriaIcons = {
    'Pakians Scholarship': <Award className="w-6 h-6" />,
    'Merit Based Scholarship': <Award className="w-6 h-6" />,
    'Orphans Scholarship': <Heart className="w-6 h-6" />,
    'Special child Scholarship': <Users className="w-6 h-6" />,
    'Hafiz ul Quran Scholarship': <BookOpen className="w-6 h-6" />
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6">
            <span className="text-gradient">Scholarship Criteria & Eligibility</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Detailed eligibility requirements and criteria for all scholarship programs
          </p>
        </div>

        {/* Scholarship Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {scholarshipTypes.map((type, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 hover:shadow-lg active:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="text-primary-600 mr-3 sm:mr-4 flex-shrink-0">
                  {criteriaIcons[type.type as keyof typeof criteriaIcons] || <Award className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-secondary-800 truncate min-w-0">{type.type}</h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Amount Range</p>
                  <p className="text-base sm:text-lg font-bold text-accent-600 break-words">{type.amount}</p>
                </div>
                
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Criteria</p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">{type.criteria}</p>
                </div>
                
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Description</p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Criteria Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Merit-Based Criteria */}
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-4 sm:mb-6 flex items-center">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-primary-600 flex-shrink-0" />
              <span className="truncate">Merit Based Scholarships</span>
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 break-words">Internal Students (Pakians)</h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">{criteria.meritBased.internalStudents}</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 break-words">New Students</h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">{criteria.meritBased.newStudents}</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 break-words">Board Classes</h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">{criteria.meritBased.boardClasses}</p>
              </div>
            </div>
          </div>

          {/* Special Categories */}
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-4 sm:mb-6 flex items-center">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-accent-600 flex-shrink-0" />
              <span className="truncate">Special Categories</span>
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500 flex-shrink-0" />
                  <span className="break-words">Orphans Scholarship</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">{criteria.specialCategories.orphan}</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500 flex-shrink-0" />
                  <span className="break-words">Special child Scholarship</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">{criteria.specialCategories.specialChild}</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500 flex-shrink-0" />
                  <span className="break-words">Hafiz ul Quran Scholarship</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">{criteria.specialCategories.hafizUlQuran}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rules and Regulations */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-6 sm:mb-8 text-center break-words">
            Rules and Regulations
          </h3>
          
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200">
            <div className="space-y-3 sm:space-y-4">
              {criteria.rules.map((rule, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-6 sm:mt-8 lg:mt-12 bg-yellow-50 border border-yellow-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">!</span>
              </div>
            </div>
            <div className="ml-3 sm:ml-4 min-w-0">
              <h4 className="text-base sm:text-lg font-semibold text-yellow-800 mb-1 sm:mb-2 break-words">Important Notice</h4>
              <p className="text-xs sm:text-sm text-yellow-700 leading-relaxed break-words">
                Every year scholarship scheme can be revised and there will be no alteration in this scheme 
                on the request of parents. Students will be drawn from scholarship if they don&apos;t fulfill 
                the criteria announced by the institution every year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScholarshipCriteria
