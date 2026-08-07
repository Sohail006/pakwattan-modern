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
      className="border-b border-secondary-100 bg-white py-6 sm:py-8"
      aria-label="Popular destinations"
    >
      <Container>
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">Explore</p>
            <h2 className="font-josefin text-xl sm:text-2xl font-bold text-secondary-900">
              Popular destinations
            </h2>
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <li key={link.href + link.title}>
                <Link
                  href={link.href}
                  className="group flex min-h-[52px] items-center gap-3 rounded-xl border border-secondary-100 bg-secondary-50/60 px-4 py-3 transition-colors hover:border-primary-200 hover:bg-primary-50"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary-700 shadow-sm">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-secondary-900 group-hover:text-primary-800">
                    {link.title}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

export default HeroQuickLinks
