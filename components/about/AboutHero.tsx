'use client'

import PageHero from '@/components/ui/PageHero'

const AboutHero = () => {
  return (
    <PageHero
      title="Who we are"
      description="Quality education with affordable expenses since 2 November 2020 — home of Pakians in Havelian."
      imageSrc="/images/about-us/Picture1.jpg"
      imageAlt="Pak Wattan School & College of Sciences campus"
      primaryCta={{
        label: 'Our Story',
        href: '#history',
        ariaLabel: 'Explore school history',
      }}
      secondaryCta={{
        label: 'Apply Now',
        href: '/admission',
      }}
    />
  )
}

export default AboutHero
