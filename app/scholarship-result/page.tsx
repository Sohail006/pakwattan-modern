import { Calendar, Award, Clock } from 'lucide-react'
import Container from '@/components/ui/Container'
import StructuredData from '@/components/seo/StructuredData'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export default function ScholarshipResultPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Scholarship Results', url: 'https://pakwattan.edu.pk/scholarship-result' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
          </div>
          
          <Container className="relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-josefin mb-4 sm:mb-6 leading-tight">
                Scholarship Results
                <span className="block text-gradient bg-gradient-to-r from-accent-300 to-white bg-clip-text text-transparent">
                  Announcement
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
                Good Will Scholarship Test 2026–27
              </p>
            </div>
          </Container>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <Container>
            <div className="max-w-3xl mx-auto">
              {/* Announcement Card */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-primary-200 p-6 sm:p-8 lg:p-12 mb-8">
                <div className="text-center">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mb-6 shadow-lg">
                    <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  
                  {/* Main Message */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                    <span className="text-gradient bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      The date for announcing scholarship results will be shared soon.
                    </span>
                  </h2>
                  
                  {/* Additional Info */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-center space-x-3 text-gray-600">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <p className="text-base sm:text-lg">
                        Results will be published on this official website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Section */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                  Important Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Result Publication</h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Scholarship test results will be published on this official website and on school notice boards once the announcement date is confirmed. Please check back soon.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Notification</h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        All applicants will be notified by email and SMS when the results are published.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Result Checking</h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        You will be able to check your results online using your registration number or CNIC / B-Form number.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary-600 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Next Steps</h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Shortlisted candidates must complete admission formalities within the deadline communicated with the results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 text-center">
                <a
                  href="/scholarships"
                  className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-base sm:text-lg"
                >
                  <Award className="w-5 h-5" />
                  <span>Learn More About Scholarships</span>
                </a>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

