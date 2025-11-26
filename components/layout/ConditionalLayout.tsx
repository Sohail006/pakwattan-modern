'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { isAuthenticated, logout } from '@/lib/api/auth'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboardRoute = pathname?.startsWith('/dashboard')

  useEffect(() => {
    // If user is logged in and visits a public page, automatically logout
    if (!isDashboardRoute && isAuthenticated()) {
      logout()
    }
  }, [isDashboardRoute, pathname])

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      {!isDashboardRoute && <Header />}
      <main id="main-content" className={isDashboardRoute ? 'min-h-screen' : 'min-h-screen pt-16'}>
        {children}
      </main>
      {!isDashboardRoute && <Footer />}
    </>
  )
}

