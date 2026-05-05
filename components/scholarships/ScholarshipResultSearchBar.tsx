'use client'

import { Search } from 'lucide-react'

type Props = {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  /** Shown below the field when there is a filter and counts differ */
  filteredCount?: number
  totalCount?: number
}

export default function ScholarshipResultSearchBar({
  id,
  value,
  onChange,
  placeholder = 'Quick search — name, roll no., father name, marks…',
  filteredCount,
  totalCount,
}: Props) {
  const showHint =
    value.trim() !== '' &&
    typeof filteredCount === 'number' &&
    typeof totalCount === 'number' &&
    filteredCount !== totalCount

  return (
    <div className="mb-3 space-y-1.5">
      <label htmlFor={id} className="sr-only">
        Filter rows in this table
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm ring-1 ring-black/[0.02] focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100">
        <Search className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      {showHint && (
        <p className="text-xs text-gray-500 sm:text-sm" aria-live="polite">
          Showing {filteredCount} of {totalCount} rows
        </p>
      )}
    </div>
  )
}
