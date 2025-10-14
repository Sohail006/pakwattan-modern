'use client'

const HajjTicketsDetails = () => {
  const criteria = [
    {
      title: "Long Service",
      description: "Staff members with 10+ years of dedicated service",
      icon: "⏰"
    },
    {
      title: "Excellence in Teaching",
      description: "Outstanding performance in academic delivery",
      icon: "🎓"
    },
    {
      title: "Leadership",
      description: "Exceptional leadership and management skills",
      icon: "👥"
    },
    {
      title: "Innovation",
      description: "Contributing innovative ideas and improvements",
      icon: "💡"
    },
    {
      title: "Student Success",
      description: "Significant contribution to student achievements",
      icon: "🏆"
    },
    {
      title: "Community Service",
      description: "Active participation in community development",
      icon: "🤝"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Recognition Criteria
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our staff members are recognized based on their exceptional contributions and dedication
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

export default HajjTicketsDetails
