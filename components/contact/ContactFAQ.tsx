'use client'

import FAQ from '@/components/ui/FAQ'
import { CONTACT_FAQS } from '@/lib/contact-utils'

const ContactFAQ = () => {
  return (
    <FAQ
      items={CONTACT_FAQS}
      eyebrow="Contact Help"
      title="Contact FAQ"
      subtitle="Quick answers before you call or visit."
      id="contact-faq"
    />
  )
}

export default ContactFAQ
