import type { ReactNode } from 'react'
import { BookOpen, FlaskConical, Lightbulb, Trophy, Users } from 'lucide-react'
import {
  TALENT_HUNT_SEASON3_CONTESTS,
  TALENT_HUNT_SEASON3_EXPERTS,
  TALENT_HUNT_SEASON3_OPENING,
} from '@/lib/talent-hunt-season3-data'

const CATEGORY_ICONS: Record<string, ReactNode> = {
  'Literary Arts': <BookOpen className="h-5 w-5" />,
  'Science & Innovation': <FlaskConical className="h-5 w-5" />,
  Entrepreneurship: <Lightbulb className="h-5 w-5" />,
  Sports: <Trophy className="h-5 w-5" />,
}

export default function TalentHuntSeason3Details() {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="container-custom space-y-12 sm:space-y-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-josefin text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-gray-600 leading-relaxed">
            Talent Hunt with PWSCS — Season 3 identifies, nurtures, and celebrates student talent through literary,
            scientific, entrepreneurial, creative, and sports-based competitions. Partner institutions are invited to
            register and attend the grand opening at Jalal Baba Auditorium, Abbottabad.
          </p>
        </div>

        <div className="rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 to-emerald-50 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-primary-900 mb-2">{TALENT_HUNT_SEASON3_OPENING.title}</h3>
          <p className="text-primary-800 font-medium">{TALENT_HUNT_SEASON3_OPENING.date}</p>
          <p className="text-primary-700">{TALENT_HUNT_SEASON3_OPENING.venue}</p>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            We cordially invite principals, managing directors, academic heads, coordinators, and institutional
            representatives to the official launch of Talent Hunt Season 3.
          </p>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Competition Streams</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TALENT_HUNT_SEASON3_CONTESTS.map((contest, i) => (
              <div
                key={contest.id}
                className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 hover:border-primary-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-full">
                    #{i + 1}
                  </span>
                  <span className="text-primary-600">{CATEGORY_ICONS[contest.category]}</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{contest.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{contest.category}</p>
                <p className="text-sm font-medium text-primary-800">{contest.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-primary-600" />
            Distinguished Experts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TALENT_HUNT_SEASON3_EXPERTS.map((expert) => (
              <div key={expert.title} className="rounded-xl border border-gray-200 p-4 sm:p-5">
                <h4 className="font-bold text-gray-900 mb-2">{expert.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{expert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
