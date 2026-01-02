'use client'

import { useState, useEffect, useCallback } from 'react'
import { Save, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { Permission, RolePermission } from '@/lib/types/permissions'
import {
  getPermissions,
  getRolePermissions,
  bulkAssignRolePermissions,
} from '@/lib/api/permissions'
import PermissionList from './PermissionList'

interface RolePermissionsManagerProps {
  roleName: string
}

export default function RolePermissionsManager({ roleName }: RolePermissionsManagerProps) {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([])
  const [selectedPermissions, setSelectedPermissions] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [allPermissions, rolePerms] = await Promise.all([
        getPermissions(),
        getRolePermissions(roleName),
      ])
      
      setPermissions(allPermissions)
      setRolePermissions(rolePerms)
      
      // Set selected permissions (only granted ones)
      const granted = new Set(
        rolePerms.filter(rp => rp.isGranted).map(rp => rp.permissionId)
      )
      setSelectedPermissions(granted)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load permissions')
    } finally {
      setLoading(false)
    }
  }, [roleName])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handlePermissionToggle = (permissionId: number) => {
    setSelectedPermissions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(permissionId)) {
        newSet.delete(permissionId)
      } else {
        newSet.add(permissionId)
      }
      return newSet
    })
    setSuccess(null)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      // Get current granted permissions
      const currentGranted = new Set(
        rolePermissions.filter(rp => rp.isGranted).map(rp => rp.permissionId)
      )

      // Find permissions to add and remove
      const toAdd = Array.from(selectedPermissions).filter(id => !currentGranted.has(id))
      const toRemove = Array.from(currentGranted).filter(id => !selectedPermissions.has(id))

      // Bulk update
      if (toAdd.length > 0) {
        await bulkAssignRolePermissions(roleName, {
          permissionIds: toAdd,
          isGranted: true,
        })
      }

      if (toRemove.length > 0) {
        await bulkAssignRolePermissions(roleName, {
          permissionIds: toRemove,
          isGranted: false,
        })
      }

      setSuccess('Permissions updated successfully!')
      await loadData() // Reload to get updated data
      
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save permissions')
    } finally {
      setSaving(false)
    }
  }

  const hasChanges = () => {
    const currentGranted = new Set(
      rolePermissions.filter(rp => rp.isGranted).map(rp => rp.permissionId)
    )
    
    if (currentGranted.size !== selectedPermissions.size) return true
    
    selectedPermissions.forEach(id => {
      if (!currentGranted.has(id)) return true
    })
    
    // Check if all selected permissions are in current granted
    const allSelectedAreGranted = Array.from(selectedPermissions).every(id => currentGranted.has(id))
    const allGrantedAreSelected = Array.from(currentGranted).every(id => selectedPermissions.has(id))
    
    return !(allSelectedAreGranted && allGrantedAreSelected)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Role: {roleName}</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage permissions for the {roleName} role
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !hasChanges()}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
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

      {/* Permissions List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Selected: <strong>{selectedPermissions.size}</strong> of {permissions.length} permissions
          </p>
        </div>
        <PermissionList
          permissions={permissions}
          selectedPermissions={Array.from(selectedPermissions)}
          onPermissionToggle={handlePermissionToggle}
          showCheckboxes={true}
        />
      </div>
    </div>
  )
}

