'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, User, Shield, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import FormField from '@/components/ui/FormField'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [success, setSuccess] = useState(false)

  const userTypes = [
    { value: 'student', label: 'Student', icon: '🎓', description: 'Access your academic records and assignments' },
    { value: 'parent', label: 'Parent', icon: '👨‍👩‍👧‍👦', description: 'Monitor your child\'s progress and activities' },
    { value: 'teacher', label: 'Teacher', icon: '👨‍🏫', description: 'Manage classes, grades, and student information' },
    { value: 'staff', label: 'Administration Staff', icon: '👨‍💼', description: 'Access administrative portal' },
    { value: 'admin', label: 'Administrator', icon: '⚙️', description: 'Full system access and management' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
      // Import dynamically to avoid SSR issues
      const { login } = await import('@/lib/api/auth')
      
      // Debug: Log what we're sending
      if (process.env.NODE_ENV === 'development') {
        console.log('Login form - userType selected:', formData.userType)
      }
      
      const response = await login({
        email: formData.email,
        password: formData.password,
        userType: formData.userType, // Send userType to API for validation
      })
      
      // Debug: Log response
      if (process.env.NODE_ENV === 'development') {
        console.log('Login response - user roles:', response.user.roles)
      }
      
      // Additional frontend validation (backup to backend validation)
      const userRoles = response.user.roles.map(r => r.toLowerCase()) || []
      const selectedRole = formData.userType.toLowerCase()
      
      // Normalize role names for comparison
      const roleMap: Record<string, string> = {
        'admin': 'admin',
        'administrator': 'admin',
        'staff': 'staff',
        'teacher': 'teacher',
        'student': 'student',
        'parent': 'parent',
      }
      
      const normalizedSelectedRole = roleMap[selectedRole] || selectedRole
      const normalizedUserRoles = userRoles.map(role => roleMap[role] || role)
      
      // Check if user has the selected role (handles multiple roles)
      const hasMatchingRole = normalizedUserRoles.includes(normalizedSelectedRole)
      
      // Validate role match (double-check even if backend validated)
      if (userRoles.length > 0 && !hasMatchingRole) {
        // Logout immediately if role mismatch
        const { logout } = await import('@/lib/api/auth')
        logout()
        
        const primaryRole = response.user.roles[0] || 'Unknown'
        const roleMessage = userRoles.length > 1 
          ? `Your account has roles: ${response.user.roles.join(', ')}`
          : `Your account is "${primaryRole}"`
        
        setErrors({
          general: `You selected "${formData.userType}" but ${roleMessage}. Please select the correct role or use different credentials.`
        })
        setIsLoading(false)
        return
      }
      
      // Login successful
      setSuccess(true)
      setTimeout(() => {
        // Redirect based on user role (use first role or selected role as fallback)
        const redirectRole = response.user.roles[0]?.toLowerCase() || formData.userType.toLowerCase()
        window.location.href = `/dashboard/${redirectRole}`
      }, 1500)
      
    } catch (error: unknown) {
      // Debug: Log error details
      if (process.env.NODE_ENV === 'development') {
        console.error('Login error caught:', error)
      }
      
      const message = error instanceof Error ? error.message : 'Login failed. Please check your credentials and try again.'
      setErrors({ general: message })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
        <div className="max-w-md w-full bg-white rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Login Successful!</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Redirecting to your dashboard...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Left Side - Login Form - Mobile Optimized */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 xl:p-12">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-sm sm:text-base text-gray-600">Sign in to your account to continue</p>
          </div>

          {errors.general && (
            <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg flex items-start space-x-2 sm:space-x-3 ${
              errors.general.includes('You selected') || errors.general.includes('but your account is')
                ? 'bg-amber-50 border border-amber-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <AlertCircle className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 ${
                errors.general.includes('You selected') || errors.general.includes('but your account is')
                  ? 'text-amber-600'
                  : 'text-red-500'
              }`} />
              <p className={`text-xs sm:text-sm ${
                errors.general.includes('You selected') || errors.general.includes('but your account is')
                  ? 'text-amber-800'
                  : 'text-red-700'
              }`}>{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* User Type Selection - Mobile Optimized */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {userTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`relative flex items-center p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 touch-target focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 ${
                      formData.userType === type.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type.value}
                      checked={formData.userType === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-2 sm:space-x-3 w-full">
                      <span className="text-lg sm:text-2xl flex-shrink-0">{type.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs sm:text-sm">{type.label}</div>
                        <div className="text-xs text-gray-500 hidden sm:block">{type.description}</div>
                      </div>
                    </div>
                    {formData.userType === type.value && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Email Field - Mobile Optimized */}
            <FormField label="Email Address" required error={errors.email} htmlFor="email">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
            </FormField>

            {/* Password Field - Mobile Optimized */}
            <FormField label="Password" required error={errors.password} htmlFor="password">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 touch-target focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-all duration-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                </button>
              </div>
            </FormField>

            {/* Remember Me & Forgot Password - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <label className="flex items-center touch-target">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 border-gray-300 rounded transition-all duration-200"
                  aria-label="Remember me"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-700">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium touch-target"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button - Mobile Optimized */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 sm:py-3 px-4 rounded-lg sm:rounded-xl font-semibold hover:from-primary-700 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-target text-sm sm:text-base shadow-md hover:shadow-lg"
              aria-label={isLoading ? 'Signing in...' : 'Sign in'}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link - Mobile Optimized */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary-600 hover:text-primary-700 font-semibold touch-target">
                Create one here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - School Information - Mobile Responsive */}
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
              <h2 className="text-2xl xl:text-3xl font-bold mb-3 xl:mb-4">Pak Wattan School & College of Sciences</h2>
              <p className="text-white/90 text-base xl:text-lg">Havelian, Pakistan</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Student Portal</h3>
                  <p className="text-white/80 text-sm">Access your academic records, assignments, and grades</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Secure Access</h3>
                  <p className="text-white/80 text-sm">Your data is protected with enterprise-grade security</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
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

export default LoginForm
