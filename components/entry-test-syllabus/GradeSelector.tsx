'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, BookOpen } from 'lucide-react'
import { getGrades, Grade } from '@/lib/api/grades'

interface GradeSelectorProps {
  selectedGradeId?: number
  onGradeSelect?: (gradeId: number) => void
}

const GradeSelector = ({ selectedGradeId, onGradeSelect }: GradeSelectorProps) => {
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const data = await getGrades(true) // Get only active grades
        // Sort by order
        const sorted = data.sort((a, b) => a.order - b.order)
        setGrades(sorted)
      } catch (error) {
        console.error('[GradeSelector] Failed to load grades:', error)
        // Fallback to common grades if API fails
        setGrades([
          { id: 1, name: 'Grade 6', order: 6, isActive: true, createdAt: '' },
          { id: 2, name: 'Grade 7', order: 7, isActive: true, createdAt: '' },
          { id: 3, name: 'Grade 8', order: 8, isActive: true, createdAt: '' },
          { id: 4, name: 'Grade 9', order: 9, isActive: true, createdAt: '' },
          { id: 5, name: 'Grade 10', order: 10, isActive: true, createdAt: '' },
          { id: 6, name: 'Grade 11', order: 11, isActive: true, createdAt: '' },
          { id: 7, name: 'Grade 12', order: 12, isActive: true, createdAt: '' },
          { id: 8, name: 'Matric', order: 14, isActive: true, createdAt: '' },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchGrades()
  }, [])

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="text-center px-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">Loading grades...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Select Your Grade
            </span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-2xl mx-auto break-words">
            Choose your grade to view the test syllabus
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto px-4 sm:px-0">
          {grades.map((grade) => (
            <button
              key={grade.id}
              onClick={() => onGradeSelect?.(grade.id)}
              className={`group relative p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 border-2 touch-target min-h-[120px] sm:min-h-[140px] ${
                selectedGradeId === grade.id
                  ? 'border-primary-600 bg-primary-50 scale-105'
                  : 'border-gray-200 hover:border-primary-300 active:border-primary-400 hover:scale-105 active:scale-100'
              }`}
              aria-label={`Select ${grade.name}`}
              aria-pressed={selectedGradeId === grade.id}
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                selectedGradeId === grade.id
                  ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white'
                  : 'bg-gradient-to-br from-primary-100 to-accent-100 text-primary-600 group-hover:from-primary-200 group-hover:to-accent-200'
              }`}>
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className={`text-sm sm:text-lg font-bold transition-colors truncate ${
                selectedGradeId === grade.id
                  ? 'text-primary-700'
                  : 'text-gray-800 group-hover:text-primary-600'
              }`}>
                {grade.name}
              </h3>
              {selectedGradeId === grade.id && (
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {grades.length === 0 && (
          <div className="text-center py-8 sm:py-12 bg-white rounded-xl sm:rounded-2xl px-4">
            <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-600">No grades available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default GradeSelector

