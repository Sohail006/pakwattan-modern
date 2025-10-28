'use client'

import Image from 'next/image'
import { GraduationCap, Medal, Star, Award, CheckCircle } from 'lucide-react'

const AwardsAchievements = () => {
  const scholarshipPolicy = `Scholarships will be given to all standard students (new, internal or out coming) who score decided percentage in school / college entrance test according to the specified policy laid by the administration and according to the seats announced by the institution. After filling the seats no admission will be given on scholarship seats. Admission given on the scholarship seats will be purely on merit criteria.`

  const medalCriteria = [
    {
      type: 'Gold Medals',
      criteria: 'Gold medals are bestowed upon students achieving 95% and higher in the annual examinations from Playgroup to 8th grade. For SSC & HSSC, gold medals are awarded based on criteria announced by the school/college administration.',
      icon: <Medal className="w-6 h-6 text-yellow-600" />,
      color: 'from-yellow-50 to-yellow-100 border-yellow-200'
    },
    {
      type: 'Silver Medals',
      criteria: 'Silver medals are awarded to students having percentage 90% to 92% in annual examination (Play group to Class 8th).',
      icon: <Medal className="w-6 h-6 text-gray-500" />,
      color: 'from-gray-50 to-gray-100 border-gray-200'
    },
    {
      type: 'Medal Stars',
      criteria: 'Medal stars are awarded for position holder students in SSC and HSSC annual board examinations.',
      icon: <Star className="w-6 h-6 text-blue-600" />,
      color: 'from-blue-50 to-blue-100 border-blue-200'
    },
    {
      type: 'Bronze Medals',
      criteria: 'Bronze Medals are presented to students achieving between 88.5% and 89% in the annual examinations from Playgroup to 8th grade.',
      icon: <Medal className="w-6 h-6 text-orange-600" />,
      color: 'from-orange-50 to-orange-100 border-orange-200'
    },
    {
      type: 'Pakians Scholarship',
      criteria: 'Special scholarship program for outstanding students based on academic excellence and financial need.',
      icon: <GraduationCap className="w-6 h-6 text-green-600" />,
      color: 'from-green-50 to-green-100 border-green-200'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Scholarships Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
              <span className="text-gradient">Scholarships</span>
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Merit-based scholarships for deserving students
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Policy Text */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-secondary-800 mb-4">Scholarship Policy</h3>
                <p className="text-secondary-600 leading-relaxed">
                  {scholarshipPolicy}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-secondary-700">Merit-based</span>
                </div>
                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-secondary-700">Entrance test</span>
                </div>
                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-secondary-700">Limited seats</span>
                </div>
              </div>
            </div>

            {/* Scholarship Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="/images/achievements/Scholarship.jpeg"
                  alt="Scholarship Program"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-lg">Scholarship Program</h4>
                </div>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="/images/achievements/Scholarship.jpeg"
                  alt="Scholarship Recognition"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-lg">Recognition</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medals Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-600 rounded-full mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
              <span className="text-gradient">Medals & Recognition</span>
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Comprehensive medal system recognizing academic excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medalCriteria.map((medal, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${medal.color} rounded-2xl p-6 border-2 hover:shadow-lg transition-all duration-300 group`}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-3 group-hover:scale-110 transition-transform duration-300">
                    {medal.icon}
                  </div>
                  <h3 className="text-lg font-bold text-secondary-800">
                    {medal.type}
                  </h3>
                </div>
                <p className="text-secondary-600 leading-relaxed text-sm">
                  {medal.criteria}
                </p>
              </div>
            ))}
          </div>

          {/* Medal Images */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-secondary-800 font-josefin mb-8 text-center">
              Medal Ceremonies
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="/images/achievements/Gold Medals.jpeg"
                  alt="Gold Medal Ceremony"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="font-bold text-xl mb-2">Gold Medal Ceremony</h4>
                  <p className="text-white/90">Recognizing academic excellence</p>
                </div>
              </div>
              
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="/images/achievements/TopPositionsInHSSCandSSC.jpg"
                  alt="Top Positions Recognition"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="font-bold text-xl mb-2">Top Positions</h4>
                  <p className="text-white/90">SSC & HSSC achievers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AwardsAchievements
