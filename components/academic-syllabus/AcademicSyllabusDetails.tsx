'use client'

const AcademicSyllabusDetails = () => {
  const subjects = [
    {
      name: "Mathematics",
      description: "Comprehensive mathematical concepts from basic arithmetic to advanced calculus",
      topics: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics"],
      icon: "🔢"
    },
    {
      name: "Science",
      description: "Physics, Chemistry, and Biology with practical laboratory work",
      topics: ["Physics", "Chemistry", "Biology", "Laboratory Work", "Research Projects"],
      icon: "🔬"
    },
    {
      name: "English",
      description: "Language skills, literature, and communication development",
      topics: ["Grammar", "Literature", "Composition", "Speaking Skills", "Reading Comprehension"],
      icon: "📚"
    },
    {
      name: "Urdu",
      description: "National language proficiency and literature appreciation",
      topics: ["Grammar", "Poetry", "Prose", "Composition", "Literature Analysis"],
      icon: "📖"
    },
    {
      name: "Islamic Studies",
      description: "Religious education and moral development",
      topics: ["Quran", "Hadith", "Islamic History", "Ethics", "Religious Practices"],
      icon: "🕌"
    },
    {
      name: "Pakistan Studies",
      description: "National history, geography, and civic education",
      topics: ["History", "Geography", "Civics", "Current Affairs", "National Heritage"],
      icon: "🇵🇰"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Core Subjects
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive curriculum covers all essential subjects for academic excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {subject.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {subject.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {subject.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.map((topic, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AcademicSyllabusDetails
