'use client'

const ModelPapersDetails = () => {
  const subjects = [
    {
      name: "Mathematics",
      description: "Comprehensive model papers covering all mathematical concepts",
      papers: ["Paper 1", "Paper 2", "Paper 3", "Paper 4", "Paper 5"],
      icon: "🔢"
    },
    {
      name: "Physics",
      description: "Model papers for physics with practical applications",
      papers: ["Paper 1", "Paper 2", "Paper 3", "Paper 4", "Paper 5"],
      icon: "⚛️"
    },
    {
      name: "Chemistry",
      description: "Chemistry model papers with laboratory-based questions",
      papers: ["Paper 1", "Paper 2", "Paper 3", "Paper 4", "Paper 5"],
      icon: "🧪"
    },
    {
      name: "Biology",
      description: "Biology model papers covering all biological concepts",
      papers: ["Paper 1", "Paper 2", "Paper 3", "Paper 4", "Paper 5"],
      icon: "🧬"
    },
    {
      name: "English",
      description: "English language and literature model papers",
      papers: ["Paper 1", "Paper 2", "Paper 3", "Paper 4", "Paper 5"],
      icon: "📚"
    },
    {
      name: "Urdu",
      description: "Urdu language and literature model papers",
      papers: ["Paper 1", "Paper 2", "Paper 3", "Paper 4", "Paper 5"],
      icon: "📖"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Available Model Papers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive model papers for all subjects and levels
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
                  <h4 className="font-semibold text-gray-800 text-sm">Available Papers:</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.papers.map((paper, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {paper}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="mt-4 w-full btn-primary text-sm">
                  Download Papers
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ModelPapersDetails
