'use client'

import { useEffect } from 'react'
import { toastService } from '@/lib/utils/toast'

/**
 * Global handler for Next.js chunk loading errors
 * Automatically retries failed chunk loads and provides user feedback
 */
export default function ChunkErrorHandler() {
  useEffect(() => {
    // Handle chunk loading errors
    const handleChunkError = (event: ErrorEvent) => {
      const error = event.error || event.message || ''
      const errorString = String(error).toLowerCase()
      
      // Check if it's a chunk loading error
      if (
        errorString.includes('loading chunk') ||
        errorString.includes('chunk load failed') ||
        errorString.includes('failed to fetch dynamically imported module') ||
        errorString.includes('loading css chunk') ||
        event.message?.includes('chunk')
      ) {
        event.preventDefault()
        
        // Show user-friendly error message
        toastService.error(
          'A page update is available. Please refresh the page to continue.',
          8000
        )
        
        // Log for debugging (development only)
        if (process.env.NODE_ENV === 'development') {
          console.error('[ChunkErrorHandler] Chunk loading error:', {
            error: event.error,
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
          })
        }
        
        // Auto-retry: Reload page after a short delay
        // This helps when the chunk was temporarily unavailable
        setTimeout(() => {
          // Only reload if user hasn't already navigated away
          if (document.visibilityState === 'visible') {
            window.location.reload()
          }
        }, 2000)
        
        return true
      }
      
      return false
    }

    // Handle unhandled promise rejections (often chunk loading errors)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const reasonString = String(reason).toLowerCase()
      
      // Check if it's a chunk loading error
      if (
        reasonString.includes('loading chunk') ||
        reasonString.includes('chunk load failed') ||
        reasonString.includes('failed to fetch dynamically imported module') ||
        (reason instanceof Error && reason.message?.toLowerCase().includes('chunk'))
      ) {
        event.preventDefault()
        
        // Show user-friendly error message
        toastService.error(
          'A page update is available. Please refresh the page to continue.',
          8000
        )
        
        // Log for debugging (development only)
        if (process.env.NODE_ENV === 'development') {
          console.error('[ChunkErrorHandler] Chunk loading promise rejection:', reason)
        }
        
        // Auto-retry: Reload page after a short delay
        setTimeout(() => {
          if (document.visibilityState === 'visible') {
            window.location.reload()
          }
        }, 2000)
        
        return true
      }
      
      return false
    }

    // Add event listeners
    window.addEventListener('error', handleChunkError, true)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleChunkError, true)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null
}
