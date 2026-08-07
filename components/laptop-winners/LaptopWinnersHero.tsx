'use client'

import PageHero from '@/components/ui/PageHero'

const LaptopWinnersHero = () => {
  return (
    <PageHero
      title="Laptop winners"
      description="Digital empowerment for outstanding students — recognizing exceptional academic performance with laptop awards."
      imageSrc="/images/achievements/Laptop.jpeg"
      imageAlt="Pak Wattan students receiving laptop awards"
      primaryCta={{
        label: 'View Recipients',
        href: '#laptop-recipients',
      }}
      secondaryCta={{
        label: 'All Awards',
        href: '/awards',
      }}
    />
  )
}

export default LaptopWinnersHero
