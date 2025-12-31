'use client'

import { DollarSign, Users, Calendar } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const FeeStructure = () => {
  const feeData = [
    { class: 'Play Group', admission: '₨3,000', monthly: '₨8,000', security: '₨5,000' },
    { class: 'Nursery', admission: '₨3,500', monthly: '₨9,000', security: '₨5,000' },
    { class: 'Prep', admission: '₨4,000', monthly: '₨10,000', security: '₨5,000' },
    { class: '1st', admission: '₨4,500', monthly: '₨12,000', security: '₨5,000' },
    { class: '2nd', admission: '₨4,500', monthly: '₨12,000', security: '₨5,000' },
    { class: '3rd', admission: '₨4,500', monthly: '₨12,000', security: '₨5,000' },
    { class: '4th', admission: '₨4,500', monthly: '₨12,000', security: '₨5,000' },
    { class: '5th', admission: '₨4,500', monthly: '₨12,000', security: '₨5,000' },
    { class: '6th', admission: '₨4,500', monthly: '₨12,000', security: '₨5,000' },
    { class: '7th', admission: '₨4,500', monthly: '₨12,000', security: '₨5,000' },
    { class: '8th', admission: '₨5,000', monthly: '₨15,000', security: '₨5,000' },
    { class: '9th', admission: '₨5,000', monthly: '₨15,000', security: '₨5,000' },
    { class: '10th', admission: '₨5,000', monthly: '₨15,000', security: '₨5,000' },
    { class: '1st Year', admission: '₨5,500', monthly: '₨18,000', security: '₨5,000' },
    { class: '2nd Year', admission: '₨5,500', monthly: '₨18,000', security: '₨5,000' }
  ]

  const ageLimits = [
    { class: 'Play Group', age: '3-4 Years' },
    { class: 'Nursery', age: '4-5 Years' },
    { class: 'Prep', age: '5-6 Years' },
    { class: '1st', age: '6-7 Years' },
    { class: '2nd', age: '7-8 Years' },
    { class: '3rd', age: '8-9 Years' },
    { class: '4th', age: '9-10 Years' },
    { class: '5th', age: '10-11 Years' },
    { class: '6th', age: '11-12 Years' },
    { class: '7th', age: '12-13 Years' },
    { class: '8th', age: '13-14 Years' },
    { class: '9th', age: '14-15 Years' },
    { class: '10th', age: '15-16 Years' },
    { class: '1st Year', age: '16-17 Years' },
    { class: '2nd Year', age: '17-18 Years' }
  ]

  return (
    <section id="fee-structure" className="section-padding bg-white">
      <Container>
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6">
            <span className="text-gradient">Fee Structure & Age Limits</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Transparent fee structure and age requirements for all classes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Fee Structure */}
          <Card className="p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="break-words">Fee Structure</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 break-words">
              All fees are in Pakistani Rupees (₨). Fees are subject to change.
            </p>
            
            <div className="overflow-x-auto -mx-4 sm:mx-0 mobile-scroll">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gradient-to-r from-primary-600 to-accent-600">
                      <tr>
                        <th scope="col" className="py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-white touch-target">Class</th>
                        <th scope="col" className="px-2 sm:px-3 py-3 text-left text-xs sm:text-sm font-semibold text-white whitespace-nowrap touch-target">Admission Fee</th>
                        <th scope="col" className="px-2 sm:px-3 py-3 text-left text-xs sm:text-sm font-semibold text-white whitespace-nowrap touch-target">Monthly Fee</th>
                        <th scope="col" className="px-2 sm:px-3 py-3 text-left text-xs sm:text-sm font-semibold text-white whitespace-nowrap touch-target">Security</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {feeData.map((fee, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="whitespace-nowrap py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-900">{fee.class}</td>
                          <td className="whitespace-nowrap px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-primary-600">{fee.admission}</td>
                          <td className="whitespace-nowrap px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-primary-600">{fee.monthly}</td>
                          <td className="whitespace-nowrap px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-primary-600">{fee.security}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>

          {/* Age Limits */}
          <Card className="p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="break-words">Age Limits</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 break-words">
              Prescribed age limits on 1st March of the year of admission to various classes.
            </p>
            
            <div className="overflow-x-auto -mx-4 sm:mx-0 mobile-scroll">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gradient-to-r from-primary-600 to-accent-600">
                      <tr>
                        <th scope="col" className="py-3 px-3 sm:px-4 text-center text-xs sm:text-sm font-semibold text-white touch-target">S.No</th>
                        <th scope="col" className="px-2 sm:px-3 py-3 text-left text-xs sm:text-sm font-semibold text-white whitespace-nowrap touch-target">Class</th>
                        <th scope="col" className="px-2 sm:px-3 py-3 text-left text-xs sm:text-sm font-semibold text-white whitespace-nowrap touch-target">Age Limits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {ageLimits.map((age, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="whitespace-nowrap py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-900 text-center">{index + 1}</td>
                          <td className="whitespace-nowrap px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900">{age.class}</td>
                          <td className="whitespace-nowrap px-2 sm:px-3 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-primary-600">{age.age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Important Notes */}
        <Card className="p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8 lg:mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2 sm:mr-3 flex-shrink-0" />
            <span className="break-words">Important Notes</span>
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
              <span className="break-words">All fees are non-refundable once paid</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
              <span className="break-words">Security deposit is refundable upon completion of studies</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
              <span className="break-words">Monthly fees are due on the 1st of each month</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
              <span className="break-words">Late fee charges may apply for delayed payments</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
              <span className="break-words">Scholarship students may have different fee structures</span>
            </li>
          </ul>
        </Card>
      </Container>
    </section>
  )
}

export default FeeStructure
