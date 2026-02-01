'use client'

import { useState, useEffect, useRef } from 'react'
import { AlertCircle, Check } from 'lucide-react'
import { maskPakistanPhoneNumber } from '@/lib/utils'

interface FieldConfig {
  type: 'text' | 'date' | 'select' | 'tel'
  label: string
  required?: boolean
  validation?: (value: string | number) => string | null
  options?: Array<{ value: string | number; label: string }>
  format?: (value: string) => string
}

interface EditableCellProps {
  studentId: number
  field: string
  value: string | number
  originalValue: string | number
  isEditing: boolean
  fieldConfig: FieldConfig
  onChange: (studentId: number, field: string, value: string | number) => void
  onBlur: (studentId: number, field: string) => void
  error?: string
  isEdited: boolean
}

export default function EditableCell({
  studentId,
  field,
  value,
  originalValue,
  isEditing,
  fieldConfig,
  onChange,
  onBlur,
  error,
  isEdited
}: EditableCellProps) {
  const [localValue, setLocalValue] = useState<string | number>(value ?? '')
  const [showError, setShowError] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null)

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value ?? '')
  }, [value])

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select()
      }
    }
  }, [isEditing])

  const handleChange = (newValue: string | number) => {
    setLocalValue(newValue)
    
    // Apply formatting if needed
    let formattedValue = newValue
    if (fieldConfig.format && typeof newValue === 'string') {
      formattedValue = fieldConfig.format(newValue)
      setLocalValue(formattedValue)
    }
    
    onChange(studentId, field, formattedValue)
    setShowError(false)
  }

  const handleBlur = () => {
    onBlur(studentId, field)
    if (error) {
      setShowError(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleBlur()
      // Trigger move to next cell via custom event
      const event = new CustomEvent('moveToNextCell', { 
        detail: { studentId, field, direction: 'down' }
      })
      window.dispatchEvent(event)
    } else if (e.key === 'Escape') {
      // Revert to original value
      setLocalValue(originalValue)
      onChange(studentId, field, originalValue)
      handleBlur()
    } else if (e.key === 'Tab') {
      // Let Tab work naturally but prevent default to handle navigation
      e.preventDefault()
      handleBlur()
      const event = new CustomEvent('moveToNextCell', { 
        detail: { studentId, field, direction: e.shiftKey ? 'up' : 'down' }
      })
      window.dispatchEvent(event)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      handleBlur()
      const event = new CustomEvent('moveToNextCell', { 
        detail: { studentId, field, direction: 'down' }
      })
      window.dispatchEvent(event)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      handleBlur()
      const event = new CustomEvent('moveToNextCell', { 
        detail: { studentId, field, direction: 'up' }
      })
      window.dispatchEvent(event)
    }
  }

  // Not in edit mode - show static value
  if (!isEditing) {
    // Format date for display
    let displayValue = value ?? '-'
    if (fieldConfig.type === 'date' && value) {
      try {
        const date = typeof value === 'string' 
          ? new Date(value.includes('T') ? value : value + 'T00:00:00')
          : new Date(value)
        if (!isNaN(date.getTime())) {
          displayValue = date.toISOString().split('T')[0]
        }
      } catch {
        displayValue = String(value)
      }
    }
    
    return (
      <span 
        className={`inline-flex items-center gap-1 px-1 ${isEdited ? 'bg-yellow-50 rounded' : ''} ${error ? 'bg-red-50 rounded' : ''}`}
        title={isEdited ? 'This value has been edited' : error ? `Error: ${error}` : undefined}
      >
        <span>{displayValue}</span>
        {isEdited && !error && (
          <Check className="w-3 h-3 text-green-600 flex-shrink-0" aria-label="Edited" />
        )}
        {error && (
          <AlertCircle className="w-3 h-3 text-red-600 flex-shrink-0" aria-label="Error" />
        )}
      </span>
    )
  }

  // Render based on field type
  const baseClasses = `w-full px-2 py-1 text-sm border rounded transition-all ${
    error 
      ? 'border-red-500 bg-red-50 focus:ring-red-500' 
      : isEdited 
        ? 'border-blue-500 bg-yellow-50 focus:ring-blue-500' 
        : 'border-blue-300 bg-white focus:ring-blue-500'
  } focus:outline-none focus:ring-2`

  return (
    <div className="relative">
      {fieldConfig.type === 'text' && (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${baseClasses} min-h-[44px] text-base sm:text-sm`}
          aria-invalid={!!error}
          aria-describedby={error ? `${field}-${studentId}-error` : undefined}
        />
      )}

      {fieldConfig.type === 'tel' && (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="tel"
          value={localValue}
          onChange={(e) => {
            const masked = maskPakistanPhoneNumber(e.target.value)
            handleChange(masked)
          }}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="03XX-XXXXXXX"
          maxLength={12}
          className={`${baseClasses} min-h-[44px] text-base sm:text-sm`}
          aria-invalid={!!error}
          aria-describedby={error ? `${field}-${studentId}-error` : undefined}
        />
      )}

      {fieldConfig.type === 'date' && (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="date"
          value={
            typeof localValue === 'string' 
              ? (localValue.includes('T') ? localValue.split('T')[0] : localValue)
              : typeof localValue === 'number'
                ? new Date(localValue).toISOString().split('T')[0]
                : ''
          }
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          max={new Date().toISOString().split('T')[0]}
          className={`${baseClasses} min-h-[44px] text-base sm:text-sm`}
          aria-invalid={!!error}
          aria-describedby={error ? `${field}-${studentId}-error` : undefined}
        />
      )}

      {fieldConfig.type === 'select' && fieldConfig.options && (
        <select
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${baseClasses} min-h-[44px] text-base sm:text-sm`}
          aria-invalid={!!error}
          aria-describedby={error ? `${field}-${studentId}-error` : undefined}
        >
          <option value="">Select {fieldConfig.label}...</option>
          {fieldConfig.options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {error && showError && (
        <div
          id={`${field}-${studentId}-error`}
          className="absolute top-full left-0 mt-1 z-20 flex items-start gap-1 text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1 shadow-lg whitespace-nowrap max-w-xs"
          role="alert"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
