'use client'

import { CheckCircle, Users, BookOpen, Award, Heart, Star } from 'lucide-react'
import { ScholarshipCriteria as ScholarshipCriteriaType, ScholarshipType } from '@/types/scholarship'

interface ScholarshipCriteriaProps {
  criteria: ScholarshipCriteriaType
  scholarshipTypes: ScholarshipType[]
}

const ScholarshipCriteria = ({ criteria, scholarshipTypes }: ScholarshipCriteriaProps) => {
  const criteriaIcons = {
    'Merit-Based Scholarship': <Award className="w-6 h-6" />,
    'Orphan Scholarship': <Heart className="w-6 h-6" />,
    'Special Child Scholarship': <Users className="w-6 h-6" />,
    'Kinship Scholarship': <Star className="w-6 h-6" />,
    'Deserving Scholarship': <BookOpen className="w-6 h-6" />,
    'Pakians Scholarship': <Award className="w-6 h-6" />
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Scholarship Criteria & Eligibility</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Detailed eligibility requirements and criteria for all scholarship programs
          </p>
        </div>

        {/* Scholarship Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {scholarshipTypes.map((type, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="text-primary-600 mr-4">
                  {criteriaIcons[type.type as keyof typeof criteriaIcons] || <Award className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold text-secondary-800">{type.type}</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Amount Range</p>
                  <p className="text-lg font-bold text-accent-600">{type.amount}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Criteria</p>
                  <p className="text-gray-700 leading-relaxed">{type.criteria}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Description</p>
                  <p className="text-gray-700 leading-relaxed">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Criteria Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Merit-Based Criteria */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-secondary-800 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-3 text-primary-600" />
              Merit-Based Scholarships
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Internal Students (Pakians)</h4>
                <p className="text-gray-700 leading-relaxed">{criteria.meritBased.internalStudents}</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">New Students</h4>
                <p className="text-gray-700 leading-relaxed">{criteria.meritBased.newStudents}</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Board Classes</h4>
                <p className="text-gray-700 leading-relaxed">{criteria.meritBased.boardClasses}</p>
              </div>
            </div>
          </div>

          {/* Special Categories */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-secondary-800 mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-3 text-accent-600" />
              Special Categories
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Orphan Scholarship
                </h4>
                <p className="text-gray-700 leading-relaxed">{criteria.specialCategories.orphan}</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  Special Child Scholarship
                </h4>
                <p className="text-gray-700 leading-relaxed">{criteria.specialCategories.specialChild}</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Kinship Scholarship
                </h4>
                <p className="text-gray-700 leading-relaxed">{criteria.specialCategories.kinship}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rules and Regulations */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-secondary-800 mb-8 text-center">
            Rules and Regulations
          </h3>
          
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-gray-200">
            <div className="space-y-4">
              {criteria.rules.map((rule, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">!</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h4>
              <p className="text-yellow-700 leading-relaxed">
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
