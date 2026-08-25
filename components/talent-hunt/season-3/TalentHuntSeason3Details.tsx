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
  TALENT_HUNT_SEASON3_EXECUTIVE_SUMMARY,
  TALENT_HUNT_SEASON3_EXPERTS,
  TALENT_HUNT_SEASON3_EXPERTS_INTRO,
  TALENT_HUNT_SEASON3_OBJECTIVES,
  TALENT_HUNT_SEASON3_OPENING,
  TALENT_HUNT_SEASON3_PERIOD,
  TALENT_HUNT_SEASON3_PILLARS,
  TALENT_HUNT_SEASON3_TIMELINE,
} from '@/lib/talent-hunt-season3-data'

const CATEGORY_ICONS: Record<string, ReactNode> = {
  'Literary Arts': <BookOpen className="h-5 w-5" />,
  'Science & Innovation': <FlaskConical className="h-5 w-5" />,
  Entrepreneurship: <Lightbulb className="h-5 w-5" />,
  Sports: <Trophy className="h-5 w-5" />,
}

const PILLAR_ICONS: Record<string, ReactNode> = {
  'Literary Arts': <BookOpen className="h-6 w-6" />,
  'Science & Innovation': <FlaskConical className="h-6 w-6" />,
  Entrepreneurship: <Lightbulb className="h-6 w-6" />,
  Sports: <Trophy className="h-6 w-6" />,
}

