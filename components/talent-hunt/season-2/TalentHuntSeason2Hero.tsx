'use client'

import PageHero from '@/components/ui/PageHero'

const TalentHuntSeason2Hero = () => {
  return (
    <PageHero
      title="Talent Hunt Season II — 2025–26"
      description="District-level expansion with ten contest streams — more young learners competing, creating, and shining."
      imageSrc="/images/talent-hunt/season-2-hero.jpg"
      imageAlt="Talent Hunt Season II district-level competition"
      primaryCta={{
        label: 'View Contests',
        href: '#contests',
        ariaLabel: 'Browse Season II contest streams',
      }}
      secondaryCta={{
        label: 'Register for Season 3',
        href: '/talent-hunt/season-3#register',
      }}
    />
  )
}

export default TalentHuntSeason2Hero
