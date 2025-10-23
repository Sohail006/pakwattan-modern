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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Application Process</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Step-by-step guide to apply for scholarships at Pak Wattan School & College
          </p>
        </div>

        {/* Application Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 mb-8 text-center">
            Application Steps
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-primary-200 transform translate-x-4 z-0"></div>
                )}
                
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                      {step.icon}
                    </div>
                    
                    <div className="mb-4">
                      <span className="inline-block bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-full">
                        Step {step.step}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-secondary-800 mb-4">{step.title}</h4>
                    <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                    
                    <ul className="text-left space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {detail}
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
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 mb-8 text-center">
            Important Dates
          </h3>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {importantDates.map((date, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-primary-600 mr-2" />
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      date.status === 'Open' ? 'bg-green-100 text-green-800' :
                      date.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                      date.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {date.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{date.event}</h4>
                  <p className="text-lg font-bold text-primary-600">{date.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-secondary-800 mb-8 text-center">
            Required Documents
          </h3>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requiredDocuments.map((document, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{document}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Information */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Scholarship Test Information</h3>
            <p className="text-white/90 text-lg">
              Important details about the scholarship entrance test
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Test Date</h4>
              <p className="text-white/90">March 23rd</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Test Location</h4>
              <p className="text-white/90">Girls Campus, Havelian</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Test Duration</h4>
              <p className="text-white/90">2 Hours</p>
            </div>
          </div>
        </div>

        {/* Application Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-lg font-semibold">
            <FileText className="w-6 h-6 mr-3" />
            Apply for Scholarship
          </button>
        </div>
      </div>
    </section>
  )
}

export default ScholarshipApplicationProcess
