'use client'

import { useState, useEffect, useCallback } from 'react'
import { YouTubePlayerConfig } from '@/types'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export const useYouTube = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [players, setPlayers] = useState<Map<string, any>>(new Map())

  useEffect(() => {
    // Set up YouTube API ready callback
    window.onYouTubeIframeAPIReady = () => {
      setIsLoaded(true)
    }

    // Load YouTube API if not already loaded
    if (!window.YT) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/player_api'
      script.async = true
      document.head.appendChild(script)
    } else {
      setIsLoaded(true)
    }

    return () => {
      // Cleanup players
      players.forEach(player => {
        if (player && typeof player.destroy === 'function') {
          player.destroy()
        }
      })
    }
  }, [])

  const createPlayer = useCallback((elementId: string, config: YouTubePlayerConfig) => {
    if (!isLoaded || !window.YT || !window.YT.Player) return null

    const player = new window.YT.Player(elementId, {
      height: config.height,
      width: config.width,
      videoId: config.videoId,
      playerVars: config.playerVars,
      events: config.events
    })

    setPlayers(prev => new Map(prev).set(elementId, player))
    return player
  }, [isLoaded])

  const destroyPlayer = useCallback((elementId: string) => {
    const player = players.get(elementId)
    if (player && typeof player.destroy === 'function') {
      player.destroy()
      setPlayers(prev => {
        const newMap = new Map(prev)
        newMap.delete(elementId)
        return newMap
      })
    }
  }, [players])

  return {
    isLoaded,
    createPlayer,
    destroyPlayer
  }
}
