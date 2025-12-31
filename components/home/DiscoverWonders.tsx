'use client'

import Link from 'next/link'
import { GraduationCap, BookOpen, Trophy } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const DiscoverWonders = () => {
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
      href: '/academic/primary',
      description: 'Foundation years building strong academic and character foundations'
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: 'High School and College Wing',
      href: '/academic/matric',
      description: 'Advanced education preparing students for higher studies and careers'
    }
  ]

  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-white">
      <Container>
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              Discover the Wonders of Pak Wattan
            </span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-4xl mx-auto leading-relaxed break-words">
            Our mission is to establish a learning environment based on the principles of 
            self-discipline and respect where each child may develop the skills necessary 
            to help them succeed honorably in a rapidly changing world through the use 
            of the academically focused Core Knowledge Curriculum buttressed by strong 
            parental involvement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {wings.map((wing, index) => (
            <Link
              key={index}
              href={wing.href}
              className="group"
            >
              <Card className="p-4 sm:p-6 lg:p-8 text-center bg-gradient-to-br from-primary-50 to-accent-50 hover:from-primary-100 hover:to-accent-100 active:from-primary-50 active:to-accent-50 transition-all duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-6 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl active:shadow-lg transition-all duration-300 group-hover:scale-110 active:scale-100">
                  <div className="text-primary-600 group-hover:text-primary-700 transition-colors">
                    {wing.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-secondary-800 mb-3 sm:mb-4 group-hover:text-primary-700 transition-colors break-words">
                  {wing.title}
                </h3>
                <p className="text-sm sm:text-base text-secondary-600 leading-relaxed break-words">
                  {wing.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default DiscoverWonders
