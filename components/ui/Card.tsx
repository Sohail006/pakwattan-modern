'use client'

import { CardProps } from '@/types'
// import { COMMON_CLASSES } from '@/lib/constants'

const Card = ({ className = '', children, hover = true }: CardProps) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg transition-all duration-300'
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : ''
  const classes = `${baseClasses} ${hoverClasses} ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Card
