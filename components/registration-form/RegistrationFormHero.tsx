'use client'

import PageHero from '@/components/ui/PageHero'

const RegistrationFormHero = () => {
  return (
    <PageHero
      title="Student registration"
      description="Begin your educational journey at Pak Wattan — complete the registration form to start the admission process."
      imageSrc="/images/registration/registration-hero.jpg"
      imageAlt="Families registering students at Pak Wattan"
      primaryCta={{
        label: 'Start Registration',
        href: '#registration-form',
        ariaLabel: 'Scroll to registration form',
      }}
      secondaryCta={{
        label: 'Admission Info',
        href: '/admission',
      }}
    />
  )
}

export default RegistrationFormHero
