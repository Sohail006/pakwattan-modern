'use client'

import Link from 'next/link'
import { Eye, Target, Heart, Shield, ArrowRight } from 'lucide-react'
import Accordion from '@/components/ui/Accordion'
import { ABOUT_MISSION, ABOUT_VALUES, ABOUT_VISION } from '@/lib/about-data'

const VisionTab = () => {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="max-w-3xl">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-600 mb-2">
          Purpose
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold font-josefin text-secondary-900 mb-3">
          Vision, Mission & Values
        </h3>
        <p className="text-secondary-600 leading-relaxed">
          Clear goals guide every classroom, scholarship, and campus decision at Pak Wattan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="rounded-2xl bg-white border border-primary-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-11 h-11 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </span>
            <h4 className="text-lg font-bold text-secondary-900">Vision</h4>
          </div>
          <ul className="space-y-2.5">
            {ABOUT_VISION.map((point) => (
              <li key={point} className="flex gap-2 text-sm sm:text-base text-secondary-700">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-600 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white border border-accent-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-11 h-11 rounded-xl bg-accent-100 text-accent-700 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </span>
            <h4 className="text-lg font-bold text-secondary-900">Mission</h4>
          </div>
          <ul className="space-y-2.5">
            {ABOUT_MISSION.map((point) => (
              <li key={point} className="flex gap-2 text-sm sm:text-base text-secondary-700">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-600 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h4 className="text-lg sm:text-xl font-bold font-josefin text-secondary-900 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary-600" />
          Core Values
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {ABOUT_VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-secondary-100 bg-secondary-50/60 p-4"
            >
              <p className="font-semibold text-secondary-900 mb-1">{value.title}</p>
              <p className="text-xs sm:text-sm text-secondary-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-accent-50/40 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <Shield className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h4 className="text-lg font-bold text-secondary-900 mb-1">House System</h4>
              <p className="text-sm sm:text-base text-secondary-600 leading-relaxed">
                Our four houses turn vision and values into daily leadership, teamwork, and healthy
                competition — each inspired by a national hero.
              </p>
            </div>
          </div>
          <Link
            href="/school-life#house-system"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Explore Houses
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      <Accordion
        defaultOpenId="academic"
        items={[
          {
            id: 'academic',
            title: 'Academic excellence',
            content:
              'Innovative teaching, qualified faculty, and a curriculum aligned with strong board outcomes.',
          },
          {
            id: 'character',
            title: 'Character development',
            content:
              'Beyond grades—we build leadership, moral values, and confidence for life beyond campus.',
          },
        ]}
      />
    </div>
  )
}

export default VisionTab
