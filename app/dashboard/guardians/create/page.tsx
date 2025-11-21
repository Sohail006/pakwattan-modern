'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import GuardianForm from '@/components/guardians/GuardianForm'
import { getUserRoles } from '@/lib/api/auth'

export default function CreateGuardianPage() {
  const router = useRouter()
  const [success, setSuccess] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const userRoles = getUserRoles()
  const canCreate = userRoles.includes('Admin') || userRoles.includes('Staff')

  if (!canCreate) {
    router.push('/dashboard')
    return null
  }

  const handleSuccess = () => {
    setSuccess(true)
    setShowForm(false)
    setTimeout(() => {
      router.push('/dashboard/guardians')
    }, 2000)
  }

  const handleClose = () => {
    router.push('/dashboard/guardians')
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Guardian Created Successfully!</h2>
          <p className="text-gray-600 mb-6">Redirecting to guardians list...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard/guardians"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create New Guardian</h1>
          <p className="text-gray-600 mt-1">Add a new guardian to the system</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Important Information:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Guardian email will be used as username for login</li>
            <li>Only blood relations are supported (Father, Mother, Brother, Sister, Guardian)</li>
            <li>Guardian can be linked to students during creation or later</li>
            <li>Guardian account will be created with Parent role automatically</li>
          </ul>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <GuardianForm
            mode="create"
            onClose={handleClose}
            onSuccess={handleSuccess}
          />
        </div>
      )}
    </div>
  )
}

