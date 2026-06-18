import Link from 'next/link'
import { Archive } from 'lucide-react'
import { TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'

type Props = {
  currentSeasonLabel?: string
  currentSeasonHref?: string
}

export default function TalentHuntPastSeasonBanner({
  currentSeasonLabel = TALENT_HUNT_SEASON3_TITLE,
  currentSeasonHref = '/talent-hunt/season-3',
}: Props) {
  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="container-custom py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
        <p className="flex items-center gap-2 text-amber-900">
          <Archive className="h-4 w-4 shrink-0" />
          <span>
            <strong>Past season.</strong> Registration for this season is closed.
          </span>
        </p>
        <Link href={currentSeasonHref} className="font-semibold text-primary-700 hover:text-primary-800 whitespace-nowrap">
          View current {currentSeasonLabel} →
        </Link>
      </div>
    </div>
  )
}
