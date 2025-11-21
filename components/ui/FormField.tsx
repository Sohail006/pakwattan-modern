'use client'

import { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  label: string | ReactNode
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
  className?: string
  htmlFor?: string
}

export default function FormField({
  label,
  required = false,
  error,
  hint,
  children,
  className,
  htmlFor,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {typeof label === 'string' ? (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      ) : (
        <div className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      
      {children}
      
      {hint && !error && (
        <p className="mt-1 text-xs text-gray-500">{hint}</p>
      )}
      
      {error && (
        <div
          className="mt-1 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span className="flex-1">{error}</span>
        </div>
      )}
    </div>
  )
}

