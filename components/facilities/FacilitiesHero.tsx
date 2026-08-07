'use client'

import PageHero from '@/components/ui/PageHero'

const FacilitiesHero = () => {
  return (
    <PageHero
      title="Modern facilities for focused learning"
      description="Secure campuses with labs, smart boards, sports, medical support, and spaces built for academic excellence."
      imageSrc="/images/about-us/Picture4.jpg"
      imageAlt="Pak Wattan School campus facilities"
      primaryCta={{
        label: 'Explore Facilities',
        href: '#medical',
        ariaLabel: 'Browse campus facilities',
      }}
      secondaryCta={{
        label: 'Apply Now',
        href: '/admission',
      }}
    />
  )
}

export default FacilitiesHero
