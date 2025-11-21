'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Users, CheckCircle, XCircle, Search, UserPlus, Edit, Trash2, X, Mail } from 'lucide-react'
import { 
  getUsers, 
  activateUser, 
  deactivateUser, 
  deleteUser, 
  updateUser,
  type User 
} from '@/lib/api/users'
import { getUserRoles } from '@/lib/api/auth'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [editingTeacher, setEditingTeacher] = useState<User | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    type: 'danger' | 'warning' | 'info'
    title: string
    message: string
    confirmText: string
    onConfirm: () => void
  } | null>(null)

  // Scroll indicator states
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)
  const tableScrollRef = useRef<HTMLDivElement>(null)

  const currentUserRoles = getUserRoles()
  const isAdmin = currentUserRoles.includes('Admin')

  const loadTeachers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const allUsers = await getUsers()
      // Filter only users with Teacher role
      const teacherUsers = allUsers.filter(user => user.roles.includes('Teacher'))
      setTeachers(teacherUsers)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load teachers. Please refresh the page and try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTeachers()
  }, [loadTeachers])

  // Handle scroll indicators
  useEffect(() => {
    const handleScroll = () => {
      if (!tableScrollRef.current) return
      
      const { scrollLeft, scrollWidth, clientWidth } = tableScrollRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1)
    }

    const scrollContainer = tableScrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll()
      
      window.addEventListener('resize', handleScroll)
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [teachers.length])

  const handleActivate = async (userId: string) => {
    try {
      setActionLoading(userId)
      setError(null)
      await activateUser(userId)
      setSuccess('Teacher activated successfully')
      await loadTeachers()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to activate teacher account. Please try again.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeactivate = (userId: string) => {
    const teacher = teachers.find(t => t.id === userId)
    const teacherName = teacher ? `${teacher.firstName} ${teacher.lastName}` : 'this teacher'
    
    setConfirmDialog({
      isOpen: true,
      type: 'warning',
      title: 'Deactivate Teacher',
      message: `Are you sure you want to deactivate ${teacherName}? The teacher will not be able to access their account until reactivated.`,
      confirmText: 'Deactivate',
      onConfirm: async () => {
        setConfirmDialog(null)
        try {
          setActionLoading(userId)
          setError(null)
          await deactivateUser(userId)
          setSuccess('Teacher deactivated successfully')
          await loadTeachers()
          setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unable to deactivate teacher account. Please try again.')
        } finally {
          setActionLoading(null)
        }
      },
    })
  }

  const handleDelete = (userId: string) => {
    const teacher = teachers.find(t => t.id === userId)
    const teacherName = teacher ? `${teacher.firstName} ${teacher.lastName}` : 'this teacher'
    
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Delete Teacher',
      message: `Are you sure you want to permanently delete ${teacherName}? This action cannot be undone and all associated data will be lost.`,
      confirmText: 'Delete',
      onConfirm: async () => {
        setConfirmDialog(null)
        try {
          setActionLoading(userId)
          setError(null)
          await deleteUser(userId)
          setSuccess('Teacher deleted successfully')
          await loadTeachers()
          setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unable to delete teacher account. Please try again.')
        } finally {
          setActionLoading(null)
        }
      },
    })
  }

  const handleEdit = (teacher: User) => {
    setEditingTeacher(teacher)
  }

  const handleSaveEdit = async (teacher: User) => {
    try {
      setActionLoading(teacher.id)
      setError(null)
      await updateUser(teacher.id, {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        isActive: teacher.isActive,
      })
      setSuccess('Teacher updated successfully')
      setEditingTeacher(null)
      await loadTeachers()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update teacher information. Please check your input and try again.')
    } finally {
      setActionLoading(null)
    }
  }

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Teachers Management</h1>
          <p className="text-gray-600 mt-1">Manage teacher accounts and information</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard/users/create"
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-200 shadow-sm"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Teacher</span>
          </Link>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Search and Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search teachers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-end text-sm text-gray-600">
            <span>Total: <strong>{filteredTeachers.length}</strong> teacher{filteredTeachers.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading teachers...</p>
        </div>
      ) : filteredTeachers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            {searchTerm ? 'No teachers found matching your search.' : 'No teachers registered yet.'}
          </p>
          {!searchTerm && (
            <Link
              href="/dashboard/users/create"
              className="inline-flex items-center space-x-2 mt-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-200"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add First Teacher</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
          <div 
            ref={tableScrollRef}
            className="overflow-x-auto relative"
            style={{ scrollbarWidth: 'thin' }}
          >
            {/* Left scroll indicator */}
            {showLeftScroll && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-20" />
            )}
            
            {/* Right scroll indicator */}
            {showRightScroll && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-20" />
            )}
            
            <table className="min-w-[900px] w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="sticky right-0 px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50 z-10 border-l border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {teacher.profileImageUrl ? (
                          <Image
                            src={teacher.profileImageUrl}
                            alt={`${teacher.firstName} ${teacher.lastName}`}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">
                            {teacher.firstName[0]}{teacher.lastName[0]}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {teacher.firstName} {teacher.lastName}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
                              Teacher
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {teacher.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {teacher.isActive ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700">
                          <XCircle className="w-3 h-3 mr-1" />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="sticky right-0 px-6 py-4 whitespace-nowrap text-right text-sm font-medium bg-white group-hover:bg-gray-50 z-10 border-l border-gray-200 transition-colors">
                      <div className="flex items-center justify-end space-x-2">
                        {actionLoading === teacher.id ? (
                          <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            {!teacher.isActive ? (
                              <button
                                onClick={() => handleActivate(teacher.id)}
                                className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition-colors"
                                title="Activate teacher"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleDeactivate(teacher.id)}
                                className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                title="Deactivate teacher"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            )}
                            {isAdmin && (
                              <>
                                <button
                                  onClick={() => handleEdit(teacher)}
                                  className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                  title="Edit teacher"
                                >
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(teacher.id)}
                                  className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                  title="Delete teacher"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Teacher</h2>
              <button
                onClick={() => setEditingTeacher(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={editingTeacher.firstName}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={editingTeacher.lastName}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingTeacher.email}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="editIsActive"
                  checked={editingTeacher.isActive}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, isActive: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="editIsActive" className="text-sm font-medium text-gray-700">
                  Active
                </label>
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => handleSaveEdit(editingTeacher)}
                  disabled={actionLoading === editingTeacher.id}
                  className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {actionLoading === editingTeacher.id ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setEditingTeacher(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
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
          isLoading={actionLoading !== null}
        />
      )}
    </div>
  )
}
