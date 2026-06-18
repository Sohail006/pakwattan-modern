'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Sparkles } from 'lucide-react'
import {
  TALENT_HUNT_PAST_SEASONS,
  TALENT_HUNT_SEASON3_FLYER,
  TALENT_HUNT_SEASON3_OPENING,
  TALENT_HUNT_SEASON3_TAGLINE,
  TALENT_HUNT_SEASON3_TITLE,
} from '@/lib/talent-hunt-season3-data'

export default function TalentHuntSeason3Hub() {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-800 mb-4">
              <Sparkles className="h-3.5 w-3.5" /> Current Season
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-josefin text-gray-900 mb-3">
              {TALENT_HUNT_SEASON3_TITLE} — <span className="text-gradient">{TALENT_HUNT_SEASON3_TAGLINE}</span>
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              District-wide inter-school talent development. Opening ceremony {TALENT_HUNT_SEASON3_OPENING.date} at{' '}
              {TALENT_HUNT_SEASON3_OPENING.venue}.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/talent-hunt/season-3#register" className="btn-primary inline-flex items-center gap-2 min-h-[44px]">
                Register Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/talent-hunt/season-3" className="btn-secondary min-h-[44px]">
                Full Details
              </Link>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary-600" />
              Academic year 2026–27
            </p>
          </div>
          <Link href="/talent-hunt/season-3" className="block overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow">
            <Image
              src={TALENT_HUNT_SEASON3_FLYER.src}
              alt={TALENT_HUNT_SEASON3_FLYER.alt}
              width={TALENT_HUNT_SEASON3_FLYER.width}
              height={TALENT_HUNT_SEASON3_FLYER.height}
              className="w-full h-auto"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </Link>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-4">Past Seasons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TALENT_HUNT_PAST_SEASONS.map((s) => (
            <div
              key={s.href}
              className="rounded-xl border border-gray-200 bg-gray-50/80 p-5 opacity-90 hover:opacity-100 transition-opacity"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-gray-800">{s.season}</h4>
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                  Past event
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">{s.year}</p>
              <p className="text-sm text-gray-600 mb-4">{s.summary}</p>
              <Link href={s.href} className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                View archive →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
