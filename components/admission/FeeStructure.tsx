'use client'

import { Coins, Users, Calendar } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const FeeStructure = () => {
  const feeData = [
    { class: 'Playgroup (PG)', monthly: 'PKR 4,500', admission: 'PKR 15,000', annual: 'PKR 15,000' },
    { class: 'Kindergarten (KG)', monthly: 'PKR 4,500', admission: 'PKR 15,000', annual: 'PKR 15,000' },
    { class: 'Prep', monthly: 'PKR 4,500', admission: 'PKR 15,000', annual: 'PKR 15,000' },
    { class: 'Grade 1', monthly: 'PKR 5,000', admission: 'PKR 15,000', annual: 'PKR 15,000' },
    { class: 'Grade 2', monthly: 'PKR 5,000', admission: 'PKR 15,000', annual: 'PKR 15,000' },
    { class: 'Grade 3', monthly: 'PKR 5,000', admission: 'PKR 15,000', annual: 'PKR 15,000' },
    { class: 'Grade 4', monthly: 'PKR 5,000', admission: 'PKR 15,000', annual: 'PKR 15,000' },
    { class: 'Grade 5', monthly: 'PKR 5,000', admission: 'PKR 15,000', annual: 'PKR 15,000' },
    { class: 'Grade 6', monthly: 'PKR 5,000', admission: 'PKR 15,000', annual: 'PKR 15,000' },
    { class: 'Grade 7', monthly: 'PKR 5,000', admission: 'PKR 15,000', annual: 'PKR 15,000' },
    { class: 'Grade 8', monthly: 'PKR 5,500', admission: 'PKR 15,000', annual: 'PKR 20,000' },
    { class: 'Grade 9', monthly: 'PKR 5,500', admission: 'PKR 20,000', annual: 'PKR 20,000' },
    { class: 'Grade 10', monthly: 'PKR 6,500', admission: 'PKR 20,000', annual: 'PKR 20,000' },
    { class: 'Grade 11', monthly: 'PKR 7,500', admission: 'PKR 20,000', annual: 'PKR 20,000' },
    { class: 'Grade 12', monthly: 'PKR 7,500', admission: 'PKR 20,000', annual: 'PKR 20,000' }
  ]

  const ageLimits = [
    { class: 'Playgroup (PG)', age: '3-4 Years' },
    { class: 'Kindergarten (KG)', age: '4-5 Years' },
    { class: 'Prep', age: '5-6 Years' },
    { class: 'Grade 1', age: '6-7 Years' },
    { class: 'Grade 2', age: '7-8 Years' },
    { class: 'Grade 3', age: '8-9 Years' },
    { class: 'Grade 4', age: '9-10 Years' },
    { class: 'Grade 5', age: '10-11 Years' },
    { class: 'Grade 6', age: '11-12 Years' },
    { class: 'Grade 7', age: '12-13 Years' },
    { class: 'Grade 8', age: '13-14 Years' },
    { class: 'Grade 9', age: '14-15 Years' },
    { class: 'Grade 10', age: '15-16 Years' },
    { class: 'Grade 11', age: '16-17 Years' },
    { class: 'Grade 12', age: '17-18 Years' }
  ]

  return (
    <section id="fee-structure" className="section-padding bg-white">
      <Container>
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6">
            <span className="text-gradient">Fee Structure & Age Limits</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Fee structure for Session 2026-2027 and age requirements for all classes
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-6">
          {/* Fee Structure */}
          <Card className="p-3 sm:p-4 lg:p-5 lg:col-span-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 flex items-center">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 mr-2 flex-shrink-0" />
              <span className="break-words">Fee Structure</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 break-words">
              All fees are in Pakistani Rupees (PKR). Fees are subject to change.
            </p>
            
            <div className="overflow-x-auto -mx-4 sm:mx-0 mobile-scroll">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="w-full divide-y divide-gray-300 text-[10px] sm:text-xs">
                    <thead className="bg-gradient-to-r from-green-600 to-yellow-500">
                      <tr>
                        <th scope="col" className="py-1.5 px-2 sm:px-3 text-left font-semibold text-white uppercase tracking-wider">Grade</th>
                        <th scope="col" className="px-2 sm:px-3 py-1.5 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">Monthly Fee</th>
                        <th scope="col" className="px-2 sm:px-3 py-1.5 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">Admission Fee</th>
                        <th scope="col" className="px-2 sm:px-3 py-1.5 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">Annual Charges</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {feeData.map((fee, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="whitespace-nowrap py-1.5 px-2 sm:px-3 font-semibold text-gray-900">{fee.class}</td>
                          <td className="whitespace-nowrap py-1.5 px-2 sm:px-3 font-semibold text-primary-600">{fee.monthly}</td>
                          <td className="whitespace-nowrap py-1.5 px-2 sm:px-3 font-semibold text-primary-600">{fee.admission}</td>
                          <td className="whitespace-nowrap py-1.5 px-2 sm:px-3 font-semibold text-primary-600">{fee.annual}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>

          {/* Age Limits */}
          <Card className="p-3 sm:p-4 lg:p-5 lg:col-span-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 flex items-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 mr-2 flex-shrink-0" />
              <span className="break-words">Age Limits</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 break-words">
              Prescribed age limits on 1st March of the year of admission to various classes.
            </p>
            
            <div className="overflow-x-auto -mx-4 sm:mx-0 mobile-scroll">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="w-full divide-y divide-gray-300 text-[10px] sm:text-xs">
                    <thead className="bg-gradient-to-r from-green-600 to-yellow-500">
                      <tr>
                        <th scope="col" className="py-1.5 px-2 sm:px-3 text-center font-semibold text-white uppercase tracking-wider">S.No</th>
                        <th scope="col" className="px-2 sm:px-3 py-1.5 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">Class</th>
                        <th scope="col" className="px-2 sm:px-3 py-1.5 text-left font-semibold text-white uppercase tracking-wider whitespace-nowrap">Age Limits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {ageLimits.map((age, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="whitespace-nowrap py-1.5 px-2 sm:px-3 font-semibold text-gray-900 text-center">{index + 1}</td>
                          <td className="whitespace-nowrap py-1.5 px-2 sm:px-3 font-semibold text-gray-900">{age.class}</td>
                          <td className="whitespace-nowrap py-1.5 px-2 sm:px-3 font-semibold text-primary-600">{age.age}</td>
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
              <span className="break-words">Admission Fee is non-refundable.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
              <span className="break-words">Annual Charges are payable once per session.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
              <span className="break-words">Monthly Fee is payable by the <strong>10th of each month</strong>.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
              <span className="break-words">Late fee surcharge may apply for overdue payments.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
              <span className="break-words">For further details, contact the school administration.</span>
            </li>
          </ul>
        </Card>
      </Container>
    </section>
  )
}

export default FeeStructure
