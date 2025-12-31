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
        ACHIEVEMENTS_DATA.forEach((achievement, index) => {
          const duration = 2000
          const steps = 60
          const increment = achievement.count / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= achievement.count) {
              current = achievement.count
              clearInterval(timer)
            }
            setCounts(prev => ({
              ...prev,
              [Object.keys(prev)[index]]: Math.floor(current)
            }))
          }, duration / steps)
        })
      }
      animateCounts()
    }
  }, [entry?.isIntersecting])

  return (
    <section ref={ref} className="relative bg-gradient-to-br from-secondary-900 via-primary-900 to-accent-900 text-white py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5"></div>
      </div>
      
      <Container className="relative z-10 px-4 sm:px-0">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white/90 mb-4 sm:mb-6">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-400 rounded-full animate-pulse"></div>
            <span>Excellence in Numbers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            OUR <span className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent">ACHIEVEMENTS</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed break-words px-4 sm:px-0">
            Numbers that speak for our commitment to excellence in education and student success
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 hover:bg-white/20 active:bg-white/15 transition-all duration-500 group-hover:scale-105 active:scale-100 group-hover:shadow-2xl">
                <div className="text-center">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center ${achievement.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    {achievement.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 text-white group-hover:text-accent-300 transition-colors duration-300">
                    {Object.values(counts)[index].toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-lg font-semibold text-white/90 uppercase tracking-wide group-hover:text-white transition-colors duration-300 break-words">
                    {achievement.label}
                  </div>
                  <div className="mt-3 sm:mt-4 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
