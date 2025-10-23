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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Withdrawal Policy</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Information about our withdrawal and disciplinary policies to ensure a safe and productive learning environment.
          </p>
        </div>

        {/* Policy Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 text-center mb-8">
            Policy Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {policyCategories.map((category, index) => (
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

        {/* Withdrawal Reasons */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 text-center mb-8">
            Common Withdrawal Reasons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {withdrawalReasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-secondary-800">{reason.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    reason.severity === 'Serious' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reason.severity}
                  </span>
                </div>
                <p className="text-secondary-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disciplinary Actions */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 text-center mb-8">
            Disciplinary Action Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplinaryActions.map((action, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {action.step}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${action.color}`}>
                    {action.title}
                  </span>
                </div>
                <p className="text-sm text-secondary-600">{action.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary-800 mb-4">
              Important Notes
            </h3>
            <p className="text-lg text-secondary-600 max-w-4xl mx-auto">
              Please read and understand our withdrawal and disciplinary policies carefully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {importantNotes.map((note, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-secondary-700">{note}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-primary-600" />
              <h4 className="text-lg font-semibold text-secondary-800">Important Notice</h4>
            </div>
            <p className="text-secondary-700">
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
