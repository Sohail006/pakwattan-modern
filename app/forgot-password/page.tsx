import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Forgot Password',
  description:
    'Reset your Pak Wattan School & College of Sciences account password securely.',
  path: '/forgot-password',
  indexable: false,
})

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <ForgotPasswordForm />
    </div>
  )
}
