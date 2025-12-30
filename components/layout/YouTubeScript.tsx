'use client'

import Script from 'next/script'

/**
 * Loads YouTube Player API script
 */
export default function YouTubeScript() {
  return (
    <Script
      src="https://www.youtube.com/player_api"
      strategy="lazyOnload"
    />
  )
}

