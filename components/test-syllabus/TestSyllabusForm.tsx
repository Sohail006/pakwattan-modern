'use client'

import { useState, useEffect } from 'react'
import { X, Save, Loader2, AlertCircle, Upload, FileText, Trash2 } from 'lucide-react'
import { TestSyllabus, TestSyllabusCreate, createTestSyllabus, updateTestSyllabus, uploadSyllabusPdf } from '@/lib/api/testSyllabus'
import { getGrades, Grade } from '@/lib/api/grades'
import FormField from '@/components/ui/FormField'

interface TestSyllabusFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (message?: string) => void
  editingSyllabus?: TestSyllabus | null
}

export default function TestSyllabusForm({ isOpen, onClose, onSuccess, editingSyllabus }: TestSyllabusFormProps) {
  const [formData, setFormData] = useState<TestSyllabusCreate>({
    title: '',
    gradeId: 0,
    academicYear: new Date().getFullYear(),
    contentType: 0, // 0 = PDF, 1 = Text, 2 = Both
    pdfUrl: '',
    textContent: '',
    description: '',
    displayOrder: 0,
    isActive: true,
  })

  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingGrades, setLoadingGrades] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)
  const [uploadingPdf, setUploadingPdf] = useState(false)

  // Load grades
  useEffect(() => {
    const loadGrades = async () => {
      try {
        const data = await getGrades(true)
        setGrades(data.sort((a, b) => a.order - b.order))
      } catch (error) {
        console.error('[TestSyllabusForm] Failed to load grades:', error)
      } finally {
        setLoadingGrades(false)
      }
    }
    loadGrades()
  }, [])

  // Load syllabus data when editing
  useEffect(() => {
    if (editingSyllabus) {
      setFormData({
        title: editingSyllabus.title,
        gradeId: editingSyllabus.gradeId,
        academicYear: editingSyllabus.academicYear,
        contentType: editingSyllabus.contentTypeValue,
        pdfUrl: editingSyllabus.pdfUrl || '',
        textContent: editingSyllabus.textContent || '',
        description: editingSyllabus.description || '',
        displayOrder: editingSyllabus.displayOrder,
        isActive: editingSyllabus.isActive,
      })
      if (editingSyllabus.pdfUrl) {
        setPdfPreview(editingSyllabus.pdfUrl)
      }
    } else {
      // Reset form for new syllabus
      setFormData({
        title: '',
        gradeId: 0,
        academicYear: new Date().getFullYear(),
        contentType: 0,
        pdfUrl: '',
        textContent: '',
        description: '',
        displayOrder: 0,
        isActive: true,
      })
      setPdfFile(null)
      setPdfPreview(null)
    }
  }, [editingSyllabus, isOpen])

  const handleInputChange = (field: keyof TestSyllabusCreate, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, pdfFile: 'Only PDF files are allowed.' }))
      return
    }

    // Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      setErrors(prev => ({ ...prev, pdfFile: 'PDF file size must be less than 10MB.' }))
      return
    }

    setPdfFile(file)
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.pdfFile
      return newErrors
    })

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setPdfPreview(previewUrl)
  }

  const removePdf = () => {
    setPdfFile(null)
    setPdfPreview(null)
    if (pdfPreview && pdfPreview.startsWith('blob:')) {
      URL.revokeObjectURL(pdfPreview)
    }
    setFormData(prev => ({ ...prev, pdfUrl: '' }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.gradeId || formData.gradeId === 0) {
      newErrors.gradeId = 'Grade is required'
    }

    if (formData.contentType === 0 && !formData.pdfUrl && !pdfFile) {
      newErrors.contentType = 'PDF file is required when content type is PDF only'
    }

    if (formData.contentType === 1 && !formData.textContent?.trim()) {
      newErrors.textContent = 'Text content is required when content type is Text only'
    }

    if (formData.contentType === 2) {
      if (!formData.pdfUrl && !pdfFile) {
        newErrors.pdfFile = 'PDF file is required when content type is Both'
      }
      if (!formData.textContent?.trim()) {
        newErrors.textContent = 'Text content is required when content type is Both'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})

    try {
      // Upload PDF if a new file is selected
      if (pdfFile) {
        setUploadingPdf(true)
        try {
          const uploadResult = await uploadSyllabusPdf(pdfFile)
          formData.pdfUrl = uploadResult.url
        } catch (uploadError) {
          setErrors({
            pdfFile: uploadError instanceof Error ? uploadError.message : 'Failed to upload PDF file.'
          })
          setUploadingPdf(false)
          setLoading(false)
          return
        } finally {
          setUploadingPdf(false)
        }
      }

      if (editingSyllabus) {
        await updateTestSyllabus(editingSyllabus.id, formData, pdfFile || undefined)
        onSuccess('Test syllabus has been updated successfully')
      } else {
        await createTestSyllabus(formData, pdfFile || undefined)
        onSuccess('Test syllabus has been created successfully')
      }
      
      // Clean up preview URL
      if (pdfPreview && pdfPreview.startsWith('blob:')) {
        URL.revokeObjectURL(pdfPreview)
      }
      
      onClose()
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Unable to save test syllabus. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingSyllabus ? 'Edit Test Syllabus' : 'Add New Test Syllabus'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{errors.general}</p>
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Basic Information
            </h3>

            <FormField label="Title *" required error={errors.title}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Test Syllabus for Grade 6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Grade *" required error={errors.gradeId}>
              <select
                value={formData.gradeId.toString()}
                onChange={(e) => handleInputChange('gradeId', parseInt(e.target.value))}
                disabled={loadingGrades}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="0">Select Grade</option>
                {grades.map(g => (
                  <option key={g.id} value={g.id.toString()}>{g.name}</option>
                ))}
              </select>
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Academic Year">
                <input
                  type="number"
                  value={formData.academicYear?.toString() || ''}
                  onChange={(e) => handleInputChange('academicYear', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="e.g., 2026"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </FormField>

              <FormField label="Display Order">
                <input
                  type="number"
                  value={formData.displayOrder?.toString() || '0'}
                  onChange={(e) => handleInputChange('displayOrder', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </FormField>
            </div>

            <FormField label="Description">
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the syllabus"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>
          </div>

          {/* Content Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Content Type *
            </h3>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="0"
                  checked={formData.contentType === 0}
                  onChange={(e) => handleInputChange('contentType', parseInt(e.target.value))}
                  className="mr-2"
                />
                <span>PDF Only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="1"
                  checked={formData.contentType === 1}
                  onChange={(e) => handleInputChange('contentType', parseInt(e.target.value))}
                  className="mr-2"
                />
                <span>Text Only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="2"
                  checked={formData.contentType === 2}
                  onChange={(e) => handleInputChange('contentType', parseInt(e.target.value))}
                  className="mr-2"
                />
                <span>Both PDF and Text</span>
              </label>
            </div>
            {errors.contentType && (
              <p className="text-sm text-red-600">{errors.contentType}</p>
            )}
          </div>

          {/* PDF Upload */}
          {(formData.contentType === 0 || formData.contentType === 2) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                PDF File *
              </h3>
              {pdfPreview ? (
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {pdfFile?.name || 'PDF file uploaded'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removePdf}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <a
                    href={pdfPreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:underline"
                  >
                    View PDF
                  </a>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload PDF File (Max 10MB)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handlePdfChange}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-gray-500">
                        PDF files only, max 10MB
                      </span>
                    </label>
                  </div>
                  {errors.pdfFile && (
                    <p className="text-sm text-red-600 mt-1">{errors.pdfFile}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Text Content */}
          {(formData.contentType === 1 || formData.contentType === 2) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Text Content *
              </h3>
              <FormField label="" error={errors.textContent}>
                <textarea
                  value={formData.textContent || ''}
                  onChange={(e) => handleInputChange('textContent', e.target.value)}
                  placeholder="Enter syllabus content in text format. You can use HTML for formatting."
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                />
              </FormField>
              <p className="text-xs text-gray-500">
                You can use HTML tags for formatting (e.g., &lt;h1&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;)
              </p>
            </div>
          )}

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => handleInputChange('isActive', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Active (visible on public page)
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingPdf}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || uploadingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {uploadingPdf ? 'Uploading PDF...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {editingSyllabus ? 'Update Syllabus' : 'Create Syllabus'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

