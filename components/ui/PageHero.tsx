'use client'

import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { SCHOOL_INFO } from '@/lib/constants'

export type PageHeroCta = {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  ariaLabel?: string
  external?: boolean
}

type PageHeroProps = {
  /** Page-specific headline (must not overpower brand) */
  title: string
  /** One short supporting sentence */
  description: string
  imageSrc: string
  imageAlt: string
  brand?: string
  primaryCta?: PageHeroCta
  secondaryCta?: PageHeroCta
  priority?: boolean
  className?: string
}

function HeroButton({ cta, variant }: { cta: PageHeroCta; variant: 'primary' | 'secondary' }) {
  const classes =
    variant === 'primary'
      ? 'inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 rounded-xl bg-accent-500 hover:bg-accent-400 text-secondary-900 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900'
      : 'inline-flex items-center justify-center min-h-[48px] px-6 sm:px-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/40 text-white font-semibold backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900'

  if (cta.href) {
    if (cta.external) {
      return (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={cta.ariaLabel || cta.label}
        >
          {cta.label}
        </a>
      )
    }
    return (
      <Link href={cta.href} className={classes} aria-label={cta.ariaLabel || cta.label}>
        {cta.label}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={cta.onClick}
      className={classes}
      aria-label={cta.ariaLabel || cta.label}
    >
      {cta.label}
    </button>
  )
}

/**
 * Brand-first, full-bleed page hero for internal marketing pages.
 * First viewport: brand, one headline, one supporting line, CTAs — no cards or overlays.
 */
const PageHero = ({
  title,
  description,
  imageSrc,
  imageAlt,
  brand = SCHOOL_INFO.name,
  primaryCta,
  secondaryCta,
  priority = true,
  className = '',
}: PageHeroProps) => {
  return (
    <section
      className={`relative isolate flex min-h-[78svh] sm:min-h-[85svh] items-end sm:items-center overflow-hidden text-white ${className}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center animate-hero-kenburns"
      />

      {/* Readable scrim — keeps contrast without covering the photo entirely */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 via-primary-900/75 to-primary-800/45"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-secondary-900/30"
        aria-hidden
      />

      <Container className="relative z-10 w-full pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="max-w-2xl animate-fade-in-up">
          <p className="font-josefin text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white drop-shadow-sm">
            {brand}
          </p>
          <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-accent-200 font-josefin leading-snug">
            {title}
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
            {description}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {primaryCta && (
                <HeroButton cta={primaryCta} variant={primaryCta.variant || 'primary'} />
              )}
              {secondaryCta && (
                <HeroButton cta={secondaryCta} variant={secondaryCta.variant || 'secondary'} />
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default PageHero
