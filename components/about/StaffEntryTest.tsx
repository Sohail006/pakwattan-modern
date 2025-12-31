'use client'

import { FileText, Users, Award, CheckCircle, Clock, BookOpen } from 'lucide-react'

const StaffEntryTest = () => {
  const testCriteria = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Written Test',
      description: 'Test based on relevant education and experience'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Communication Skills',
      description: 'Good communication and interpersonal skills required'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Teaching Passion',
      description: 'Must have passion for teaching and education'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Shortlisting',
      description: 'Only shortlisted candidates will be contacted'
    }
  ]

  const processSteps = [
    {
      step: '1',
      title: 'Application Review',
      description: 'Review of submitted applications and documents'
    },
    {
      step: '2',
      title: 'Written Test',
      description: 'Written examination at girl\'s campus'
    },
    {
      step: '3',
      title: 'Interview & Demo',
      description: 'Personal interview and teaching demonstration'
    },
    {
      step: '4',
      title: 'Selection',
      description: 'Final selection based on performance'
    }
  ]

  return (
    <section id="staff-test" className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
            <span className="text-gradient">Staff Entrance Test</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Information about our staff entrance test requirements and procedures.
          </p>
        </div>

        {/* Test Criteria */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Test Criteria
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testCriteria.map((criteria, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100 text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-primary-600">
                  {criteria.icon}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">{criteria.title}</h4>
                <p className="text-xs sm:text-sm text-secondary-600 break-words">{criteria.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Selection Process
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">{step.title}</h4>
                <p className="text-xs sm:text-sm text-secondary-600 break-words">{step.description}</p>
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
              PWSCS invests maximum in its staff, providing them a friendly environment, 
              appropriate facilities, and an appreciable salary package.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Investment in Staff</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">Maximum investment in staff development and training</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Friendly Environment</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">Supportive and collaborative work environment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Salary Package</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">Competitive and appreciable salary packages</p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4 sm:p-6">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 flex-shrink-0 mt-1" />
              <div className="min-w-0">
                <h4 className="text-base sm:text-lg font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Our Philosophy</h4>
                <p className="text-sm sm:text-base text-secondary-700 italic break-words">
                  &ldquo;Every organization is dependent on its staff. If staff is cooperative, passionate, 
                  enthusiastic, creative and loyal to the particular institute, then that institute is surely successful.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StaffEntryTest
