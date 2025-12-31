'use client'

import Link from 'next/link'
import { Users, Trophy, Star } from 'lucide-react'

const TalentHuntSeasons = () => {
  const seasons = [
    {
      season: 'Season I',
      year: '2024-25',
      status: 'Completed',
      participants: 'Pak Wattan Students Only',
      description: 'The inaugural season featuring talented participants exclusively from Pak Wattan, setting the foundation for our talent hunt program.',
      achievements: [
        'Successfully launched talent hunt program',
        'Featured exclusive Pak Wattan participants',
        'Established program framework',
        'Built strong foundation for future seasons'
      ],
      href: '/talent-hunt/season-1',
      color: 'from-blue-500 to-blue-600'
    },
    {
      season: 'Season II',
      year: '2025-26',
      status: 'Upcoming',
      participants: 'District Level',
      description: 'Expanded to district level participation, welcoming students from all schools in the district to showcase their talents.',
      achievements: [
        'Expanded to district level participation',
        'Open to all schools in the district',
        'Enhanced competition framework',
        'Greater recognition opportunities'
      ],
      href: '/talent-hunt/season-2',
      color: 'from-primary-500 to-accent-500',
      isNew: true
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
            Talent Hunt <span className="text-gradient">Seasons</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed break-words">
            From our successful Season-I to the upcoming district-level Season-II, 
            discover the evolution of our talent hunt program.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {seasons.map((season, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl active:shadow-lg transition-all duration-300 overflow-hidden ${
                season.isNew ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {season.isNew && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                  <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full animate-pulse">
                    NEW
                  </span>
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${season.color}`}></div>
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-1 sm:mb-2 break-words">
                      {season.season}
                    </h3>
                    <p className="text-base sm:text-lg text-secondary-600 break-words">
                      Academic Year {season.year}
                    </p>
                  </div>
                  <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0 ${
                    season.status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-primary-100 text-primary-700'
                  }`}>
                    {season.status}
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-secondary-700 font-medium break-words">
                      {season.participants}
                    </span>
                  </div>
                  
                  <p className="text-sm sm:text-base text-secondary-600 leading-relaxed break-words">
                    {season.description}
                  </p>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-lg font-semibold text-secondary-800 mb-2 sm:mb-3 flex items-center break-words">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-accent-600 flex-shrink-0" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {season.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-accent-500 mt-1 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-secondary-600 break-words">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={season.href}
                  className={`block w-full text-center py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 touch-target min-h-[44px] text-sm sm:text-base ${
                    season.isNew
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 active:from-primary-800 active:to-accent-800'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 active:bg-secondary-300'
                  }`}
                >
                  View {season.season} Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-3 sm:mb-4 break-words">
              Ready to Showcase Your Talent?
            </h3>
            <p className="text-base sm:text-lg text-secondary-600 mb-4 sm:mb-6 break-words">
              Join us in Season-II and be part of the district&apos;s most exciting talent hunt program.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/talent-hunt/register"
                className="btn-primary text-center touch-target min-h-[44px]"
              >
                Register for Season-II
              </Link>
              <Link
                href="/talent-hunt/season-1"
                className="btn-secondary text-center touch-target min-h-[44px]"
              >
                View Season-I Results
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeasons
