'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Sparkles } from 'lucide-react'
import { TALENT_HUNT_SEASON3_TAGLINE, TALENT_HUNT_SEASON3_OPENING } from '@/lib/talent-hunt-season3-data'

export default function TalentHuntSeason3Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-emerald-700 text-white">
      <div className="container-custom relative py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-5 sm:space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="h-4 w-4" aria-hidden />
              Current Season · 2026–27
            </p>
            <h1 className="font-josefin text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Talent Hunt with Pak Wattan
              <span className="mt-2 block text-amber-200">Season 3</span>
            </h1>
            <p className="text-lg sm:text-xl font-semibold tracking-widest text-white/90">{TALENT_HUNT_SEASON3_TAGLINE}</p>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-xl">
              A district-wide inter-school talent development initiative bringing together students, educational
              institutions, and national & international experts on one prestigious platform.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                <Calendar className="h-4 w-4 shrink-0" aria-hidden />
                Opening: {TALENT_HUNT_SEASON3_OPENING.date}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                {TALENT_HUNT_SEASON3_OPENING.venue}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="#register" className="btn-accent text-center min-h-[44px]">
                Register Now
              </Link>
              <Link href="/talent-hunt" className="btn-secondary text-center min-h-[44px]">
                All Seasons
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/20">
              <Image
                src="/images/talent-hunt/season-3-flyer.png"
                alt="Talent Hunt Season 3 official flyer"
                width={600}
                height={800}
                className="h-auto w-full object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
