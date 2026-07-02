import type { ReactNode } from 'react'
import {
  BookOpen,
  Globe,
  Lightbulb,
  MapPin,
  Mic,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react'
import {
  PAKIANS_EVENTS,
  PAKIANS_EVENTS_INTRO,
  type PakiansEventCategory,
} from '@/lib/pakians-events-data'

const CATEGORY_ICONS: Record<PakiansEventCategory, ReactNode> = {
  Symposium: <BookOpen className="h-5 w-5" aria-hidden />,
  'Model UN': <Globe className="h-5 w-5" aria-hidden />,
  Declamation: <Mic className="h-5 w-5" aria-hidden />,
  Summit: <Users className="h-5 w-5" aria-hidden />,
  Competition: <Trophy className="h-5 w-5" aria-hidden />,
  Conference: <Lightbulb className="h-5 w-5" aria-hidden />,
}

const CATEGORY_STYLES: Record<PakiansEventCategory, string> = {
  Symposium: 'bg-blue-100 text-blue-800',
  'Model UN': 'bg-indigo-100 text-indigo-800',
  Declamation: 'bg-purple-100 text-purple-800',
  Summit: 'bg-amber-100 text-amber-800',
  Competition: 'bg-emerald-100 text-emerald-800',
  Conference: 'bg-rose-100 text-rose-800',
}

export default function PakiansEventsContent() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container-custom space-y-12 sm:space-y-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            <Sparkles className="h-4 w-4" aria-hidden />
            <span>{PAKIANS_EVENTS_INTRO.title}</span>
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600">{PAKIANS_EVENTS_INTRO.summary}</p>
          <p className="mt-4 text-sm sm:text-base font-medium text-primary-800">{PAKIANS_EVENTS_INTRO.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PAKIANS_EVENTS.map((event) => (
            <article
              key={event.id}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-bold text-white">
                  {event.number}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${CATEGORY_STYLES[event.category]}`}
                >
                  {CATEGORY_ICONS[event.category]}
                  {event.category}
                </span>
              </div>

              <h2 className="mb-2 font-josefin text-lg font-bold leading-snug text-gray-900 group-hover:text-primary-800 sm:text-xl">
                {event.title}
              </h2>

              <p className="mb-3 inline-flex items-start gap-1.5 text-sm text-gray-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" aria-hidden />
                <span>{event.venue}</span>
              </p>

              {event.highlight && (
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent-700">{event.highlight}</p>
              )}

              <p className="flex-1 text-sm leading-relaxed text-gray-600">{event.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
