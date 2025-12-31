'use client'

import { FileText, Calendar, Users, Award, CheckCircle, Clock } from 'lucide-react'

const Admissions = () => {
  const admissionRequirements = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Application Form',
      description: 'Complete admission application form'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Age Requirements',
      description: 'Meet minimum age requirements for grade level'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Previous Records',
      description: 'Submit previous academic records'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Entry Test',
      description: 'Pass the admission entry test'
    }
  ]

  const admissionProcess = [
    {
      step: '01',
      title: 'Application Submission',
      description: 'Submit complete application with required documents',
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: '02',
      title: 'Entry Test',
      description: 'Appear for the admission entry test',
      icon: <Award className="w-6 h-6" />
    },
    {
      step: '03',
      title: 'Interview',
      description: 'Attend interview with school administration',
      icon: <Users className="w-6 h-6" />
    },
    {
      step: '04',
      title: 'Admission Confirmation',
      description: 'Receive admission confirmation and complete enrollment',
      icon: <CheckCircle className="w-6 h-6" />
    }
  ]

  const importantDates = [
    {
      title: 'Application Deadline',
      date: 'March 15th',
      description: 'Last date for application submission'
    },
    {
      title: 'Entry Test Date',
      date: 'March 23rd',
      description: 'Scholarship test for all applicants'
    },
    {
      title: 'Result Announcement',
      date: 'March 30th',
      description: 'Admission results will be announced'
    },
    {
      title: 'Classes Begin',
      date: 'April 1st',
      description: 'New academic session starts'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-accent-50 to-primary-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
            <span className="text-gradient">Admissions Policy</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Learn about our admission requirements and procedures for joining Pak Wattan School & College of Sciences.
          </p>
        </div>

        {/* Admission Requirements */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Admission Requirements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {admissionRequirements.map((requirement, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100 text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-primary-600">
                  {requirement.icon}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">{requirement.title}</h4>
                <p className="text-xs sm:text-sm text-secondary-600 break-words">{requirement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Admission Process */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Admission Process
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {admissionProcess.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                    {step.icon}
                  </div>
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">{step.title}</h4>
                <p className="text-xs sm:text-sm text-secondary-600 break-words">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Dates */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Important Dates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {importantDates.map((date, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-semibold text-secondary-800 truncate">{date.title}</h4>
                    <p className="text-base sm:text-lg font-bold text-primary-600">{date.date}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-secondary-600 break-words">{date.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-3 sm:mb-4 break-words">
              Additional Information
            </h3>
            <p className="text-base sm:text-lg text-secondary-600 max-w-4xl mx-auto break-words">
              For more information about admissions, please contact our admission office or visit our campus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Contact Us</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">Visit our campus for detailed information</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Scholarships</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">Multiple scholarship programs available</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-secondary-800 mb-1 sm:mb-2 break-words">Quality Education</h4>
              <p className="text-xs sm:text-sm text-secondary-600 break-words">Committed to providing excellent education</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Admissions
