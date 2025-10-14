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
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Download Model Papers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download model papers by level and subject for comprehensive exam preparation
          </p>
        </div>

        <div className="space-y-8">
          {downloadCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200 group">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-20 h-20 mx-auto lg:mx-0 mb-4 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-primary-800 mb-2">
                    {category.level}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Available Subjects:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {category.subjects.map((subject, idx) => (
                        <div key={idx} className="flex items-center space-x-2 bg-primary-50 rounded-lg px-3 py-2">
                          <span className="text-primary-600">📄</span>
                          <span className="text-primary-700 text-sm font-medium">{subject}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button className="btn-primary flex-1">
                        Download All Papers
                      </button>
                      <button className="btn-secondary flex-1">
                        View Online
                      </button>
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
              Complete Model Papers Collection
            </h3>
            <p className="text-gray-600 mb-6">
              Download the complete collection of model papers for all levels and subjects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Download Complete Collection
              </button>
              <button className="btn-secondary">
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
