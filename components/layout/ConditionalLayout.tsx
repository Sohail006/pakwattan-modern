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
      {!isDashboardRoute && <Header />}
      <main className={isDashboardRoute ? 'min-h-screen' : 'min-h-screen pt-16'}>
        {children}
      </main>
      {!isDashboardRoute && <Footer />}
    </>
  )
}

