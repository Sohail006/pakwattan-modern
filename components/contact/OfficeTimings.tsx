'use client'

import { Clock } from 'lucide-react'
import Container from '@/components/ui/Container'
import { OFFICE_TIMINGS } from '@/lib/contact-utils'
import { useCampuses } from '@/hooks/useCampuses'

const OfficeTimings = () => {
  const { mainCampus } = useCampuses(true)

  return (
    <section className="py-8 sm:py-10 bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 text-white">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-200 mb-3">
              <Clock className="w-3.5 h-3.5" />
              Office Timings
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-josefin mb-2">When to Visit</h2>
            <p className="text-sm sm:text-base text-white/80">
              {mainCampus?.officeHours
                ? 'Hours from our main campus listing — walk-ins welcome during office time.'
                : 'Standard administration hours for parent meetings and admission queries.'}
            </p>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {OFFICE_TIMINGS.map((slot) => (
              <div
                key={slot.day}
                className="rounded-xl bg-white/10 border border-white/15 px-4 py-4 text-center"
              >
                <p className="text-sm font-semibold text-accent-200 mb-1">{slot.day}</p>
                <p className="text-base sm:text-lg font-bold">{slot.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default OfficeTimings
