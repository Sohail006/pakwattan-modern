'use client'

import { useState, useMemo } from 'react'
import { Search, Shield, CheckCircle2, XCircle, Filter } from 'lucide-react'
import type { Permission } from '@/lib/types/permissions'

interface PermissionListProps {
  permissions: Permission[]
  selectedPermissions?: number[]
  onPermissionToggle?: (permissionId: number) => void
  showCheckboxes?: boolean
  readOnly?: boolean
}

export default function PermissionList({
  permissions,
  selectedPermissions = [],
  onPermissionToggle,
  showCheckboxes = false,
  readOnly = false,
}: PermissionListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Group permissions by category
  const groupedPermissions = useMemo(() => {
    const groups: Record<string, Permission[]> = {}
    
    permissions.forEach(permission => {
      if (!groups[permission.category]) {
        groups[permission.category] = []
      }
      groups[permission.category].push(permission)
    })
    
    return groups
  }, [permissions])

  // Filter permissions
  const filteredPermissions = useMemo(() => {
    let filtered = permissions

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.displayName.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower)
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    return filtered
  }, [permissions, searchTerm, selectedCategory])

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(permissions.map(p => p.category))).sort()
  }, [permissions])

  const handleToggle = (permissionId: number) => {
    if (!readOnly && onPermissionToggle) {
      onPermissionToggle(permissionId)
    }
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search permissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Permissions List */}
      {selectedCategory === 'all' ? (
        // Grouped by category
        <div className="space-y-6">
          {Object.entries(groupedPermissions)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, categoryPermissions]) => (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary-600" />
                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryPermissions.map(permission => {
                    const isSelected = selectedPermissions.includes(permission.id)
                    return (
                      <div
                        key={permission.id}
                        className={`flex items-start p-3 rounded-lg border transition-colors ${
                          isSelected
                            ? 'bg-primary-50 border-primary-200'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        } ${!readOnly && onPermissionToggle ? 'cursor-pointer' : ''}`}
                        onClick={() => handleToggle(permission.id)}
                      >
                        {showCheckboxes && (
                          <div className="mt-0.5 mr-3">
                            {isSelected ? (
                              <CheckCircle2 className="w-5 h-5 text-primary-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                              {permission.displayName}
                            </span>
                            {isSelected && (
                              <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {permission.name}
                          </p>
                          {permission.description && (
                            <p className="text-xs text-gray-400 mt-1">
                              {permission.description}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
        </div>
      ) : (
        // Filtered list
        <div className="space-y-2">
          {filteredPermissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No permissions found matching your search.
            </div>
          ) : (
            filteredPermissions.map(permission => {
              const isSelected = selectedPermissions.includes(permission.id)
              return (
                <div
                  key={permission.id}
                  className={`flex items-start p-3 rounded-lg border transition-colors ${
                    isSelected
                      ? 'bg-primary-50 border-primary-200'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  } ${!readOnly && onPermissionToggle ? 'cursor-pointer' : ''}`}
                  onClick={() => handleToggle(permission.id)}
                >
                  {showCheckboxes && (
                    <div className="mt-0.5 mr-3">
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-primary-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {permission.displayName}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {permission.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {permission.name}
                    </p>
                    {permission.description && (
                      <p className="text-xs text-gray-400 mt-1">
                        {permission.description}
                      </p>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

