'use client'

import PageHero from '@/components/ui/PageHero'

const GoldMedalsHero = () => {
  return (
    <PageHero
      title="Gold medals"
      description="Honoring Pakians who define academic excellence through dedication, discipline, and outstanding board performance."
      imageSrc="/images/achievements/Gold Medals.jpeg"
      imageAlt="Pak Wattan gold medal recipients"
      primaryCta={{
        label: 'View Recipients',
        href: '#gold-medal-recipients',
      }}
      secondaryCta={{
        label: 'All Awards',
        href: '/awards',
      }}
    />
  )
}

export default GoldMedalsHero
