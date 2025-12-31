'use client'

import { useEffect } from 'react'

/**
 * Client component to load Google Fonts at runtime
 * This avoids build-time network requirements
 * 
 * Optimizations:
 * - Preconnect hints moved to layout.tsx for earlier connection
 * - Uses display=swap for better performance
 * - Loads fonts asynchronously
 */
export default function FontLoader() {
  useEffect(() => {
    // Preconnect hints are now in layout.tsx for better performance
    // Load the font stylesheet with display=swap for better performance
    const fontLink = document.createElement('link')
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Josefin+Sans:wght@100..700&display=swap'
    fontLink.rel = 'stylesheet'
    fontLink.media = 'print' // Load asynchronously
    fontLink.onload = () => {
      // Switch to all media once loaded
      fontLink.media = 'all'
    }
    document.head.appendChild(fontLink)
  }, [])

  return null
}

