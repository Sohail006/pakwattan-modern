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
    { class: '9th', admission: '₨5,000', monthly: '₨15,000', security: 'To be Announced' }
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
    <section className="section-padding bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Fee Structure & Age Limits</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Transparent fee structure and age requirements for all classes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Fee Structure */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <DollarSign className="w-6 h-6 text-green-600 mr-3" />
              Fee Structure
            </h3>
            <p className="text-gray-600 mb-6">
              All fees are in Pakistani Rupees (₨). Fees are subject to change.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left">Class</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Admission Fee</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Monthly Fee</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Security</th>
                  </tr>
                </thead>
                <tbody>
                  {feeData.map((fee, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">{fee.class}</td>
                      <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">{fee.admission}</td>
                      <td className="border border-gray-300 px-4 py-3 text-blue-600 font-semibold">{fee.monthly}</td>
                      <td className="border border-gray-300 px-4 py-3 text-purple-600 font-semibold">{fee.security}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Age Limits */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-6 h-6 text-blue-600 mr-3" />
              Age Limits
            </h3>
            <p className="text-gray-600 mb-6">
              Prescribed age limits on 1st March of the year of admission to various classes.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left">S.No</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Class</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Age Limits</th>
                  </tr>
                </thead>
                <tbody>
                  {ageLimits.map((age, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-300 px-4 py-3 text-center font-semibold">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">{age.class}</td>
                      <td className="border border-gray-300 px-4 py-3 text-blue-600 font-semibold">{age.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Important Notes */}
        <Card className="p-8 mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-6 h-6 text-yellow-600 mr-3" />
            Important Notes
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-yellow-600 mr-3">•</span>
              <span>All fees are non-refundable once paid</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-3">•</span>
              <span>Security deposit is refundable upon completion of studies</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-3">•</span>
              <span>Monthly fees are due on the 1st of each month</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-3">•</span>
              <span>Late fee charges may apply for delayed payments</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-3">•</span>
              <span>Scholarship students may have different fee structures</span>
            </li>
          </ul>
        </Card>
      </Container>
    </section>
  )
}

export default FeeStructure
