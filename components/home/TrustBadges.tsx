import { Award, Building2, GraduationCap, ShieldCheck, Users, BookOpenCheck } from 'lucide-react'
import Container from '@/components/ui/Container'
import { TRUST_BADGES } from '@/lib/constants'

const ICONS = [Award, BookOpenCheck, Building2, Users, GraduationCap, ShieldCheck]

const TrustBadges = () => {
  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 text-white">
      <Container>
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-accent-300 mb-2">
            Why Families Trust Us
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-josefin">
            Credibility Built on Results
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {TRUST_BADGES.map((badge, index) => {
            const Icon = ICONS[index % ICONS.length]
            return (
              <div
                key={badge.title}
                className="bg-white/10 backdrop-blur-sm border border-white/15 text-center p-3 sm:p-4 rounded-xl shadow-lg hover:bg-white/15 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mx-auto mb-2 sm:mb-3 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent-500/20 text-accent-300 flex items-center justify-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug mb-1">{badge.title}</p>
                <p className="text-[11px] sm:text-xs text-white/75 leading-snug">{badge.subtitle}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default TrustBadges
