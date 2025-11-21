'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Plus, Search, Loader2, AlertCircle, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { getGuardians, Guardian, deleteGuardian } from '@/lib/api/guardians'
import { getUserRoles } from '@/lib/api/auth'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

export default function GuardiansPage() {
  const router = useRouter()
  const [guardians, setGuardians] = useState<Guardian[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredGuardians, setFilteredGuardians] = useState<Guardian[]>([])
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
    loadGuardians()
  }, [canManage, router])

  useEffect(() => {
    filterGuardians()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, guardians])

  const loadGuardians = async () => {
    try {
      setLoading(true)
      const data = await getGuardians()
      setGuardians(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load guardians. Please refresh the page and try again.')
    } finally {
      setLoading(false)
    }
  }

  const filterGuardians = () => {
    if (!searchTerm.trim()) {
      setFilteredGuardians(guardians)
      return
    }

    const term = searchTerm.toLowerCase()
    const filtered = guardians.filter(
      (g) =>
        g.fullName.toLowerCase().includes(term) ||
        g.email.toLowerCase().includes(term) ||
        g.phone.toLowerCase().includes(term) ||
        g.relation.toLowerCase().includes(term)
    )
    setFilteredGuardians(filtered)
  }

  const handleDelete = (id: number) => {
    const guardian = guardians.find(g => g.id === id)
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
          await deleteGuardian(id)
          await loadGuardians()
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unable to delete guardian. Please try again.')
        }
      },
    })
  }

  if (!canManage) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Guardians</h1>
          <p className="text-gray-600 mt-1">Manage student guardians and parents</p>
        </div>
        <Link
          href="/dashboard/guardians/create"
          className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>Create Guardian</span>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search guardians by name, email, phone, or relation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      )}

      {/* Guardians Grid */}
      {!loading && !error && (
        <>
          {filteredGuardians.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No guardians found</h3>
              <p className="text-gray-600 mb-6">
                {guardians.length === 0
                  ? 'Get started by creating your first guardian.'
                  : 'Try adjusting your search criteria.'}
              </p>
              {guardians.length === 0 && (
                <Link
                  href="/dashboard/guardians/create"
                  className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Create First Guardian</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuardians.map((guardian) => (
                <div
                  key={guardian.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{guardian.fullName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{guardian.relation}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        guardian.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {guardian.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Email:</span> {guardian.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {guardian.phone}
                    </p>
                    {guardian.whatsApp && (
                      <p>
                        <span className="font-medium">WhatsApp:</span> {guardian.whatsApp}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Students:</span>{' '}
                      <span className="text-primary-600 font-semibold">{guardian.studentCount}</span>
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center space-x-2">
                    <Link
                      href={`/dashboard/guardians/${guardian.id}`}
                      className="flex-1 text-center px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(guardian.id)}
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={guardian.studentCount > 0}
                      title={guardian.studentCount > 0 ? 'Cannot delete guardian with linked students' : 'Delete guardian'}
                    >
                      Delete
                    </button>
                  </div>
                  {guardian.studentCount > 0 && (
                    <p className="mt-2 text-xs text-amber-600 text-center">
                      {guardian.studentCount} {guardian.studentCount === 1 ? 'student' : 'students'} linked
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
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
          isLoading={false}
        />
      )}
    </div>
  )
}

