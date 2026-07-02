import { CalendarDays, Sparkles } from 'lucide-react'
import { PAKIANS_EVENTS, PAKIANS_EVENTS_INTRO } from '@/lib/pakians-events-data'

export default function PakiansEventsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 py-14 text-white md:py-20">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-10" aria-hidden />
      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <CalendarDays className="h-4 w-4" aria-hidden />
            <span>Academic &amp; Co-Curricular Exposure</span>
          </div>
          <h1 className="font-josefin text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Pakians Events
          </h1>
          <p className="mt-4 text-lg text-white/90 md:text-xl">
            National conferences, competitions, summits, and leadership forums — where Pak Wattan students learn,
            compete, and grow beyond the classroom.
          </p>
          <p className="mt-3 text-sm text-white/75 md:text-base">{PAKIANS_EVENTS_INTRO.subtitle}</p>
          <div className="mt-6 inline-flex items-center gap-2 text-accent-200">
            <Sparkles className="h-4 w-4" aria-hidden />
            <span className="text-sm font-medium">{PAKIANS_EVENTS.length} featured experiences</span>
          </div>
        </div>
      </div>
    </section>
  )
}
