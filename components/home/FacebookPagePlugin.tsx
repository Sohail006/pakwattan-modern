'use client'

import { useEffect } from 'react'

const FacebookPagePlugin = () => {
  useEffect(() => {
    // Load Facebook SDK
    if (typeof window !== 'undefined' && !window.FB) {
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/en_US/sdk.js'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)

      script.onload = () => {
        if (window.FB) {
          window.FB.init({
            xfbml: true,
            version: 'v18.0'
          })
        }
      }
    }
  }, [])

  return (
    <div className="facebook-page-plugin">
      <div 
        className="fb-page" 
        data-href="https://www.facebook.com/PAKWATTAN2020"
        data-tabs="timeline"
        data-width="300"
        data-height="400"
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
        data-lazy="true"
      >
        <blockquote 
          cite="https://www.facebook.com/PAKWATTAN2020" 
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/PAKWATTAN2020">
            Pak Wattan School & College of Sciences
          </a>
        </blockquote>
      </div>
    </div>
  )
}

export default FacebookPagePlugin
