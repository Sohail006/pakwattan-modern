'use client'

import { useEffect } from 'react'

/**
 * Client component to load Google Fonts at runtime
 * This avoids build-time network requirements
 */
export default function FontLoader() {
  useEffect(() => {
    // Preconnect to Google Fonts for better performance
    const preconnect1 = document.createElement('link')
    preconnect1.rel = 'preconnect'
    preconnect1.href = 'https://fonts.googleapis.com'
    document.head.appendChild(preconnect1)

    const preconnect2 = document.createElement('link')
    preconnect2.rel = 'preconnect'
    preconnect2.href = 'https://fonts.gstatic.com'
    preconnect2.crossOrigin = 'anonymous'
    document.head.appendChild(preconnect2)

    // Load the font stylesheet
    const fontLink = document.createElement('link')
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Josefin+Sans:wght@100..700&display=swap'
    fontLink.rel = 'stylesheet'
    document.head.appendChild(fontLink)

    // Cleanup function (though these are meant to persist)
    return () => {
      // Note: We don't remove these on cleanup as they should persist
    }
  }, [])

  return null
}

