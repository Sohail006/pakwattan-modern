'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  Mic, 
  Music, 
  Music2, 
  Brain, 
  CheckSquare, 
  Scissors, 
  Edit, 
  Palette, 
  Camera,
  ChevronDown,
  Calendar,
  Users,
  Trophy,
  Award
} from 'lucide-react'

const TalentHuntSeason2Contests = () => {
  const [selectedContest, setSelectedContest] = useState<number | null>(null)

  const contests = [
    {
      id: 1,
      title: 'Qirat & Naat Contest',
      icon: <BookOpen className="w-8 h-8" />,
      description: 'Beautiful recitation of Quran and Naat by students',
      date: '12th July 2025 (Saturday)',
      participants: 'All Grades',
      prizes: '1st, 2nd, 3rd Place Awards',
      requirements: 'Memorized verses, clear pronunciation, proper Tajweed',
      color: 'from-green-500 to-emerald-500',
      details: 'Students will showcase their beautiful recitation skills in Quran and Naat, demonstrating proper Tajweed and clear pronunciation.'
    },
    {
      id: 2,
      title: 'Declamation / Speech Contest',
      icon: <Mic className="w-8 h-8" />,
      description: 'Free Speech in Pakistan: Illusion or Reality?',
      date: '23rd August 2025 (Saturday)',
      participants: 'Grades 6-12',
      prizes: 'Best Speaker Awards',
      requirements: 'Original content, clear delivery, confidence',
      color: 'from-blue-500 to-indigo-500',
      details: 'Students will deliver powerful speeches on the theme "Free Speech in Pakistan: Illusion or Reality?" showcasing their oratory skills.'
    },
    {
      id: 3,
      title: 'Singing Contest',
      icon: <Music className="w-8 h-8" />,
      description: 'National, Folk, and Patriotic songs competition',
      date: '15th November 2025 (Saturday)',
      participants: 'All Grades',
      prizes: 'Best Singer Awards',
      requirements: 'National, Folk, or Patriotic songs, good voice quality',
      color: 'from-purple-500 to-violet-500',
      details: 'Students will perform National, Folk, and Patriotic songs, showcasing their vocal talents and cultural appreciation.'
    },
    {
      id: 4,
      title: 'Instrumental Music Playing Contest',
      icon: <Music2 className="w-8 h-8" />,
      description: 'Individual or team instrumental music performance',
      date: '15th November 2025 (Saturday)',
      participants: 'All Grades',
      prizes: 'Best Musician Awards',
      requirements: 'Any instrument, solo or team performance',
      color: 'from-orange-500 to-red-500',
      details: 'Students can participate individually or in teams, playing any musical instrument to showcase their musical talents.'
    },
    {
      id: 5,
      title: 'Quiz Competition',
      icon: <Brain className="w-8 h-8" />,
      description: 'General knowledge and academic quiz competition',
      date: '18th October 2025 (Saturday)',
      participants: 'Grades 6-7 & 8-10',
      prizes: 'Quiz Master Awards',
      requirements: 'General knowledge, current affairs, academic subjects',
      color: 'from-teal-500 to-cyan-500',
      details: 'Separate syllabi for Grades 6-7 and Grades 8-10. Students can participate individually or in teams.'
    },
    {
      id: 6,
      title: 'Spelling Bee Contest',
      icon: <CheckSquare className="w-8 h-8" />,
      description: 'Vocabulary and spelling skills competition',
      date: '18th October 2025 (Saturday)',
      participants: 'All Grades',
      prizes: 'Spelling Champion Awards',
      requirements: 'Vocabulary list provided in advance, spelling accuracy',
      color: 'from-pink-500 to-rose-500',
      details: 'Students will compete in spelling challenges with a vocabulary list provided in advance for preparation.'
    },
    {
      id: 7,
      title: 'DIY / Handicrafts Contest',
      icon: <Scissors className="w-8 h-8" />,
      description: 'Creative handicrafts and DIY projects competition',
      date: '13th December 2025 (Saturday)',
      participants: 'All Grades',
      prizes: 'Best Craft Awards',
      requirements: 'Handmade items, creativity, originality',
      color: 'from-yellow-500 to-amber-500',
      details: 'Students will showcase their creativity through handmade crafts and DIY projects, demonstrating artistic skills.'
    },
    {
      id: 8,
      title: 'Creative Writing Competition',
      icon: <Edit className="w-8 h-8" />,
      description: 'Story, Essay, and Poem writing competition',
      date: '13th September 2025 (Saturday)',
      participants: 'All Grades',
      prizes: 'Best Writer Awards',
      requirements: 'Original content, creativity, proper grammar',
      color: 'from-indigo-500 to-blue-500',
      details: 'Students will express their creativity through stories, essays, and poems, showcasing their writing skills.'
    },
    {
      id: 9,
      title: 'Painting, Sketching & Calligraphy Contest',
      icon: <Palette className="w-8 h-8" />,
      description: 'Artistic expression through painting, sketching, and calligraphy',
      date: '13th September 2025 (Saturday)',
      participants: 'All Grades',
      prizes: 'Best Artist Awards',
      requirements: 'Original artwork, creativity, artistic skills',
      color: 'from-red-500 to-pink-500',
      details: 'Students will showcase their artistic talents through painting, sketching, and calligraphy.'
    },
    {
      id: 10,
      title: 'Photography / Videography Contest',
      icon: <Camera className="w-8 h-8" />,
      description: 'Visual storytelling through photography and videography',
      date: 'TBD',
      participants: 'All Grades',
      prizes: 'Best Photographer/Videographer Awards',
      requirements: 'Original photos/videos, creativity, technical skills',
      color: 'from-gray-500 to-slate-500',
      details: 'Students will demonstrate their visual storytelling skills through photography and videography.'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-100 rounded-full px-6 py-3 text-sm font-medium text-accent-700 mb-6">
            <span><Trophy className="w-4 h-4" /></span>
            <span>10 Exciting Contest Streams</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Contest Categories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            These streams are carefully designed to foster expression, creativity, critical thinking, 
            and skill-building in a fun and encouraging environment.
          </p>
        </div>

        {/* Contest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contests.map((contest) => (
            <div
              key={contest.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 cursor-pointer"
              onClick={() => setSelectedContest(selectedContest === contest.id ? null : contest.id)}
            >
              <div className={`bg-gradient-to-br ${contest.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    {contest.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">Contest #{contest.id}</div>
                    <div className="text-xs opacity-75">Click for details</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{contest.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed">{contest.description}</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{contest.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{contest.participants}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary-600">View Details</span>
                  <ChevronDown className={`w-5 h-5 text-primary-600 transition-transform duration-200 ${
                    selectedContest === contest.id ? 'rotate-180' : ''
                  }`} />
                </div>
              </div>

              {/* Expanded Details */}
              {selectedContest === contest.id && (
                <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Contest Details:</h4>
                      <p className="text-sm text-gray-600 mb-4">{contest.details}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <p className="text-sm text-gray-600">{contest.requirements}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Prizes:</h4>
                      <p className="text-sm text-gray-600">{contest.prizes}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200">
                        Register for this Contest
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Registration CTA */}
        <div className="text-center bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Showcase Your Talent?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join us in this exciting journey where talent meets opportunity. 
            Let's inspire the stars of tomorrow—one stream, one talent at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
              Register Now
            </button>
            <button className="bg-white hover:bg-gray-50 text-primary-600 border border-primary-600 px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
              View All Contests
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeason2Contests
