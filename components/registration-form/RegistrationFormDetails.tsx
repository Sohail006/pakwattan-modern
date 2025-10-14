'use client'

const RegistrationFormDetails = () => {
  const requirements = [
    {
      title: "Personal Information",
      description: "Student's personal details and contact information",
      items: ["Full Name", "Date of Birth", "Gender", "CNIC/B-Form Number", "Contact Information"],
      icon: "👤"
    },
    {
      title: "Academic Records",
      description: "Previous academic achievements and certificates",
      items: ["Previous School Records", "Academic Certificates", "Transcripts", "Character Certificates"],
      icon: "📚"
    },
    {
      title: "Parent/Guardian Information",
      description: "Details of parents or legal guardians",
      items: ["Parent Names", "Occupation", "Contact Details", "Emergency Contacts"],
      icon: "👨‍👩‍👧‍👦"
    },
    {
      title: "Medical Information",
      description: "Health records and medical requirements",
      items: ["Medical Certificates", "Vaccination Records", "Health Conditions", "Emergency Medical Contacts"],
      icon: "🏥"
    },
    {
      title: "Documents Required",
      description: "Essential documents for registration",
      items: ["Birth Certificate", "CNIC/B-Form", "Passport Size Photos", "Previous School Leaving Certificate"],
      icon: "📄"
    },
    {
      title: "Admission Test",
      description: "Entry test information and requirements",
      items: ["Test Date: 10th May, 2025", "Test Time: 08:30 AM", "Test Duration: 2 Hours", "Subjects: Math, English, Science"],
      icon: "📝"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Registration Requirements
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Important information and requirements for student registration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requirements.map((item, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="space-y-2">
                  {item.items.map((requirement, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                      <span>{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RegistrationFormDetails
