'use client'

import { useState, useEffect } from 'react'
import { Users, Trophy, GraduationCap, Building } from 'lucide-react'
import { ACHIEVEMENTS_DATA } from '@/lib/constants'
import Container from '@/components/ui/Container'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const Achievements = () => {
  const [counts, setCounts] = useState({
    students: 0,
    awards: 0,
    alumni: 0,
    campuses: 0
  })

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    freezeOnceVisible: true
  })

  const achievements = ACHIEVEMENTS_DATA.map((achievement, index) => {
    const IconComponent = [Users, Trophy, GraduationCap, Building][index]
    return {
      ...achievement,
      icon: <IconComponent className="w-8 h-8" />
    }
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      const animateCounts = () => {
        // Use fixed keys array instead of deriving from counts to avoid dependency
        const keys = ['students', 'awards', 'alumni', 'campuses'] as const
        ACHIEVEMENTS_DATA.forEach((achievement, index) => {
          const duration = 2000
          const startTime = performance.now()
          const startValue = 0
          const endValue = achievement.count
          const key = keys[index]

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            // Ease out quart function for smooth deceleration
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const current = Math.floor(startValue + (endValue - startValue) * easeOutQuart)
            
            setCounts(prev => ({
              ...prev,
              [key]: current
            }))

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              // Ensure final value is set
              setCounts(prev => ({
                ...prev,
                [key]: endValue
              }))
            }
          }

          // Stagger animations slightly
          setTimeout(() => {
            requestAnimationFrame(animate)
          }, index * 100)
        })
      }
      animateCounts()
    }
  }, [entry?.isIntersecting])

  return (
    <section ref={ref} className="relative bg-gradient-to-br from-secondary-900 via-primary-900 to-accent-900 text-white py-10 sm:py-12 lg:py-14 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5"></div>
      </div>
      
      <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white/90 mb-3 sm:mb-4 shadow-lg">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-400 rounded-full animate-pulse"></div>
            <span>Excellence in Numbers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-3 tracking-tight">
            OUR <span className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent">ACHIEVEMENTS</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Numbers that reflect our commitment to excellence and student success
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-2xl transform-gpu">
                <div className="text-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center ${achievement.color} group-hover:scale-110 transition-all duration-500 shadow-xl`}>
                    {achievement.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-white group-hover:text-accent-300 transition-colors duration-300 tabular-nums">
                    {Object.values(counts)[index].toLocaleString()}
                    {achievement.countSuffix ?? ''}
                  </div>
                  <div className="text-[11px] sm:text-sm font-semibold text-white/90 uppercase tracking-wide">
                    {achievement.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Achievements
