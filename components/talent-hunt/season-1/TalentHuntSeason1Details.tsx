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
    <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Season-I Achievements
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The foundation of our talent discovery platform was laid with the remarkable success of Season-I, 
            featuring talented participants exclusively from Pak Wattan.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{achievement.value}</h3>
                  <p className="text-sm text-gray-600">{achievement.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Contest Categories Performance */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <Target className="w-6 h-6 mr-3" />
              Contest Categories Performance
            </h3>
            <p className="text-white/90 mt-2">Detailed breakdown of each category's performance</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contestCategories.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-primary-50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{category.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-primary-600">
                      <Award className="w-4 h-4" />
                      <span>{category.winners} Winners</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{category.participants} Participants</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
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
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Key Highlights</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Star className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Student Confidence Boost</h4>
                  <p className="text-gray-600 text-sm">95% of participants showed significant improvement in self-confidence and public speaking skills.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Trophy className="w-4 h-4 text-accent-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Talent Discovery</h4>
                  <p className="text-gray-600 text-sm">Uncovered hidden talents in various fields including arts, academics, and cultural activities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Community Engagement</h4>
                  <p className="text-gray-600 text-sm">Strong participation from students, teachers, and parents, creating a supportive environment.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Setting the Foundation</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              Season-I established the framework for our talent discovery platform, proving that when we provide 
              the right environment and encouragement, students can achieve remarkable things.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Built student confidence and self-esteem</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Identified and nurtured hidden talents</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Created a culture of excellence and achievement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeason1Details
