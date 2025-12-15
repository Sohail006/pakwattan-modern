'use client'

import { useState, useEffect } from 'react'
import { X, Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { Event, CreateEventRequest, UpdateEventRequest, createEvent, updateEvent } from '@/lib/api/events'
import FormField from '@/components/ui/FormField'
import ProfileImageUpload from '@/components/ui/ProfileImageUpload'

interface EventFormProps {
  event?: Event | null
  mode: 'create' | 'edit'
  onClose: () => void
  onSuccess: (message?: string) => void
}

const EVENT_CATEGORIES = [
  'Academic',
  'Sports',
  'Cultural',
  'Religious',
  'General',
  'Ceremony',
  'Competition',
  'Test',
  'Announcement'
]

export default function EventForm({ event, mode, onClose, onSuccess }: EventFormProps) {
  const [formData, setFormData] = useState<CreateEventRequest>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    endDate: '',
    endTime: '',
    location: '',
    category: 'General',
    imageUrl: '',
    isPublished: true,
    isFeatured: false,
    displayOrder: 0
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState<string | null>(null)

  // Load event data when editing
  useEffect(() => {
    if (event && mode === 'edit') {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date.split('T')[0],
        time: event.time ? event.time.substring(0, 5) : '',
        endDate: event.endDate ? event.endDate.split('T')[0] : '',
        endTime: event.endTime ? event.endTime.substring(0, 5) : '',
        location: event.location || '',
        category: event.category,
        imageUrl: event.imageUrl || '',
        isPublished: event.isPublished,
        isFeatured: event.isFeatured,
        displayOrder: event.displayOrder
      })
    }
  }, [event, mode])

  const handleInputChange = (field: keyof CreateEventRequest, value: unknown) => {
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

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    }

    if (formData.endDate && formData.date) {
      if (new Date(formData.endDate) < new Date(formData.date)) {
        newErrors.endDate = 'End date must be after start date'
      }
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
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
      // Format time to HH:mm:ss if provided
      const submitData: CreateEventRequest = {
        ...formData,
        date: formData.date 
          ? `${formData.date}T00:00:00.000Z` 
          : new Date().toISOString(),
        time: formData.time ? `${formData.time}:00` : undefined,
        endTime: formData.endTime ? `${formData.endTime}:00` : undefined,
        endDate: formData.endDate 
          ? `${formData.endDate}T00:00:00.000Z` 
          : undefined
      }

      if (mode === 'edit' && event) {
        const updateData: UpdateEventRequest = {
          id: event.id,
          ...submitData
        }
        await updateEvent(updateData)
        onSuccess('Event has been updated successfully')
      } else {
        await createEvent(submitData)
        onSuccess('Event has been created successfully')
      }
      onClose()
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Unable to save event. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'edit' ? 'Edit Event' : 'Add New Event'}
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          {/* Title */}
          <FormField label="Title" required error={errors.title}>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter event title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              maxLength={500}
            />
          </FormField>

          {/* Description */}
          <FormField label="Description" required error={errors.description}>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter event description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          {/* Image Upload */}
          <FormField label="Event Image" hint="Upload an image for this event">
            <ProfileImageUpload
              value={formData.imageUrl || null}
              onChange={(url) => handleInputChange('imageUrl', url || '')}
              mode="edit"
              size="lg"
              shape="rounded"
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
                {EVENT_CATEGORIES.map((cat) => (
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

          {/* Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Start Time" hint="Optional">
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="End Time" hint="Optional">
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>
          </div>

          {/* End Date (for multi-day events) */}
          <FormField label="End Date" hint="Optional - for multi-day events" error={errors.endDate}>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              min={formData.date}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          {/* Location */}
          <FormField label="Location" hint="Event venue or address (optional)">
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter event location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

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
              <span className="text-sm font-medium text-gray-700">Featured Event</span>
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
                  <span>{mode === 'edit' ? 'Update' : 'Create'} Event</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

