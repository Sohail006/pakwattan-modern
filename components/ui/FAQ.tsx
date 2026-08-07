'use client'

import { HelpCircle } from 'lucide-react'
import Accordion from '@/components/ui/Accordion'
import Container from '@/components/ui/Container'

export type FAQItem = {
  question: string
  answer: string
}

type FAQProps = {
  items: FAQItem[]
  eyebrow?: string
  title?: string
  subtitle?: string
  id?: string
  className?: string
  defaultOpenFirst?: boolean
}

const FAQ = ({
  items,
  eyebrow = 'FAQ',
  title = 'Frequently Asked Questions',
  subtitle,
  id = 'faq',
  className = '',
  defaultOpenFirst = true,
}: FAQProps) => {
  if (!items.length) return null

  return (
    <section id={id} className={`scroll-mt-20 py-10 sm:py-14 lg:py-16 bg-white ${className}`}>
      <Container>
        <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-700 px-4 py-1.5 text-xs sm:text-sm font-semibold mb-3">
            <HelpCircle className="w-4 h-4" aria-hidden />
            {eyebrow}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-josefin text-secondary-900 mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-secondary-600">{subtitle}</p>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            defaultOpenId={defaultOpenFirst ? 'faq-0' : null}
            items={items.map((faq, index) => ({
              id: `faq-${index}`,
              title: faq.question,
              content: faq.answer,
            }))}
          />
        </div>
      </Container>
    </section>
  )
}

export default FAQ
