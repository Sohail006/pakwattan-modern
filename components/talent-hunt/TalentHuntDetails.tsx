'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trophy, Target, Users, Globe } from 'lucide-react'

const TalentHuntDetails = () => {
  const details = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Building Global Stars',
      description: 'We strive to uncover and uplift young talents by providing a confident platform that grows from local roots to global recognition because when Talent Rises, Dreams Take Flight.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'District Level Expansion',
      description: 'With Season-II, we aim to reach a wider audience and encourage even more young learners to participate, compete, and shine at the district level.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Inclusive Participation',
      description: 'Open to students from all schools in the district, fostering healthy competition and cultural exchange.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Recognition',
      description: 'Our platform provides opportunities for students to showcase their talents on a larger stage.'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
            <span className="text-gradient">Talent Hunt Details</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-4xl mx-auto leading-relaxed break-words">
            At <strong>Pak Watan School and College of Sciences, Havelian</strong>, we are committed to 
            nurturing the creativity, confidence, and capabilities of our students. 
            <strong> Talent Hunt with Pak Wattan</strong> is a vibrant platform launched to 
            <strong> uncover hidden talents, build self-esteem</strong>, and 
            <strong> inspire young minds</strong> to explore their full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {details.map((detail, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 hover:from-primary-100 hover:to-accent-100 active:from-primary-50 active:to-accent-50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 bg-primary-600 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {detail.icon}
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-secondary-800 mb-2 sm:mb-3 group-hover:text-primary-700 transition-colors break-words">
                {detail.title}
              </h3>
              <p className="text-sm sm:text-base text-secondary-600 leading-relaxed break-words">
                {detail.description}
              </p>
            </div>
          ))}
        </div>

        {/* Flyers and Action Buttons */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Flyer 1 */}
            <div className="text-center order-1 lg:order-1">
              <Image
                src="/images/talent-hunt/Flyer1.jpg"
                alt="Talent Hunt Flyer 1"
                width={200}
                height={200}
                className="mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                sizes="(max-width: 1024px) 100vw, 200px"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4 order-2 lg:order-2">
              <Link
                href="/talent-hunt/season-1"
                className="block w-full p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 group text-center touch-target"
              >
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-2">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 flex-shrink-0" />
                  <span className="text-base sm:text-lg font-semibold text-secondary-800 group-hover:text-primary-700 transition-colors break-words">
                    Talent Hunt Season-I Details
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-secondary-600 break-words">
                  Explore the first season of our talent hunt program
                </p>
              </Link>

              <Link
                href="/talent-hunt/season-2"
                className="block w-full p-4 sm:p-6 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 group text-center relative overflow-hidden touch-target"
              >
                <div className="absolute top-2 right-2">
                  <span className="bg-white text-primary-600 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    NEW
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-2">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span className="text-base sm:text-lg font-semibold break-words">
                    Talent Hunt Season-II Details
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/90 break-words">
                  Now expanded to district level participation
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntDetails
