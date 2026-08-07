'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Trophy } from 'lucide-react'
import Accordion from '@/components/ui/Accordion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { AWARD_CATEGORIES, SCHOLARSHIP_TYPES } from '@/lib/about-data'

const AchievementsTab = () => {
  return (
    <div id="achievements" className="space-y-8 sm:space-y-10">
      <div className="max-w-3xl">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-accent-600 mb-2">
          Results that matter
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold font-josefin text-secondary-900 mb-3">
          Achievements & Recognition
        </h3>
        <p className="text-secondary-600 leading-relaxed">
          Circle toppers, scholarships, and a culture of celebrating every student&apos;s progress.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { end: 6, suffix: 'x', label: 'Circle Top Streak' },
          { end: 3000, suffix: '+', label: 'Students' },
          { end: 1100, suffix: '+', label: 'Awards' },
          { end: 4, suffix: '', label: 'Campuses' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-accent-100 bg-white p-4 sm:p-5 text-center shadow-sm"
          >
            <div className="text-2xl sm:text-3xl font-bold font-josefin text-primary-700 tabular-nums mb-1">
              <AnimatedCounter end={stat.end} suffix={stat.suffix} />
            </div>
            <p className="text-xs sm:text-sm text-secondary-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div id="prize-distribution">
        <h4 className="text-lg sm:text-xl font-bold font-josefin text-secondary-900 mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent-600" />
          Prize Distribution Highlights
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
          {AWARD_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100 p-4"
            >
              <p className="font-semibold text-secondary-900 text-sm sm:text-base mb-1">
                {category.title}
              </p>
              <p className="text-xs sm:text-sm text-secondary-600">{category.description}</p>
            </div>
          ))}
        </div>
        <Accordion
          items={[
            {
              id: 'ceremony',
              title: 'Annual ceremony (23 March)',
              content:
                'Student participation, scholarship awards, and certificates celebrating academic and special achievements each year.',
            },
            {
              id: 'scholarships',
              title: 'Scholarship programmes',
              content: (
                <ul className="space-y-2">
                  {SCHOLARSHIP_TYPES.map((item) => (
                    <li key={item.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-secondary-100 last:border-0 pb-2 last:pb-0">
                      <span>
                        <strong className="text-secondary-900">{item.name}</strong>
                        <span className="block text-secondary-600 text-sm">{item.detail}</span>
                      </span>
                      <span className="text-xs font-semibold rounded-full bg-primary-100 text-primary-800 px-2.5 py-1 self-start">
                        {item.percent}
                      </span>
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
        />
      </div>

      <div id="growth-chart" className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-center">
        <div className="relative rounded-2xl bg-white border border-secondary-100 shadow-md p-4 sm:p-5">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/images/about-us/GrowthOverYearPAWPSC.png"
              alt="Pak Wattan growth chart"
              fill
              className="object-contain"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <div>
          <h4 className="text-lg sm:text-xl font-bold font-josefin text-secondary-900 mb-3">
            Growth Chart
          </h4>
          <p className="text-sm sm:text-base text-secondary-600 leading-relaxed mb-5">
            From foundation year to a multi-campus community of 3000+ students—our growth reflects
            trust from Havelian families and consistent board excellence.
          </p>
          <Link
            href="/admission"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold shadow-md hover:from-accent-600 hover:to-accent-700 transition-all"
          >
            Apply for admission
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AchievementsTab
