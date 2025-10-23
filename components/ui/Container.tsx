'use client'

import { SectionProps } from '@/types'
import { COMMON_CLASSES } from '@/lib/constants'

const Container = ({ className = '', children }: SectionProps) => {
  const baseClasses = COMMON_CLASSES.container
  const classes = `${baseClasses} ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Container
