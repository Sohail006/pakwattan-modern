'use client'

import PageHero from '@/components/ui/PageHero'

const AdmissionHero = () => {
  const scrollToForm = () => {
    const nameField = document.getElementById('name')
    if (!nameField) return
    const offset = 120
    const top = nameField.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top, behavior: 'smooth' })
    setTimeout(() => nameField.focus(), 500)
  }

  const scrollToProcess = () => {
    document.getElementById('admission-process')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <PageHero
      title="Admissions open for Academic Year 2026–27"
      description="Quality education with affordable expenses — join Montessori through FSc at our Havelian campuses."
      imageSrc="/images/annual-ceremony/5.jpg"
      imageAlt="Pak Wattan annual ceremony celebrating students and faculty"
      primaryCta={{
        label: 'Apply Now',
        onClick: scrollToForm,
        ariaLabel: 'Scroll to admission form',
      }}
      secondaryCta={{
        label: 'Admission Process',
        onClick: scrollToProcess,
        ariaLabel: 'Learn about the admission process',
      }}
    />
  )
}

export default AdmissionHero
