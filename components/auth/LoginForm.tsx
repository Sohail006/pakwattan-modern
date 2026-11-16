'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, User, Shield, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import FormField from '@/components/ui/FormField'
import ITSupportContact from '@/components/shared/ITSupportContact'
import { pickDashboardPath } from '@/lib/roles'

const inputBase =
  'w-full min-w-0 max-w-full pl-10 pr-4 py-3 text-base border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-[48px]'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Username or email is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      const { login } = await import('@/lib/api/auth')

      const response = await login({
        email: formData.email.trim(),
        password: formData.password,
      })

      setSuccess(true)
      setTimeout(() => {
        window.location.href = pickDashboardPath(response.user.roles ?? [])
      }, 1200)
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Login failed. Please verify your username/email and password, then try again.'
      setErrors({ general: message })
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex items-start sm:items-center justify-center px-3 py-6 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
          <div className="w-14 h-14 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Login Successful!</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Redirecting to your dashboard...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-hidden px-3 py-4 sm:px-4 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start lg:items-center">
        <div className="bg-white rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 xl:p-12 w-full min-w-0">
          <div className="text-center mb-5 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-sm sm:text-base text-gray-600 leading-snug px-1">
              Sign in with your username or email and password
            </p>
          </div>

          {errors.general && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl flex items-start gap-2 sm:gap-3 bg-red-50 border border-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
              <p className="text-sm text-red-700 break-words">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <FormField label="Username or Email" required error={errors.email} htmlFor="email">
              <div className="relative min-w-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="username"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`${inputBase} ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter username or email"
                />
              </div>
            </FormField>

            <FormField label="Password" required error={errors.password} htmlFor="password">
              <div className="relative min-w-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={`${inputBase} pr-12 ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-all duration-200 min-w-[44px] justify-center"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </FormField>

            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
              <label className="flex items-center touch-target min-h-[44px]">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 border-gray-300 rounded transition-all duration-200"
                  aria-label="Remember me"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium touch-target min-h-[44px] inline-flex items-center"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3.5 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-target text-base shadow-md hover:shadow-lg min-h-[52px]"
              aria-label={isLoading ? 'Signing in...' : 'Sign in'}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-5 sm:mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-primary-600 hover:text-primary-700 font-semibold touch-target"
              >
                Create one here
              </Link>
            </p>
          </div>

          {/* Compact help block for phones (full panel is desktop-only) */}
          <div className="mt-5 lg:hidden rounded-xl border border-primary-100 bg-primary-50/60 p-3.5 text-left">
            <p className="text-sm font-semibold text-primary-900 mb-1">Need help signing in?</p>
            <p className="text-xs text-primary-800/80 mb-2 leading-snug">
              Contact IT support if you forgot your credentials or cannot access your account.
            </p>
            <ITSupportContact
              displayFormat="stacked"
              className="text-primary-900 text-sm"
              fallbackEmail="support@pakwattan.edu.pk"
              fallbackPhone="+92-XXX-XXXXXXX"
            />
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-6 xl:p-8 text-white">
            <div className="text-center mb-6 xl:mb-8">
              <div className="w-16 h-16 xl:w-20 xl:h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 xl:mb-6">
                <Image
                  src="/images/logo/logo_150x150.png"
                  alt="Pak Wattan School Logo"
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
              </div>
              <h2 className="text-2xl xl:text-3xl font-bold mb-3 xl:mb-4">
                Pak Wattan School & College of Sciences
              </h2>
              <p className="text-white/90 text-base xl:text-lg">Havelian, Pakistan</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg">One Login for All</h3>
                  <p className="text-white/80 text-sm">
                    Students, parents, teachers, and staff sign in with the same form
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg">Secure Access</h3>
                  <p className="text-white/80 text-sm">
                    Your role is applied automatically after successful login
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl" aria-hidden>
                    📱
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg">Mobile Friendly</h3>
                  <p className="text-white/80 text-sm">Access your account from any device, anywhere</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-xl">
              <h4 className="font-semibold mb-2">Need Help?</h4>
              <p className="text-white/80 text-sm mb-3">
                Contact our IT support team for assistance with your account
              </p>
              <ITSupportContact
                displayFormat="stacked"
                className="text-white/90"
                fallbackEmail="support@pakwattan.edu.pk"
                fallbackPhone="+92-XXX-XXXXXXX"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
