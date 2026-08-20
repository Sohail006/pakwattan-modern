'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { SCHOOL_INFO } from '@/lib/constants'
import { TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'

const FALLBACK_IMAGE = '/images/talent-hunt/Talenthunt3fliyer.webp'

const TalentHuntHero = () => {
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section className="relative isolate flex min-h-[78svh] sm:min-h-[85svh] items-end sm:items-center overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={FALLBACK_IMAGE}
          alt="Pak Wattan Talent Hunt Season 3 promotional flyer"
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
          className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 via-primary-900/75 to-primary-800/45"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-secondary-900/30"
          aria-hidden
        />
      </div>

      <Container className="relative z-10 w-full pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="max-w-2xl animate-fade-in-up">
          <p className="font-josefin text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white drop-shadow-sm">
            {SCHOOL_INFO.name}
          </p>
          <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-accent-200 font-josefin leading-snug">
            Talent Hunt with Pak Wattan
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
            {TALENT_HUNT_SEASON3_TITLE} — a district-wide stage for literary, scientific,
            entrepreneurial, and sports talent.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/talent-hunt/season-3#register"
              className="inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 rounded-xl bg-accent-500 hover:bg-accent-400 text-secondary-900 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              Register Now for Stream 1
            </Link>
            <Link
              href="/talent-hunt/season-3"
              className="inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/40 text-white font-semibold backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              Season 3 Details
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default TalentHuntHero
