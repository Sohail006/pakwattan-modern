'use client'

import FAQ from '@/components/ui/FAQ'
import { HOME_FAQS } from '@/lib/constants'

const FAQSection = () => {
  return (
    <FAQ
      items={HOME_FAQS}
      eyebrow="FAQ"
      title="Frequently Asked Questions"
      subtitle="Quick answers about admissions, academics, and campus life."
      id="faq"
    />
  )
}

export default FAQSection
