'use client'

import Link from 'next/link'
import { Shield, Trophy, ArrowRight } from 'lucide-react'
import HouseStandings from '@/components/school-life/HouseStandings'
import {
  HOUSE_SYSTEM_ANCHOR,
  HOUSE_SYSTEM_CTA,
  HOUSE_SYSTEM_INTRO,
  HOUSE_SYSTEM_PILLARS,
} from '@/lib/houses-data'

const HouseSystem = () => {
  return (
    <section
      id={HOUSE_SYSTEM_ANCHOR}
      className="relative overflow-hidden section-padding bg-gradient-to-br from-[#0f2e1c] via-primary-900 to-secondary-900 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.12),_transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(5,122,85,0.2),_transparent_50%)]"
        aria-hidden
      />

      <div className="container-custom relative">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-accent-200 backdrop-blur-sm">
            <Shield className="h-3.5 w-3.5 text-accent-400" aria-hidden />
            PWSCS House System
          </p>
          <h2 className="font-josefin text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            <span className="bg-gradient-to-r from-accent-200 via-accent-300 to-accent-400 bg-clip-text text-transparent">
              Four Houses. One Spirit.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-4">{HOUSE_SYSTEM_INTRO}</p>
          <p className="text-sm sm:text-base font-medium text-accent-200/90">{HOUSE_SYSTEM_CTA}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16 max-w-4xl mx-auto">
          {HOUSE_SYSTEM_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
            >
              <p className="font-josefin text-sm sm:text-base font-bold text-accent-300 mb-1">{pillar.title}</p>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        <HouseStandings />

        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="#school-activities"
            className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-sm sm:text-base font-bold text-secondary-900 transition-colors hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          >
            <Trophy className="h-4 w-4" aria-hidden />
            View School Activities
          </Link>
          <Link
            href="/talent-hunt"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          >
            Talent Hunt
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HouseSystem
