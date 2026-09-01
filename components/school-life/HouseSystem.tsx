'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Shield, Trophy, ArrowRight } from 'lucide-react'
import HouseStandings from '@/components/school-life/HouseStandings'
import {
  HOUSE_SYSTEM_ANCHOR,
  HOUSE_SYSTEM_CTA,
  HOUSE_SYSTEM_INTRO,
  HOUSE_SYSTEM_PILLARS,
  HOUSES,
} from '@/lib/houses-data'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const HouseSystem = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.08,
    freezeOnceVisible: true,
  })

  const isVisible = entry?.isIntersecting

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

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {HOUSES.map((house, index) => (
            <article
              key={house.id}
              id={house.id}
              className={`group relative overflow-hidden rounded-2xl border border-accent-500/20 bg-gradient-to-br ${house.accentClass} shadow-xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-accent-400/40 ${
                isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent-400 to-transparent opacity-60" aria-hidden />

              <div className="flex flex-col sm:flex-row gap-5 p-5 sm:p-6">
                <div className="mx-auto sm:mx-0 shrink-0">
                  <div className="relative h-36 w-28 sm:h-40 sm:w-32 overflow-hidden rounded-xl bg-black/30 ring-2 ring-accent-500/30 shadow-lg">
                    <Image
                      src={house.crest.src}
                      alt={house.crest.alt}
                      width={house.crest.width}
                      height={house.crest.height}
                      className="h-full w-full object-contain p-1"
                      sizes="(max-width: 640px) 112px, 128px"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h3 className="font-josefin text-lg sm:text-xl font-bold text-white mb-1">{house.name}</h3>
                  <p className="text-sm font-semibold italic text-accent-300 mb-3">&ldquo;{house.motto}&rdquo;</p>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">{house.description}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                    {house.values.map((value) => (
                      <span
                        key={value}
                        className="inline-flex rounded-full border border-accent-400/25 bg-black/20 px-2.5 py-0.5 text-xs font-medium text-accent-100"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/school-life/houses/${house.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-200 transition-colors hover:text-accent-100"
                  >
                    Learn more about {house.shortName}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

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
