'use client'

import { useState } from 'react'
import { Loader2, AlertCircle, Maximize2, Download } from 'lucide-react'

interface PdfViewerProps {
  pdfUrl: string
}

const PdfViewer = ({ pdfUrl }: PdfViewerProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fullscreen, setFullscreen] = useState(false)

  const handleLoad = () => {
    setLoading(false)
    setError(null)
  }

  const handleError = () => {
    setLoading(false)
    setError('Failed to load PDF. Please try downloading it instead.')
  }

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
        <div className="flex items-center justify-between p-4 bg-black/50">
          <h3 className="text-white font-semibold">PDF Viewer</h3>
          <div className="flex items-center gap-4">
            <a
              href={pdfUrl}
              download
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Exit Fullscreen
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            onLoad={handleLoad}
            onError={handleError}
            title="PDF Viewer"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading PDF...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Instead</span>
          </a>
        </div>
      )}

      <div className="relative" style={{ minHeight: '600px' }}>
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          className="w-full"
          style={{ minHeight: '600px', height: '80vh' }}
          onLoad={handleLoad}
          onError={handleError}
          title="PDF Syllabus Viewer"
        />
        
        {!loading && !error && (
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-lg transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile-friendly download button */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <a
          href={pdfUrl}
          download
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF</span>
        </a>
      </div>
    </div>
  )
}

export default PdfViewer

