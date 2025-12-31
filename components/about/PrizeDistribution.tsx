'use client'

import { Trophy, Award, Medal, Star, Users, Calendar, Gift } from 'lucide-react'

const PrizeDistribution = () => {
  const awardCategories = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Academic Excellence',
      description: 'Top performers in all subjects',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <Medal className="w-8 h-8" />,
      title: 'Merit Scholarships',
      description: 'Based on academic performance',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Special Achievements',
      description: 'Extra-curricular and sports',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Hafiz e Quran',
      description: 'Religious scholarship program',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const scholarshipTypes = [
    {
      name: 'Pakians Scholarship',
      description: 'Merit-based scholarship for outstanding students',
      percentage: '100%',
      color: 'bg-primary-100 text-primary-800'
    },
    {
      name: 'Orphan Scholarship',
      description: 'Full support for orphan students',
      percentage: '100%',
      color: 'bg-accent-100 text-accent-800'
    },
    {
      name: 'Special Child Scholarship',
      description: 'Support for students with special needs',
      percentage: '100%',
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Hafiz e Quran Scholarship',
      description: 'For students who have memorized the Quran',
      percentage: '50%',
      color: 'bg-purple-100 text-purple-800'
    }
  ]

  const ceremonyHighlights = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Student Participation',
      description: 'All students participate in the ceremony'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Recognition',
      description: 'Every achievement is recognized and celebrated'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Annual Event',
      description: 'Held every year on March 23rd'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Prestigious Awards',
      description: 'High-quality awards and certificates'
    }
  ]

  return (
    <section id="prize-distribution" className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
            <span className="text-gradient">Annual Prize Distribution Ceremony</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Celebrating excellence and achievements of our students through our annual prize distribution ceremony.
          </p>
        </div>

        {/* Award Categories */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Award Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {awardCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100 text-center"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-white`}>
                  {category.icon}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">{category.title}</h4>
                <p className="text-xs sm:text-sm text-secondary-600 break-words">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scholarship Types */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Scholarship Programs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {scholarshipTypes.map((scholarship, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                  <h4 className="text-base sm:text-lg font-semibold text-secondary-800 truncate min-w-0">{scholarship.name}</h4>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0 ${scholarship.color}`}>
                    {scholarship.percentage}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-secondary-600 break-words">{scholarship.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ceremony Highlights */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Ceremony Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ceremonyHighlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100 text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-primary-600">
                  {highlight.icon}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">{highlight.title}</h4>
                <p className="text-xs sm:text-sm text-secondary-600 break-words">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-3 sm:mb-4 break-words">
              Important Information
            </h3>
            <p className="text-base sm:text-lg text-secondary-600 max-w-4xl mx-auto break-words">
              Our annual prize distribution ceremony is a prestigious event that recognizes and celebrates 
              the achievements of our students. The ceremony is held every year on March 23rd at the 
              girl&apos;s campus in Havelian.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Date</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">March 23rd, Every Year</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Location</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">Girl&apos;s Campus, Havelian</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Recognition</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">All Achievements Celebrated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrizeDistribution
