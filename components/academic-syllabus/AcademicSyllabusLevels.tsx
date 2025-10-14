'use client'

const AcademicSyllabusLevels = () => {
  const levels = [
    {
      name: "Montessori",
      age: "3-5 years",
      description: "Early childhood education focusing on play-based learning and basic skills development",
      subjects: ["Basic Math", "Language Development", "Art & Craft", "Physical Activities", "Social Skills"],
      duration: "2 Years",
      icon: "🎨"
    },
    {
      name: "Primary",
      age: "6-10 years",
      description: "Foundation education with emphasis on core subjects and character building",
      subjects: ["Mathematics", "English", "Urdu", "Science", "Islamic Studies", "Social Studies"],
      duration: "5 Years",
      icon: "📚"
    },
    {
      name: "Middle",
      age: "11-13 years",
      description: "Intermediate level education preparing students for higher studies",
      subjects: ["Advanced Math", "Science", "English Literature", "Urdu Literature", "Computer Studies"],
      duration: "3 Years",
      icon: "🔬"
    },
    {
      name: "Matriculation",
      age: "14-15 years",
      description: "Secondary education with specialization in science and arts streams",
      subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Urdu", "Pakistan Studies"],
      duration: "2 Years",
      icon: "🎓"
    },
    {
      name: "Intermediate",
      age: "16-17 years",
      description: "Higher secondary education with pre-medical, pre-engineering, and commerce streams",
      subjects: ["Pre-Medical", "Pre-Engineering", "Commerce", "Computer Science", "General Science"],
      duration: "2 Years",
      icon: "🏆"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Academic Levels
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structured progression through different educational levels
          </p>
        </div>

        <div className="space-y-8">
          {levels.map((level, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200 group">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-20 h-20 mx-auto lg:mx-0 mb-4 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                    {level.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-primary-800 mb-2">
                    {level.name}
                  </h3>
                  <p className="text-primary-600 font-semibold">
                    Age: {level.age} | Duration: {level.duration}
                  </p>
                </div>
                
                <div className="lg:col-span-2">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {level.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Subjects Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {level.subjects.map((subject, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-primary-800 mb-4">
              Download Complete Syllabus
            </h3>
            <p className="text-gray-600 mb-6">
              Get the complete academic syllabus for all levels in PDF format
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Download PDF
              </button>
              <button className="btn-secondary">
                View Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AcademicSyllabusLevels
