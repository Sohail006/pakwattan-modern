import LoginForm from '@/components/auth/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Pak Wattan School & College of Sciences',
  description: 'Login to access your account at Pak Wattan School & College of Sciences. Secure login for students, parents, and staff.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <LoginForm />
    </div>
  )
}
