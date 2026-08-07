import { Metadata } from 'next'
import Link from 'next/link'
import FAQ from '@/components/ui/FAQ'
import FaqsHero from '@/components/faqs/FaqsHero'
import StructuredData from '@/components/seo/StructuredData'
import { SITE_FAQS } from '@/lib/constants'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebPageSchema,
} from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'FAQs — Admissions, Academics & Campus',
  description:
    'Frequently asked questions about Pak Wattan admissions, scholarships, campus location, office hours, WhatsApp contact, and student life in Havelian.',
  keywords:
    'Pak Wattan FAQ, school admission questions, Havelian school hours, scholarships FAQ, contact Pak Wattan',
  path: '/faqs',
})

export default function FaqsPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'FAQs', url: 'https://pakwattan.edu.pk/faqs' },
  ])
  const faqSchema = generateFAQSchema(SITE_FAQS)
  const webPage = generateWebPageSchema({
    name: 'FAQs — Pak Wattan School & College of Sciences',
    description: 'Answers to common questions about admissions, academics, and campus life.',
    url: 'https://pakwattan.edu.pk/faqs',
  })

  return (
    <>
      <StructuredData data={[breadcrumbs, faqSchema, webPage]} />
      <div className="min-h-screen pb-16 md:pb-0">
        <FaqsHero />
        <FAQ
          items={SITE_FAQS}
          eyebrow="Help Center"
          title="Everything You Need to Know"
          subtitle="Admissions, academics, scholarships, campus timings, and more."
          id="faqs"
        />
        <div className="pb-12 flex flex-wrap justify-center gap-3 px-4">
          <Link
            href="/admission"
            className="inline-flex min-h-[48px] items-center px-6 rounded-xl bg-accent-500 text-secondary-900 font-bold hover:bg-accent-400"
          >
            Apply for Admission
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center px-6 rounded-xl border border-primary-200 bg-white font-semibold text-primary-800 hover:bg-primary-50"
          >
            Still have questions?
          </Link>
        </div>
      </div>
    </>
  )
}
