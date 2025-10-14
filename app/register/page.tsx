import RegisterForm from '@/components/auth/RegisterForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register - Pak Wattan School & College of Sciences',
  description: 'Create your account at Pak Wattan School & College of Sciences. Register as a student, parent, or staff member.',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <RegisterForm />
    </div>
  )
}
