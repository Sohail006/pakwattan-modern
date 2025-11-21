'use client'

import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const statusColors: Record<string, { bg: string; text: string }> = {
  Active: { bg: 'bg-green-100', text: 'text-green-800' },
  Inactive: { bg: 'bg-gray-100', text: 'text-gray-800' },
  Suspended: { bg: 'bg-red-100', text: 'text-red-800' },
  Graduated: { bg: 'bg-blue-100', text: 'text-blue-800' },
  Transferred: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  Pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  Approved: { bg: 'bg-green-100', text: 'text-green-800' },
  Rejected: { bg: 'bg-red-100', text: 'text-red-800' },
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
}

export default function StatusBadge({ status, className, size = 'md' }: StatusBadgeProps) {
  const colors = statusColors[status] || statusColors.Inactive
  
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full',
        colors.bg,
        colors.text,
        sizeClasses[size],
        className
      )}
    >
      {status}
    </span>
  )
}

