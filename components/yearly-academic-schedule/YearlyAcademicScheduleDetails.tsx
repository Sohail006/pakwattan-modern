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
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Academic Calendar
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto break-words">
            Important dates and events for the academic session 2025-26
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {scheduleItems.map((item, index) => (
            <div key={index} className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl active:shadow-lg transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-gray-100 hover:border-primary-200">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-primary-700 transition-colors duration-300 break-words">
                  {item.month}
                </h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {item.events.map((event, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-400 rounded-full flex-shrink-0"></span>
                      <span className="break-words">{event}</span>
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
