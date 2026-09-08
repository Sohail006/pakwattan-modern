import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'
import type { House } from '@/lib/houses-data'
import { SCHOOL_INFO } from '@/lib/constants'

type HouseDetailProps = {
  house: House
}

export default function HouseDetail({ house }: HouseDetailProps) {
  return (
    <div className="min-h-screen bg-[#0a1f14]">
      {/* Hero — brand, crest, motto, one supporting line */}
      <section
        className={`relative isolate flex min-h-[78svh] sm:min-h-[85svh] items-end overflow-hidden bg-gradient-to-br ${house.accentClass} text-white`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,_rgba(212,175,55,0.22),_transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_90%,_rgba(255,255,255,0.06),_transparent_45%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a1f14] to-transparent"
          aria-hidden
        />

        {/* Soft pattern atmosphere */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(212,175,55,0.35) 18px, rgba(212,175,55,0.35) 19px)',
          }}
          aria-hidden
        />

        <div className="container-custom relative z-10 w-full pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
          <Link
            href="/school-life#house-system"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-accent-200 animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            House System
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-end gap-10 lg:gap-14">
            <div className="animate-fade-in-up order-2 lg:order-1 text-center lg:text-left">
              <p className="font-josefin text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
                {SCHOOL_INFO.name}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">
                <Shield className="h-3.5 w-3.5" aria-hidden />
                PWSCS House
              </p>
              <h1 className="mt-3 font-josefin text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-accent-100">
                {house.name}
              </h1>
              <p className="mt-4 text-lg sm:text-xl lg:text-2xl font-semibold italic text-accent-300">
                &ldquo;{house.motto}&rdquo;
              </p>
              <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-white/85 leading-relaxed">
                {house.description}
              </p>
              <p className="mt-6 text-sm sm:text-base font-medium tracking-wide text-accent-200/90">
                {house.values.join(' · ')}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
                <Link
                  href="/school-life#house-standings"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-accent-500 px-6 font-bold text-secondary-900 transition-colors hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                >
                  View Standings
                </Link>
                <Link
                  href="/school-life#school-activities"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/35 bg-white/10 px-6 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                >
                  School Activities
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in-right">
              <div className="relative">
                <div
                  className="absolute -inset-6 rounded-[2rem] bg-accent-400/15 blur-2xl"
                  aria-hidden
                />
                <div className="relative h-64 w-52 sm:h-80 sm:w-64 lg:h-[22rem] lg:w-[18rem]">
                  <Image
                    src={house.crest.src}
                    alt={house.crest.alt}
                    width={house.crest.width}
                    height={house.crest.height}
                    priority
                    className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] animate-hero-kenburns"
                    sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 288px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Namesake — one job */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1f14] via-[#0f2e1c] to-[#123524] text-white py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-transparent"
          aria-hidden
        />
        <div className="container-custom max-w-3xl text-center sm:text-left">
          <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-accent-400">
            Our Namesake
          </p>
          <h2 className="font-josefin text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            {house.namesakeTitle}
          </h2>
          <div className="mb-6 h-0.5 w-16 mx-auto sm:mx-0 bg-accent-400/80" aria-hidden />
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">{house.namesakeBio}</p>
        </div>
      </section>

      {/* House focus — one job */}
      <section className="relative bg-[#f7faf7] py-16 sm:py-20">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10 sm:mb-12">
            <p className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">
              House Focus
            </p>
            <h2 className="font-josefin text-2xl sm:text-3xl font-bold text-secondary-900">
              Where {house.shortName} members lead
            </h2>
            <p className="mt-3 text-secondary-600 max-w-xl mx-auto">
              Students channel the house spirit through these pathways of growth and competition.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl mx-auto">
            {house.focusAreas.map((area, index) => (
              <li key={area} className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}>
                <span
                  className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-accent-200"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <div>
                  <p className="font-josefin text-lg font-bold text-secondary-900">{area}</p>
                  <div className="mt-2 h-px w-12 bg-accent-500/70" aria-hidden />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
