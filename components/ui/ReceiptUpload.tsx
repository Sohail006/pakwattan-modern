'use client'

import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Camera, X, Loader2, AlertCircle, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import { cn } from '@/lib/utils'
import { getApiBaseUrl } from '@/lib/config'

interface ReceiptUploadProps {
  value?: string | null
  onChange: (receiptUrl: string | null) => void
  onError?: (error: string) => void
  disabled?: boolean
  required?: boolean
  accept?: string
  maxSize?: number
  showInstructions?: boolean
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png']
const ACCEPT_ATTRIBUTE = 'image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png'

export default function ReceiptUpload({
  value,
  onChange,
  onError,
  disabled = false,
  accept = ACCEPT_ATTRIBUTE,
  maxSize = MAX_FILE_SIZE,
  showInstructions = true,
}: ReceiptUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [instructionsExpanded, setInstructionsExpanded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync preview with value prop
  useEffect(() => {
    if (value !== preview) {
      setPreview(value || null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB. Please compress your image or take a new photo.`
    }

    // Get file extension
    let fileName = file.name
    if (fileName.includes('\\') || fileName.includes('/')) {
      fileName = fileName.split(/[\\/]/).pop() || fileName
    }
    fileName = fileName.toLowerCase().trim()
    
    let extension: string | null = null
    const lastDotIndex = fileName.lastIndexOf('.')
    if (lastDotIndex > 0 && lastDotIndex < fileName.length - 1) {
      extension = '.' + fileName.substring(lastDotIndex + 1).toLowerCase()
    }

    // Get MIME type
    const mimeType = file.type ? file.type.toLowerCase().trim() : ''

    // Strict validation - reject PDFs
    if (mimeType === 'application/pdf' || extension === '.pdf') {
      return 'PDF files are not supported. Please upload an image (JPG, JPEG, or PNG) of your receipt.'
    }

    // Validate: Check extension OR MIME type
    const hasValidExtension = extension && ALLOWED_EXTENSIONS.includes(extension)
    const hasValidMimeType = mimeType && ALLOWED_TYPES.includes(mimeType)

    if (hasValidExtension) {
      return null
    }

    if (hasValidMimeType) {
      return null
    }

    if (!extension && !mimeType) {
      return `File type could not be determined. Please ensure the file is one of: ${ALLOWED_EXTENSIONS.join(', ').toUpperCase()}`
    }
    
    return `File type not allowed. Allowed types: ${ALLOWED_EXTENSIONS.join(', ').toUpperCase()}. Detected: ${extension || mimeType || 'unknown'}`
  }, [maxSize])

  const compressImage = async (file: File): Promise<File> => {
    try {
      const options = {
        maxSizeMB: 2, // Compress to max 2MB (larger than profile images for receipt clarity)
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: file.type,
      }
      const compressedFile = await imageCompression(file, options)
      return compressedFile
    } catch (error) {
      console.error('Image compression failed:', error)
      return file
    }
  }

  const handleFileSelect = useCallback(async (file: File) => {
    setError(null)

    // Validate file
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
    setUploadProgress(0)

    try {
      const compressedFile = await compressImage(file)
      setUploadProgress(30)

      // Upload to server
      const { uploadReceiptImage } = await import('@/lib/api/registrations')
      setUploadProgress(50)
      
      const receiptUrl = await uploadReceiptImage(compressedFile)
      setUploadProgress(90)

      // Clean up object URL
      URL.revokeObjectURL(objectUrl)

      // Update preview with server URL
      setPreview(receiptUrl)
      onChange(receiptUrl)
      setUploadProgress(100)
    } catch (error) {
      // Clean up object URL on error
      URL.revokeObjectURL(objectUrl)
      setPreview(null)
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload receipt. Please check your internet connection and try again.'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(0), 500)
    }
  }, [onChange, onError, validateFile])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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

    if (disabled || uploading) return

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onChange(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click()
    }
  }

  // Compute final image URL
  const finalImageUrl = useMemo(() => {
    if (!preview) return null
    
    if (preview.startsWith('blob:')) {
      return preview
    }
    
    if (preview.startsWith('http://') || preview.startsWith('https://')) {
      return preview
    }
    
    const apiBase = getApiBaseUrl()
    const path = preview.startsWith('/') ? preview : `/${preview}`
    const absoluteUrl = `${apiBase}${path}`
    
    return absoluteUrl
  }, [preview])

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        className={cn(
          'relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group',
          dragActive
            ? 'border-primary-500 bg-primary-50/50 scale-[1.02]'
            : error
            ? 'border-red-300 bg-red-50/30'
            : preview
            ? 'border-green-300 bg-green-50/30'
            : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50/30',
          disabled && 'opacity-50 cursor-not-allowed',
          uploading && 'cursor-wait'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Animated background gradient on hover */}
        <div
          className={cn(
            'absolute inset-0 rounded-xl transition-all duration-300',
            dragActive
              ? 'bg-gradient-to-br from-primary-50/50 to-accent-50/30'
              : 'bg-gradient-to-br from-primary-50/0 to-accent-50/0 group-hover:from-primary-50/50 group-hover:to-accent-50/30'
          )}
        />

        {!preview && !uploading && (
          <div className="relative z-10">
            <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Drag & drop your receipt photo here
            </p>
            <p className="text-sm text-gray-500">
              or <span className="text-primary-600 font-medium">click to browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-3">
              JPG, JPEG, PNG • Max {maxSize / (1024 * 1024)}MB
            </p>
          </div>
        )}

        {uploading && (
          <div className="relative z-10">
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary-600 animate-spin" />
            <p className="text-sm font-medium text-gray-700 mb-2">Uploading receipt...</p>
            <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">{uploadProgress}%</p>
          </div>
        )}

        {preview && !uploading && (
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Image
                  src={finalImageUrl || '/placeholder-receipt.png'}
                  alt="Receipt preview"
                  width={400}
                  height={300}
                  className="max-w-full max-h-48 rounded-lg border-2 border-gray-200 shadow-md object-contain"
                  unoptimized={true}
                />
                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1 shadow-lg">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <p className="text-sm font-semibold text-green-700 mb-2">✓ Receipt uploaded successfully</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2 justify-center hover:underline transition-colors"
            >
              <X className="w-4 h-4" />
              Remove and upload different photo
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled || uploading}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-900 mb-1">Upload Error</p>
            <p className="text-sm text-red-800">{error}</p>
            <button
              type="button"
              onClick={() => {
                setError(null)
                handleClick()
              }}
              className="mt-2 text-sm text-red-700 hover:text-red-900 font-medium underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Instructions Panel */}
      {showInstructions && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setInstructionsExpanded(!instructionsExpanded)}
            className="w-full p-4 flex items-center justify-between hover:bg-blue-100/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">
                📸 How to take a good receipt photo
              </span>
            </div>
            {instructionsExpanded ? (
              <ChevronUp className="w-5 h-5 text-blue-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-600" />
            )}
          </button>

          {instructionsExpanded && (
            <div className="px-4 pb-4 space-y-3 animate-in slide-in-from-top-2">
              {/* Good vs Bad Examples */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3 border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">Good Photo</span>
                  </div>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>✓ Clear and well-lit</li>
                    <li>✓ All details visible</li>
                    <li>✓ Not blurry</li>
                    <li>✓ Receipt is flat</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-3 border-2 border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <X className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-semibold text-red-800">Bad Photo</span>
                  </div>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>✗ Blurry or dark</li>
                    <li>✗ Details cut off</li>
                    <li>✗ Too small to read</li>
                    <li>✗ Receipt is wrinkled</li>
                  </ul>
                </div>
              </div>

              {/* Step-by-step Guide */}
              <div className="bg-white rounded-lg p-4 space-y-3">
                <p className="font-semibold text-sm text-gray-900 mb-2">Step-by-step:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <p className="text-sm text-gray-700">Take a clear photo of your transaction receipt</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <p className="text-sm text-gray-700">
                      Ensure amount, date, and transaction ID are visible
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <p className="text-sm text-gray-700">Make sure the photo is well-lit and not blurry</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <p className="text-sm text-gray-700">Upload using drag & drop or click to browse</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
