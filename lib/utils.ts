// Utility functions for PakWattanModern application

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge
 * This ensures Tailwind classes are properly merged and conflicts are resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a phone number for display (US format)
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

/**
 * Formats a phone number for tel: links
 */
export function formatPhoneLink(phone: string): string {
  return phone.replace(/\D/g, '')
}

/**
 * Masks Pakistan phone number as user types (format: 03XX-XXXXXXX)
 * @param value - The input value
 * @returns Formatted phone number string
 */
export function maskPakistanPhoneNumber(value: string): string {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '')
  
  // Limit to 11 digits (Pakistan mobile number length)
  const limited = cleaned.slice(0, 11)
  
  // Format: 03XX-XXXXXXX
  if (limited.length <= 4) {
    return limited
  } else {
    return `${limited.slice(0, 4)}-${limited.slice(4)}`
  }
}

/**
 * Validates Pakistan phone number format
 * @param phone - The phone number to validate (can be formatted or clean)
 * @param required - Whether the phone number is required (default: false)
 * @returns Object with validation result and optional error message
 */
export function validatePakistanPhoneNumber(phone: string, required: boolean = false): { valid: boolean; error?: string } {
  // If empty and not required, it's valid
  if (!phone || phone.trim() === '') {
    if (required) {
      return { valid: false, error: 'Phone number is required' }
    }
    return { valid: true }
  }
  
  // Remove all non-digit characters for validation
  const cleaned = phone.replace(/\D/g, '')
  
  // Must be exactly 11 digits
  if (cleaned.length !== 11) {
    return { valid: false, error: 'Phone number must be 11 digits (format: 03XX-XXXXXXX)' }
  }
  
  // Must start with 03
  if (!cleaned.startsWith('03')) {
    return { valid: false, error: 'Phone number must start with 03' }
  }
  
  // Check if it's a valid Pakistan mobile prefix (03XX where XX is 00-99)
  const prefix = cleaned.substring(0, 4)
  const prefixNumber = parseInt(prefix)
  
  // Valid prefixes: 0300-0399
  if (prefixNumber < 300 || prefixNumber > 399) {
    return { valid: false, error: 'Invalid phone number prefix. Must be between 0300-0399' }
  }
  
  return { valid: true }
}

/**
 * Cleans phone number for storage (removes formatting, keeps only digits)
 * @param phone - The formatted phone number
 * @returns Clean phone number with only digits
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '')
}

/**
 * Debounce function to limit the rate of function calls
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function to limit the rate of function calls
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Checks if the current environment is development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

/**
 * Checks if the current environment is production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * Safely parses JSON
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

/**
 * Safely stringifies JSON
 */
export function safeJsonStringify(obj: unknown): string {
  try {
    return JSON.stringify(obj)
  } catch {
    return '{}'
  }
}

/**
 * Formats a date for display
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options
  })
}

/**
 * Formats a date-time for display (e.g., "Nov 6, 2025, 4:12 PM")
 * Handles UTC dates properly by converting to local timezone
 */
export function formatDateTime(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  let dateObj: Date
  
  if (typeof date === 'string') {
    let dateString = date.trim()
    
    // Check if it's already a valid ISO 8601 string with timezone indicator
    const hasTimezone = dateString.endsWith('Z') || dateString.match(/[+-]\d{2}:\d{2}$/)
    
    if (!hasTimezone) {
      // If no timezone indicator, assume it's UTC and append 'Z'
      // This ensures JavaScript parses it as UTC, not local time
      if (dateString.includes('T')) {
        // Has time component, just append 'Z'
        // Handle milliseconds: "2025-11-06T16:32:00.000" -> "2025-11-06T16:32:00.000Z"
        dateString = `${dateString}Z`
      } else {
        // Just a date, add time component with UTC indicator
        dateString = `${dateString}T00:00:00Z`
      }
    }
    
    dateObj = new Date(dateString)
  } else {
    dateObj = date
  }
  
  // Validate the date
  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date:', date)
    return 'Invalid Date'
  }
  
  // toLocaleString automatically converts UTC to local timezone
  // The Date object stores time in UTC internally, and toLocaleString converts it
  return dateObj.toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
    hour12: true
  })
}

/**
 * Formats a time string or Date to 12-hour format (HH:MM AM/PM)
 */
export function formatTime(time: Date | string | null | undefined): string {
  if (!time) return ''

  // Handle Date input directly
  if (time instanceof Date) {
    if (isNaN(time.getTime())) return ''
    return convertTo12Hour(time.getHours(), time.getMinutes())
  }

  const trimmed = time.trim()
  if (!trimmed) return ''

  const lower = trimmed.toLowerCase()
  if (lower.includes('am') || lower.includes('pm')) {
    // Normalize AM/PM casing
    return trimmed.replace(/am|pm/gi, match => match.toUpperCase())
  }

  const parts = trimmed.split(':')
  const hours = parseInt(parts[0] ?? '', 10)
  const minutes = parseInt(parts[1] ?? '0', 10)

  if (Number.isNaN(hours)) {
    return trimmed
  }

  const safeMinutes = Number.isNaN(minutes) ? 0 : minutes
  return convertTo12Hour(hours, safeMinutes)
}

function convertTo12Hour(hours: number, minutes: number): string {
  const period = hours >= 12 ? 'PM' : 'AM'
  const normalizedHour = hours % 12 === 0 ? 12 : hours % 12
  const hourString = String(normalizedHour).padStart(2, '0')
  const minuteString = String(minutes).padStart(2, '0')
  return `${hourString}:${minuteString} ${period}`
}

/**
 * Formats a number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString()
}

/**
 * Truncates text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Converts a string to kebab-case
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * Converts a string to camelCase
 */
export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Deep clones an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T
  if (typeof obj === 'object') {
    const clonedObj = {} as Record<string, unknown>
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj as T
  }
  return obj
}

/**
 * Sleeps for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retries a function a specified number of times
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0) {
      await sleep(delay)
      return retry(fn, retries - 1, delay)
    }
    throw error
  }
}