export default function TalentHuntSeason3Details() {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="container-custom space-y-12 sm:space-y-16">
        {/* Executive Summary */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary-700 mb-2">{TALENT_HUNT_SEASON3_PERIOD}</p>
          <h2 className="text-2xl sm:text-3xl font-bold font-josefin text-gray-900 mb-4">About Talent Hunt Season 3</h2>
          <p className="text-gray-600 leading-relaxed">{TALENT_HUNT_SEASON3_EXECUTIVE_SUMMARY}</p>
        </div>

        {/* Objectives */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 text-center">Objectives</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TALENT_HUNT_SEASON3_OBJECTIVES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm sm:text-base text-gray-700"
              >
                <CheckCircle2 className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Program Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TALENT_HUNT_SEASON3_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5 hover:border-primary-200 hover:shadow-md transition-shadow"
            >
              <div className="mb-3 inline-flex rounded-lg bg-primary-100 p-2 text-primary-700">
                {PILLAR_ICONS[pillar.title]}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{pillar.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Grand Opening Ceremony */}
        <div className="rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 to-emerald-50 p-6 sm:p-8">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-700 mb-1">
            {TALENT_HUNT_SEASON3_OPENING.subtitle}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-primary-900 mb-3">{TALENT_HUNT_SEASON3_OPENING.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm sm:text-base mb-4">
            <span className="inline-flex items-center gap-2 font-medium text-primary-800">
              <Calendar className="h-4 w-4 shrink-0" aria-hidden />
              {TALENT_HUNT_SEASON3_OPENING.date}
            </span>
            <span className="inline-flex items-center gap-2 font-medium text-primary-800">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {TALENT_HUNT_SEASON3_OPENING.venue}
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {TALENT_HUNT_SEASON3_OPENING.description}
          </p>
        </div>

        {/* Annual Competition Timeline */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 text-center">
            Annual Competition Timeline
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-primary-700 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Stream</th>
                </tr>
              </thead>
              <tbody>
                {TALENT_HUNT_SEASON3_TIMELINE.map((row, index) => (
                  <tr
                    key={`${row.date}-${row.stream}`}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-primary-50/40'}
                  >
                    <td className="px-4 py-3 font-medium text-primary-900 whitespace-nowrap">{row.date}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {row.stream}
                      {'venue' in row && row.venue ? (
                        <span className="block text-xs text-gray-500 mt-0.5">{row.venue}</span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Six Competition Streams */}
        <div>
          <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Six Competition Streams</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Through six exciting streams, participants showcase creativity, leadership, innovation, communication,
              and sportsmanship on a prestigious district-wide platform.
            </p>
          </div>

          <div className="space-y-5">
            {TALENT_HUNT_SEASON3_CONTESTS.map((contest) => (
              <article
                key={contest.id}
                id={`stream-${contest.streamNumber}`}
                className="rounded-2xl border border-gray-200 bg-gray-50/40 p-5 sm:p-6 hover:border-primary-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary-700 mb-1">
                      Stream {contest.streamNumber}
                    </p>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900">{contest.name}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-600">{CATEGORY_ICONS[contest.category]}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs sm:text-sm font-semibold text-primary-800">
                      <Calendar className="h-3.5 w-3.5" aria-hidden />
                      {contest.date}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">{contest.description}</p>

                <ul className="flex flex-wrap gap-2 mb-4">
                  {contest.highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs sm:text-sm text-gray-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {contest.details?.map((block) => (
                  <div key={block.label} className="mt-4">
                    <h5 className="text-sm font-bold text-gray-900 mb-2">{block.label}</h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-500 shrink-0" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>

        {/* Distinguished Experts */}
        <div>
          <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
              <Users className="h-6 w-6 text-primary-600" />
              Distinguished Experts
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{TALENT_HUNT_SEASON3_EXPERTS_INTRO}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TALENT_HUNT_SEASON3_EXPERTS.map((expert) => (
              <div key={expert.title} className="rounded-xl border border-gray-200 p-4 sm:p-5">
                <h4 className="font-bold text-gray-900 mb-2">{expert.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{expert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Registration CTA */}
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-primary-50 p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary-600" />
              Contact Us &amp; Get Registered
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Ready to join Talent Hunt with Pak Wattan Season 3? Reach out to our team to complete your partnership
              registration and secure your institution&apos;s place in this landmark district-wide initiative.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl bg-white border border-gray-100 p-4 flex gap-3">
              <Building2 className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Institution</p>
                <p className="text-sm font-medium text-gray-900">{TALENT_HUNT_SEASON3_CONTACT.institution}</p>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 p-4 flex gap-3">
              <Globe className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Website</p>
                <a
                  href={TALENT_HUNT_SEASON3_CONTACT.website}
                  className="text-sm font-medium text-primary-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {TALENT_HUNT_SEASON3_CONTACT.websiteLabel}
                </a>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 p-4 flex gap-3">
              <Mail className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</p>
                <a
                  href={`mailto:${TALENT_HUNT_SEASON3_CONTACT.email}`}
                  className="text-sm font-medium text-primary-700 hover:underline break-all"
                >
                  {TALENT_HUNT_SEASON3_CONTACT.email}
                </a>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 p-4 flex gap-3">
              <Phone className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                <a
                  href={`tel:${TALENT_HUNT_SEASON3_CONTACT.phone.replace(/\s/g, '')}`}
                  className="text-sm font-medium text-primary-700 hover:underline"
                >
                  {TALENT_HUNT_SEASON3_CONTACT.phone}
                </a>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 p-4 flex gap-3">
              <Users className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Social Media</p>
                <a
                  href={TALENT_HUNT_SEASON3_CONTACT.socialUrl}
                  className="text-sm font-medium text-primary-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {TALENT_HUNT_SEASON3_CONTACT.socialMedia}
                </a>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 p-4 flex gap-3 sm:col-span-2 lg:col-span-1">
              <MapPin className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</p>
                <p className="text-sm font-medium text-gray-900">{TALENT_HUNT_SEASON3_CONTACT.location}</p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm sm:text-base font-medium text-gray-800 mb-6">
            {TALENT_HUNT_SEASON3_CONTACT.closingLine}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="#register-participant" className="btn-primary text-center min-h-[44px]">
              Participants Registration
            </Link>
            <Link href="#register-institution" className="btn-accent text-center min-h-[44px]">
              Institution Registration
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
