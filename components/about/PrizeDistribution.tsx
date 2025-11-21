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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Annual Prize Distribution Ceremony</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Celebrating excellence and achievements of our students through our annual prize distribution ceremony.
          </p>
        </div>

        {/* Award Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 text-center mb-8">
            Award Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awardCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {category.icon}
                </div>
                <h4 className="font-semibold text-secondary-800 mb-2">{category.title}</h4>
                <p className="text-sm text-secondary-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scholarship Types */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 text-center mb-8">
            Scholarship Programs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarshipTypes.map((scholarship, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-secondary-800">{scholarship.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${scholarship.color}`}>
                    {scholarship.percentage}
                  </span>
                </div>
                <p className="text-secondary-600">{scholarship.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ceremony Highlights */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 text-center mb-8">
            Ceremony Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ceremonyHighlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                  {highlight.icon}
                </div>
                <h4 className="font-semibold text-secondary-800 mb-2">{highlight.title}</h4>
                <p className="text-sm text-secondary-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary-800 mb-4">
              Important Information
            </h3>
            <p className="text-lg text-secondary-600 max-w-4xl mx-auto">
              Our annual prize distribution ceremony is a prestigious event that recognizes and celebrates 
              the achievements of our students. The ceremony is held every year on March 23rd at the 
              girl&apos;s campus in Havelian.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="font-semibold text-secondary-800 mb-2">Date</h4>
              <p className="text-secondary-600">March 23rd, Every Year</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent-600" />
              </div>
              <h4 className="font-semibold text-secondary-800 mb-2">Location</h4>
              <p className="text-secondary-600">Girl&apos;s Campus, Havelian</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-secondary-800 mb-2">Recognition</h4>
              <p className="text-secondary-600">All Achievements Celebrated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrizeDistribution
