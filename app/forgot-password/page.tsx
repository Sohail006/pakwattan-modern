import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forgot Password - Pak Wattan School & College of Sciences',
  description: 'Reset your password for your Pak Wattan School account. Secure password recovery process.',
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <ForgotPasswordForm />
    </div>
  )
}
