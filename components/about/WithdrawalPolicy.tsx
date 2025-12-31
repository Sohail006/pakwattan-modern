'use client'

import { AlertTriangle, FileText, Clock, Users, Shield, CheckCircle } from 'lucide-react'

const WithdrawalPolicy = () => {
  const policyCategories = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Academic Withdrawal',
      description: 'Policies for academic-related withdrawals',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Disciplinary Actions',
      description: 'Guidelines for disciplinary measures',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Behavioral Standards',
      description: 'Expected student behavior and conduct',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Attendance Policy',
      description: 'Rules regarding student attendance',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const withdrawalReasons = [
    {
      title: 'Academic Performance',
      description: 'Consistent poor academic performance',
      severity: 'Warning'
    },
    {
      title: 'Disciplinary Issues',
      description: 'Repeated violations of school rules',
      severity: 'Serious'
    },
    {
      title: 'Attendance Problems',
      description: 'Excessive absences without valid reasons',
      severity: 'Warning'
    },
    {
      title: 'Behavioral Concerns',
      description: 'Inappropriate behavior affecting others',
      severity: 'Serious'
    }
  ]

  const disciplinaryActions = [
    {
      step: '1',
      title: 'Verbal Warning',
      description: 'First offense - verbal counseling',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      step: '2',
      title: 'Written Warning',
      description: 'Second offense - written notice to parents',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      step: '3',
      title: 'Probation',
      description: 'Third offense - probationary period',
      color: 'bg-red-100 text-red-800'
    },
    {
      step: '4',
      title: 'Withdrawal',
      description: 'Final step - withdrawal from school',
      color: 'bg-red-200 text-red-900'
    }
  ]

  const importantNotes = [
    'All withdrawal decisions are made by the school administration',
    'Parents will be notified in writing before any withdrawal',
    'Appeal process is available for withdrawal decisions',
    'Academic records will be maintained as per policy'
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
            <span className="text-gradient">Withdrawal Policy</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Information about our withdrawal and disciplinary policies to ensure a safe and productive learning environment.
          </p>
        </div>

        {/* Policy Categories */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Policy Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {policyCategories.map((category, index) => (
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

        {/* Withdrawal Reasons */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Common Withdrawal Reasons
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {withdrawalReasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                  <h4 className="text-sm sm:text-base font-semibold text-secondary-800 truncate min-w-0">{reason.title}</h4>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0 ${
                    reason.severity === 'Serious' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reason.severity}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-secondary-600 break-words">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disciplinary Actions */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 text-center mb-6 sm:mb-8 break-words">
            Disciplinary Action Process
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {disciplinaryActions.map((action, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                    {action.step}
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold truncate min-w-0 ${action.color}`}>
                    {action.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-secondary-600 break-words">{action.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-3 sm:mb-4 break-words">
              Important Notes
            </h3>
            <p className="text-base sm:text-lg text-secondary-600 max-w-4xl mx-auto break-words">
              Please read and understand our withdrawal and disciplinary policies carefully.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {importantNotes.map((note, index) => (
              <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-sm sm:text-base text-secondary-700 break-words">{note}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4 sm:p-6">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
              <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600 flex-shrink-0" />
              <h4 className="text-base sm:text-lg font-semibold text-secondary-800 break-words">Important Notice</h4>
            </div>
            <p className="text-sm sm:text-base text-secondary-700 break-words">
              The school administration reserves the right to withdraw any student who consistently 
              violates school policies or whose behavior is detrimental to the learning environment. 
              All decisions are made in the best interest of the student body and school community.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WithdrawalPolicy
