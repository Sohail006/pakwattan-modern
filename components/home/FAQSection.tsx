'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { HOME_FAQS } from '@/lib/constants'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white" id="faq">
      <Container>
        <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-700 px-4 py-1.5 text-xs sm:text-sm font-semibold mb-3">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-josefin text-secondary-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-secondary-600">
            Quick answers about admissions, academics, and campus life.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {HOME_FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <Card key={faq.question} hover={false} className="border border-secondary-100 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left px-4 sm:px-6 py-4 sm:py-5 min-h-[52px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-secondary-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-primary-600 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-secondary-600 leading-relaxed border-t border-secondary-50 pt-3">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default FAQSection
