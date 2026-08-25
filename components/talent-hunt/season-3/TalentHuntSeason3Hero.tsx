'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { SCHOOL_INFO } from '@/lib/constants'
import {
  TALENT_HUNT_SEASON3_INTRO,
  TALENT_HUNT_SEASON3_OPENING,
  TALENT_HUNT_SEASON3_PERIOD,
  TALENT_HUNT_SEASON3_TAGLINE,
  TALENT_HUNT_SEASON3_TITLE,
} from '@/lib/talent-hunt-season3-data'

const FALLBACK_IMAGE = '/images/talent-hunt/Talenthunt3fliyer.webp'

export default function TalentHuntSeason3Hero() {
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section className="relative isolate flex min-h-[78svh] sm:min-h-[88svh] items-end sm:items-center overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={FALLBACK_IMAGE}
          alt="Pak Wattan Talent Hunt Season 3"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center animate-hero-kenburns transition-opacity duration-700 ${
            !videoError && videoLoaded ? 'opacity-100 md:opacity-0' : 'opacity-100'
          }`}
        />

        {!videoError && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={FALLBACK_IMAGE}
            onError={() => setVideoError(true)}
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 hidden h-full w-full object-cover transition-opacity duration-700 md:block ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Talent Hunt with Pak Wattan Season 3 promo video"
          >
            <source src="/files/PromoVedio.mp4" type="video/mp4" />
            <source src="/files/bannerImage.mp4" type="video/mp4" />
          </video>
        )}

        <div
          className="absolute inset-0 bg-gradient-to-r from-secondary-900/92 via-primary-900/78 to-primary-800/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-secondary-900/90 via-transparent to-secondary-900/35"
          aria-hidden
        />
      </div>

      <Container className="relative z-10 w-full pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="max-w-2xl animate-fade-in-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs sm:text-sm font-semibold tracking-wide text-white/95 backdrop-blur-sm">
            Season 3 · {TALENT_HUNT_SEASON3_PERIOD}
          </p>
          <p className="font-josefin text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white drop-shadow-sm">
            {SCHOOL_INFO.name}
          </p>
          <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-accent-200 font-josefin leading-snug">
            {TALENT_HUNT_SEASON3_TITLE}
          </h1>
          <p className="mt-2 text-sm sm:text-base font-semibold tracking-[0.18em] text-white/85 uppercase">
            {TALENT_HUNT_SEASON3_TAGLINE}
          </p>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-white/90 leading-relaxed">
            {TALENT_HUNT_SEASON3_INTRO}
          </p>
          <p className="mt-3 text-sm text-white/75">
            Opening {TALENT_HUNT_SEASON3_OPENING.date} · {TALENT_HUNT_SEASON3_OPENING.venue}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="#register"
              className="inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 rounded-xl bg-accent-500 hover:bg-accent-400 text-secondary-900 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              Register Now for Stream 1
            </Link>
            <Link
              href="#stream-1"
              className="inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/40 text-white font-semibold backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              Explore Streams
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
