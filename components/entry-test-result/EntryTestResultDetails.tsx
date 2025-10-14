'use client'

const EntryTestResultDetails = () => {
  const testInfo = [
    {
      title: "Test Date",
      description: "Entry test was conducted on 10th May, 2025",
      icon: "📅"
    },
    {
      title: "Test Time",
      description: "Test started at 08:30 AM sharp",
      icon: "⏰"
    },
    {
      title: "Test Duration",
      description: "Total duration was 2 hours",
      icon: "⏱️"
    },
    {
      title: "Subjects Covered",
      description: "Mathematics, English, Science, and General Knowledge",
      icon: "📚"
    },
    {
      title: "Total Marks",
      description: "Maximum marks were 100",
      icon: "📊"
    },
    {
      title: "Passing Criteria",
      description: "Minimum 50% marks required for admission",
      icon: "✅"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Test Information
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Important details about the entry test and result criteria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testInfo.map((item, index) => (
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

export default EntryTestResultDetails
