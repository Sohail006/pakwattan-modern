'use client'


const GrowthOverYears = () => {
  const growthData = [
    {
      year: "2020",
      title: "Foundation Year",
      description: "Pak Wattan School & College of Sciences was established",
      students: "50",
      achievements: ["School Founded", "First Academic Year", "Vision Established"]
    },
    {
      year: "2021", 
      title: "Early Growth",
      description: "Rapid expansion and recognition in the community",
      students: "200",
      achievements: ["Community Recognition", "Academic Excellence", "Student Growth"]
    },
    {
      year: "2022",
      title: "Academic Excellence",
      description: "First batch of outstanding results and achievements",
      students: "500",
      achievements: ["First Board Results", "Academic Recognition", "Quality Education"]
    },
    {
      year: "2023",
      title: "Recognition",
      description: "Top positions in Havelian Circle and regional recognition",
      students: "800",
      achievements: ["Top Positions", "Regional Recognition", "Academic Excellence"]
    },
    {
      year: "2024",
      title: "Excellence",
      description: "Continued excellence and multiple top positions",
      students: "1200",
      achievements: ["Multiple Top Positions", "Continued Excellence", "Student Success"]
    },
    {
      year: "2025",
      title: "Leadership",
      description: "Leading educational institution with 3000+ students",
      students: "3000+",
      achievements: ["Educational Leadership", "Student Success", "Community Impact"]
    }
  ]

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-primary-700 mb-4 sm:mb-6">
            <span>📈</span>
            <span>Growth Journey</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Growth Over Years
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto break-words">
            Our journey from establishment to becoming a leading educational institution in Havelian
          </p>
        </div>

        <div className="relative">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
            
            {/* Timeline Items */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
              {growthData.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row lg:flex-row' : 'flex-row lg:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'} text-left`}>
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 hover:shadow-2xl active:shadow-lg transition-all duration-300 hover:-translate-y-1 lg:hover:-translate-y-2">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                          <span className="text-2xl sm:text-3xl font-bold text-primary-600">{item.year}</span>
                          <span className="text-base sm:text-lg font-semibold text-accent-600 break-words">{item.title}</span>
                        </div>
                        
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 break-words">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center space-x-2 sm:space-x-4">
                          <div className="flex items-center space-x-1 sm:space-x-2 bg-primary-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                            <span>👥</span>
                            <span className="text-xs sm:text-sm text-primary-700 font-semibold">{item.students} Students</span>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5 sm:space-y-2">
                          {item.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <span>⭐</span>
                              <span className="text-xs sm:text-sm text-gray-600 break-words">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Dot - Hidden on mobile, shown on desktop */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-white border-4 border-primary-500 rounded-full shadow-lg z-10"></div>
                  
                  {/* Spacer for opposite side - Hidden on mobile */}
                  <div className="hidden lg:block w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Growth Statistics */}
        <div className="mt-8 sm:mt-12 lg:mt-16 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-primary-800 mb-2 sm:mb-4 break-words">Growth Statistics</h3>
            <p className="text-sm sm:text-base text-gray-600 break-words">Our journey in numbers</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">5+</div>
              <div className="text-base sm:text-lg font-semibold text-gray-800 mb-1 break-words">Years of Excellence</div>
              <div className="text-xs sm:text-sm text-gray-600">Since 2020</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent-600 mb-1 sm:mb-2">3000+</div>
              <div className="text-base sm:text-lg font-semibold text-gray-800 mb-1 break-words">Students</div>
              <div className="text-xs sm:text-sm text-gray-600">Current Enrollment</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-1 sm:mb-2">5x</div>
              <div className="text-base sm:text-lg font-semibold text-gray-800 mb-1 break-words">Top Positions</div>
              <div className="text-xs sm:text-sm text-gray-600">Havelian Circle</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GrowthOverYears
