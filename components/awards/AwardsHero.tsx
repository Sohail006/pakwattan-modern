'use client'

import PageHero from '@/components/ui/PageHero'

const AwardsHero = () => {
  return (
    <PageHero
      title="Awards & recognition"
      description="Celebrating excellence in academics, leadership, and service — the achievements that define Pakians."
      imageSrc="/images/achievements/TopPositionsInHSSCandSSC.jpg"
      imageAlt="Pak Wattan students receiving awards for board excellence"
      primaryCta={{
        label: 'View Awards Gallery',
        href: '#awards-gallery',
        ariaLabel: 'Browse awards gallery',
      }}
      secondaryCta={{
        label: 'Photo Gallery',
        href: '/photo-gallery',
      }}
    />
  )
}

export default AwardsHero
