'use client'

import { X, CheckCircle, AlertCircle } from 'lucide-react'

interface Change {
  studentId: number
  studentName: string
  field: string
  fieldLabel: string
  oldValue: string | number
  newValue: string | number
}

interface BulkEditPreviewProps {
  isOpen: boolean
  changes: Change[]
  onConfirm: () => void
  onCancel: () => void
  saving: boolean
  errors?: Record<number, Record<string, string>>
}

export default function BulkEditPreview({
  isOpen,
  changes,
  onConfirm,
  onCancel,
  saving,
  errors = {}
}: BulkEditPreviewProps) {
  if (!isOpen) return null

  // Group changes by student
  const changesByStudent = changes.reduce((acc, change) => {
    if (!acc[change.studentId]) {
      acc[change.studentId] = {
        studentName: change.studentName,
        changes: []
      }
    }
    acc[change.studentId].changes.push(change)
    return acc
  }, {} as Record<number, { studentName: string; changes: Change[] }>)

  const uniqueStudents = Object.keys(changesByStudent).length
  const totalChanges = changes.length
  const hasErrors = Object.keys(errors).length > 0
  const errorCount = Object.values(errors).reduce((sum, errs) => sum + Object.keys(errs).length, 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 sm:p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Review Changes Before Saving</h2>
            <p className="text-sm sm:text-base text-white/90 mt-1">
              {totalChanges} change{totalChanges !== 1 ? 's' : ''} across {uniqueStudents} student{uniqueStudents !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onCancel}
            disabled={saving}
            className="text-white hover:text-gray-200 p-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition-all disabled:opacity-50"
            aria-label="Close preview"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Error Banner */}
        {hasErrors && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-4 sm:mx-6 mt-4 rounded-r">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="font-semibold text-red-800">
                {errorCount} validation error{errorCount !== 1 ? 's' : ''} found. Please fix before saving.
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-4">
            {Object.entries(changesByStudent).map(([studentId, { studentName, changes: studentChanges }]) => {
              const studentErrors = errors[parseInt(studentId)] || {}
              const hasStudentErrors = Object.keys(studentErrors).length > 0
              
              return (
                <div 
                  key={studentId} 
                  className={`border rounded-lg p-4 ${
                    hasStudentErrors 
                      ? 'border-red-200 bg-red-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    {studentName}
                    {hasStudentErrors && (
                      <span className="text-xs text-red-600 font-normal">
                        ({Object.keys(studentErrors).length} error{Object.keys(studentErrors).length !== 1 ? 's' : ''})
                      </span>
                    )}
                  </h3>
                  <div className="space-y-2">
                    {studentChanges.map((change, idx) => {
                      const fieldError = studentErrors[change.field]
                      
                      return (
                        <div 
                          key={idx} 
                          className={`flex items-start justify-between gap-4 p-2 rounded ${
                            fieldError 
                              ? 'bg-red-100 border border-red-200' 
                              : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                              {change.fieldLabel}
                              {fieldError && (
                                <AlertCircle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="line-through text-gray-500 truncate">
                                {String(change.oldValue) || '(empty)'}
                              </span>
                              <span className="text-gray-400">→</span>
                              <span className={`font-semibold truncate ${
                                fieldError ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {String(change.newValue) || '(empty)'}
                              </span>
                            </div>
                            {fieldError && (
                              <div className="mt-1 text-xs text-red-600">
                                ⚠️ {fieldError}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={saving}
            className="px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={saving || hasErrors}
            className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 order-1 sm:order-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Save {totalChanges} Change{totalChanges !== 1 ? 's' : ''}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
