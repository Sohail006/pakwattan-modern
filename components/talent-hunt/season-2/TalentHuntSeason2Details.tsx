'use client'

import { Target, Users, Calendar, Award, Sparkles, Globe } from 'lucide-react'

const TalentHuntSeason2Details = () => {
  const features = [
    {
      title: 'District Level Reach',
      description: 'Expanded from school-level to district-wide participation',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: '10 Contest Streams',
      description: 'Diverse talent areas covering arts, academics, and skills',
      icon: <Target className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Wider Participation',
      description: 'Open to students from all schools in the district',
      icon: <Users className="w-6 h-6" />,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Enhanced Recognition',
      description: 'Greater opportunities for talent discovery and growth',
      icon: <Award className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    }
  ]

  const contestStreams = [
    { name: 'Qirat & Naat Contest', date: '12th July 2025', participants: 'All Grades' },
    { name: 'Declamation / Speech Contest', date: '23rd August 2025', participants: 'Grades 6-12' },
    { name: 'Singing Contest', date: '15th November 2025', participants: 'All Grades' },
    { name: 'Instrumental Music Playing Contest', date: '15th November 2025', participants: 'All Grades' },
    { name: 'Quiz Competition', date: '18th October 2025', participants: 'Grades 6-7 & 8-10' },
    { name: 'Spelling Bee Contest', date: '18th October 2025', participants: 'All Grades' },
    { name: 'Creative Writing Competition', date: '13th September 2025', participants: 'All Grades' },
    { name: 'Painting, Sketching & Calligraphy Contest', date: '13th September 2025', participants: 'All Grades' },
    { name: 'Photography / Videography Contest', date: 'TBD', participants: 'All Grades' }
  ]

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-accent-50 via-white to-primary-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
              Season-II Expansion
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed break-words">
            After the remarkable success of Season-I, we are proud to fulfill our promise by expanding 
            Season-II to the district level in 2025–26, reaching a wider audience and encouraging even 
            more young learners to participate.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl active:shadow-lg transition-all duration-300 p-4 sm:p-6 border border-gray-100 hover:border-primary-200">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 break-words">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Contest Streams Timeline */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-gradient-to-r from-accent-500 to-primary-500 p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center break-words">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
              10 Exciting Contest Streams
            </h3>
            <p className="text-sm sm:text-base text-white/90 mt-1 sm:mt-2 break-words">Carefully designed to foster expression, creativity, critical thinking, and skill-building</p>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {contestStreams.map((contest, index) => (
                <div key={index} className="group bg-gray-50 rounded-xl p-3 sm:p-4 hover:bg-primary-50 active:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-primary-200">
                  <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-200 break-words min-w-0">
                      {contest.name}
                    </h4>
                    <div className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium flex-shrink-0">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 gap-2">
                    <div className="flex items-center space-x-1 min-w-0">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{contest.date}</span>
                    </div>
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate">{contest.participants}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 break-words">Our Mission</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 break-words">Talent Discovery</h4>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">Uncover hidden talents and provide a platform for students to showcase their abilities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-accent-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 break-words">Confidence Building</h4>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">Help students build self-esteem and confidence through positive competition and recognition.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 break-words">Skill Development</h4>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">Foster creativity, critical thinking, and skill-building in a fun and encouraging environment.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 break-words">Building Global Stars</h3>
            <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 leading-relaxed break-words">
              We strive to uncover and uplift young talents by providing a confident platform that grows 
              from local roots to global recognition because when <strong>Talent Rises, Dreams Take Flight</strong>.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm break-words">District-wide participation</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm break-words">10 diverse contest categories</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm break-words">Enhanced recognition and awards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeason2Details
