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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Talent Hunt Details</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-4xl mx-auto leading-relaxed">
            At <strong>Pak Watan School and College of Sciences, Havelian</strong>, we are committed to 
            nurturing the creativity, confidence, and capabilities of our students. 
            <strong> Talent Hunt with Pak Wattan</strong> is a vibrant platform launched to 
            <strong> uncover hidden talents, build self-esteem</strong>, and 
            <strong> inspire young minds</strong> to explore their full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {details.map((detail, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 hover:from-primary-100 hover:to-accent-100 transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-600 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {detail.icon}
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3 group-hover:text-primary-700 transition-colors">
                {detail.title}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {detail.description}
              </p>
            </div>
          ))}
        </div>

        {/* Flyers and Action Buttons */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Flyer 1 */}
            <div className="text-center">
              <Image
                src="/images/talent-hunt/Flyer1.jpg"
                alt="Talent Hunt Flyer 1"
                width={200}
                height={200}
                className="mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                href="/talent-hunt/season-1"
                className="block w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
              >
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <Trophy className="w-6 h-6 text-primary-600" />
                  <span className="text-lg font-semibold text-secondary-800 group-hover:text-primary-700 transition-colors">
                    Talent Hunt Season-I Details
                  </span>
                </div>
                <p className="text-sm text-secondary-600">
                  Explore the first season of our talent hunt program
                </p>
              </Link>

              <Link
                href="/talent-hunt/season-2"
                className="block w-full p-6 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-center relative overflow-hidden"
              >
                <div className="absolute top-2 right-2">
                  <span className="bg-white text-primary-600 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    NEW
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <Trophy className="w-6 h-6" />
                  <span className="text-lg font-semibold">
                    Talent Hunt Season-II Details
                  </span>
                </div>
                <p className="text-sm text-white/90">
                  Now expanded to district level participation
                </p>
              </Link>
            </div>

            {/* Flyer 2 */}
            <div className="text-center">
              <Image
                src="/images/talent-hunt/Flyer2.jpg"
                alt="Talent Hunt Flyer 2"
                width={200}
                height={200}
                className="mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntDetails
