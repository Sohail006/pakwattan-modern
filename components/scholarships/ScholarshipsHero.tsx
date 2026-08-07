'use client'

import PageHero from '@/components/ui/PageHero'

const ScholarshipsHero = () => {
  return (
    <PageHero
      title="Scholarships that open doors"
      description="Merit, need-based, and special-category support — including our 15 lacs scholarship program for deserving Pakians."
      imageSrc="/images/achievements/Scholarship.jpeg"
      imageAlt="Pak Wattan students receiving scholarship recognition"
      primaryCta={{
        label: 'Apply for Admission',
        href: '/admission',
        ariaLabel: 'Go to online admission application',
      }}
      secondaryCta={{
        label: 'How to Apply',
        href: '#scholarship-process',
        ariaLabel: 'See scholarship application process',
      }}
    />
  )
}

export default ScholarshipsHero
