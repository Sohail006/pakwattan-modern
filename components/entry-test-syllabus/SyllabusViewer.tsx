'use client'

import { useState, useEffect } from 'react'
import { FileText, Download, Loader2, AlertCircle, BookOpen } from 'lucide-react'
import { getTestSyllabiPublic, TestSyllabus } from '@/lib/api/testSyllabus'
import PdfViewer from './PdfViewer'
import TextViewer from './TextViewer'

interface SyllabusViewerProps {
  selectedGradeId: number | null
}

const SyllabusViewer = ({ selectedGradeId }: SyllabusViewerProps) => {
  const [selectedSyllabus, setSelectedSyllabus] = useState<TestSyllabus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSyllabi = async () => {
    if (!selectedGradeId) return

    setLoading(true)
    setError(null)
    try {
      const data = await getTestSyllabiPublic({
        gradeId: selectedGradeId,
      })
      // Auto-select first syllabus if available
      if (data.length > 0) {
        setSelectedSyllabus(data[0])
      } else {
        setSelectedSyllabus(null)
      }
    } catch (err) {
      console.error('[SyllabusViewer] Failed to load syllabi:', err)
      setError('Failed to load syllabus. Please try again.')
      setSelectedSyllabus(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedGradeId) {
      loadSyllabi()
    } else {
      setSelectedSyllabus(null)
    }
  }, [selectedGradeId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="syllabus-viewer" className="section-padding bg-white">
      <div className="container-custom">

        {!selectedGradeId ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Select a Grade</h3>
            <p className="text-gray-600">Choose a grade above to view the test syllabus</p>
          </div>
        ) : loading ? (
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading syllabus...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Error Loading Syllabus</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadSyllabi}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : selectedSyllabus ? (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Syllabus Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-bold font-josefin mb-2">
                {selectedSyllabus.title}
              </h2>
              {selectedSyllabus.description && (
                <p className="text-white/90">{selectedSyllabus.description}</p>
              )}
            </div>

            {/* Content Display */}
            {selectedSyllabus.contentType === 'PDF' && selectedSyllabus.pdfUrl && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary-600" />
                    <h3 className="text-xl font-bold text-gray-800">PDF Syllabus</h3>
                  </div>
                  <a
                    href={selectedSyllabus.pdfUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                </div>
                <PdfViewer pdfUrl={selectedSyllabus.pdfUrl} />
              </div>
            )}

            {selectedSyllabus.contentType === 'Text' && selectedSyllabus.textContent && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-primary-600" />
                  <h3 className="text-xl font-bold text-gray-800">Text Syllabus</h3>
                </div>
                <TextViewer content={selectedSyllabus.textContent} />
              </div>
            )}

            {selectedSyllabus.contentType === 'Both' && (
              <div className="space-y-6">
                {/* PDF Section */}
                {selectedSyllabus.pdfUrl && (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-primary-600" />
                        <h3 className="text-xl font-bold text-gray-800">PDF Syllabus</h3>
                      </div>
                      <a
                        href={selectedSyllabus.pdfUrl}
                        download
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                    <PdfViewer pdfUrl={selectedSyllabus.pdfUrl} />
                  </div>
                )}

                {/* Text Section */}
                {selectedSyllabus.textContent && (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="w-6 h-6 text-primary-600" />
                      <h3 className="text-xl font-bold text-gray-800">Text Syllabus</h3>
                    </div>
                    <TextViewer content={selectedSyllabus.textContent} />
                  </div>
                )}
              </div>
            )}

            {selectedSyllabus.contentType === 'PDF' && !selectedSyllabus.pdfUrl && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-yellow-800">PDF file is not available at the moment.</p>
              </div>
            )}

            {selectedSyllabus.contentType === 'Text' && !selectedSyllabus.textContent && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-yellow-800">Text content is not available at the moment.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Syllabus Available</h3>
            <p className="text-gray-600">
              Syllabus for this grade is not available yet. Please check back later.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default SyllabusViewer

