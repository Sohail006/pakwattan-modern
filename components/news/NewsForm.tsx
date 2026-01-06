'use client'

import { useState, useEffect } from 'react'
import { X, Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { News, CreateNewsRequest, UpdateNewsRequest, createNews, updateNews } from '@/lib/api/news'
import FormField from '@/components/ui/FormField'
import NewsImageUpload from '@/components/news/NewsImageUpload'
import RichTextEditor from '@/components/ui/RichTextEditor'

interface NewsFormProps {
  news?: News | null
  mode: 'create' | 'edit'
  onClose: () => void
  onSuccess: (message?: string) => void
}

const NEWS_CATEGORIES = [
  'General',
  'Admissions',
  'Exams',
  'Events',
  'Achievements',
  'Announcements',
  'Sports',
  'Academic',
  'Competition',
  'Ceremony',
  'Test'
]

// Helper to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export default function NewsForm({ news, mode, onClose, onSuccess }: NewsFormProps) {
  const [formData, setFormData] = useState<CreateNewsRequest>({
    title: '',
    slug: '',
    description: '',
    content: '',
    category: 'General',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
    isPublished: true,
    isFeatured: false,
    isInMarquee: false,
    displayOrder: 0
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState<string | null>(null)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  // Load news data when editing
  useEffect(() => {
    if (news && mode === 'edit') {
      setFormData({
        title: news.title,
        slug: news.slug,
        description: news.description,
        content: news.content || '',
        category: news.category,
        imageUrl: news.imageUrl || '',
        date: news.date.split('T')[0],
        isPublished: news.isPublished,
        isFeatured: news.isFeatured,
        isInMarquee: news.isInMarquee,
        displayOrder: news.displayOrder
      })
      setSlugManuallyEdited(true)
    }
  }, [news, mode])

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.title)
      }))
    }
  }, [formData.title, slugManuallyEdited])

  const handleInputChange = (field: keyof CreateNewsRequest, value: unknown) => {
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

    setSuccess(null)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length > 500) {
      newErrors.title = 'Title must be 500 characters or less'
    }

    const slug = formData.slug?.trim()
    if (!slug) {
      newErrors.slug = 'Slug is required'
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length > 2000) {
      newErrors.description = 'Description must be 2000 characters or less'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
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
    setSuccess(null)
    setErrors({})

    try {
      // Convert date from YYYY-MM-DD to ISO datetime string (UTC midnight)
      const submitData = {
        ...formData,
        date: formData.date 
          ? `${formData.date}T00:00:00.000Z` 
          : new Date().toISOString()
      }

      if (mode === 'edit' && news) {
        const updateData: UpdateNewsRequest = {
          id: news.id,
          ...submitData
        }
        await updateNews(updateData)
        onSuccess('News item has been updated successfully')
      } else {
        await createNews(submitData)
        onSuccess('News item has been created successfully')
      }
      onClose()
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Unable to save news item. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate min-w-0 flex-1">
            {mode === 'edit' ? 'Edit News' : 'Add New News'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 active:text-gray-700 transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0 ml-2"
            aria-label="Close form"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start sm:items-center space-x-2 sm:space-x-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-red-700 text-xs sm:text-sm break-words flex-1">{errors.general}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 flex items-start sm:items-center space-x-2 sm:space-x-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-green-700 text-xs sm:text-sm break-words flex-1">{success}</p>
            </div>
          )}

          {/* Title */}
          <FormField label="Title" required error={errors.title}>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter news title"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]"
              maxLength={500}
            />
          </FormField>

          {/* Slug */}
          <FormField 
            label="Slug" 
            required 
            error={errors.slug}
            hint="URL-friendly identifier (auto-generated from title)"
          >
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => {
                setSlugManuallyEdited(true)
                handleInputChange('slug', e.target.value.toLowerCase())
              }}
              placeholder="news-item-slug"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
              pattern="[a-z0-9-]+"
            />
          </FormField>

          {/* Description */}
          <FormField label="Description" required error={errors.description}>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter news description (short summary)"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              maxLength={2000}
            />
          </FormField>

          {/* Content (Optional) */}
          <FormField label="Content" hint="Full article content (optional - supports HTML formatting)">
            <RichTextEditor
              value={formData.content || ''}
              onChange={(html) => handleInputChange('content', html)}
              placeholder="Enter full article content (optional)"
              rows={8}
              disabled={loading}
            />
          </FormField>

          {/* Image Upload */}
          <FormField label="Featured Image" hint="Upload a featured image for this news item">
            <NewsImageUpload
              value={formData.imageUrl || null}
              onChange={(url) => handleInputChange('imageUrl', url || '')}
              disabled={loading}
            />
          </FormField>

          {/* Category and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Category" required error={errors.category}>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {NEWS_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Date" required error={errors.date}>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>
          </div>

          {/* Display Order */}
          <FormField label="Display Order" hint="Lower numbers appear first (0 = default)">
            <input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => handleInputChange('displayOrder', parseInt(e.target.value) || 0)}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">Published (visible on frontend)</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured News</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isInMarquee}
                onChange={(e) => handleInputChange('isInMarquee', e.target.checked)}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">Show in Top Marquee</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{mode === 'edit' ? 'Update' : 'Create'} News</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

