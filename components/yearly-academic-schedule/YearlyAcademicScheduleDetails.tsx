'use client'

const YearlyAcademicScheduleDetails = () => {
  const scheduleItems = [
    {
      month: "August 2025",
      events: [
        "School Reopening",
        "Orientation Program",
        "Classes Begin",
        "Parent-Teacher Meeting"
      ],
      icon: "🎓"
    },
    {
      month: "September 2025",
      events: [
        "Monthly Tests",
        "Independence Day Celebration",
        "Science Fair",
        "Sports Week"
      ],
      icon: "📚"
    },
    {
      month: "October 2025",
      events: [
        "Mid-Term Examinations",
        "Parent-Teacher Conference",
        "Cultural Day",
        "Debate Competition"
      ],
      icon: "📝"
    },
    {
      month: "November 2025",
      events: [
        "Annual Sports Day",
        "Art Exhibition",
        "Quiz Competition",
        "Thanksgiving Break"
      ],
      icon: "🏃"
    },
    {
      month: "December 2025",
      events: [
        "Winter Break Begins",
        "Holiday Celebrations",
        "Winter Camp",
        "New Year Preparation"
      ],
      icon: "❄️"
    },
    {
      month: "January 2026",
      events: [
        "School Reopening",
        "New Year Assembly",
        "Monthly Tests",
        "Career Counseling"
      ],
      icon: "🎉"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Academic Calendar
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Important dates and events for the academic session 2025-26
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scheduleItems.map((item, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {item.month}
                </h3>
                <div className="space-y-2">
                  {item.events.map((event, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                      <span>{event}</span>
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

export default YearlyAcademicScheduleDetails
