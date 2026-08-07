'use client'

const YearlyAcademicScheduleCalendar = () => {
  const importantDates = [
    {
      date: "August 15, 2025",
      event: "School Reopening",
      type: "Academic",
      description: "New academic session begins"
    },
    {
      date: "September 6, 2025",
      event: "Defense Day",
      type: "National Holiday",
      description: "National holiday observance"
    },
    {
      date: "October 15-20, 2025",
      event: "Mid-Term Examinations",
      type: "Examination",
      description: "First major examination of the session"
    },
    {
      date: "November 1, 2025",
      event: "Annual Sports Day",
      type: "Event",
      description: "Sports competitions and activities"
    },
    {
      date: "December 20, 2025",
      event: "Winter Break Begins",
      type: "Holiday",
      description: "Winter vacation starts"
    },
    {
      date: "January 15, 2026",
      event: "School Reopening",
      type: "Academic",
      description: "Resume after winter break"
    },
    {
      date: "March 15-20, 2026",
      event: "Final Examinations",
      type: "Examination",
      description: "End of session examinations"
    },
    {
      date: "April 10, 2026",
      event: "Annual Prize Distribution",
      type: "Event",
      description: "Recognition of outstanding students"
    }
  ]

  return (
    <section id="academic-calendar" className="scroll-mt-20 py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Important Dates
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto break-words">
            Key dates and events for the academic session 2025-26
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {importantDates.map((item, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 p-4 sm:p-6 border border-gray-100 hover:border-primary-200 group">
                <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 lg:space-x-6">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl ${
                      item.type === 'Academic' ? 'bg-primary-100 text-primary-600' :
                      item.type === 'Examination' ? 'bg-red-100 text-red-600' :
                      item.type === 'Event' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {item.type === 'Academic' ? '🎓' :
                       item.type === 'Examination' ? '📝' :
                       item.type === 'Event' ? '🎉' :
                       '🏛️'}
                    </div>
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-300 break-words">
                        {item.event}
                      </h3>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${
                        item.type === 'Academic' ? 'bg-primary-100 text-primary-700' :
                        item.type === 'Examination' ? 'bg-red-100 text-red-700' :
                        item.type === 'Event' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mt-1 break-words">{item.description}</p>
                    <p className="text-sm sm:text-base text-primary-600 font-semibold mt-2 break-words">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-primary-800 mb-3 sm:mb-4 break-words">
              Download Complete Schedule
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 break-words">
              Get the complete academic calendar in PDF format
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="btn-primary touch-target min-h-[44px] text-sm sm:text-base">
                Download PDF
              </button>
              <button className="btn-secondary touch-target min-h-[44px] text-sm sm:text-base">
                View Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default YearlyAcademicScheduleCalendar
