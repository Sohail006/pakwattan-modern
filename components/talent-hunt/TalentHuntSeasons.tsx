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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            Talent Hunt <span className="text-gradient">Seasons</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            From our successful Season-I to the upcoming district-level Season-II, 
            discover the evolution of our talent hunt program.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {seasons.map((season, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                season.isNew ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {season.isNew && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse">
                    NEW
                  </span>
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${season.color}`}></div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary-800 mb-2">
                      {season.season}
                    </h3>
                    <p className="text-lg text-secondary-600">
                      Academic Year {season.year}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    season.status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-primary-100 text-primary-700'
                  }`}>
                    {season.status}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary-600" />
                    <span className="text-secondary-700 font-medium">
                      {season.participants}
                    </span>
                  </div>
                  
                  <p className="text-secondary-600 leading-relaxed">
                    {season.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-secondary-800 mb-3 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-accent-600" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {season.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-accent-500 mt-1 flex-shrink-0" />
                        <span className="text-secondary-600 text-sm">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={season.href}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    season.isNew
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  View {season.season} Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary-800 mb-4">
              Ready to Showcase Your Talent?
            </h3>
            <p className="text-lg text-secondary-600 mb-6">
              Join us in Season-II and be part of the district's most exciting talent hunt program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/talent-hunt/register"
                className="btn-primary text-center"
              >
                Register for Season-II
              </Link>
              <Link
                href="/talent-hunt/season-1"
                className="btn-secondary text-center"
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
