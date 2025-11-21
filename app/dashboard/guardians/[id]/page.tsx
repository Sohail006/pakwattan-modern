'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Edit, Trash2, Users, Mail, Phone, MapPin, Briefcase, CreditCard, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { getGuardianById, Guardian, deleteGuardian, getGuardianStudents, StudentBasic } from '@/lib/api/guardians'
import { getUserRoles } from '@/lib/api/auth'
import GuardianForm from '@/components/guardians/GuardianForm'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

export default function GuardianDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = parseInt(params.id as string)

  const [guardian, setGuardian] = useState<Guardian | null>(null)
  const [students, setStudents] = useState<StudentBasic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    type: 'danger' | 'warning' | 'info'
    title: string
    message: string
    confirmText: string
    onConfirm: () => void
  } | null>(null)

  const userRoles = getUserRoles()
  const canManage = userRoles.includes('Admin') || userRoles.includes('Staff')

  useEffect(() => {
    if (!canManage) {
      router.push('/dashboard')
      return
    }
    loadGuardian()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, canManage, router])

  const loadGuardian = async () => {
    try {
      setLoading(true)
      const [guardianData, studentsData] = await Promise.all([
        getGuardianById(id),
        getGuardianStudents(id).catch(() => []) // Don't fail if students endpoint fails
      ])
      setGuardian(guardianData)
      setStudents(studentsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load guardian information. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = () => {
    const guardianName = guardian ? guardian.fullName : 'this guardian'
    
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Delete Guardian',
      message: `Are you sure you want to permanently delete ${guardianName}? This action cannot be undone and all associated data will be lost.`,
      confirmText: 'Delete',
      onConfirm: async () => {
        setConfirmDialog(null)
        try {
          setDeleting(true)
          await deleteGuardian(id)
          router.push('/dashboard/guardians')
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unable to delete guardian. Please try again.')
          setDeleting(false)
        }
      },
    })
  }

  const handleEditSuccess = () => {
    setShowEditForm(false)
    loadGuardian()
  }

  if (!canManage) {
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      </div>
    )
  }

  if (error || !guardian) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold text-red-900">Error</h3>
            <p className="text-red-700">{error || 'Guardian not found'}</p>
          </div>
        </div>
        <Link
          href="/dashboard/guardians"
          className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Guardians
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/guardians"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{guardian.fullName}</h1>
            <p className="text-gray-600 mt-1">Guardian Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowEditForm(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center space-x-4">
        <span
          className={`px-4 py-2 text-sm font-medium rounded-full ${
            guardian.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {guardian.isActive ? 'Active' : 'Inactive'}
        </span>
        <span className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
          {guardian.relation}
        </span>
      </div>

      {/* Guardian Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-gray-900">{guardian.fullName}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email (Username)</p>
                <p className="text-gray-900">{guardian.email}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-gray-900">{guardian.phone}</p>
              </div>
            </div>
            {guardian.whatsApp && (
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">WhatsApp</p>
                  <p className="text-gray-900">{guardian.whatsApp}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
          <div className="space-y-4">
            {guardian.cnic && (
              <div className="flex items-start space-x-3">
                <CreditCard className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">CNIC</p>
                  <p className="text-gray-900">{guardian.cnic}</p>
                </div>
              </div>
            )}
            {guardian.occupation && (
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Occupation</p>
                  <p className="text-gray-900">{guardian.occupation}</p>
                </div>
              </div>
            )}
            {guardian.address && (
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-gray-900">{guardian.address}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Linked Students */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Linked Students</h2>
          <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
            {students.length} {students.length === 1 ? 'Student' : 'Students'}
          </span>
        </div>
        {students.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p>No students linked to this guardian</p>
            <p className="text-sm mt-1">Link students when creating or editing them</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <Link
                key={student.id}
                href={`/dashboard/students/${student.id}`}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{student.email}</p>
                  </div>
                </div>
                {student.phone && (
                  <p className="text-sm text-gray-600 flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{student.phone}</span>
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <GuardianForm
          guardian={guardian}
          mode="edit"
          onClose={() => setShowEditForm(false)}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* Confirmation Dialog */}
      {confirmDialog && (
        <ConfirmationDialog
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog(null)}
          onConfirm={confirmDialog.onConfirm}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          cancelText="Cancel"
          type={confirmDialog.type}
          isLoading={deleting}
        />
      )}
    </div>
  )
}

