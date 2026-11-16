import RegisterForm from '@/components/auth/RegisterForm'
import { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Register',
  description:
    'Create a Pak Wattan School & College of Sciences account for students, parents, or staff.',
  path: '/register',
  indexable: false,
})

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100svh-7.25rem)] sm:min-h-[calc(100svh-7.5rem)] bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-x-hidden">
      <RegisterForm />
    </div>
  )
}
