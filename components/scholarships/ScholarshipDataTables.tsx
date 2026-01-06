'use client'

import { useState } from 'react'
import { Search, Filter, Download, Users, Coins } from 'lucide-react'
import { ScholarshipSession } from '@/types/scholarship'

interface ScholarshipDataTablesProps {
  sessions: ScholarshipSession[]
}

const ScholarshipDataTables = ({ sessions }: ScholarshipDataTablesProps) => {
  const [activeSession, setActiveSession] = useState(sessions[0]?.year || '')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterByType, setFilterByType] = useState('all')

  const currentSession = sessions.find(session => session.year === activeSession)
  
  const filteredStudents = currentSession?.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterByType === 'all' || student.scholarshipType.toLowerCase().includes(filterByType.toLowerCase())
    return matchesSearch && matchesFilter
  }) || []

  const totalAmount = filteredStudents.reduce((sum, student) => sum + student.amount, 0)
  const uniqueTypes = Array.from(new Set(currentSession?.students.map(s => s.scholarshipType) || []))

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6">
            <span className="text-gradient">Scholarship Recipients</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Complete list of scholarship recipients across all academic sessions
          </p>
        </div>

        {/* Session Navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-4 sm:mb-6">
            {sessions.map((session) => (
              <button
                key={session.year}
                onClick={() => setActiveSession(session.year)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base touch-target min-h-[44px] ${
                  activeSession === session.year
                    ? 'bg-primary-600 text-white shadow-lg active:bg-primary-700'
                    : 'bg-white text-secondary-600 hover:bg-primary-50 active:bg-primary-100 border border-gray-200'
                }`}
                aria-label={`View ${session.year} session`}
                aria-pressed={activeSession === session.year}
              >
                {session.year}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">Total Students</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-600">{filteredStudents.length}</p>
              </div>
              <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-600 flex-shrink-0 ml-2" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">Total Amount</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-accent-600 truncate">PKR {totalAmount.toLocaleString()}</p>
              </div>
              <Coins className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent-600 flex-shrink-0 ml-2" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">Average Amount</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 truncate">
                  PKR {filteredStudents.length > 0 ? Math.round(totalAmount / filteredStudents.length).toLocaleString() : 0}
                </p>
              </div>
              <Coins className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600 flex-shrink-0 ml-2" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">Scholarship Types</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">{uniqueTypes.length}</p>
              </div>
              <Filter className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600 flex-shrink-0 ml-2" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border border-gray-100 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by name or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
              <select
                value={filterByType}
                onChange={(e) => setFilterByType(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-h-[44px]"
              >
                <option value="all">All Scholarship Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0 mobile-scroll">
            <div className="min-w-[640px] sm:min-w-0">
              <table className="w-full">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Class</th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Student Name</th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Scholarship Type</th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 font-medium text-gray-900 text-xs sm:text-sm whitespace-nowrap">{student.class}</td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm min-w-0">
                        <span className="truncate block">{student.name}</span>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-primary-100 text-primary-800 truncate">
                          {student.scholarshipType}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 font-semibold text-green-600 text-xs sm:text-sm whitespace-nowrap">
                        PKR {student.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-8 sm:py-12 px-4">
              <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base lg:text-lg text-gray-500 break-words">No students found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Export Button */}
        <div className="mt-6 sm:mt-8 text-center">
          <button className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 active:bg-accent-800 transition-colors touch-target min-h-[44px] text-sm sm:text-base">
            <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span>Export Data</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ScholarshipDataTables
