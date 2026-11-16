import LoginForm from '@/components/auth/LoginForm'
import { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Login',
  description:
    'Secure login for Pak Wattan School & College of Sciences accounts using username/email and password.',
  path: '/login',
  indexable: false,
})

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100svh-7.25rem)] sm:min-h-[calc(100svh-7.5rem)] bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-x-hidden">
      <LoginForm />
    </div>
  )
}
