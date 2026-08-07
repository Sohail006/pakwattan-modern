'use client'

import Testimonials from '@/components/ui/Testimonials'
import { HOME_TESTIMONIALS } from '@/lib/constants'

const TestimonialsSlider = () => {
  return (
    <Testimonials
      items={HOME_TESTIMONIALS}
      eyebrow="Student Voices"
      title="What Our Students Say"
      subtitle="Real experiences from Pakians who grow with us every day."
    />
  )
}

export default TestimonialsSlider
