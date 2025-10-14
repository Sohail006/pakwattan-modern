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
    { name: 'DIY / Handicrafts Contest', date: '13th December 2025', participants: 'All Grades' },
    { name: 'Creative Writing Competition', date: '13th September 2025', participants: 'All Grades' },
    { name: 'Painting, Sketching & Calligraphy Contest', date: '13th September 2025', participants: 'All Grades' },
    { name: 'Photography / Videography Contest', date: 'TBD', participants: 'All Grades' }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-accent-50 via-white to-primary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
              Season-II Expansion
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            After the remarkable success of Season-I, we are proud to fulfill our promise by expanding 
            Season-II to the district level in 2025–26, reaching a wider audience and encouraging even 
            more young learners to participate.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-primary-200">
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Contest Streams Timeline */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-accent-500 to-primary-500 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <Sparkles className="w-6 h-6 mr-3" />
              10 Exciting Contest Streams
            </h3>
            <p className="text-white/90 mt-2">Carefully designed to foster expression, creativity, critical thinking, and skill-building</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contestStreams.map((contest, index) => (
                <div key={index} className="group bg-gray-50 rounded-xl p-4 hover:bg-primary-50 transition-all duration-300 border border-gray-100 hover:border-primary-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-200">
                      {contest.name}
                    </h4>
                    <div className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{contest.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{contest.participants}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Talent Discovery</h4>
                  <p className="text-gray-600 text-sm">Uncover hidden talents and provide a platform for students to showcase their abilities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-accent-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Confidence Building</h4>
                  <p className="text-gray-600 text-sm">Help students build self-esteem and confidence through positive competition and recognition.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Skill Development</h4>
                  <p className="text-gray-600 text-sm">Foster creativity, critical thinking, and skill-building in a fun and encouraging environment.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Building Global Stars</h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              We strive to uncover and uplift young talents by providing a confident platform that grows 
              from local roots to global recognition because when <strong>Talent Rises, Dreams Take Flight</strong>.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">District-wide participation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">10 diverse contest categories</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Enhanced recognition and awards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeason2Details
