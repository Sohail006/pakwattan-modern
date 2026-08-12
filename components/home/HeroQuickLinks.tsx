'use client'

import Link from 'next/link'
import { Award, BookOpen, Briefcase, CalendarDays, GraduationCap, Trophy } from 'lucide-react'
import Container from '@/components/ui/Container'
import { HERO_QUICK_LINKS } from '@/lib/constants'

const ICONS = [Briefcase, Award, Trophy, BookOpen, CalendarDays]

const EXTRA_LINKS = [
  {
    title: 'Faculty Registration',
    href: '/pakians-faculty-registration',
    icon: GraduationCap,
  },
]

const HeroQuickLinks = () => {
  const links = [
    ...HERO_QUICK_LINKS.map((link, index) => ({
      title: link.title,
      href: link.href,
      icon: ICONS[index] || BookOpen,
    })),
    ...EXTRA_LINKS,
  ]

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
                    <Icon className="h-3.5 w-3.5 shrink-0 text-primary-700" aria-hidden />
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
