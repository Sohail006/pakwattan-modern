'use client'

import PageHero from '@/components/ui/PageHero'

const SchoolLifeHero = () => {
  return (
    <PageHero
      title="Student life beyond the classroom"
      description="A vibrant community of scholars — activities, schedules, and values that shape confident, caring Pakians."
      imageSrc="/images/annual-ceremony/6.jpg"
      imageAlt="Students participating in school life at Pak Wattan"
      primaryCta={{
        label: 'Explore Activities',
        href: '#school-activities',
        ariaLabel: 'Browse school activities',
      }}
      secondaryCta={{
        label: 'Academic Schedule',
        href: '#academic-schedule',
        ariaLabel: 'View academic schedule',
      }}
    />
  )
}

export default SchoolLifeHero
