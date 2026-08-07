'use client'

import PageHero from '@/components/ui/PageHero'
import { TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'

const TalentHuntHero = () => {
  return (
    <PageHero
      title="Talent Hunt with Pak Wattan"
      description={`${TALENT_HUNT_SEASON3_TITLE} — a district-wide stage for literary, scientific, entrepreneurial, and sports talent.`}
      imageSrc="/images/talent-hunt/Talenthunt3fliyer.webp"
      imageAlt="Pak Wattan Talent Hunt Season 3 promotional flyer"
      primaryCta={{
        label: 'Register Now',
        href: '/talent-hunt/season-3#register',
      }}
      secondaryCta={{
        label: 'Season 3 Details',
        href: '/talent-hunt/season-3',
      }}
    />
  )
}

export default TalentHuntHero
