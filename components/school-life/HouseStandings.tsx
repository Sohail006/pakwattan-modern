import Image from 'next/image'
import Link from 'next/link'
import { Trophy } from 'lucide-react'
import {
  HOUSE_STANDINGS_ANCHOR,
  HOUSE_STANDINGS_NOTE,
  HOUSE_STANDINGS_SEASON,
  getSortedHouseStandings,
  hasPublishedStandings,
} from '@/lib/houses-data'

const crestFrameClass =
  'overflow-hidden rounded-lg bg-emerald-950/40 ring-1 ring-accent-400/35 shadow-sm'

export default function HouseStandings() {
  const standings = getSortedHouseStandings()
  const published = hasPublishedStandings()
  const leader = published ? standings[0] : null

  return (
    <div id={HOUSE_STANDINGS_ANCHOR} className="mb-12 sm:mb-16 scroll-mt-24">
      <div className="mx-auto max-w-3xl text-center mb-8">
        <p className="mb-2 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-accent-300">
          <Trophy className="h-4 w-4" aria-hidden />
          Inter-House Standings
        </p>
        <h3 className="font-josefin text-2xl sm:text-3xl font-bold text-white mb-2">
          {HOUSE_STANDINGS_SEASON} Season
        </h3>
        <p className="text-sm sm:text-base text-white/70">{HOUSE_STANDINGS_NOTE}</p>
      </div>

      {!published ? (
        <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-accent-400/30 bg-white/5 p-6 sm:p-8 text-center backdrop-blur-sm">
          <p className="text-base sm:text-lg font-medium text-accent-200 mb-2">
            Standings will be published soon
          </p>
          <p className="text-sm text-white/65 mb-6">
            Points from sports week, quiz competitions, and house events will appear here as the
            academic year progresses.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {standings.map(({ house }) => (
              <Link
                key={house.id}
                href={`/school-life/houses/${house.id}`}
                className="group flex flex-col items-center gap-2 rounded-xl p-1.5 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                aria-label={`View ${house.name} details`}
              >
                <div
                  className={`relative h-16 w-14 ${crestFrameClass} transition-all group-hover:ring-accent-300/60 group-hover:shadow-md`}
                >
                  <Image
                    src={house.crest.src}
                    alt=""
                    width={56}
                    height={64}
                    className="h-full w-full object-contain p-0.5"
                    aria-hidden
                  />
                </div>
                <span className="max-w-[7rem] text-xs text-white/70 leading-tight transition-colors group-hover:text-accent-200">
                  {house.shortName}
                </span>
                <span className="text-[10px] font-medium text-accent-400/80 opacity-0 transition-opacity group-hover:opacity-100">
                  View house →
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl space-y-3">
          {leader && (
            <p className="text-center text-sm text-accent-200 mb-4">
              Current leader:{' '}
              <span className="font-bold text-accent-100">{leader.house.name}</span> with{' '}
              {leader.points} points
            </p>
          )}
          {standings.map(({ house, points, rank }) => (
            <Link
              key={house.id}
              href={`/school-life/houses/${house.id}`}
              className={`group flex items-center gap-4 rounded-xl border px-4 py-3 sm:px-5 sm:py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 ${
                rank === 1
                  ? 'border-accent-400/40 bg-accent-500/10 hover:bg-accent-500/15'
                  : 'border-white/10 bg-white/5 hover:border-accent-400/30 hover:bg-white/10'
              }`}
              aria-label={`View ${house.name} details`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  rank === 1 ? 'bg-accent-500 text-secondary-900' : 'bg-white/10 text-white'
                }`}
              >
                {rank}
              </span>
              <div className={`relative h-12 w-10 shrink-0 ${crestFrameClass}`}>
                <Image
                  src={house.crest.src}
                  alt=""
                  width={40}
                  height={48}
                  className="h-full w-full object-contain"
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white group-hover:text-accent-100">
                  {house.shortName}
                </p>
                <p className="truncate text-xs text-white/60 italic">&ldquo;{house.motto}&rdquo;</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-accent-300">{points}</p>
                <p className="text-xs text-white/50">pts</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
