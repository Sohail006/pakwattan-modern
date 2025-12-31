'use client'

import { Trophy, Users, Award, Star, Target } from 'lucide-react'

const TalentHuntSeason1Details = () => {
  const achievements = [
    {
      title: 'Total Participants',
      value: '150+',
      icon: <Users className="w-6 h-6" />,
      description: 'Students from Pak Wattan participated'
    },
    {
      title: 'Contest Categories',
      value: '8',
      icon: <Trophy className="w-6 h-6" />,
      description: 'Different talent areas covered'
    },
    {
      title: 'Winners',
      value: '24',
      icon: <Award className="w-6 h-6" />,
      description: 'Students received awards and recognition'
    },
    {
      title: 'Success Rate',
      value: '95%',
      icon: <Star className="w-6 h-6" />,
      description: 'Students showed improved confidence'
    }
  ]

  const contestCategories = [
    { name: 'Qirat & Naat', participants: 25, winners: 3 },
    { name: 'Speech Contest', participants: 30, winners: 3 },
    { name: 'Singing', participants: 20, winners: 3 },
    { name: 'Art & Craft', participants: 35, winners: 3 },
    { name: 'Quiz Competition', participants: 40, winners: 3 },
    { name: 'Creative Writing', participants: 28, winners: 3 },
    { name: 'Painting', participants: 32, winners: 3 },
    { name: 'Photography', participants: 18, winners: 3 }
  ]

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Season-I Achievements
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed break-words">
            The foundation of our talent discovery platform was laid with the remarkable success of Season-I, 
            featuring talented participants exclusively from Pak Wattan.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl active:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                  {achievement.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{achievement.value}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">{achievement.title}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 break-words">{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Contest Categories Performance */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center break-words">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
              Contest Categories Performance
            </h3>
            <p className="text-sm sm:text-base text-white/90 mt-1 sm:mt-2 break-words">Detailed breakdown of each category&apos;s performance</p>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {contestCategories.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-3 sm:p-4 hover:bg-primary-50 active:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 break-words min-w-0">{category.name}</h4>
                    <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-primary-600 flex-shrink-0">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{category.winners} Winners</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 gap-2">
                    <span className="break-words">{category.participants} Participants</span>
                    <div className="w-20 sm:w-24 bg-gray-200 rounded-full h-1.5 sm:h-2 flex-shrink-0">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(category.participants / 40) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 break-words">Key Highlights</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 break-words">Student Confidence Boost</h4>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">95% of participants showed significant improvement in self-confidence and public speaking skills.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-accent-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 break-words">Talent Discovery</h4>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">Uncovered hidden talents in various fields including arts, academics, and cultural activities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 break-words">Community Engagement</h4>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">Strong participation from students, teachers, and parents, creating a supportive environment.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 break-words">Setting the Foundation</h3>
            <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 leading-relaxed break-words">
              Season-I established the framework for our talent discovery platform, proving that when we provide 
              the right environment and encouragement, students can achieve remarkable things.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm break-words">Built student confidence and self-esteem</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm break-words">Identified and nurtured hidden talents</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm break-words">Created a culture of excellence and achievement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeason1Details
