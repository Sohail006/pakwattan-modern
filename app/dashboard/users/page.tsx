'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Users, CheckCircle, XCircle, Shield, Search, Filter, UserPlus, Edit, Trash2, Plus, X, Activity } from 'lucide-react'
import { 
  getUsers, 
  activateUser, 
  deactivateUser, 
  deleteUser, 
  updateUser,
  assignRole,
  removeRole,
  type User 
} from '@/lib/api/users'
import { getUserRoles } from '@/lib/api/auth'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showRoleAssignment, setShowRoleAssignment] = useState<string | null>(null)
  const [newRole, setNewRole] = useState('')
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

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getUsers()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load users. Please refresh the page and try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

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
  }, [users.length])

  const handleActivate = async (userId: string) => {
    try {
      setActionLoading(userId)
      await activateUser(userId)
      await loadUsers() // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to activate user account. Please try again.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeactivate = (userId: string) => {
    const user = users.find(u => u.id === userId)
    const userName = user ? `${user.firstName} ${user.lastName}` : 'this user'
    
    setConfirmDialog({
      isOpen: true,
      type: 'warning',
      title: 'Deactivate User',
      message: `Are you sure you want to deactivate ${userName}? The user will not be able to access their account until reactivated.`,
      confirmText: 'Deactivate',
      onConfirm: async () => {
        setConfirmDialog(null)
        try {
          setActionLoading(userId)
          setError(null)
          await deactivateUser(userId)
          setSuccess('User deactivated successfully')
          await loadUsers()
          setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unable to deactivate user account. Please try again.')
        } finally {
          setActionLoading(null)
        }
      },
    })
  }

  const handleDelete = (userId: string) => {
    const user = users.find(u => u.id === userId)
    const userName = user ? `${user.firstName} ${user.lastName}` : 'this user'
    
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Delete User',
      message: `Are you sure you want to permanently delete ${userName}? This action cannot be undone and all associated data will be lost.`,
      confirmText: 'Delete',
      onConfirm: async () => {
        setConfirmDialog(null)
        try {
          setActionLoading(userId)
          setError(null)
          await deleteUser(userId)
          setSuccess('User deleted successfully')
          await loadUsers()
          setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unable to delete user account. Please try again.')
        } finally {
          setActionLoading(null)
        }
      },
    })
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleSaveEdit = async (user: User) => {
    try {
      setActionLoading(user.id)
      setError(null)
      await updateUser(user.id, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isActive: user.isActive,
      })
      setSuccess('User updated successfully')
      setEditingUser(null)
      await loadUsers()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update user information. Please check your input and try again.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleAssignRole = async (userId: string) => {
    if (!newRole) {
      setError('Please select a role')
      return
    }

    try {
      setActionLoading(userId)
      setError(null)
      await assignRole(userId, newRole)
      setSuccess(`Role '${newRole}' assigned successfully`)
      setNewRole('')
      setShowRoleAssignment(null)
      await loadUsers()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to assign role to user. Please try again.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRemoveRole = (userId: string, role: string) => {
    const user = users.find(u => u.id === userId)
    const userName = user ? `${user.firstName} ${user.lastName}` : 'this user'
    
    setConfirmDialog({
      isOpen: true,
      type: 'warning',
      title: 'Remove Role',
      message: `Are you sure you want to remove the '${role}' role from ${userName}? The user will lose access to features associated with this role.`,
      confirmText: 'Remove Role',
      onConfirm: async () => {
        setConfirmDialog(null)
        try {
          setActionLoading(userId)
          setError(null)
          await removeRole(userId, role)
          setSuccess(`Role '${role}' removed successfully`)
          await loadUsers()
          setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unable to remove role from user. Please try again.')
        } finally {
          setActionLoading(null)
        }
      },
    })
  }

  // Get user status from API (we'll need to add IsActive to User interface)
  // For now, we'll filter based on what we can determine
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === 'all' || user.roles.includes(roleFilter)
    
    return matchesSearch && matchesRole
  })

  const roleColors: Record<string, string> = {
    Admin: 'bg-red-100 text-red-700',
    Staff: 'bg-orange-100 text-orange-700',
    Teacher: 'bg-blue-100 text-blue-700',
    Student: 'bg-green-100 text-green-700',
    Parent: 'bg-purple-100 text-purple-700',
  }

  const allRoles = Array.from(new Set(users.flatMap(u => u.roles)))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          {isAdmin && (
            <Link
              href="/dashboard/users/activity-logs"
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              <Activity className="w-5 h-5" />
              <span>Activity Logs</span>
            </Link>
          )}
          <Link
            href="/dashboard/users/create"
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-200 shadow-sm"
          >
            <UserPlus className="w-5 h-5" />
            <span>Create User</span>
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

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Roles</option>
              {allRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-end text-sm text-gray-600">
            <span>Total: <strong>{filteredUsers.length}</strong> users</span>
          </div>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No users found</p>
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
            
            <table className="min-w-[1000px] w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Role(s)
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
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.profileImageUrl ? (
                          <Image
                            src={user.profileImageUrl}
                            alt={`${user.firstName} ${user.lastName}`}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold mr-3">
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        {user.roles.map((role) => (
                          <span
                            key={role}
                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                              roleColors[role] || 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isActive ? (
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
                        {actionLoading === user.id ? (
                          <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            {!user.isActive ? (
                              <button
                                onClick={() => handleActivate(user.id)}
                                className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition-colors"
                                title="Activate user"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleDeactivate(user.id)}
                                className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                title="Deactivate user"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            )}
                            {isAdmin && (
                              <>
                                <button
                                  onClick={() => handleEdit(user)}
                                  className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                  title="Edit user"
                                >
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                  title="Delete user"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => setShowRoleAssignment(showRoleAssignment === user.id ? null : user.id)}
                                  className="text-purple-600 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                                  title="Manage roles"
                                >
                                  <Shield className="w-5 h-5" />
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

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit User</h2>
              <button
                onClick={() => setEditingUser(null)}
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
                  value={editingUser.firstName}
                  onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={editingUser.lastName}
                  onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="editIsActive"
                  checked={editingUser.isActive}
                  onChange={(e) => setEditingUser({ ...editingUser, isActive: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="editIsActive" className="text-sm font-medium text-gray-700">
                  Active
                </label>
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => handleSaveEdit(editingUser)}
                  disabled={actionLoading === editingUser.id}
                  className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {actionLoading === editingUser.id ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Assignment Modal */}
      {showRoleAssignment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Manage Roles</h2>
              <button
                onClick={() => {
                  setShowRoleAssignment(null)
                  setNewRole('')
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            {users.find(u => u.id === showRoleAssignment) && (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    User: <strong>{users.find(u => u.id === showRoleAssignment)?.firstName} {users.find(u => u.id === showRoleAssignment)?.lastName}</strong>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {users.find(u => u.id === showRoleAssignment)?.roles.map((role) => (
                      <span
                        key={role}
                        className={`px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1 ${
                          roleColors[role] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span>{role}</span>
                        {(users.find(u => u.id === showRoleAssignment)?.roles.length ?? 0) > 1 && (
                          <button
                            onClick={() => handleRemoveRole(showRoleAssignment, role)}
                            className="ml-1 hover:text-red-600"
                            title="Remove role"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Assign New Role</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a role...</option>
                      {['Admin', 'Staff', 'Teacher', 'Student', 'Parent']
                        .filter(role => !users.find(u => u.id === showRoleAssignment)?.roles.includes(role))
                        .map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                  </div>
                  <button
                    onClick={() => handleAssignRole(showRoleAssignment)}
                    disabled={!newRole || actionLoading === showRoleAssignment}
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Assign Role</span>
                  </button>
                </div>
              </>
            )}
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

