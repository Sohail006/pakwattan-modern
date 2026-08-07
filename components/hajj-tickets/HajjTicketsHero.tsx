'use client'

import PageHero from '@/components/ui/PageHero'

const HajjTicketsHero = () => {
  return (
    <PageHero
      title="Hajj tickets — staff recognition"
      description="A special appreciation for staff whose dedication strengthens every Pakian's journey."
      imageSrc="/images/achievements/Hajj.jpeg"
      imageAlt="Pak Wattan staff Hajj ticket recognition"
      primaryCta={{
        label: 'View Recipients',
        href: '#hajj-recipients',
      }}
      secondaryCta={{
        label: 'Contact Us',
        href: '/contact',
      }}
    />
  )
}

export default HajjTicketsHero
