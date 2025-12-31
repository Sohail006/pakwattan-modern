'use client'

const ModelPapersDownload = () => {
  const downloadCategories = [
    {
      level: "Matriculation",
      description: "Model papers for SSC (Secondary School Certificate) examinations",
      subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Urdu", "Pakistan Studies", "Islamic Studies"],
      icon: "🎓"
    },
    {
      level: "Intermediate",
      description: "Model papers for HSSC (Higher Secondary School Certificate) examinations",
      subjects: ["Pre-Medical", "Pre-Engineering", "Commerce", "Computer Science", "General Science"],
      icon: "🏆"
    },
    {
      level: "Primary",
      description: "Model papers for primary level students",
      subjects: ["Mathematics", "English", "Urdu", "Science", "Social Studies"],
      icon: "📚"
    }
  ]

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Download Model Papers
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto break-words">
            Download model papers by level and subject for comprehensive exam preparation
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {downloadCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl active:shadow-lg transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-gray-100 hover:border-primary-200 group">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 mx-auto lg:mx-0 mb-3 sm:mb-4 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary-800 mb-1 sm:mb-2 break-words">
                    {category.level}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 break-words">
                    {category.description}
                  </p>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-800 break-words">Available Subjects:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {category.subjects.map((subject, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5 sm:space-x-2 bg-primary-50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                          <span className="text-primary-600 text-xs sm:text-sm flex-shrink-0">📄</span>
                          <span className="text-primary-700 text-xs sm:text-sm font-medium truncate">{subject}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                      <button className="btn-primary flex-1 touch-target min-h-[44px] text-sm sm:text-base">
                        Download All Papers
                      </button>
                      <button className="btn-secondary flex-1 touch-target min-h-[44px] text-sm sm:text-base">
                        View Online
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-primary-800 mb-3 sm:mb-4 break-words">
              Complete Model Papers Collection
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 break-words">
              Download the complete collection of model papers for all levels and subjects
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="btn-primary touch-target min-h-[44px] text-sm sm:text-base">
                Download Complete Collection
              </button>
              <button className="btn-secondary touch-target min-h-[44px] text-sm sm:text-base">
                View All Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModelPapersDownload
