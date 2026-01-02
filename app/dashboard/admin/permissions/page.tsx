'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Users, Settings, Loader2, AlertCircle } from 'lucide-react'
import { getUserRoles, isAuthenticated, hasPermission } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import RolePermissionsManager from '@/components/permissions/RolePermissionsManager'
import UserPermissionsManager from '@/components/permissions/UserPermissionsManager'
import { getUsers, type User } from '@/lib/api/users'

type ViewMode = 'roles' | 'users' | 'overview'

export default function PermissionsManagementPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('overview')
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)

  const roles = ['Admin', 'Staff', 'Teacher', 'Parent', 'Student']

  const checkAuth = useCallback(() => {
    setCheckingAuth(true)

    if (!isAuthenticated()) {
      setAuthError('You must be logged in to access this page.')
      setCheckingAuth(false)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      return
    }

    const userRoles = getUserRoles()
    const isAdmin = userRoles.includes('Admin')

    if (!isAdmin) {
      setAuthError('You do not have permission to access this page. Only Administrators can manage permissions.')
      setCheckingAuth(false)
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
      return
    }

    if (!hasPermission(PERMISSIONS.PERMISSIONS_MANAGE)) {
      setAuthError('You do not have permission to manage permissions.')
      setCheckingAuth(false)
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
      return
    }

    setCheckingAuth(false)
    setAuthError(null)
  }, [router])

  const loadUsers = useCallback(async () => {
    setLoadingUsers(true)
    try {
      const usersList = await getUsers()
      setUsers(usersList)
    } catch (error) {
      console.error('Failed to load users:', error)
    } finally {
      setLoadingUsers(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (viewMode === 'users' && users.length === 0) {
      loadUsers()
    }
  }, [viewMode, users.length, loadUsers])

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-gray-900">{authError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary-600" />
            Permission Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage permissions for roles and users. Permissions control what actions users can perform.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => {
              setViewMode('overview')
              setSelectedRole('')
              setSelectedUser(null)
            }}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              viewMode === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              setViewMode('roles')
              setSelectedUser(null)
            }}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              viewMode === 'roles'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Role Permissions
          </button>
          <button
            onClick={() => {
              setViewMode('users')
              setSelectedRole('')
            }}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              viewMode === 'users'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            User Permissions
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="mt-6">
        {viewMode === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Role-Based Permissions</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage default permissions for each role. These permissions apply to all users with that role.
                  </p>
                  <button
                    onClick={() => {
                      setViewMode('roles')
                      setSelectedRole('Staff')
                    }}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Manage Role Permissions →
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">User-Specific Permissions</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Assign custom permissions to individual users. These override role-based permissions.
                  </p>
                  <button
                    onClick={() => setViewMode('users')}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Manage User Permissions →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roles.map(role => (
                  <button
                    key={role}
                    onClick={() => {
                      setViewMode('roles')
                      setSelectedRole(role)
                    }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
                  >
                    <div className="font-medium text-gray-900">{role}</div>
                    <div className="text-sm text-gray-600 mt-1">Manage permissions</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'roles' && (
          <div className="space-y-6">
            {!selectedRole ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select a Role</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roles.map(role => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="w-6 h-6 text-primary-600" />
                        <div>
                          <div className="font-semibold text-gray-900">{role}</div>
                          <div className="text-sm text-gray-600 mt-1">Manage permissions</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedRole('')}
                  className="mb-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← Back to Role Selection
                </button>
                <RolePermissionsManager roleName={selectedRole} />
              </div>
            )}
          </div>
        )}

        {viewMode === 'users' && (
          <div className="space-y-6">
            {!selectedUser ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select a User</h2>
                {loadingUsers ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {users.map(user => (
                      <button
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className="w-full p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Roles: {user.roles.join(', ')}
                            </div>
                          </div>
                          <Users className="w-5 h-5 text-gray-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="mb-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← Back to User Selection
                </button>
                <UserPermissionsManager
                  user={selectedUser}
                  onClose={() => setSelectedUser(null)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

