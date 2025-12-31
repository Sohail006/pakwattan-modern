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
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Available Model Papers
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto break-words">
            Comprehensive model papers for all subjects and levels
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {subjects.map((subject, index) => (
            <div key={index} className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl active:shadow-lg transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-gray-100 hover:border-primary-200">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                  {subject.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-primary-700 transition-colors duration-300 break-words">
                  {subject.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 break-words">
                  {subject.description}
                </p>
                <div className="space-y-1.5 sm:space-y-2">
                  <h4 className="font-semibold text-gray-800 text-xs sm:text-sm break-words">Available Papers:</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {subject.papers.map((paper, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {paper}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="mt-3 sm:mt-4 w-full btn-primary text-xs sm:text-sm touch-target min-h-[44px]">
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
