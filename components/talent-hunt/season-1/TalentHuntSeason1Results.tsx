'use client'

import Image from 'next/image'
import { Award, Trophy, Star, Medal } from 'lucide-react'

const TalentHuntSeason1Results = () => {
  const winners = [
    {
      name: 'Ahmad Hassan',
      category: 'Qirat & Naat',
      position: '1st Place',
      grade: 'Grade 10',
      image: '/images/talent-hunt/winners/ahmad-hassan.jpg',
      achievement: 'Best Qirat Performance'
    },
    {
      name: 'Fatima Ali',
      category: 'Speech Contest',
      position: '1st Place',
      grade: 'Grade 9',
      image: '/images/talent-hunt/winners/fatima-ali.jpg',
      achievement: 'Outstanding Oratory Skills'
    },
    {
      name: 'Muhammad Usman',
      category: 'Singing',
      position: '1st Place',
      grade: 'Grade 8',
      image: '/images/talent-hunt/winners/muhammad-usman.jpg',
      achievement: 'Best Vocal Performance'
    },
    {
      name: 'Ayesha Khan',
      category: 'Art & Craft',
      position: '1st Place',
      grade: 'Grade 7',
      image: '/images/talent-hunt/winners/ayesha-khan.jpg',
      achievement: 'Most Creative Artwork'
    },
    {
      name: 'Hassan Raza',
      category: 'Quiz Competition',
      position: '1st Place',
      grade: 'Grade 11',
      image: '/images/talent-hunt/winners/hassan-raza.jpg',
      achievement: 'Quiz Master Champion'
    },
    {
      name: 'Zainab Ahmed',
      category: 'Creative Writing',
      position: '1st Place',
      grade: 'Grade 10',
      image: '/images/talent-hunt/winners/zainab-ahmed.jpg',
      achievement: 'Best Story Writer'
    }
  ]

  const categories = [
    { name: 'Qirat & Naat', totalParticipants: 25, winners: 3 },
    { name: 'Speech Contest', totalParticipants: 30, winners: 3 },
    { name: 'Singing', totalParticipants: 20, winners: 3 },
    { name: 'Art & Craft', totalParticipants: 35, winners: 3 },
    { name: 'Quiz Competition', totalParticipants: 40, winners: 3 },
    { name: 'Creative Writing', totalParticipants: 28, winners: 3 },
    { name: 'Painting', totalParticipants: 32, winners: 3 },
    { name: 'Photography', totalParticipants: 18, winners: 3 }
  ]

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Season-I Winners
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed break-words">
            Celebrating the outstanding achievements of our talented students who participated in Season-I
          </p>
        </div>

        {/* Winners Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {winners.map((winner, index) => (
            <div key={index} className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl active:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={winner.image}
                    alt={winner.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center space-x-1">
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{winner.position}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words min-w-0">{winner.name}</h3>
                  <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0 break-words">{winner.grade}</span>
                </div>
                
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 break-words">{winner.category}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">{winner.achievement}</p>
                </div>
                
                <div className="flex items-center space-x-2 text-primary-600">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold break-words">Champion</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Statistics */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center break-words">Category Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2 break-words">{category.name}</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600 break-words">Participants:</span>
                      <span className="font-semibold text-primary-600">{category.totalParticipants}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600 break-words">Winners:</span>
                      <span className="font-semibold text-accent-600">{category.winners}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2 sm:mt-3">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(category.winners / category.totalParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 text-center border border-gray-100">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Trophy className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">150+</h3>
            <p className="text-sm sm:text-base text-gray-600 font-medium break-words">Total Participants</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 break-words">Students from all grades participated</p>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 text-center border border-gray-100">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">24</h3>
            <p className="text-sm sm:text-base text-gray-600 font-medium break-words">Award Winners</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 break-words">Students received recognition</p>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 text-center border border-gray-100">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Star className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">95%</h3>
            <p className="text-sm sm:text-base text-gray-600 font-medium break-words">Success Rate</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 break-words">Students showed improvement</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeason1Results
