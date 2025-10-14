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
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Season-I Winners
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Celebrating the outstanding achievements of our talented students who participated in Season-I
          </p>
        </div>

        {/* Winners Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {winners.map((winner, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={winner.image}
                    alt={winner.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Trophy className="w-4 h-4" />
                    <span>{winner.position}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{winner.name}</h3>
                  <span className="text-sm text-gray-500">{winner.grade}</span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-gray-700">{winner.category}</span>
                  </div>
                  <p className="text-sm text-gray-600">{winner.achievement}</p>
                </div>
                
                <div className="flex items-center space-x-2 text-primary-600">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-semibold">Champion</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Statistics */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Category Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Medal className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{category.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-semibold text-primary-600">{category.totalParticipants}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Winners:</span>
                      <span className="font-semibold text-accent-600">{category.winners}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">150+</h3>
            <p className="text-gray-600 font-medium">Total Participants</p>
            <p className="text-sm text-gray-500 mt-2">Students from all grades participated</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">24</h3>
            <p className="text-gray-600 font-medium">Award Winners</p>
            <p className="text-sm text-gray-500 mt-2">Students received recognition</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
            <p className="text-gray-600 font-medium">Success Rate</p>
            <p className="text-sm text-gray-500 mt-2">Students showed improvement</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeason1Results
