'use client'

import PageHero from '@/components/ui/PageHero'

const YearlyAcademicScheduleHero = () => {
  return (
    <PageHero
      title="Yearly academic schedule — 2025–26"
      description="Important dates, examinations, holidays, and special events for the full academic session."
      imageSrc="/images/academic-schedule/schedule-hero.jpg"
      imageAlt="Pak Wattan yearly academic calendar"
      primaryCta={{
        label: 'View Schedule',
        href: '#academic-calendar',
      }}
      secondaryCta={{
        label: 'School Life',
        href: '/school-life',
      }}
    />
  )
}

export default YearlyAcademicScheduleHero
