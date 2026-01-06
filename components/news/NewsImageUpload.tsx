'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Upload, X, Loader2, Image as ImageIcon, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import imageCompression from 'browser-image-compression'
import { uploadNewsImage } from '@/lib/api/news'
import { getApiBaseUrl } from '@/lib/config'

interface NewsImageUploadProps {
  value?: string | null
  onChange: (imageUrl: string | null) => void
  onError?: (error: string) => void
  disabled?: boolean
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export default function NewsImageUpload({
  value,
  onChange,
  onError,
  disabled = false,
}: NewsImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const prevValueRef = useRef<string | null | undefined>(value)

  // Sync preview with value prop
  useEffect(() => {
    // Only update if value actually changed (not from internal state updates)
    if (value !== prevValueRef.current) {
      prevValueRef.current = value
      setPreview(value || null)
      setError(null)
    }
  }, [value])

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Please select a valid image file (JPEG, PNG, or WebP)'
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Image size must be less than 5MB'
    }
    return null
  }

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    return await imageCompression(file, options)
  }

  const handleFileSelect = useCallback(async (file: File) => {
    setError(null)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      onError?.(validationError)
      return
    }

    // Show preview immediately
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    // Compress and upload
    setUploading(true)

    try {
      const compressedFile = await compressImage(file)
      const imageUrl = await uploadNewsImage(compressedFile)

      // Clean up object URL
      URL.revokeObjectURL(objectUrl)

      // Update preview with server URL
      setPreview(imageUrl)
      onChange(imageUrl)
    } catch (error) {
      URL.revokeObjectURL(objectUrl)
      setPreview(null)
      const errorMessage = error instanceof Error ? error.message : 'Unable to upload image. Please try again.'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setUploading(false)
    }
  }, [onChange, onError])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (disabled) return

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    setError(null)
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getImageUrl = (imageUrl: string | null | undefined): string | null => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http')) return imageUrl
    const apiBase = getApiBaseUrl()
    const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
    return `${apiBase}${path}`
  }

  const displayUrl = getImageUrl(preview)

  return (
    <div className="space-y-3">
      {/* Preview */}
      {displayUrl && (
        <div className="relative inline-block">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
            <Image
              src={displayUrl}
              alt="News preview"
              fill
              className="object-cover"
              unoptimized={displayUrl.startsWith('blob:') || displayUrl.startsWith('http')}
              onError={() => setError('Failed to load image')}
            />
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors touch-target"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Upload Area */}
      {!displayUrl && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-gray-400'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileInputChange}
            disabled={disabled || uploading}
            className="hidden"
          />
          
          {uploading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <ImageIcon className="w-8 h-8 text-gray-400" />
              <div>
                <button
                  type="button"
                  onClick={() => !disabled && fileInputRef.current?.click()}
                  disabled={disabled}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 disabled:opacity-50"
                >
                  Click to upload
                </button>
                <span className="text-sm text-gray-500"> or drag and drop</span>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start space-x-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p className="break-words">{error}</p>
        </div>
      )}

      {/* Change Image Button */}
      {displayUrl && !disabled && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50 flex items-center space-x-1"
        >
          <Upload className="w-4 h-4" />
          <span>Change Image</span>
        </button>
      )}
    </div>
  )
}

