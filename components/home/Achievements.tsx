'use client'

import { useState, useEffect } from 'react'
import { Users, Trophy, GraduationCap, Building } from 'lucide-react'

const Achievements = () => {
  const [counts, setCounts] = useState({
    students: 0,
    awards: 0,
    alumni: 0,
    campuses: 0
  })

  const achievements = [
    {
      icon: <Users className="w-8 h-8" />,
      count: 1750,
      label: 'STUDENTS',
      color: 'text-blue-600'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      count: 1100,
      label: 'AWARDS',
      color: 'text-yellow-600'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      count: 525,
      label: 'ALUMNI',
      color: 'text-green-600'
    },
    {
      icon: <Building className="w-8 h-8" />,
      count: 3,
      label: 'CAMPUSES',
      color: 'text-purple-600'
    }
  ]

  useEffect(() => {
    const animateCounts = () => {
      achievements.forEach((achievement, index) => {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounts()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById('achievements-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="achievements-section" className="relative bg-gradient-to-br from-secondary-900 via-primary-900 to-accent-900 text-white py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium text-white/90 mb-6">
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
            <span>Excellence in Numbers</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-josefin mb-6">
            OUR <span className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-transparent">ACHIEVEMENTS</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Numbers that speak for our commitment to excellence in education and student success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center ${achievement.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    {achievement.icon}
                  </div>
                  <div className="text-5xl md:text-6xl font-bold mb-3 text-white group-hover:text-accent-300 transition-colors duration-300">
                    {Object.values(counts)[index].toLocaleString()}
                  </div>
                  <div className="text-lg font-semibold text-white/90 uppercase tracking-wide group-hover:text-white transition-colors duration-300">
                    {achievement.label}
                  </div>
                  <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
