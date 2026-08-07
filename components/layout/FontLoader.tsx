'use client'

import { useEffect } from 'react'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Josefin+Sans:wght@100..700&display=swap'

/**
 * Ensures brand fonts load even if the head stylesheet is blocked.
 * Layout already preloads + links the stylesheet for faster first paint.
 */
export default function FontLoader() {
  useEffect(() => {
    const alreadyLoaded = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(
      (el) => (el as HTMLLinkElement).href.includes('fonts.googleapis.com')
    )
    if (alreadyLoaded) return

    const fontLink = document.createElement('link')
    fontLink.href = FONT_HREF
    fontLink.rel = 'stylesheet'
    fontLink.media = 'print'
    fontLink.onload = () => {
      fontLink.media = 'all'
    }
    document.head.appendChild(fontLink)
  }, [])

  return null
}
