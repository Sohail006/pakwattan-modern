'use client'

import { Star, Users } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { PARENT_REVIEWS } from '@/lib/constants'

const ParentReviews = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-secondary-50">
      <Container>
        <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-accent-600 mb-2">
            Parent Reviews
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-josefin text-secondary-900 mb-3">
            Trusted by Families in Havelian
          </h2>
          <p className="text-sm sm:text-base text-secondary-600">
            Parents choose Pak Wattan for results, care, and a values-driven campus culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {PARENT_REVIEWS.map((review) => (
            <Card key={review.name} className="p-5 sm:p-6 border border-secondary-100 h-full flex flex-col">
              <div className="flex items-center gap-1 mb-3" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-500 text-accent-500" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-secondary-700 leading-relaxed flex-1 mb-5">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-secondary-100">
                <div className="w-11 h-11 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-900 text-sm sm:text-base">{review.name}</p>
                  <p className="text-xs sm:text-sm text-secondary-500">{review.relation}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ParentReviews
