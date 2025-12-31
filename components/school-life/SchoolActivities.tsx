'use client'

import { useState } from 'react'
import { Trophy, BookOpen, Music, Palette, Users, Calendar, Award, Star, Heart } from 'lucide-react'

const SchoolActivities = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Activities', icon: <Trophy className="w-5 h-5" /> },
    { id: 'academic', label: 'Academic', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'cultural', label: 'Cultural', icon: <Music className="w-5 h-5" /> },
    { id: 'sports', label: 'Sports', icon: <Award className="w-5 h-5" /> },
    { id: 'creative', label: 'Creative', icon: <Palette className="w-5 h-5" /> }
  ]

  const activities = [
    {
      id: 1,
      title: 'English & Urdu Quiz Competition',
      category: 'academic',
      description: 'Intellectual competition for students from 1st to 4th grade to test their knowledge in English and Urdu subjects.',
      icon: <BookOpen className="w-8 h-8" />,
      participants: 'Grades 1-4',
      duration: '2 hours',
      prizes: 'Certificates and trophies',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'English Speech Competition',
      category: 'academic',
      description: 'Public speaking competition for students from 1st to 7th grade to enhance their communication skills.',
      icon: <Users className="w-8 h-8" />,
      participants: 'Grades 1-7',
      duration: '3 hours',
      prizes: 'Best speaker awards',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Sports Week: بزم ادب',
      category: 'sports',
      description: 'Annual sports week featuring various athletic competitions and physical activities for all students.',
      icon: <Trophy className="w-8 h-8" />,
      participants: 'All grades',
      duration: '1 week',
      prizes: 'Medals and certificates',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 4,
      title: 'English Quiz Competition',
      category: 'academic',
      description: 'Comprehensive English language quiz for students from 1st to 7th grade covering grammar, vocabulary, and literature.',
      icon: <BookOpen className="w-8 h-8" />,
      participants: 'Grades 1-7',
      duration: '2.5 hours',
      prizes: 'Academic excellence awards',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 5,
      title: 'Fun Day Activities',
      category: 'cultural',
      description: 'Entertainment and recreational activities for students from 1st to 7th grade to promote fun learning.',
      icon: <Heart className="w-8 h-8" />,
      participants: 'Grades 1-7',
      duration: 'Full day',
      prizes: 'Participation certificates',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 6,
      title: 'Annual Function',
      category: 'cultural',
      description: 'Grand annual celebration featuring performances, awards ceremony, and cultural presentations.',
      icon: <Star className="w-8 h-8" />,
      participants: 'All students',
      duration: '4 hours',
      prizes: 'Special recognition awards',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 7,
      title: 'Art & Craft Exhibition',
      category: 'creative',
      description: 'Showcase of student artwork and creative projects from various art and craft activities.',
      icon: <Palette className="w-8 h-8" />,
      participants: 'All grades',
      duration: '2 days',
      prizes: 'Creative excellence awards',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 8,
      title: 'Science Fair',
      category: 'academic',
      description: 'Exhibition of scientific projects and experiments created by students to promote scientific thinking.',
      icon: <BookOpen className="w-8 h-8" />,
      participants: 'Grades 6-12',
      duration: '1 day',
      prizes: 'Science innovation awards',
      color: 'from-cyan-500 to-cyan-600'
    }
  ]

  const filteredActivities = selectedCategory === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory)

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6">
            <span className="text-gradient">School Activities & Events</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Discover the vibrant array of activities and events that make school life at Pak Wattan truly special and enriching.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm touch-target min-h-[44px] ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg active:bg-primary-700'
                  : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100 shadow-sm'
              }`}
              aria-label={`Filter by ${category.label}`}
              aria-pressed={selectedCategory === category.id}
            >
              <span className="text-sm sm:text-base">{category.icon}</span>
              <span className="truncate">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 active:border-primary-300 hover-lift"
            >
              <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${activity.color}`}></div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${activity.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white group-hover:scale-110 active:scale-100 transition-transform duration-300 flex-shrink-0`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-300 truncate">
                      {activity.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3 break-words">
                  {activity.description}
                </p>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm min-w-0">
                    <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-600 truncate">{activity.participants}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm min-w-0">
                    <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-600 truncate">{activity.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm min-w-0">
                    <Award className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-600 truncate">{activity.prizes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎯</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">No activities found</h3>
            <p className="text-sm sm:text-base text-gray-500">Try selecting a different category</p>
          </div>
        )}

        {/* Activity Benefits */}
        <div className="mt-8 sm:mt-12 lg:mt-16 bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mx-4 sm:mx-0">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
              Benefits of School Activities
            </h3>
            <p className="text-sm sm:text-base text-white/90 text-center mt-2 break-words">
              How participation in school activities enhances student development
            </p>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Trophy className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Skill Development</h4>
                <p className="text-xs sm:text-sm text-gray-600 break-words">Enhance various skills through hands-on participation</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent-600" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Team Building</h4>
                <p className="text-xs sm:text-sm text-gray-600 break-words">Learn to work collaboratively with peers</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Star className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">Confidence Building</h4>
                <p className="text-xs sm:text-sm text-gray-600 break-words">Build self-confidence through public participation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SchoolActivities
