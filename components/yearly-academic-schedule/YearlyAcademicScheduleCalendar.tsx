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
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Important Dates
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Key dates and events for the academic session 2025-26
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {importantDates.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-primary-200 group">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
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
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">
                        {item.event}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.type === 'Academic' ? 'bg-primary-100 text-primary-700' :
                        item.type === 'Examination' ? 'bg-red-100 text-red-700' :
                        item.type === 'Event' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                    <p className="text-primary-600 font-semibold mt-2">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-primary-800 mb-4">
              Download Complete Schedule
            </h3>
            <p className="text-gray-600 mb-6">
              Get the complete academic calendar in PDF format
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Download PDF
              </button>
              <button className="btn-secondary">
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
