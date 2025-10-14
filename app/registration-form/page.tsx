import RegistrationFormHero from '@/components/registration-form/RegistrationFormHero'
import RegistrationFormDetails from '@/components/registration-form/RegistrationFormDetails'
import RegistrationFormForm from '@/components/registration-form/RegistrationFormForm'

export default function RegistrationForm() {
  return (
    <div className="min-h-screen">
      <RegistrationFormHero />
      <RegistrationFormDetails />
      <RegistrationFormForm />
    </div>
  )
}
