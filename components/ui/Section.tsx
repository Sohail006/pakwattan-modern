'use client'

import { SectionProps } from '@/types'
import { COMMON_CLASSES } from '@/lib/constants'

const Section = ({ className = '', children }: SectionProps) => {
  const baseClasses = COMMON_CLASSES.section
  const classes = `${baseClasses} ${className}`
  
  return (
    <section className={classes}>
      {children}
    </section>
  )
}

export default Section
