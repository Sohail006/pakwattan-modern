'use client'

import { Megaphone } from 'lucide-react'
import Card from '@/components/ui/Card'

/**
 * NOTICE: Scholarship Test criteria and fee policy.
 * Same content as on /admission (FeeStructure) for consistency.
 */
const ScholarshipNotice = () => (
  <section className="section-padding bg-white" aria-labelledby="scholarship-notice-heading">
    <div className="container-custom">
      <Card className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400">
        <h2 id="scholarship-notice-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
          <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2 sm:mr-3 flex-shrink-0" aria-hidden />
          <span className="break-words">NOTICE</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-5 break-words">
          Scholarships will be awarded on the basis of the percentage obtained in the Scholarship Test as per the following criteria:
        </p>
        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700 mb-4 sm:mb-5 list-none pl-0">
          <li className="flex items-start">
            <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
            <span className="break-words"><strong>95% and above:</strong> 100% waiver of Monthly Fee</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
            <span className="break-words"><strong>90%–94%:</strong> 70% concession in Monthly Fee</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
            <span className="break-words"><strong>85%–89%:</strong> 60% concession in Monthly Fee</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2 sm:mr-3 font-bold flex-shrink-0">•</span>
            <span className="break-words"><strong>80%–84%:</strong> 50% concession in Monthly Fee</span>
          </li>
        </ul>
        <p className="text-sm sm:text-base text-gray-700 border-t border-yellow-200 pt-3 sm:pt-4 break-words">
          <strong>Note:</strong> <em>Annual Funds</em> and <em>Admission Fee</em> are compulsory to be paid. The concession is applicable to Monthly Fee only.
        </p>
      </Card>
    </div>
  </section>
)

export default ScholarshipNotice
