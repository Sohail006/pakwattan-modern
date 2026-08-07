'use client'

import PageHero from '@/components/ui/PageHero'

const FacultyHero = () => {
  return (
    <PageHero
      title="Faculty dedicated to student success"
      description="Experienced mentors focused on board excellence, character, and every learner's potential."
      imageSrc="/images/about-us/Picture3.png"
      imageAlt="Pak Wattan faculty and academic mentoring"
      primaryCta={{
        label: 'Apply for Admission',
        href: '/admission',
      }}
      secondaryCta={{
        label: 'Careers / Jobs',
        href: '/jobs',
      }}
    />
  )
}

export default FacultyHero
