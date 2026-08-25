import Link from 'next/link'
import {
  TALENT_HUNT_SEASON3_CONTESTS,
  TALENT_HUNT_SEASON3_EXECUTIVE_SUMMARY,
  TALENT_HUNT_SEASON3_PERIOD,
  TALENT_HUNT_SEASON3_TAGLINE,
} from '@/lib/talent-hunt-season3-data'

/** Season overview block shown above the registration form. */
export default function TalentHuntSeason3About() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,_rgba(5,122,85,0.12),_transparent_70%)]"
        aria-hidden
      />
      <div className="container-custom relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-primary-800 shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden />
            {TALENT_HUNT_SEASON3_PERIOD}
          </p>
          <p className="mb-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-accent-600">
            {TALENT_HUNT_SEASON3_TAGLINE}
          </p>
          <h2 className="font-josefin text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-secondary-900 mb-5">
            About Talent Hunt Season 3
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 leading-relaxed mb-8">
            {TALENT_HUNT_SEASON3_EXECUTIVE_SUMMARY}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            {TALENT_HUNT_SEASON3_CONTESTS.map((contest) => (
              <Link
                key={contest.id}
                href={`#stream-${contest.streamNumber}`}
                className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-primary-800 shadow-sm transition-colors hover:border-primary-300 hover:bg-primary-50"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                  {contest.streamNumber}
                </span>
                {contest.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
