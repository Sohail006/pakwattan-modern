'use client'

import { RefreshCw } from 'lucide-react'

type DashboardHeroProps = {
  title: string
  subtitle: string
  onRefresh?: () => void
  refreshing?: boolean
  children?: React.ReactNode
}

export default function DashboardHero({
  title,
  subtitle,
  onRefresh,
  refreshing,
  children,
}: DashboardHeroProps) {
  const today = new Date().toLocaleDateString('en-PK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Karachi',
  })

  return (
    <header className="relative overflow-hidden rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-amber-50/60 p-5 sm:p-6 shadow-sm">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-accent-200/25 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700/80">
            {today}
          </p>
          <h1 className="mt-1 font-josefin text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-600 sm:text-base">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {children}
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-primary-200 bg-white/90 px-3.5 py-2 text-sm font-semibold text-primary-800 shadow-sm transition hover:bg-white disabled:opacity-50"
              aria-label="Refresh dashboard"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
