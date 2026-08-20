'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { SCHOOL_INFO } from '@/lib/constants'
import { TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'

const FALLBACK_IMAGE = '/images/about-us/Picture1.jpg'

const HeroSection = () => {
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section className="relative isolate flex min-h-[85svh] sm:min-h-[90svh] items-end sm:items-center overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={FALLBACK_IMAGE}
          alt="Pak Wattan School & College of Sciences campus in Havelian"
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
            aria-label="Campus life at Pak Wattan School & College of Sciences"
          >
            <source src="/files/PromoVedio.mp4" type="video/mp4" />
            <source src="/files/bannerImage.mp4" type="video/mp4" />
          </video>
        )}

        <div
          className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 via-primary-900/75 to-primary-800/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-secondary-900/85 via-transparent to-secondary-900/35"
          aria-hidden
        />
      </div>

      <Container className="relative z-10 w-full pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="max-w-2xl animate-fade-in-up">
          <p className="font-josefin text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight drop-shadow-sm">
            {SCHOOL_INFO.name}
          </p>
          <h1 className="mt-3 sm:mt-4 font-josefin text-xl sm:text-2xl lg:text-3xl font-semibold text-accent-200 leading-snug">
            School &amp; College of Sciences
          </h1>
          <p className="mt-3 sm:mt-4 max-w-xl text-base sm:text-lg text-white/90 leading-relaxed">
            Quality education with affordable expenses in Havelian — Montessori to FSc, board
            excellence, and a thriving community of Pakians.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/admission"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-accent-500 px-6 sm:px-8 font-bold text-secondary-900 transition-colors hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              Apply Now for Admission
            </Link>
            <Link
              href="/talent-hunt/season-3"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 sm:px-8 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
              aria-label={`${TALENT_HUNT_SEASON3_TITLE} details and registration`}
            >
              Register for Talent Hunt 3
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HeroSection
