'use client'

import { GraduationCap, Users, Award, BookOpen, Heart, Star } from 'lucide-react'

const Faculty = () => {
  const facultyStats = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Qualified Teachers',
      value: '50+',
      description: 'Experienced and certified educators'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Advanced Degrees',
      value: '85%',
      description: 'Faculty with Master&apos;s and PhD degrees'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Years Experience',
      value: '10+',
      description: 'Average years of teaching experience'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Student Ratio',
      value: '1:15',
      description: 'Optimal teacher-student ratio'
    }
  ]

  const departments = [
    {
      name: 'Science Department',
      description: 'Physics, Chemistry, Biology, Mathematics',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Languages',
      description: 'English, Urdu, Arabic',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Social Sciences',
      description: 'History, Geography, Civics, Islamic Studies',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Computer Science',
      description: 'Programming, IT, Digital Literacy',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const qualities = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Academic Excellence',
      description: 'Highly qualified with advanced degrees'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Dedication',
      description: 'Committed to student success and development'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Experience',
      description: 'Years of proven teaching experience'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Mentorship',
      description: 'Guiding students towards their goals'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
            <span className="text-gradient">Our Faculty</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Meet our dedicated and qualified faculty members who are committed to providing 
            the best education to our students.
          </p>
        </div>

        {/* Faculty Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
          {facultyStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100 text-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-primary-600">
                {stat.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-1 sm:mb-2 break-words">{stat.value}</h3>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">{stat.title}</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Faculty Qualities */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            What Makes Our Faculty Special
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {qualities.map((quality, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 text-primary-600">
                  {quality.icon}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">{quality.title}</h4>
                <p className="text-xs sm:text-sm text-secondary-600 break-words">{quality.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Departments */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Academic Departments
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r ${dept.color} rounded-full flex-shrink-0`}></div>
                  <h4 className="text-base sm:text-lg font-semibold text-secondary-800 truncate">{dept.name}</h4>
                </div>
                <p className="text-sm sm:text-base text-secondary-600 break-words">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Commitment */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-3 sm:mb-4 break-words">
              Our Faculty&apos;s Commitment
            </h3>
            <p className="text-base sm:text-lg text-secondary-600 max-w-4xl mx-auto break-words">
              Our faculty members are not just teachers; they are mentors, guides, and role models 
              who are dedicated to nurturing the next generation of leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Academic Excellence</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">
                Maintaining high academic standards and fostering a love for learning
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Student Development</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">
                Focusing on holistic development of each student&apos;s potential
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Character Building</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">
                Instilling moral values and preparing students for life&apos;s challenges
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faculty
