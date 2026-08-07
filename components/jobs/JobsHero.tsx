'use client'

import PageHero from '@/components/ui/PageHero'

const JobsHero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('job-application-form')
    if (!formElement) return
    const offset = 100
    const top = formElement.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <PageHero
      title="Careers for Academic Session 2026–27"
      description="Join a teaching team committed to board excellence, character, and every learner’s potential in Havelian."
      imageSrc="/images/about-us/Picture2.jpg"
      imageAlt="Pak Wattan School campus educators and campus environment"
      primaryCta={{
        label: 'Apply Now',
        onClick: scrollToForm,
        ariaLabel: 'Scroll to job application form',
      }}
      secondaryCta={{
        label: 'Faculty Registration',
        href: '/pakians-faculty-registration',
      }}
    />
  )
}

export default JobsHero
