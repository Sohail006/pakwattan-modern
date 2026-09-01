import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  FlaskConical,
  Globe,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react'
import {
  TALENT_HUNT_SEASON3_CONTACT,
  TALENT_HUNT_SEASON3_CONTESTS,
  TALENT_HUNT_SEASON3_EXPERTS,
  TALENT_HUNT_SEASON3_EXPERTS_INTRO,
  TALENT_HUNT_SEASON3_OBJECTIVES,
  TALENT_HUNT_SEASON3_OPENING,
  TALENT_HUNT_SEASON3_PILLARS,
  TALENT_HUNT_SEASON3_TIMELINE,
} from '@/lib/talent-hunt-season3-data'

const CATEGORY_ICONS: Record<string, ReactNode> = {
  'Literary Arts': <BookOpen className="h-5 w-5" />,
  'Science & Innovation': <FlaskConical className="h-5 w-5" />,
  Entrepreneurship: <Lightbulb className="h-5 w-5" />,
  Sports: <Trophy className="h-5 w-5" />,
}

const PILLAR_STYLES: Record<string, string> = {
  'Literary Arts': 'from-emerald-600 to-primary-700',
  'Science & Innovation': 'from-teal-600 to-cyan-700',
  Entrepreneurship: 'from-amber-500 to-orange-600',
  Sports: 'from-rose-600 to-red-700',
}

const STREAM_ACCENTS = [
  'border-l-emerald-500',
  'border-l-sky-500',
  'border-l-violet-500',
  'border-l-teal-500',
  'border-l-amber-500',
  'border-l-rose-500',
]

