'use client'

import PageHero from '@/components/ui/PageHero'
import { TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'

const TalentHuntSeason1Hero = () => {
  return (
    <PageHero
      title="Talent Hunt Season I — 2024–25"
      description="The foundation year — talented participants from Pak Wattan who set the standard for seasons to come."
      imageSrc="/images/talent-hunt/season-1-hero.jpg"
      imageAlt="Talent Hunt Season I highlights at Pak Wattan"
      primaryCta={{
        label: 'View Results',
        href: '#results',
      }}
      secondaryCta={{
        label: TALENT_HUNT_SEASON3_TITLE,
        href: '/talent-hunt/season-3',
      }}
    />
  )
}

export default TalentHuntSeason1Hero
