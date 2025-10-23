'use client'

import { useState } from 'react'
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful password reset request
      setIsSubmitted(true)
      
    } catch {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> The email may take a few minutes to arrive. 
              Please check your spam folder if you don't see it in your inbox.
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors inline-block"
            >
              Back to Login
            </Link>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setEmail('')
              }}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Try Different Email
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Forgot Password Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
            <p className="text-gray-600">No worries! Enter your email and we'll send you a reset link.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-accent-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending Reset Link...</span>
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>

        {/* Right Side - Information */}
        <div className="hidden lg:block">
          <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/images/logo/logo_150x150.png"
                  alt="Pak Wattan School Logo"
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
              </div>
              <h2 className="text-3xl font-bold mb-4">Password Recovery</h2>
              <p className="text-white/90 text-lg">Pak Wattan School & College of Sciences</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Verification</h3>
                  <p className="text-white/80 text-sm">We'll send a secure reset link to your registered email</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure Process</h3>
                  <p className="text-white/80 text-sm">Your password reset is encrypted and secure</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Quick Recovery</h3>
                  <p className="text-white/80 text-sm">Reset your password in just a few minutes</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-xl">
              <h4 className="font-semibold mb-2">Need Help?</h4>
              <p className="text-white/80 text-sm mb-3">
                If you're having trouble accessing your account, contact our support team
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <span>📧</span>
                <span>support@pakwattan.edu.pk</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span>📞</span>
                <span>+92-XXX-XXXXXXX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
