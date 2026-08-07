import { Star, ExternalLink } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { GOOGLE_RATING } from '@/lib/constants'

const GoogleRating = () => {
  const fullStars = Math.floor(GOOGLE_RATING.rating)
  const hasHalf = GOOGLE_RATING.rating % 1 >= 0.3

  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-white">
      <Container>
        <Card className="overflow-hidden border border-secondary-100 bg-gradient-to-br from-white via-accent-50/30 to-primary-50/40">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10">
            <div className="flex-shrink-0 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-secondary-200 px-3 py-1.5 shadow-sm mb-3">
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-400" aria-hidden />
                <span className="text-xs sm:text-sm font-semibold text-secondary-800">{GOOGLE_RATING.label}</span>
              </div>
              <div className="flex items-end justify-center md:justify-start gap-2 mb-2">
                <span className="text-5xl sm:text-6xl font-bold font-josefin text-secondary-900 tabular-nums leading-none">
                  {GOOGLE_RATING.rating.toFixed(1)}
                </span>
                <span className="text-secondary-500 text-sm sm:text-base pb-1">/ 5</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 mb-2" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < fullStars || (i === fullStars && hasHalf)
                        ? 'fill-accent-500 text-accent-500'
                        : 'text-secondary-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-secondary-600">
                Based on {GOOGLE_RATING.reviewCount}+ parent &amp; community reviews
              </p>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-josefin text-secondary-900 mb-2">
                Highly Rated School in Havelian
              </h2>
              <p className="text-sm sm:text-base text-secondary-600 mb-5 max-w-xl">
                Families trust Pak Wattan for academic excellence, board results, and a nurturing campus environment.
              </p>
              <a
                href={GOOGLE_RATING.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold shadow-lg shadow-accent-500/30 hover:from-accent-600 hover:to-accent-700 hover:scale-[1.02] active:scale-100 transition-all"
              >
                View on Google
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  )
}

export default GoogleRating
