'use client'

import { useState } from 'react'

const EntryTestResultSearch = () => {
  const [searchType, setSearchType] = useState('rollNumber')
  const [searchValue, setSearchValue] = useState('')
  const [results, setResults] = useState<{
    name: string;
    rollNumber: string;
    marks: number;
    percentage: number;
    rank: number;
    status: string;
    admissionStatus: string;
  } | null>(null)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate search results
    setResults({
      name: "Sample Student",
      rollNumber: searchValue,
      marks: 85,
      percentage: 85,
      rank: 15,
      status: "Qualified",
      admissionStatus: "Eligible for Admission"
    })
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Search Your Results
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter your roll number or registration details to view your entry test results
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Search By</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="searchType"
                      value="rollNumber"
                      checked={searchType === 'rollNumber'}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="mr-2"
                    />
                    Roll Number
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="searchType"
                      value="registration"
                      checked={searchType === 'registration'}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="mr-2"
                    />
                    Registration Number
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {searchType === 'rollNumber' ? 'Roll Number' : 'Registration Number'}
                </label>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={`Enter your ${searchType === 'rollNumber' ? 'roll number' : 'registration number'}`}
                  required
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Search Results
              </button>
            </form>
          </div>

          {results && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary-800 mb-6 text-center">Your Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Name:</span>
                    <span className="text-gray-900">{results.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Roll Number:</span>
                    <span className="text-gray-900">{results.rollNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Marks Obtained:</span>
                    <span className="text-gray-900">{results.marks}/100</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Percentage:</span>
                    <span className="text-gray-900">{results.percentage}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Rank:</span>
                    <span className="text-gray-900">{results.rank}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      results.status === 'Qualified' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {results.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="text-primary-800 font-semibold text-center">
                  {results.admissionStatus}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex-1">
                  Download Result
                </button>
                <button className="btn-secondary flex-1">
                  Print Result
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default EntryTestResultSearch
