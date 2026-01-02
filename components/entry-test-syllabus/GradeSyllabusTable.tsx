'use client'

import { useState, useEffect } from 'react'
import { Download, Loader2, AlertCircle, FileText, BookOpen } from 'lucide-react'
import { getGrades, Grade } from '@/lib/api/grades'
import { getTestSyllabiPublic, TestSyllabus } from '@/lib/api/testSyllabus'

interface GradeSyllabusRow {
  grade: Grade
  syllabus: TestSyllabus
}

const GradeSyllabusTable = () => {
  const [gradesWithPdfs, setGradesWithPdfs] = useState<GradeSyllabusRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all active grades and syllabi in parallel for better performance
        const [grades, allSyllabi] = await Promise.all([
          getGrades(true),
          getTestSyllabiPublic()
        ])

        const sortedGrades = grades.sort((a, b) => a.order - b.order)

        // Filter only PDF syllabi with pdfUrl
        const pdfSyllabi = allSyllabi.filter(s => 
          s.contentType === 'PDF' && s.pdfUrl && s.isActive
        )

        // Match syllabi with grades - create array of grades with PDFs only
        const gradesWithPdfsData: GradeSyllabusRow[] = sortedGrades
          .map(grade => {
            const syllabus = pdfSyllabi.find(s => s.gradeId === grade.id)
            if (syllabus && syllabus.pdfUrl) {
              return { grade, syllabus }
            }
            return null
          })
          .filter((item): item is GradeSyllabusRow => item !== null)

        // Sort by grade order
        gradesWithPdfsData.sort((a, b) => a.grade.order - b.grade.order)

        setGradesWithPdfs(gradesWithPdfsData)
      } catch (err) {
        console.error('[GradeSyllabusTable] Failed to load data:', err)
        setError('Failed to load model papers. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDownload = (pdfUrl: string, title: string) => {
    try {
      const link = document.createElement('a')
      link.href = pdfUrl
      link.download = `${title}.pdf`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('[GradeSyllabusTable] Failed to download PDF:', err)
      alert('Failed to download PDF. Please try again.')
    }
  }

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading syllabi...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center py-16">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Error Loading Syllabi</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (gradesWithPdfs.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Syllabi Available</h3>
            <p className="text-gray-600">
              Syllabi are not available at the moment. Please check back later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Available Test Syllabi
            </span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Download test syllabi for available grades
          </p>
        </div>

             {/* Desktop Table View */}
             <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
               <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                 <table className="w-full min-w-[640px]">
                   <thead className="bg-primary-600 text-white">
                     <tr>
                       <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
                         Grade
                       </th>
                      <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
                        Model Paper Title
                      </th>
                       <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
                         Academic Year
                       </th>
                       <th className="px-3 sm:px-6 py-4 text-right text-xs sm:text-sm font-semibold uppercase tracking-wider">
                         Actions
                       </th>
                     </tr>
                   </thead>
              <tbody className="divide-y divide-gray-200">
                {gradesWithPdfs.map(({ grade, syllabus }) => (
                  <tr
                    key={grade.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <span className="text-base sm:text-lg font-bold text-gray-900 truncate">{grade.name}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 min-w-0">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{syllabus.title}</div>
                      {syllabus.description && (
                        <div className="text-xs text-gray-500 mt-1 line-clamp-1 truncate">
                          {syllabus.description}
                        </div>
                      )}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className="text-xs sm:text-sm text-gray-700">
                        {syllabus.academicYear || 'N/A'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDownload(syllabus.pdfUrl!, syllabus.title)}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-colors font-semibold text-xs sm:text-sm min-h-[44px] min-w-[44px] touch-target"
                        aria-label={`Download ${syllabus.title} PDF`}
                      >
                        <Download className="w-4 h-4 flex-shrink-0" />
                        <span className="hidden sm:inline">Download PDF</span>
                        <span className="sm:hidden">Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 px-2">
          {gradesWithPdfs.map(({ grade, syllabus }) => (
            <div
              key={grade.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{grade.name}</h3>
                    {syllabus.academicYear && (
                      <p className="text-xs sm:text-sm text-gray-600 truncate">Year: {syllabus.academicYear}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-4 min-w-0">
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 truncate">{syllabus.title}</h4>
                {syllabus.description && (
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 break-words">{syllabus.description}</p>
                )}
              </div>

              <button
                onClick={() => handleDownload(syllabus.pdfUrl!, syllabus.title)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-colors font-semibold text-sm sm:text-base min-h-[44px] touch-target"
                aria-label={`Download ${syllabus.title} PDF`}
              >
                <Download className="w-5 h-5 flex-shrink-0" />
                <span>Download PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GradeSyllabusTable

