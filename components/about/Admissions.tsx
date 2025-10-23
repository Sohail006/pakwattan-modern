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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Admissions Policy</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Learn about our admission requirements and procedures for joining Pak Wattan School & College of Sciences.
          </p>
        </div>

        {/* Admission Requirements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 text-center mb-8">
            Admission Requirements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionRequirements.map((requirement, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                  {requirement.icon}
                </div>
                <h4 className="font-semibold text-secondary-800 mb-2">{requirement.title}</h4>
                <p className="text-sm text-secondary-600">{requirement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Admission Process */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 text-center mb-8">
            Admission Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionProcess.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                    {step.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-secondary-800 mb-2">{step.title}</h4>
                <p className="text-sm text-secondary-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Dates */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 text-center mb-8">
            Important Dates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {importantDates.map((date, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <div>
                    <h4 className="font-semibold text-secondary-800">{date.title}</h4>
                    <p className="text-lg font-bold text-primary-600">{date.date}</p>
                  </div>
                </div>
                <p className="text-sm text-secondary-600">{date.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary-800 mb-4">
              Additional Information
            </h3>
            <p className="text-lg text-secondary-600 max-w-4xl mx-auto">
              For more information about admissions, please contact our admission office or visit our campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="font-semibold text-secondary-800 mb-2">Contact Us</h4>
              <p className="text-secondary-600">Visit our campus for detailed information</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-accent-600" />
              </div>
              <h4 className="font-semibold text-secondary-800 mb-2">Scholarships</h4>
              <p className="text-secondary-600">Multiple scholarship programs available</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-secondary-800 mb-2">Quality Education</h4>
              <p className="text-secondary-600">Committed to providing excellent education</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Admissions
