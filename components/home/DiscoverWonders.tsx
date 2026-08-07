'use client'

import Link from 'next/link'
import { GraduationCap, BookOpen, Trophy, Users, Heart } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const DiscoverWonders = () => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  })
  const wings = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: 'Montessori Wing',
      href: '/academic/montessori',
      description: 'Early childhood education with a focus on holistic development'
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Primary Wing',
      href: '/academic/primary-wing',
      description: 'Foundation years for classes 1st to 7th with core academics and character'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Boys Middle Wing',
      href: '/academic/boys-middle-wing',
      description: 'Boys section for classes 5th to 7th preparing students for senior studies'
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: 'Boys Senior Wing',
      href: '/academic/boys-senior-wing',
      description: 'Boys education from 8th class to Intermediate 2nd year'
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Girls Wing',
      href: '/academic/girls-wing',
      description: 'Girls section from 8th class to Intermediate 2nd year'
    }
  ]

  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words tracking-tight">
            <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-500 bg-clip-text text-transparent">
              Discover the Wonders of Pak Wattan
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-secondary-600 max-w-4xl mx-auto leading-relaxed break-words">
            Our mission is to establish a learning environment based on the principles of 
            self-discipline and respect where each child may develop the skills necessary 
            to help them succeed honorably in a rapidly changing world through the use 
            of the academically focused Core Knowledge Curriculum buttressed by strong 
            parental involvement.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-6">
          {wings.map((wing, index) => {
            const isVisible = entry?.isIntersecting
            return (
              <Link
                key={wing.href}
                href={wing.href}
                className="group block"
                aria-label={`Learn more about ${wing.title}`}
                style={{
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'both'
                }}
              >
                <Card className={`p-6 sm:p-8 lg:p-10 text-center bg-gradient-to-br from-white to-primary-50/50 border-2 border-transparent hover:border-primary-300 active:border-primary-200 shadow-lg hover:shadow-2xl active:shadow-lg transition-all duration-500 transform hover:-translate-y-2 active:translate-y-0 h-full ${
                  isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                }`}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-6 sm:mb-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:from-primary-200 group-hover:to-accent-200 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 active:scale-100">
                  <div className="text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
                    {wing.icon}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary-800 mb-4 sm:mb-6 group-hover:text-primary-700 transition-colors duration-300 break-words">
                  {wing.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-secondary-600 leading-relaxed break-words">
                  {wing.description}
                </p>
                <div className="mt-6 pt-6 border-t-2 border-transparent group-hover:border-primary-200 transition-colors duration-300">
                  <span className="text-primary-600 group-hover:text-primary-700 font-semibold text-sm sm:text-base inline-flex items-center">
                    Learn More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Card>
            </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default DiscoverWonders
