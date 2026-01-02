'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2, AlertCircle, CheckCircle2, User as UserIcon, X } from 'lucide-react'
import type { Permission, UserPermission } from '@/lib/types/permissions'
import { getPermissions, getUserPermissions, assignUserPermission, removeUserPermission } from '@/lib/api/permissions'
import type { User } from '@/lib/api/users'
import PermissionList from './PermissionList'

interface UserPermissionsManagerProps {
  user: User
  onClose?: () => void
}

export default function UserPermissionsManager({ user, onClose }: UserPermissionsManagerProps) {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([])
  const [rolePermissions, setRolePermissions] = useState<number[]>([]) // Permissions from roles
  const [customPermissions, setCustomPermissions] = useState<Set<number>>(new Set()) // Custom overrides
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [allPermissions, userPerms] = await Promise.all([
        getPermissions(),
        getUserPermissions(user.id),
      ])
      
      setPermissions(allPermissions)
      setUserPermissions(userPerms)
      
      // Separate role-based and custom permissions
      const rolePerms: number[] = []
      const customPerms = new Set<number>()
      
      userPerms.forEach(up => {
        if (up.grantedBy) {
          // Custom permission (has grantedBy)
          if (up.isGranted) {
            customPerms.add(up.permissionId)
          }
        } else {
          // Role-based permission
          if (up.isGranted) {
            rolePerms.push(up.permissionId)
          }
        }
      })
      
      setRolePermissions(rolePerms)
      setCustomPermissions(customPerms)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load permissions')
    } finally {
      setLoading(false)
    }
  }, [user.id])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handlePermissionToggle = async (permissionId: number) => {
    try {
      setError(null)
      
      const isRoleBased = rolePermissions.includes(permissionId)
      const isCustomGranted = customPermissions.has(permissionId)
      
      if (isRoleBased && !isCustomGranted) {
        // Permission comes from role, need to create custom override to deny it
        await assignUserPermission(user.id, {
          permissionId,
          isGranted: false,
        })
        setCustomPermissions(prev => {
          const newSet = new Set(prev)
          newSet.add(permissionId) // Mark as custom (even though denied)
          return newSet
        })
      } else if (isCustomGranted) {
        // Remove custom override, fall back to role
        await removeUserPermission(user.id, permissionId)
        setCustomPermissions(prev => {
          const newSet = new Set(prev)
          newSet.delete(permissionId)
          return newSet
        })
      } else {
        // Grant custom permission
        await assignUserPermission(user.id, {
          permissionId,
          isGranted: true,
        })
        setCustomPermissions(prev => {
          const newSet = new Set(prev)
          newSet.add(permissionId)
          return newSet
        })
      }
      
      setSuccess('Permission updated successfully!')
      await loadData() // Reload to get updated data
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update permission')
    }
  }

  const getEffectivePermissions = (): number[] => {
    const effective = new Set<number>()
    
    // Add role-based permissions
    rolePermissions.forEach(id => effective.add(id))
    
    // Apply custom overrides
    userPermissions.forEach(up => {
      if (up.grantedBy) {
        // Custom permission
        if (up.isGranted) {
          effective.add(up.permissionId)
        } else {
          effective.delete(up.permissionId) // Deny overrides role
        }
      }
    })
    
    return Array.from(effective)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  const effectivePermissions = getEffectivePermissions()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-xs text-gray-500 mt-1">
              Roles: {user.roles.join(', ')}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> User permissions are a combination of role-based permissions and custom overrides.
          Custom permissions override role permissions. Denying a role permission requires creating a custom override.
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <CheckCircle2 className="w-5 h-5" />
          <span>{success}</span>
        </div>
      )}

      {/* Permissions Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Effective Permissions</p>
          <p className="text-2xl font-bold text-gray-900">{effectivePermissions.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">From Roles</p>
          <p className="text-2xl font-bold text-primary-600">{rolePermissions.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Custom Overrides</p>
          <p className="text-2xl font-bold text-accent-600">{customPermissions.size}</p>
        </div>
      </div>

      {/* Permissions List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <PermissionList
          permissions={permissions}
          selectedPermissions={effectivePermissions}
          onPermissionToggle={handlePermissionToggle}
          showCheckboxes={true}
        />
      </div>
    </div>
  )
}

