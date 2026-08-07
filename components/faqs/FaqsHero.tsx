'use client'

import PageHero from '@/components/ui/PageHero'

const FaqsHero = () => {
  return (
    <PageHero
      title="Frequently asked questions"
      description="Quick answers about admissions, scholarships, campus timings, WhatsApp contact, and student life in Havelian."
      imageSrc="/images/about-us/Picture7.jpg"
      imageAlt="Parents and students visiting Pak Wattan campus"
      primaryCta={{
        label: 'Browse FAQs',
        href: '#faqs',
      }}
      secondaryCta={{
        label: 'Contact Us',
        href: '/contact',
      }}
    />
  )
}

export default FaqsHero
