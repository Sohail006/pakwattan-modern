'use client'

import Link from 'next/link'
import { ButtonProps } from '@/types'
// import { COMMON_CLASSES } from '@/lib/constants'

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  onClick, 
  href, 
  disabled = false, 
  loading = false 
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-700 text-white hover:from-secondary-700 hover:to-secondary-800 focus:ring-secondary-500 shadow-lg hover:shadow-xl',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 focus:ring-accent-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  const content = (
    <>
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      )}
      {children}
    </>
  )
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  )
}

export default Button
