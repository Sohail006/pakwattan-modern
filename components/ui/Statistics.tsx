'use client'

import { LucideIcon } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import Container from '@/components/ui/Container'

export type StatisticItem = {
  label: string
  end: number
  suffix?: string
  displayOverride?: string
  icon?: LucideIcon
}

type StatisticsProps = {
  items: StatisticItem[]
  title?: string
  subtitle?: string
  variant?: 'dark' | 'light' | 'brand'
  className?: string
  id?: string
}

const Statistics = ({
  items,
  title,
  subtitle,
  variant = 'brand',
  className = '',
  id,
}: StatisticsProps) => {
  const shell =
    variant === 'dark'
      ? 'bg-secondary-900 text-white'
      : variant === 'light'
        ? 'bg-secondary-50 text-secondary-900'
        : 'bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white'

  const card =
    variant === 'light'
      ? 'bg-white border border-secondary-100 shadow-sm'
      : 'bg-white/10 border border-white/15 backdrop-blur-sm'

  const valueClass =
    variant === 'light' ? 'text-primary-700' : 'text-white'

  const labelClass =
    variant === 'light' ? 'text-secondary-600' : 'text-white/85'

  return (
    <section id={id} className={`py-10 sm:py-12 lg:py-14 ${shell} ${className}`}>
      <Container>
        {(title || subtitle) && (
          <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
            {title && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-josefin mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-sm sm:text-base ${variant === 'light' ? 'text-secondary-600' : 'text-white/80'}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={`grid gap-3 sm:gap-4 ${
          items.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'
        }`}>
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className={`rounded-2xl p-4 sm:p-5 text-center ${card}`}
              >
                {Icon && (
                  <Icon
                    className={`w-6 h-6 mx-auto mb-2 ${
                      variant === 'light' ? 'text-primary-600' : 'text-accent-300'
                    }`}
                    aria-hidden
                  />
                )}
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold font-josefin tabular-nums mb-1 ${valueClass}`}>
                  {item.displayOverride ? (
                    item.displayOverride
                  ) : (
                    <AnimatedCounter end={item.end} suffix={item.suffix || ''} />
                  )}
                </div>
                <p className={`text-xs sm:text-sm font-semibold ${labelClass}`}>{item.label}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default Statistics
