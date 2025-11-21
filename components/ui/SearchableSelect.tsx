'use client'

import { useState, useEffect, useRef, useCallback, useMemo, useId } from 'react'
import { Search, ChevronDown, X, Check, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchableSelectOption {
  value: string | number
  label: string
  subtitle?: string
  icon?: string
  disabled?: boolean
}

interface SearchableSelectProps {
  options: SearchableSelectOption[]
  value?: string | number
  onChange: (value: string | number) => void
  onSearch?: (query: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  loading?: boolean
  disabled?: boolean
  required?: boolean
  error?: string
  className?: string
  maxHeight?: string
  highlightMatch?: boolean
  showClearButton?: boolean
  filterFunction?: (option: SearchableSelectOption, query: string) => boolean
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  onSearch,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No options found',
  loading = false,
  disabled = false,
  required = false,
  error,
  className,
  maxHeight = 'max-h-64',
  highlightMatch = true,
  showClearButton = true,
  filterFunction,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)
  
  // Generate unique ID for listbox (for aria-controls)
  const listboxId = useId()
  
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  // Find selected option
  const selectedOption = useMemo(() => {
    if (value === undefined || value === null || value === '') {
      return undefined
    }
    return options.find(opt => opt.value === value)
  }, [options, value])

  // Default filter function
  const defaultFilter = useCallback((option: SearchableSelectOption, query: string): boolean => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      option.label.toLowerCase().includes(q) ||
      (option.subtitle ? option.subtitle.toLowerCase().includes(q) : false)
    )
  }, [])

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    // Always filter out disabled options
    const enabledOptions = options.filter(opt => !opt.disabled)
    
    if (!searchQuery.trim()) {
      return enabledOptions
    }
    
    const filter = filterFunction || defaultFilter
    return enabledOptions.filter(opt => filter(opt, searchQuery))
  }, [options, searchQuery, filterFunction, defaultFilter])

  // Highlight matching text
  const highlightText = useCallback((text: string, query: string) => {
    if (!highlightMatch || !query.trim()) return text
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-primary-200 text-primary-900 font-semibold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }, [highlightMatch])

  // Handle option selection
  const handleSelect = useCallback((option: SearchableSelectOption) => {
    if (option.disabled) return
    onChange(option.value)
    setIsOpen(false)
    setSearchQuery('')
    setFocusedIndex(-1)
  }, [onChange])

  // Handle clear
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
    setSearchQuery('')
    setIsOpen(false)
  }, [onChange])

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setIsTyping(true)
    setFocusedIndex(-1)
    
    if (onSearch) {
      onSearch(query)
    }
    
    // Reset typing state after debounce
    setTimeout(() => setIsTyping(false), 300)
  }, [onSearch])

  // Scroll to focused item
  const scrollToItem = useCallback((index: number) => {
    const item = itemRefs.current[index]
    if (item && listRef.current) {
      item.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || disabled) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setFocusedIndex(prev => {
            const next = prev < filteredOptions.length - 1 ? prev + 1 : 0
            scrollToItem(next)
            return next
          })
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex(prev => {
            const next = prev > 0 ? prev - 1 : filteredOptions.length - 1
            scrollToItem(next)
            return next
          })
          break
        case 'Enter':
          e.preventDefault()
          if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
            handleSelect(filteredOptions[focusedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          setSearchQuery('')
          setFocusedIndex(-1)
          break
        case 'Tab':
          setIsOpen(false)
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, disabled, focusedIndex, filteredOptions, handleSelect, scrollToItem])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
        setFocusedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Main Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        role="combobox"
        className={cn(
          'w-full px-4 py-2.5 text-left bg-white border rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'transition-all duration-200',
          'flex items-center justify-between gap-2',
          error
            ? 'border-red-300 bg-red-50 focus:ring-red-500'
            : 'border-gray-300 hover:border-gray-400',
          disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
          isOpen && 'ring-2 ring-primary-500 border-primary-500'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-required={required}
        aria-invalid={!!error}
      >
        <span className={cn(
          'flex-1 truncate',
          !selectedOption && 'text-gray-500'
        )}>
          {selectedOption ? (
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{selectedOption.label}</span>
              {selectedOption.subtitle && (
                <span className="text-xs text-gray-500 mt-0.5">{selectedOption.subtitle}</span>
              )}
            </div>
          ) : (
            placeholder
          )}
        </span>
        <div className="flex items-center gap-1 flex-shrink-0">
          {showClearButton && selectedOption && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label="Clear selection"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
          <ChevronDown
            className={cn(
              'w-5 h-5 text-gray-400 transition-transform duration-200',
              isOpen && 'transform rotate-180'
            )}
          />
        </div>
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-1 flex items-start space-x-1">
          <AlertCircle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl',
            'overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200'
          )}
        >
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onClick={(e) => e.stopPropagation()}
              />
              {isTyping && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Options List */}
          <ul
            ref={listRef}
            id={listboxId}
            className={cn('overflow-y-auto', maxHeight)}
            role="listbox"
          >
            {loading ? (
              <li className="px-4 py-8 text-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Loading options...</p>
              </li>
            ) : filteredOptions.length === 0 ? (
              <li className="px-4 py-8 text-center">
                <AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">{emptyMessage}</p>
                {searchQuery && (
                  <p className="text-xs text-gray-400 mt-1">
                    Try a different search term
                  </p>
                )}
              </li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === value
                const isFocused = index === focusedIndex
                
                return (
                  <li
                    key={option.value}
                    ref={(el) => { itemRefs.current[index] = el }}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'px-4 py-3 cursor-pointer transition-colors',
                      'flex items-center justify-between gap-2',
                      isFocused && 'bg-primary-50',
                      isSelected && 'bg-primary-100',
                      !isFocused && !isSelected && 'hover:bg-gray-50',
                      option.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {option.icon && (
                          <span className="text-lg flex-shrink-0">{option.icon}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {highlightText(option.label, searchQuery)}
                          </div>
                          {option.subtitle && (
                            <div className="text-xs text-gray-500 mt-0.5 truncate">
                              {highlightText(option.subtitle, searchQuery)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    )}
                  </li>
                )
              })
            )}
          </ul>

          {/* Results Count */}
          {filteredOptions.length > 0 && searchQuery && (
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
              {filteredOptions.length} {filteredOptions.length === 1 ? 'result' : 'results'} found
            </div>
          )}
        </div>
      )}
    </div>
  )
}

