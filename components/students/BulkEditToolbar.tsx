'use client'

import { Edit2, X, Save, AlertCircle, ArrowDown, Layers, Undo2, Redo2, Keyboard } from 'lucide-react'

interface BulkEditToolbarProps {
  isActive: boolean
  selectedColumn: string | null
  editedCount: number
  totalStudents: number
  onToggleMode: () => void
  onColumnSelect: (column: string | null) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
  editableColumns: Array<{ value: string; label: string }>
  hasValidationErrors: boolean
  onFillDown?: () => void
  onSetAll?: () => void
  onUndo?: () => void
  onRedo?: () => void
  canUndo?: boolean
  canRedo?: boolean
  onShowKeyboardHelp?: () => void
}

export default function BulkEditToolbar({
  isActive,
  selectedColumn,
  editedCount,
  totalStudents,
  onToggleMode,
  onColumnSelect,
  onSave,
  onCancel,
  saving,
  editableColumns,
  hasValidationErrors,
  onFillDown,
  onSetAll,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  onShowKeyboardHelp
}: BulkEditToolbarProps) {
  if (!isActive) {
    return (
      <button
        onClick={onToggleMode}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Enable bulk edit mode"
      >
        <Edit2 className="w-4 h-4" />
        <span>Bulk Edit Mode</span>
      </button>
    )
  }

  return (
    <div className="sticky top-0 z-20 bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4 shadow-md">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-blue-700 font-semibold text-sm sm:text-base">Bulk Edit Mode</span>
          </div>
          
          <select
            value={selectedColumn || ''}
            onChange={(e) => onColumnSelect(e.target.value || null)}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            aria-label="Select column to edit"
          >
            <option value="">Select column to edit...</option>
            {editableColumns.map(col => (
              <option key={col.value} value={col.value}>
                {col.label}
              </option>
            ))}
          </select>
          
          {selectedColumn && (
            <span className="text-xs sm:text-sm text-gray-600">
              Editing {totalStudents} student{totalStudents !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {editedCount > 0 && (
            <div className="flex items-center gap-2 text-sm">
              {hasValidationErrors ? (
                <div className="flex items-center gap-1 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>Fix errors to save</span>
                </div>
              ) : (
                <span className="text-gray-600">
                  <span className="font-semibold text-blue-600">{editedCount}</span> unsaved change{editedCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          )}
          
          <button
            onClick={onSave}
            disabled={editedCount === 0 || saving || hasValidationErrors}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label={`Save ${editedCount} changes`}
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save {editedCount > 0 ? `${editedCount} ` : ''}Changes</span>
              </>
            )}
          </button>
          
          <button
            onClick={onCancel}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="Cancel bulk edit"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
      
      {selectedColumn && (
        <div className="mt-3 pt-3 border-t border-blue-200 space-y-2">
          <p className="text-xs sm:text-sm text-blue-700">
            💡 Tip: Click on any cell in the <strong>{editableColumns.find(c => c.value === selectedColumn)?.label}</strong> column to edit it. Changes are saved when you click &quot;Save Changes&quot;.
          </p>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-600 font-medium">Quick Actions:</span>
            {onFillDown && (
              <button
                onClick={onFillDown}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                title="Copy first value to all cells below"
              >
                <ArrowDown className="w-3 h-3" />
                Fill Down
              </button>
            )}
            {onSetAll && (
              <button
                onClick={onSetAll}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                title="Set all cells to same value"
              >
                <Layers className="w-3 h-3" />
                Set All
              </button>
            )}
            {onUndo && (
              <button
                onClick={onUndo}
                disabled={!canUndo}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Undo last change (Ctrl+Z)"
              >
                <Undo2 className="w-3 h-3" />
                Undo
              </button>
            )}
            {onRedo && (
              <button
                onClick={onRedo}
                disabled={!canRedo}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Redo last undone change (Ctrl+Y)"
              >
                <Redo2 className="w-3 h-3" />
                Redo
              </button>
            )}
            {onShowKeyboardHelp && (
              <button
                onClick={onShowKeyboardHelp}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                title="Show keyboard shortcuts"
              >
                <Keyboard className="w-3 h-3" />
                Shortcuts
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
