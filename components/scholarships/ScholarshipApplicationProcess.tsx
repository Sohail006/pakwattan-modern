'use client'

import { FileText, Calendar, CheckCircle, Clock, MapPin, Award, BookOpen } from 'lucide-react'

const ScholarshipApplicationProcess = () => {
  const steps = [
    {
      step: 1,
      title: "Eligibility Check",
      description: "Review scholarship criteria and ensure you meet the requirements",
      icon: <CheckCircle className="w-6 h-6" />,
      details: [
        "Check academic performance requirements",
        "Verify special category eligibility (if applicable)",
        "Ensure all required documents are available"
      ]
    },
    {
      step: 2,
      title: "Application Submission",
      description: "Submit your scholarship application with all required documents",
      icon: <FileText className="w-6 h-6" />,
      details: [
        "Complete application form",
        "Attach academic transcripts",
        "Submit supporting documents",
        "Pay application fee (if applicable)"
      ]
    },
    {
      step: 3,
      title: "Entrance Test",
      description: "Appear for the scholarship entrance test on the scheduled date",
      icon: <BookOpen className="w-6 h-6" />,
      details: [
        "Test Date: March 23rd",
        "Location: Girls Campus, Havelian",
        "Bring valid ID and admit card",
        "Follow test guidelines and instructions"
      ]
    },
    {
      step: 4,
      title: "Result Declaration",
      description: "Wait for test results and scholarship allocation",
      icon: <Award className="w-6 h-6" />,
      details: [
        "Results announced within 2 weeks",
        "Check online portal for updates",
        "Collect scholarship certificate",
        "Complete admission formalities"
      ]
    }
  ]

  const requiredDocuments = [
    "Academic transcripts (last 2 years)",
    "Birth certificate",
    "CNIC/B-Form of student and parent",
    "Passport size photographs (4 copies)",
    "Medical certificate (if applicable)",
    "Orphan certificate (for orphan scholarship)",
    "Special needs documentation (for special child scholarship)",
    "Family relationship proof (for kinship scholarship)"
  ]

  const importantDates = [
    { event: "Application Start Date", date: "January 1st", status: "Open" },
    { event: "Application Deadline", date: "March 15th", status: "Upcoming" },
    { event: "Scholarship Test", date: "March 23rd", status: "Scheduled" },
    { event: "Result Declaration", date: "April 5th", status: "Pending" },
    { event: "Admission Deadline", date: "April 15th", status: "Pending" }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-accent-50 to-primary-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6">
            <span className="text-gradient">Application Process</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Step-by-step guide to apply for scholarships at Pak Wattan School & College
          </p>
        </div>

        {/* Application Steps */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-6 sm:mb-8 text-center break-words">
            Application Steps
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-primary-200 transform translate-x-4 z-0"></div>
                )}
                
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl active:shadow-lg transition-all duration-300 relative z-10">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      {step.icon}
                    </div>
                    
                    <div className="mb-3 sm:mb-4">
                      <span className="inline-block bg-primary-100 text-primary-800 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        Step {step.step}
                      </span>
                    </div>
                    
                    <h4 className="text-base sm:text-lg lg:text-xl font-bold text-secondary-800 mb-2 sm:mb-4 break-words">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed break-words">{step.description}</p>
                    
                    <ul className="text-left space-y-1.5 sm:space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start text-xs sm:text-sm text-gray-700">
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="break-words">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Dates */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-6 sm:mb-8 text-center break-words">
            Important Dates
          </h3>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {importantDates.map((date, index) => (
                <div key={index} className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl">
                  <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4 gap-2">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 flex-shrink-0" />
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${
                      date.status === 'Open' ? 'bg-green-100 text-green-800' :
                      date.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                      date.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {date.status}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2 break-words">{date.event}</h4>
                  <p className="text-base sm:text-lg font-bold text-primary-600">{date.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-6 sm:mb-8 text-center break-words">
            Required Documents
          </h3>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {requiredDocuments.map((document, index) => (
                <div key={index} className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg min-w-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-700 break-words">{document}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Information */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 break-words">Scholarship Test Information</h3>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg break-words">
              Important details about the scholarship entrance test
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Test Date</h4>
              <p className="text-white/90 text-sm sm:text-base">March 23rd</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Test Location</h4>
              <p className="text-white/90 text-sm sm:text-base break-words">Girls Campus, Havelian</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Test Duration</h4>
              <p className="text-white/90 text-sm sm:text-base">2 Hours</p>
            </div>
          </div>
        </div>

        {/* Application Button */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-colors text-base sm:text-lg font-semibold touch-target min-h-[44px]">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
            <span>Apply for Scholarship</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ScholarshipApplicationProcess
