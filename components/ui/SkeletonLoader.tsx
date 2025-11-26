'use client'

interface SkeletonLoaderProps {
  className?: string
  variant?: 'default' | 'card' | 'text' | 'image' | 'section'
  lines?: number
  height?: string
  width?: string
}

const SkeletonLoader = ({
  className = '',
  variant = 'default',
  height,
  width,
  lines = 1
}: SkeletonLoaderProps) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded'

  const variants = {
    default: 'h-64 w-full',
    card: 'h-64 w-full rounded-lg',
    text: 'h-4 w-full',
    image: 'h-64 w-full aspect-square rounded-lg',
    section: 'h-96 w-full rounded-xl'
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={className} aria-label="Loading content" role="status">
        <span className="sr-only">Loading content...</span>
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={`${baseClasses} ${variants.text}`}
              style={{
                width: index === lines - 1 ? '75%' : '100%',
                height: height || undefined
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={{
        height: height || undefined,
        width: width || undefined
      }}
      aria-label="Loading content"
      role="status"
    >
      <span className="sr-only">Loading content...</span>
    </div>
  )
}

export default SkeletonLoader

