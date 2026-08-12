'use client'

import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  CalendarDays,
  Gift,
  School,
  Trophy,
  UserPlus,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import { HERO_QUICK_LINKS } from '@/lib/constants'

type DestinationLink = {
  title: string
  href: string
  icon: LucideIcon
  iconClass: string
}

/**
 * Icon choices (meaning → glyph):
 * - Jobs → Briefcase (careers / hiring)
 * - Scholarships → Gift (merit & need-based awards)
 * - Talent Hunt → Trophy (competition & winners)
 * - PCA → School (coaching / academy learning)
 * - Events / co-curricular → CalendarDays (programmes & exposure calendar)
 * - Faculty registration → UserPlus (join as faculty)
 */
const ICON_BY_HREF: Record<string, Pick<DestinationLink, 'icon' | 'iconClass'>> = {
  '/jobs': {
    icon: Briefcase,
    iconClass: 'text-sky-700',
  },
  '/scholarships': {
    icon: Gift,
    iconClass: 'text-emerald-700',
  },
  '/talent-hunt': {
    icon: Trophy,
    iconClass: 'text-amber-700',
  },
  '/pakians-coaching-academy': {
    icon: School,
    iconClass: 'text-primary-700',
  },
  '/pakians-events': {
    icon: CalendarDays,
    iconClass: 'text-violet-700',
  },
  '/pakians-faculty-registration': {
    icon: UserPlus,
    iconClass: 'text-rose-700',
  },
}

const EXTRA_LINKS: Omit<DestinationLink, 'icon' | 'iconClass'>[] = [
  {
    title: 'Faculty Registration',
    href: '/pakians-faculty-registration',
  },
]

const HeroQuickLinks = () => {
  const links: DestinationLink[] = [...HERO_QUICK_LINKS, ...EXTRA_LINKS].map((link) => {
    const mapped = ICON_BY_HREF[link.href] ?? {
      icon: School,
      iconClass: 'text-primary-700',
    }
    return {
      title: link.title,
      href: link.href,
      icon: mapped.icon,
      iconClass: mapped.iconClass,
    }
  })

  return (
    <section
      className="border-b border-secondary-100 bg-white py-2.5 sm:py-3"
      aria-label="Popular destinations"
    >
      <Container>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <h2 className="shrink-0 font-josefin text-sm font-bold text-secondary-800 sm:text-base">
            Popular destinations
          </h2>
          <ul className="flex flex-wrap gap-1.5 sm:gap-2">
            {links.map((link) => {
              const Icon = link.icon
              return (
                <li key={link.href + link.title}>
                  <Link
                    href={link.href}
                    className="group inline-flex h-8 items-center gap-1.5 rounded-md border border-secondary-100 bg-secondary-50/70 px-2.5 text-xs font-semibold text-secondary-800 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800 sm:h-9 sm:px-3 sm:text-sm"
                  >
                    <Icon
                      className={`h-3.5 w-3.5 shrink-0 transition-transform group-hover:scale-110 ${link.iconClass}`}
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    <span className="whitespace-nowrap">{link.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}

export default HeroQuickLinks
