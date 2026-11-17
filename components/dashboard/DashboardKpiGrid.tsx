'use client'

import Link from 'next/link'
import { AlertCircle, ArrowUpRight } from 'lucide-react'

export type DashboardKpi = {
  label: string
  value: number | string
  href?: string
  icon: React.ReactNode
  loading?: boolean
  error?: boolean
  hint?: string
}

type DashboardKpiGridProps = {
  items: DashboardKpi[]
  columns?: string
}

export default function DashboardKpiGrid({
  items,
  columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
}: DashboardKpiGridProps) {
  return (
    <div className={`grid gap-3 sm:gap-4 ${columns}`}>
      {items.map((kpi) => {
        const inner = (
          <>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {kpi.label}
                </p>
                {kpi.loading ? (
                  <div className="mt-2 h-8 w-16 animate-pulse rounded bg-gray-200" />
                ) : kpi.error ? (
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    Unavailable
                  </div>
                ) : (
                  <p className="mt-1.5 font-josefin text-3xl font-bold text-gray-900">
                    {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                  </p>
                )}
                {kpi.hint && !kpi.loading && !kpi.error && (
                  <p className="mt-1 text-xs text-gray-500">{kpi.hint}</p>
                )}
              </div>
              <div
                className={`rounded-xl p-2.5 ${
                  kpi.error ? 'bg-red-50 text-red-600' : 'bg-primary-50 text-primary-700'
                }`}
              >
                {kpi.icon}
              </div>
            </div>
            {kpi.href && !kpi.loading && (
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-700">
                Open
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            )}
          </>
        )

        const className = `group block rounded-2xl border bg-white/90 p-4 shadow-sm transition ${
          kpi.error
            ? 'border-red-200'
            : 'border-gray-200/80 hover:border-primary-300 hover:shadow-md'
        }`

        if (kpi.href && !kpi.loading) {
          return (
            <Link key={kpi.label} href={kpi.href} className={className} aria-label={`Open ${kpi.label}`}>
              {inner}
            </Link>
          )
        }

        return (
          <div key={kpi.label} className={className}>
            {inner}
          </div>
        )
      })}
    </div>
  )
}
