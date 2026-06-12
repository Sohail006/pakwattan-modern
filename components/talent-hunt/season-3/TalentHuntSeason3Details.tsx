import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Building2,
  Calendar,
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
  TALENT_HUNT_SEASON3_OPENING,
  TALENT_HUNT_SEASON3_PILLARS,
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

const literaryContests = TALENT_HUNT_SEASON3_CONTESTS.filter((c) => c.section === 'literary')
const innovationContests = TALENT_HUNT_SEASON3_CONTESTS.filter((c) => c.section === 'innovation')

export default function TalentHuntSeason3Details() {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="container-custom space-y-12 sm:space-y-16">
        {/* Executive Summary */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-josefin text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-gray-600 leading-relaxed">{TALENT_HUNT_SEASON3_EXECUTIVE_SUMMARY}</p>
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
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
            {TALENT_HUNT_SEASON3_OPENING.description}
          </p>
          <p className="text-sm font-medium text-primary-900 bg-white/70 rounded-lg px-4 py-3 border border-primary-100">
            {TALENT_HUNT_SEASON3_OPENING.institutionCommitment}
          </p>
        </div>

        {/* Literary & Creative Arts */}
        <div>
          <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Competition Streams — Literary &amp; Creative Arts
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Season 3 features a rich lineup of literary and creative competitions, each designed to give students a
              platform to express, perform, and shine. These streams celebrate the power of language, storytelling, and
              dramatic expression while fostering confidence and public speaking skills.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {literaryContests.map((contest, i) => (
              <div
                key={contest.id}
                className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5 hover:border-primary-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-full">
                    #{i + 1}
                  </span>
                  <span className="text-primary-600">{CATEGORY_ICONS[contest.category]}</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-base mb-1">{contest.name}</h4>
                <p className="text-sm font-medium text-primary-800 mb-2">{contest.date}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{contest.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Innovation, Business & Sports */}
        <div>
          <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Competition Streams — Innovation, Business &amp; Sports
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Beyond the literary arts, Season 3 challenges students to think scientifically, pitch entrepreneurial
              ideas, and compete in sports — rounding out a holistic talent development experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {innovationContests.map((contest, i) => (
              <div
                key={contest.id}
                className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5 hover:border-primary-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-full">
                    #{i + 4}
                  </span>
                  <span className="text-primary-600">{CATEGORY_ICONS[contest.category]}</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-base mb-1">{contest.name}</h4>
                <p className="text-sm font-medium text-primary-800 mb-2">{contest.date}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{contest.description}</p>
              </div>
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
              Ready to join Talent Hunt with PWSCS Season 3? Reach out to our team to complete your partnership
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
