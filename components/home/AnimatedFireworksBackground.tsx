'use client'

interface AnimatedFireworksBackgroundProps {
  children: React.ReactNode
  className?: string
}

const AnimatedFireworksBackground = ({ children, className = '' }: AnimatedFireworksBackgroundProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Animated Fireworks Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 opacity-20 pointer-events-none rounded-lg"
        style={{
          background: 'linear-gradient(45deg, #ffd700, #ff8c00, #ff4500, #ffd700)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 3s ease-in-out infinite'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default AnimatedFireworksBackground