export default function TalentHuntSeason3Details() {
  return (
    <div className="bg-white">
      {/* Objectives */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-primary-50/40">
        <div className="container-custom">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-700">Why Season 3</p>
            <h3 className="font-josefin text-2xl sm:text-3xl font-bold text-secondary-900">Objectives</h3>
          </div>
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TALENT_HUNT_SEASON3_OBJECTIVES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-primary-100/80 bg-white px-4 py-4 text-sm sm:text-base text-secondary-700 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                </span>
                <span className="leading-snug pt-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-12 sm:py-16">
        <div className="container-custom">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-700">Four pillars</p>
            <h3 className="font-josefin text-2xl sm:text-3xl font-bold text-secondary-900">
              Talent across every stage
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TALENT_HUNT_SEASON3_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${PILLAR_STYLES[pillar.title]} p-3 text-white shadow-md`}
                >
                  {CATEGORY_ICONS[pillar.title]}
                </div>
                <h4 className="mb-2 font-josefin text-lg font-bold text-secondary-900">{pillar.title}</h4>
                <p className="text-sm leading-relaxed text-secondary-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening ceremony */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-emerald-800 text-white">
        <div
          className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl"
          aria-hidden
        />
        <div className="container-custom relative py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-200">
              {TALENT_HUNT_SEASON3_OPENING.subtitle}
            </p>
            <h3 className="mb-5 font-josefin text-3xl sm:text-4xl font-bold leading-tight">
              {TALENT_HUNT_SEASON3_OPENING.title}
            </h3>
            <div className="mb-5 flex flex-wrap gap-3 text-sm sm:text-base">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-accent-300" aria-hidden />
                {TALENT_HUNT_SEASON3_OPENING.date}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-accent-300" aria-hidden />
                {TALENT_HUNT_SEASON3_OPENING.venue}
              </span>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-white/85">
              {TALENT_HUNT_SEASON3_OPENING.description}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 bg-secondary-50/60">
        <div className="container-custom">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-700">Season calendar</p>
            <h3 className="font-josefin text-2xl sm:text-3xl font-bold text-secondary-900">
              Annual Competition Timeline
            </h3>
          </div>

          <ol className="relative mx-auto max-w-3xl space-y-0">
            <div
              className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-primary-500 via-accent-400 to-primary-600 sm:left-[19px]"
              aria-hidden
            />
            {TALENT_HUNT_SEASON3_TIMELINE.map((row, index) => (
              <li key={`${row.date}-${row.stream}`} className="relative flex gap-4 pb-8 last:pb-0">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-primary-600 text-xs font-bold text-white shadow-md sm:h-10 sm:w-10 sm:text-sm">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                  <p className="text-sm font-bold text-primary-700">{row.date}</p>
                  <p className="mt-1 text-base font-semibold text-secondary-900 sm:text-lg">{row.stream}</p>
                  {'venue' in row && row.venue ? (
                    <p className="mt-1 text-sm text-secondary-500">{row.venue}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Six streams */}
      <section className="py-12 sm:py-16">
        <div className="container-custom">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-700">Competition lineup</p>
            <h3 className="font-josefin text-2xl sm:text-3xl font-bold text-secondary-900 mb-3">
              Six Competition Streams
            </h3>
            <p className="text-secondary-600 text-sm sm:text-base leading-relaxed">
              Creativity, leadership, innovation, communication, and sportsmanship — each stream is a stage to shine.
            </p>
          </div>

          <div className="space-y-6">
            {TALENT_HUNT_SEASON3_CONTESTS.map((contest, index) => (
              <article
                key={contest.id}
                id={`stream-${contest.streamNumber}`}
                className={`scroll-mt-28 overflow-hidden rounded-2xl border border-gray-100 border-l-4 ${STREAM_ACCENTS[index]} bg-white shadow-sm transition-shadow hover:shadow-lg`}
              >
                <div className="bg-gradient-to-r from-secondary-50 to-white px-5 py-4 sm:px-6 sm:py-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-primary-700">
                        Stream {contest.streamNumber}
                      </p>
                      <h4 className="font-josefin text-xl sm:text-2xl font-bold text-secondary-900">
                        {contest.name}
                      </h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-600/10 px-3 py-1 text-xs font-semibold text-primary-800">
                        {CATEGORY_ICONS[contest.category]}
                        {contest.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold text-secondary-800">
                        <Calendar className="h-3.5 w-3.5" aria-hidden />
                        {contest.date}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-secondary-600">
                    {contest.description}
                  </p>
                </div>

                <div className="px-5 py-4 sm:px-6 sm:py-5">
                  <ul className="mb-5 flex flex-wrap gap-2">
                    {contest.highlights.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg bg-primary-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary-900"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  {contest.details?.length ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                      {contest.details.map((block) => (
                        <div key={block.label} className="rounded-xl bg-secondary-50/80 p-4">
                          <h5 className="mb-2 text-sm font-bold text-secondary-900">{block.label}</h5>
                          <ul className="space-y-1.5">
                            {block.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-secondary-600">
                                <span
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                                  aria-hidden
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experts */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-primary-50/50 to-white">
        <div className="container-custom">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-700">Judging panel</p>
            <h3 className="mb-3 font-josefin text-2xl sm:text-3xl font-bold text-secondary-900">
              Distinguished Experts
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-secondary-600">
              {TALENT_HUNT_SEASON3_EXPERTS_INTRO}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TALENT_HUNT_SEASON3_EXPERTS.map((expert, index) => (
              <div
                key={expert.title}
                className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h4 className="font-josefin text-lg font-bold text-secondary-900">{expert.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-secondary-600">{expert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-14 sm:pb-20">
        <div className="container-custom">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary-800 via-primary-700 to-emerald-700 text-white shadow-xl">
            <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:p-10">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-200">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Get involved
                </p>
                <h3 className="mb-3 font-josefin text-2xl sm:text-3xl font-bold">
                  Contact Us &amp; Get Registered
                </h3>
                <p className="mb-6 max-w-xl text-sm sm:text-base leading-relaxed text-white/85">
                  Ready to join Talent Hunt with Pak Wattan Season 3? Complete registration above, or reach our campus
                  team for partnership guidance.
                </p>
                <p className="mb-6 text-sm font-medium text-accent-100">
                  {TALENT_HUNT_SEASON3_CONTACT.closingLine}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#register-participant"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent-500 px-6 font-bold text-secondary-900 transition-colors hover:bg-accent-400"
                  >
                    Participants Registration
                  </Link>
                  <Link
                    href="#register-institution"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    Institution Registration
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: Building2,
                    label: 'Institution',
                    value: TALENT_HUNT_SEASON3_CONTACT.institution,
                  },
                  {
                    icon: Phone,
                    label: 'Phone',
                    value: TALENT_HUNT_SEASON3_CONTACT.phone,
                    href: `tel:${TALENT_HUNT_SEASON3_CONTACT.phone.replace(/\s/g, '')}`,
                  },
                  {
                    icon: Mail,
                    label: 'Email',
                    value: TALENT_HUNT_SEASON3_CONTACT.email,
                    href: `mailto:${TALENT_HUNT_SEASON3_CONTACT.email}`,
                  },
                  {
                    icon: Globe,
                    label: 'Website',
                    value: TALENT_HUNT_SEASON3_CONTACT.websiteLabel,
                    href: TALENT_HUNT_SEASON3_CONTACT.website,
                  },
                  {
                    icon: Users,
                    label: 'Social',
                    value: TALENT_HUNT_SEASON3_CONTACT.socialMedia,
                    href: TALENT_HUNT_SEASON3_CONTACT.socialUrl,
                  },
                  {
                    icon: MapPin,
                    label: 'Location',
                    value: TALENT_HUNT_SEASON3_CONTACT.location,
                  },
                ].map((item) => {
                  const Icon = item.icon
                  const content = (
                    <>
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" aria-hidden />
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">{item.label}</p>
                        <p className="truncate text-sm font-medium text-white">{item.value}</p>
                      </div>
                    </>
                  )
                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/15"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label} className="flex gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                      {content}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
