'use client'

import PageHero from '@/components/ui/PageHero'

const UmrahTicketsHero = () => {
  return (
    <PageHero
      title="Umrah tickets — student recognition"
      description="Celebrating top SSC and HSSC achievers with Umrah tickets as a mark of pride and gratitude."
      imageSrc="/images/achievements/Ummrah.jpeg"
      imageAlt="Pak Wattan Umrah ticket recipients"
      primaryCta={{
        label: 'View Recipients',
        href: '#umrah-recipients',
      }}
      secondaryCta={{
        label: 'All Awards',
        href: '/awards',
      }}
    />
  )
}

export default UmrahTicketsHero
