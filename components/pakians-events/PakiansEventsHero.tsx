'use client'

import PageHero from '@/components/ui/PageHero'

export default function PakiansEventsHero() {
  return (
    <PageHero
      title="Academic & co-curricular exposure"
      description="Conferences, competitions, summits, and leadership forums — where Pakians learn, compete, and grow beyond the classroom."
      imageSrc="/images/pakians-events/umeed-youth-summit-1.png"
      imageAlt="Pak Wattan students at a youth summit event"
      primaryCta={{
        label: 'Browse Events',
        href: '#pakians-events',
        ariaLabel: 'Scroll to featured events',
      }}
      secondaryCta={{
        label: 'Apply Now',
        href: '/admission',
      }}
    />
  )
}
