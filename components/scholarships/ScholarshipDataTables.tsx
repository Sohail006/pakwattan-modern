'use client'

import { useState } from 'react'
import { Search, Filter, Download, Users, DollarSign } from 'lucide-react'
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Scholarship Recipients</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Complete list of scholarship recipients across all academic sessions
          </p>
        </div>

        {/* Session Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {sessions.map((session) => (
              <button
                key={session.year}
                onClick={() => setActiveSession(session.year)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeSession === session.year
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-secondary-600 hover:bg-primary-50 border border-gray-200'
                }`}
              >
                {session.year}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-2xl font-bold text-primary-600">{filteredStudents.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-accent-600">₨{totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Amount</p>
                <p className="text-2xl font-bold text-green-600">
                  ₨{filteredStudents.length > 0 ? Math.round(totalAmount / filteredStudents.length).toLocaleString() : 0}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Scholarship Types</p>
                <p className="text-2xl font-bold text-purple-600">{uniqueTypes.length}</p>
              </div>
              <Filter className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterByType}
                onChange={(e) => setFilterByType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Class</th>
                  <th className="px-6 py-4 text-left font-semibold">Student Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Scholarship Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{student.class}</td>
                    <td className="px-6 py-4 text-gray-700">{student.name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                        {student.scholarshipType}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-green-600">
                      ₨{student.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No students found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Export Button */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Export Data
          </button>
        </div>
      </div>
    </section>
  )
}

export default ScholarshipDataTables
