'use client'

import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { Upload, X, Loader2, Image as ImageIcon, AlertCircle } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import { cn } from '@/lib/utils'

// Helper to get API base URL
const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_BACKEND_BASE_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'https://localhost:7210'
    }
  }
  return 'http://localhost:5000'
}

interface ProfileImageUploadProps {
  value?: string | null
  onChange: (imageUrl: string | null) => void
  onError?: (error: string) => void
  studentId?: number
  mode?: 'create' | 'edit'
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  shape?: 'circle' | 'square' | 'rounded'
  forceVertical?: boolean // Force vertical layout regardless of screen size
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
const ACCEPT_ATTRIBUTE = 'image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp'

export default function ProfileImageUpload({
  value,
  onChange,
  onError,
  studentId,
  mode = 'create',
  disabled = false,
  size = 'md',
  shape = 'circle',
  forceVertical = false,
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [imageError, setImageError] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Debug: Log when error state changes
  useEffect(() => {
    if (error && process.env.NODE_ENV === 'development') {
      console.warn('[ProfileImageUpload] Error state changed:', {
        error,
        preview,
        imageError
      })
    }
  }, [error, preview, imageError])

  // Sync preview with value prop (for edit mode)
  useEffect(() => {
    if (value !== preview) {
      setPreview(value || null)
      setImageError(false) // Reset error when value changes
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  }

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg',
  }

  const validateFile = (file: File): string | null => {
    // Check file size first
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / (1024 * 1024)}MB`
    }

    // Get file extension - handle full paths and filenames
    // Extract just the filename if it's a full path
    let fileName = file.name
    // Handle Windows paths (C:\...) and Unix paths (/...)
    if (fileName.includes('\\') || fileName.includes('/')) {
      fileName = fileName.split(/[\\/]/).pop() || fileName
    }
    fileName = fileName.toLowerCase().trim()
    
    // Extract extension more robustly
    let extension: string | null = null
    const lastDotIndex = fileName.lastIndexOf('.')
    if (lastDotIndex > 0 && lastDotIndex < fileName.length - 1) {
      // Extension exists and is not at the start or end
      extension = '.' + fileName.substring(lastDotIndex + 1).toLowerCase()
    }

    // Get MIME type (normalize it)
    const mimeType = file.type ? file.type.toLowerCase().trim() : ''

    // Validate: Check extension OR MIME type (at least one must match)
    // Prioritize extension check as it's more reliable
    const hasValidExtension = extension && ALLOWED_EXTENSIONS.includes(extension)
    const hasValidMimeType = mimeType && ALLOWED_TYPES.includes(mimeType)

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('File validation:', {
        fileName: file.name,
        extractedFileName: fileName,
        extension,
        mimeType,
        hasValidExtension,
        hasValidMimeType,
      })
    }

    // If extension is valid, accept the file (even if MIME type is missing or different)
    // This handles cases where browsers don't set MIME types correctly
    if (hasValidExtension) {
      return null
    }

    // If MIME type is valid but extension is not, still accept it
    // (some files might have wrong extensions)
    if (hasValidMimeType) {
      return null
    }

    // If neither extension nor MIME type is valid, reject
    // If file has no extension and no MIME type, provide helpful error
    if (!extension && !mimeType) {
      return `File type could not be determined. Please ensure the file is one of: ${ALLOWED_EXTENSIONS.join(', ').toUpperCase()}`
    }
    
    return `File type not allowed. Allowed types: ${ALLOWED_EXTENSIONS.join(', ').toUpperCase()}. Detected: ${extension || mimeType || 'unknown'}`
  }

  const compressImage = async (file: File): Promise<File> => {
    try {
      const options = {
        maxSizeMB: 1, // Compress to max 1MB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: file.type,
      }

      const compressedFile = await imageCompression(file, options)
      return compressedFile
    } catch (error) {
      console.error('Image compression failed:', error)
      // Return original file if compression fails
      return file
    }
  }

  const handleFileSelect = useCallback(async (file: File) => {
    setError(null)

    // Validate file
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      // Don't call onError for validation errors - they're handled internally
      return
    }

    // Show preview immediately
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    // Compress image
    setUploading(true)
    setUploadProgress(0)

    try {
      const compressedFile = await compressImage(file)

      // Upload to server
      const { uploadStudentProfileImage, uploadStudentProfileImageTemp } = await import('@/lib/api/students')
      
      let imageUrl: string
      if (studentId && mode === 'edit') {
        imageUrl = await uploadStudentProfileImage(studentId, compressedFile)
      } else {
        imageUrl = await uploadStudentProfileImageTemp(compressedFile)
      }

      // Clean up object URL
      URL.revokeObjectURL(objectUrl)

      // Log the response for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('[ProfileImageUpload] Upload successful:', {
          imageUrl,
          type: typeof imageUrl,
          length: imageUrl?.length,
          startsWithSlash: imageUrl?.startsWith('/'),
          apiBase: getApiBaseUrl()
        })
      }

      // Update preview with server URL
      setPreview(imageUrl)
      onChange(imageUrl)
      setUploadProgress(100)
    } catch (error) {
      // Clean up object URL on error
      URL.revokeObjectURL(objectUrl)
      setPreview(null)
      const errorMessage = error instanceof Error ? error.message : 'Unable to upload image. Please ensure the file is a valid image and try again.'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }, [studentId, mode, onChange, onError])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
    // Reset input to allow selecting same file again
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

  // Helper to check if URL has an extension
  const hasExtension = (url: string): boolean => {
    const path = url.split('?')[0] // Remove query string
    const lastDot = path.lastIndexOf('.')
    const lastSlash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
    return lastDot > lastSlash && lastDot < path.length - 1
  }

  // Compute final image URL with useMemo to ensure it's always absolute
  const finalImageUrl = useMemo(() => {
    if (!preview) return null
    
    // If preview is a blob URL, use it directly
    if (preview.startsWith('blob:')) {
      return preview
    }
    
    // If preview is already a full HTTP/HTTPS URL, use it directly
    if (preview.startsWith('http://') || preview.startsWith('https://')) {
      return preview
    }
    
    // For relative paths, ALWAYS construct absolute URL with API base
    const apiBase = getApiBaseUrl()
    
    // Handle different path formats
    let path: string
    if (preview.startsWith('/')) {
      // Already has leading slash (e.g., /uploads/students/...)
      path = preview
    } else if (preview.includes('/')) {
      // Has path but no leading slash (e.g., uploads/students/...)
      path = `/${preview}`
    } else {
      // Just filename (shouldn't happen, but handle it)
      // Assume it's in the temp folder
      path = `/uploads/students/profile-images/temp/${preview}`
    }
    
    // ALWAYS return absolute URL - never return relative paths
    const absoluteUrl = `${apiBase}${path}`
    
    // For old files without extensions, use the image serve endpoint
    if (!hasExtension(absoluteUrl)) {
      const serveUrl = `${apiBase}/api/images/serve?path=${encodeURIComponent(path)}`
      if (process.env.NODE_ENV === 'development') {
        console.log('[ProfileImageUpload] Using image serve endpoint:', serveUrl)
      }
      return serveUrl
    }
    
    // Verify it's absolute before returning
    if (!absoluteUrl.startsWith('http://') && !absoluteUrl.startsWith('https://')) {
      console.error('[ProfileImageUpload] ERROR: Constructed URL is not absolute!', {
        preview,
        path,
        apiBase,
        absoluteUrl
      })
      // Force absolute URL
      return `${getApiBaseUrl()}${path}`
    }
    
    // Log in development to verify URL construction
    if (process.env.NODE_ENV === 'development') {
      console.log('[ProfileImageUpload] Constructed absolute URL:', {
        preview,
        path,
        apiBase,
        absoluteUrl,
        isAbsolute: absoluteUrl.startsWith('http://') || absoluteUrl.startsWith('https://')
      })
    }
    
    return absoluteUrl
  }, [preview])

  // Compute the actual src URL that will be used
  const actualSrcUrl = useMemo(() => {
    if (!preview) return undefined
    
    // Blob URLs - use as-is
    if (preview.startsWith('blob:')) {
      return preview
    }
    
    // Already absolute - use as-is
    if (preview.startsWith('http://') || preview.startsWith('https://')) {
      return preview
    }
    
    // For relative paths, construct absolute URL directly
    const apiBase = getApiBaseUrl()
    const path = preview.startsWith('/') ? preview : `/${preview}`
    const absoluteUrl = `${apiBase}${path}`
    
    // Verify it's absolute
    if (!absoluteUrl.startsWith('http://') && !absoluteUrl.startsWith('https://')) {
      console.error('[ProfileImageUpload] ERROR: Failed to construct absolute URL!', {
        preview,
        apiBase,
        path,
        absoluteUrl
      })
      return undefined
    }
    
    return absoluteUrl
  }, [preview])

  // CRITICAL: Force absolute URL on img element after render
  useEffect(() => {
    if (imgRef.current && actualSrcUrl) {
      // Verify the src is absolute
      if (!actualSrcUrl.startsWith('http://') && !actualSrcUrl.startsWith('https://') && !actualSrcUrl.startsWith('blob:')) {
        console.error('[ProfileImageUpload] CRITICAL: actualSrcUrl is not absolute!', {
          actualSrcUrl,
          preview,
          apiBase: getApiBaseUrl()
        })
        // Force absolute URL
        const apiBase = getApiBaseUrl()
        const path = actualSrcUrl.startsWith('/') ? actualSrcUrl : `/${actualSrcUrl}`
        const forcedAbsolute = `${apiBase}${path}`
        imgRef.current.src = forcedAbsolute
        console.log('[ProfileImageUpload] Forced absolute URL on img element:', forcedAbsolute)
      } else {
        // Set src directly to ensure it's absolute
        imgRef.current.src = actualSrcUrl
        if (process.env.NODE_ENV === 'development') {
          console.log('[ProfileImageUpload] Set img src to absolute URL:', {
            actualSrcUrl,
            imgSrc: imgRef.current.src,
            matches: imgRef.current.src === actualSrcUrl
          })
        }
      }
      
      // Double-check after a short delay
      setTimeout(() => {
        if (imgRef.current) {
          const currentSrc = imgRef.current.src
          const isAbsolute = currentSrc.startsWith('http://') || currentSrc.startsWith('https://') || currentSrc.startsWith('blob:')
          if (!isAbsolute) {
            console.error('[ProfileImageUpload] CRITICAL: img src became relative after setting!', {
              expected: actualSrcUrl,
              actual: currentSrc,
              forcing: true
            })
            // Force it again
            imgRef.current.src = actualSrcUrl
          }
        }
      }, 50)
    }
  }, [actualSrcUrl, preview])

  // Debug logging in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && preview) {
      const apiBase = getApiBaseUrl()
      const isAbsolute = actualSrcUrl?.startsWith('http://') || actualSrcUrl?.startsWith('https://') || actualSrcUrl?.startsWith('blob:')
      const isRelative = actualSrcUrl?.startsWith('/') && !actualSrcUrl?.startsWith('http')
      
      console.log('[ProfileImageUpload] Image Debug:', {
        preview,
        actualSrcUrl,
        finalImageUrl,
        hasExtension: hasExtension(actualSrcUrl || ''),
        imageError,
        apiBase,
        isAbsolute,
        isRelative
      })
      
      // Final safety check - if somehow we still have a relative URL, log error
      if (isRelative) {
        console.error('[ProfileImageUpload] ERROR: Still have relative URL in actualSrcUrl!', {
          actualSrcUrl,
          preview,
          apiBase,
          expectedAbsolute: `${apiBase}${actualSrcUrl}`
        })
      }
      
      // Check actual img element src after render
      setTimeout(() => {
        if (imgRef.current) {
          console.log('[ProfileImageUpload] Actual img src attribute:', {
            src: imgRef.current.src,
            isAbsolute: imgRef.current.src.startsWith('http://') || imgRef.current.src.startsWith('https://') || imgRef.current.src.startsWith('blob:'),
            isRelative: imgRef.current.src.startsWith('/') && !imgRef.current.src.startsWith('http'),
            expected: actualSrcUrl,
            matches: imgRef.current.src === actualSrcUrl
          })
          
          // If src is still relative, force it to absolute
          if (imgRef.current.src.startsWith('/') && !imgRef.current.src.startsWith('http')) {
            const apiBase = getApiBaseUrl()
            const path = imgRef.current.src
            const forcedAbsolute = `${apiBase}${path}`
            console.error('[ProfileImageUpload] CRITICAL: img src is still relative! Forcing to absolute:', {
              relative: imgRef.current.src,
              absolute: forcedAbsolute
            })
            imgRef.current.src = forcedAbsolute
          }
        }
      }, 100)
    }
  }, [preview, actualSrcUrl, finalImageUrl, imageError])

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Profile Picture
      </label>

      <div className={cn(
        'flex items-start gap-4',
        forceVertical ? 'flex-col' : 'flex-col sm:flex-row',
        'w-full'
      )}>
        {/* Preview */}
        <div
          className={cn(
            'relative flex-shrink-0',
            forceVertical ? 'mx-auto' : '',
            sizeClasses[size],
            shapeClasses[shape],
            'border-2 border-gray-300 overflow-hidden bg-gray-50',
            'ring-2 ring-transparent focus-within:ring-primary-500 focus-within:ring-offset-2',
            'transition-all duration-200',
            uploading && 'opacity-50'
          )}
        >
          {finalImageUrl && !imageError ? (
            <>
              <div className="relative w-full h-full group">
                {/* Use regular img tag for external images to avoid Next.js Image restrictions */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  key={`img-${preview || 'no-image'}`} // Force re-render when preview changes
                  src={actualSrcUrl || undefined}
                  alt="Profile preview"
                  className={cn(
                    'w-full h-full object-cover transition-transform duration-200 group-hover:scale-105',
                    shapeClasses[shape]
                  )}
                  onLoad={() => {
                    setImageError(false)
                    if (process.env.NODE_ENV === 'development') {
                      const imgSrc = (document.querySelector(`img[alt="Profile preview"]`) as HTMLImageElement)?.src
                      console.log('[ProfileImageUpload] Image loaded successfully:', {
                        url: finalImageUrl,
                        actualSrc: imgSrc,
                        isAbsolute: finalImageUrl?.startsWith('http://') || finalImageUrl?.startsWith('https://')
                      })
                    }
                  }}
                  onError={(e) => {
                    const errorDetails = {
                      src: finalImageUrl,
                      originalPreview: preview,
                      finalUrl: finalImageUrl,
                      error: e,
                      timestamp: new Date().toISOString(),
                      apiBase: getApiBaseUrl(),
                      note: 'Check Network tab for HTTP status code'
                    }
                    console.error('[ProfileImageUpload] Image load error:', errorDetails)
                    
                    // Only set error message if we have a server URL (not a blob URL)
                    // Blob URLs are temporary and errors are expected when they're revoked
                    if (finalImageUrl && !finalImageUrl.startsWith('blob:')) {
                      setImageError(true)
                      // Don't clear preview - let user see what URL failed
                      setError(`Unable to load image from server. The image may have been moved or deleted. Please upload a new image.`)
                    } else {
                      // For blob URLs, just mark as error but don't show message
                      // Blob URLs can fail if they're revoked, which is normal
                      setImageError(true)
                    }
                  }}
                />
              </div>
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
              {!disabled && !uploading && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove()
                  }}
                  className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Upload Area */}
        <div className={cn(
          'w-full',
          forceVertical ? '' : 'flex-1 sm:w-auto',
          'min-w-0' // Prevent flex item from overflowing
        )}>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
            className={cn(
              'border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200',
              'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
              'p-4 sm:p-6', // Responsive padding
              dragActive
                ? 'border-primary-500 bg-primary-50 scale-[1.02] shadow-md'
                : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50/30',
              disabled && 'opacity-50 cursor-not-allowed',
              uploading && 'cursor-wait',
              'w-full max-w-full' // Ensure it doesn't overflow
            )}
            role="button"
            tabIndex={disabled || uploading ? -1 : 0}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !disabled && !uploading) {
                e.preventDefault()
                handleClick()
              }
            }}
            aria-label="Upload profile picture"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPT_ATTRIBUTE}
              onChange={handleFileInputChange}
              className="hidden"
              disabled={disabled || uploading}
            />

            <div className="flex flex-col items-center justify-center text-center">
              {uploading ? (
                <>
                  <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-2">Uploading image...</p>
                  {uploadProgress > 0 && (
                    <div className="w-full max-w-xs mt-2 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-full rounded-full transition-all duration-300 shadow-sm"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">{uploadProgress}%</p>
                </>
              ) : (
                <>
                  <div className={cn(
                    'mb-3 p-3 rounded-full transition-colors duration-200',
                    dragActive ? 'bg-primary-100' : 'bg-gray-100'
                  )}>
                    <Upload className={cn(
                      'w-8 h-8 transition-colors duration-200',
                      dragActive ? 'text-primary-600' : 'text-gray-400'
                    )} />
                  </div>
                  <p className="text-sm text-gray-700 mb-1.5 break-words">
                    <span className="text-primary-600 font-semibold">Click to upload</span>
                    <span className="text-gray-500"> or </span>
                    <span className="text-primary-600 font-semibold">drag and drop</span>
                  </p>
                  <p className="text-xs text-gray-500 break-words">
                    {ALLOWED_EXTENSIONS.join(', ').toUpperCase()} • Max {MAX_FILE_SIZE / (1024 * 1024)}MB
                  </p>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-3 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="flex-1">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

