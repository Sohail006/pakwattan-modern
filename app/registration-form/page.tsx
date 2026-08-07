import { Metadata } from 'next'
import StudentRegistrationForm from '@/components/registration-form/StudentRegistrationForm'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Student Registration Form',
  description:
    'Register online for Pak Wattan School & College of Sciences programs in Havelian. Submit the student registration form for admissions and Talent Hunt participation.',
  keywords:
    'Pak Wattan registration, student registration form Havelian, school admission form, Talent Hunt registration',
  path: '/registration-form',
})

export default function RegistrationForm() {
  return <StudentRegistrationForm />
}
