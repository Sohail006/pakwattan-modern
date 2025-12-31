'use client'

import { Target, Eye, Heart, Users, BookOpen, Award } from 'lucide-react'

const VisionMission = () => {
  const visionPoints = [
    'To be the leading educational institution in the region',
    'To provide world-class education with Islamic values',
    'To nurture future leaders and responsible citizens',
    'To create a learning environment that inspires excellence'
  ]

  const missionPoints = [
    'To provide quality education with affordable expenses',
    'To offer scholarships to deserving students',
    'To maintain high academic standards',
    'To foster character development and moral values'
  ]

  const values = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for academic excellence in all our programs'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Integrity',
      description: 'We uphold the highest standards of honesty and ethics'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Respect',
      description: 'We treat everyone with dignity and respect'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We embrace new ideas and creative approaches to learning'
    }
  ]

  return (
    <section id="vision" className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6">
            <span className="text-gradient">Vision, Mission & Values</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {/* Vision */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Eye className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-4 sm:mb-6 break-words">Our Vision</h3>
            <ul className="space-y-2 sm:space-y-3 text-left">
              {visionPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-secondary-700 break-words">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Target className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-4 sm:mb-6 break-words">Our Mission</h3>
            <ul className="space-y-2 sm:space-y-3 text-left">
              {missionPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-secondary-700 break-words">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Values */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-4 sm:mb-6 break-words">Our Values</h3>
            <div className="space-y-3 sm:space-y-4">
              {values.map((value, index) => (
                <div key={index} className="text-left">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-1.5 sm:mb-2">
                    <div className="text-primary-600 flex-shrink-0">{value.icon}</div>
                    <h4 className="text-sm sm:text-base font-semibold text-secondary-800 truncate">{value.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary-600 ml-9 sm:ml-11 break-words">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-3 sm:mb-4 break-words">
              Our Commitment to Excellence
            </h3>
            <p className="text-base sm:text-lg text-secondary-600 max-w-4xl mx-auto break-words">
              At Pak Wattan School & College of Sciences, we are committed to providing a 
              comprehensive educational experience that prepares students for success in all 
              aspects of life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-xl font-semibold text-secondary-800 break-words">Academic Excellence</h4>
              <p className="text-sm sm:text-base text-secondary-700 leading-relaxed break-words">
                We maintain high academic standards through innovative teaching methods, 
                qualified faculty, and comprehensive curriculum that meets international 
                educational benchmarks.
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-xl font-semibold text-secondary-800 break-words">Character Development</h4>
              <p className="text-sm sm:text-base text-secondary-700 leading-relaxed break-words">
                Beyond academics, we focus on developing strong character, moral values, 
                and leadership skills that will serve our students throughout their lives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisionMission
