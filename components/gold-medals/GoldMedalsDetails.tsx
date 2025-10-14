'use client'

const GoldMedalsDetails = () => {
  const criteria = [
    {
      title: "Academic Excellence",
      description: "Outstanding performance in all subjects with highest grades",
      icon: "🏆"
    },
    {
      title: "Consistent Performance",
      description: "Maintaining high academic standards throughout the year",
      icon: "📈"
    },
    {
      title: "Leadership Qualities",
      description: "Demonstrating leadership in school activities and projects",
      icon: "👑"
    },
    {
      title: "Character Excellence",
      description: "Exemplary character, discipline, and moral values",
      icon: "⭐"
    },
    {
      title: "Innovation & Creativity",
      description: "Contributing innovative ideas and creative solutions",
      icon: "💡"
    },
    {
      title: "Community Service",
      description: "Active participation in community service and social work",
      icon: "🤝"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Gold Medal Criteria
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our gold medal recipients are selected based on comprehensive evaluation criteria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {criteria.map((item, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GoldMedalsDetails
