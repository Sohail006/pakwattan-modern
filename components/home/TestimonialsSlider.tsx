'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { HOME_TESTIMONIALS } from '@/lib/constants'

const TestimonialsSlider = () => {
  const [index, setIndex] = useState(0)
  const total = HOME_TESTIMONIALS.length

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total)
    }, 5500)
    return () => clearInterval(timer)
  }, [total])

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  const current = HOME_TESTIMONIALS[index]

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-white via-primary-50/40 to-white">
      <Container>
        <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-600 mb-2">
            Student Voices
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-josefin text-secondary-900 mb-3">
            What Our Students Say
          </h2>
          <p className="text-sm sm:text-base text-secondary-600">
            Real experiences from Pakians who grow with us every day.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <Card className="p-6 sm:p-8 lg:p-10 border border-primary-100/80 bg-white/90 backdrop-blur-sm">
            <Quote className="w-10 h-10 text-accent-500 mb-4 opacity-80" />
            <blockquote className="text-base sm:text-lg lg:text-xl text-secondary-800 leading-relaxed mb-6 min-h-[5.5rem]">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-secondary-900 font-josefin text-lg">{current.name}</p>
                <p className="text-sm text-primary-700 font-medium">{current.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="w-11 h-11 rounded-full border-2 border-primary-200 text-primary-700 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors flex items-center justify-center"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="w-11 h-11 rounded-full border-2 border-primary-200 text-primary-700 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors flex items-center justify-center"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>

          <div className="flex justify-center gap-2 mt-5">
            {HOME_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? 'w-8 bg-primary-600' : 'w-2.5 bg-primary-200 hover:bg-primary-300'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default TestimonialsSlider
