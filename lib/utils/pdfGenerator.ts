import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import { RegistrationResponse } from '@/lib/api/registrations'
import { SCHOOL_INFO } from '@/lib/constants'
import { getActiveAdmissionSetting } from '@/lib/api/admissionSettings'
import { formatDate, formatTime } from '@/lib/utils'

/**
 * Convert hex color to RGB array for jsPDF
 */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0]
}

/**
 * Get API base URL
 */
function getApiBaseUrl(): string {
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

/**
 * Check if URL has file extension
 */
function hasExtension(url: string): boolean {
  const path = url.split('?')[0]
  const lastDot = path.lastIndexOf('.')
  const lastSlash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
  return lastDot > lastSlash && lastDot < path.length - 1
}

/**
 * Construct absolute image URL (similar to ProfileImageUpload component)
 */
function getImageUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null
  
  // If preview is a blob URL, use it directly
  if (imageUrl.startsWith('blob:')) {
    return imageUrl
  }
  
  // If preview is already a full HTTP/HTTPS URL, use it directly
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    // For old files without extensions, use the image serve endpoint
    if (!hasExtension(imageUrl)) {
      try {
        const url = new URL(imageUrl)
        const path = url.pathname
        return `${url.origin}/api/images/serve?path=${encodeURIComponent(path)}`
      } catch {
        return imageUrl
      }
    }
    return imageUrl
  }
  
  // For relative paths, construct absolute URL with API base
  const apiBase = getApiBaseUrl()
  
  // Handle different path formats
  let path: string
  if (imageUrl.startsWith('/')) {
    // Already has leading slash (e.g., /uploads/students/...)
    path = imageUrl
  } else if (imageUrl.includes('/')) {
    // Has path but no leading slash (e.g., uploads/students/...)
    path = `/${imageUrl}`
  } else {
    // Just filename (assume it's in the temp folder)
    path = `/uploads/students/profile-images/temp/${imageUrl}`
  }
  
  // Construct absolute URL
  let absoluteUrl = `${apiBase}${path}`
  
  // For old files without extensions, use the image serve endpoint
  if (!hasExtension(absoluteUrl)) {
    absoluteUrl = `${apiBase}/api/images/serve?path=${encodeURIComponent(path)}`
  }
  
  return absoluteUrl
}

/**
 * Load image and convert to base64 data URL
 */
async function loadImageAsDataUrl(src: string | null | undefined, isProfilePicture: boolean = false): Promise<string | null> {
  if (!src) return null
  
  try {
    // For profile pictures, use the same URL construction logic as ProfileImageUpload
    const imageUrl = isProfilePicture ? getImageUrl(src) : src
    
    if (!imageUrl) return null
    
    // Handle blob URLs
    if (imageUrl.startsWith('blob:')) {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = () => resolve(null)
        reader.readAsDataURL(blob)
      })
    }
    
    // Handle absolute URLs (http/https)
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      try {
        const response = await fetch(imageUrl, {
          mode: 'cors',
          credentials: 'omit',
        })
        
        if (!response.ok) {
          console.warn('Failed to fetch image:', imageUrl, 'Status:', response.status)
          return null
        }
        
        const blob = await response.blob()
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = () => {
            console.warn('Failed to read image blob:', imageUrl)
            resolve(null)
          }
          reader.readAsDataURL(blob)
        })
      } catch (fetchError) {
        console.warn('Error fetching image:', imageUrl, fetchError)
        return null
      }
    }
    
    // Handle relative paths (public folder)
    if (imageUrl.startsWith('/') && !isProfilePicture) {
      // For Next.js public folder, we need to fetch from the server
      const fullUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}${imageUrl}`
        : imageUrl
      const response = await fetch(fullUrl)
      const blob = await response.blob()
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = () => resolve(null)
        reader.readAsDataURL(blob)
      })
    }
    
    return null
  } catch (error) {
    console.warn('Failed to load image:', src, error)
    return null
  }
}

/**
 * Generate and download roll number slip as PDF
 * Optimized to fit on a single A4 page with professional design
 * Includes school logo and student profile picture
 * Uses official brand colors
 * @param registration - Registration data to include in the slip
 */
export async function generateRollNumberSlipPDF(registration: RegistrationResponse): Promise<void> {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // Page dimensions
    const pageWidth = 210
    const pageHeight = 297
    const margin = 10
    const contentWidth = pageWidth - (margin * 2)

    // Official brand colors (from tailwind.config.js)
    const primaryColor: [number, number, number] = hexToRgb('#24744f') // Primary green
    const accentColor: [number, number, number] = hexToRgb('#fda406') // Accent orange
    const darkColor: [number, number, number] = [17, 24, 39] // Gray-900
    const lightGray: [number, number, number] = [243, 244, 246] // Gray-100

    let yPos = margin

    // ============================================
    // HEADER SECTION (With Logo)
    // ============================================
    const headerHeight = 35
    
    // Load school logo
    const logoDataUrl = await loadImageAsDataUrl(SCHOOL_INFO.logo, false)
    
    // Header background with gradient effect
    doc.setFillColor(...primaryColor)
    doc.rect(margin, yPos, contentWidth, headerHeight, 'F')
    
    // Add accent color stripe at bottom of header
    doc.setFillColor(...accentColor)
    doc.rect(margin, yPos + headerHeight - 3, contentWidth, 3, 'F')

    // School Logo (left side)
    if (logoDataUrl) {
      try {
        const logoSize = 25
        doc.addImage(logoDataUrl, 'PNG', margin + 5, yPos + 5, logoSize, logoSize)
      } catch (error) {
        console.warn('Failed to add logo to PDF:', error)
      }
    }
    
    // School name and title (right of logo or centered if no logo)
    const textStartX = logoDataUrl ? margin + 35 : margin + 5
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('PAK WATTAN', textStartX, yPos + 12, { align: 'left' })
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('School & College of Sciences', textStartX, yPos + 20, { align: 'left' })
    
    // Roll Number Slip Title (right side)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('ROLL NUMBER SLIP', margin + contentWidth - 5, yPos + 16, { align: 'right' })

    yPos += headerHeight + 8

    // ============================================
    // PROMINENT ROLL NUMBER BOX (With Profile Picture)
    // ============================================
    const rollNumberBoxHeight = 25
    const rollNumberBoxWidth = 90
    const profilePicSize = 20
    
    // Load student profile picture
    let profilePicDataUrl: string | null = null
    if (registration.profilePictureUrl) {
      console.log('[PDF Generator] Loading profile picture:', registration.profilePictureUrl)
      profilePicDataUrl = await loadImageAsDataUrl(registration.profilePictureUrl, true)
      if (profilePicDataUrl) {
        console.log('[PDF Generator] Profile picture loaded successfully')
      } else {
        console.warn('[PDF Generator] Failed to load profile picture')
      }
    } else {
      console.log('[PDF Generator] No profile picture URL provided')
    }
    
    // Background box for roll number
    doc.setFillColor(...lightGray)
    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(0.5)
    const rollBoxX = margin + (contentWidth - rollNumberBoxWidth) / 2
    doc.rect(rollBoxX, yPos, rollNumberBoxWidth, rollNumberBoxHeight, 'FD')
    
    // Student Profile Picture (left side of box)
    if (profilePicDataUrl) {
      try {
        const picX = rollBoxX + 3
        const picY = yPos + (rollNumberBoxHeight - profilePicSize) / 2
        // Add circular border for profile picture
        doc.setFillColor(255, 255, 255)
        doc.circle(picX + profilePicSize / 2, picY + profilePicSize / 2, profilePicSize / 2 + 1, 'F')
        doc.addImage(profilePicDataUrl, 'PNG', picX, picY, profilePicSize, profilePicSize)
      } catch (error) {
        console.warn('Failed to add profile picture to PDF:', error)
      }
    }
    
    // Roll Number Label and Value (center/right of box)
    const rollTextX = profilePicDataUrl ? rollBoxX + profilePicSize + 8 : rollBoxX + 5
    const rollTextWidth = profilePicDataUrl 
      ? rollNumberBoxWidth - profilePicSize - 11 
      : rollNumberBoxWidth - 10
    
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    doc.text('ROLL NUMBER', rollTextX + rollTextWidth / 2, yPos + 8, { align: 'center' })
    
    // Roll Number Value (Large and Bold)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    const rollNumber = registration.rollNumber || 'PENDING'
    doc.text(rollNumber, rollTextX + rollTextWidth / 2, yPos + 19, { align: 'center' })

    yPos += rollNumberBoxHeight + 10

    // ============================================
    // STUDENT INFORMATION SECTION
    // ============================================
    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...darkColor)
    
    // Section header with underline
    doc.text('STUDENT INFORMATION', margin, yPos)
    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(0.5)
    doc.line(margin, yPos + 2, margin + 100, yPos + 2)
    
    yPos += 7

    // Two-column layout for student info
    const col1X = margin
    const col2X = margin + contentWidth / 2 + 5
    const lineHeight = 5.5
    const fontSize = 8.5

    doc.setFontSize(fontSize)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...darkColor)

    const studentInfo = [
      { label: 'Name:', value: registration.name, col: 1 },
      { label: 'Father Name:', value: registration.fatherName, col: 1 },
      { label: 'Date of Birth:', value: registration.dob ? formatDate(registration.dob) : 'N/A', col: 1 },
      { label: 'Gender:', value: registration.gender, col: 1 },
      { label: 'Grade:', value: registration.gradeName || `Grade ${registration.gradeId}`, col: 2 },
      { label: 'Mobile:', value: registration.mobile || 'N/A', col: 2 },
      { label: 'WhatsApp:', value: registration.whatsApp || 'N/A', col: 2 },
      { label: 'Email:', value: registration.email || 'N/A', col: 2 },
    ]

    let col1Y = yPos
    let col2Y = yPos

    studentInfo.forEach(({ label, value, col }) => {
      if (value && value !== 'N/A') {
        const xPos = col === 1 ? col1X : col2X
        const currentY = col === 1 ? col1Y : col2Y

        doc.setFont('helvetica', 'bold')
        doc.setTextColor(100, 100, 100)
        doc.text(label, xPos, currentY)
        
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(...darkColor)
        const valueX = xPos + 32
        const maxValueWidth = col === 1 ? 60 : 58
        const displayValue = value.length > 35 ? value.substring(0, 35) + '...' : value
        doc.text(displayValue, valueX, currentY, { maxWidth: maxValueWidth })
        
        if (col === 1) {
          col1Y += lineHeight
        } else {
          col2Y += lineHeight
        }
      }
    })

    yPos = Math.max(col1Y, col2Y) + 7

    // ============================================
    // TEST INFORMATION SECTION (Highlighted Box)
    // ============================================
    const testInfoBoxHeight = 23
    const testInfoBoxY = yPos
    
    // Background box with accent color border
    doc.setFillColor(...lightGray)
    doc.setDrawColor(...accentColor)
    doc.setLineWidth(0.5)
    doc.rect(margin, testInfoBoxY, contentWidth, testInfoBoxHeight, 'FD')
    
    // Section title
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('TEST INFORMATION', margin + 5, testInfoBoxY + 6)
    
    // Test details - use registration values or fall back to active admission settings
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...darkColor)
    
    // Try to get test info from registration, fall back to active admission settings
    let testVenue = registration.testVenue
    let testDate = registration.testDate
    let testTime = registration.testTime
    
    // If registration doesn't have test info, try to get from active admission settings
    // (Backend should have assigned this during registration, but this is a safety fallback)
    if (!testVenue || !testDate || !testTime) {
      try {
        const activeSetting = await getActiveAdmissionSetting()
        if (activeSetting) {
          // Use default test info from settings as fallback
          testVenue = testVenue || activeSetting.defaultTestVenue || undefined
          testDate = testDate || activeSetting.testStartDate || undefined
          testTime = testTime || activeSetting.defaultTestTime || undefined
        }
      } catch (error) {
        console.warn('[PDF Generator] Failed to fetch active admission settings:', error)
      }
    }
    
    const formattedTestTime = testTime ? formatTime(testTime) : 'To Be Announced'
    const testInfo = [
      { label: 'Venue:', value: testVenue || 'To Be Announced' },
      { label: 'Date:', value: testDate ? formatDate(testDate) : 'To Be Announced' },
      { label: 'Time:', value: formattedTestTime },
    ]

    let testInfoY = testInfoBoxY + 11
    testInfo.forEach(({ label, value }) => {
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(100, 100, 100)
      doc.text(label, margin + 5, testInfoY)
      
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...darkColor)
      const displayValue = value.length > 40 ? value.substring(0, 40) + '...' : value
      doc.text(displayValue, margin + 22, testInfoY, { maxWidth: contentWidth - 27 })
      testInfoY += 4.5
    })

    yPos = testInfoBoxY + testInfoBoxHeight + 7

    // ============================================
    // IMPORTANT INSTRUCTIONS (Compact)
    // ============================================
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...darkColor)
    doc.text('IMPORTANT INSTRUCTIONS', margin, yPos)
    
    doc.setDrawColor(...primaryColor)
    doc.line(margin, yPos + 2, margin + 75, yPos + 2)
    
    yPos += 5.5

    // Compact instructions list
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(60, 60, 60)

    const instructions = [
      'Registration Fee Rs. 500/- is non-refundable.',
      'Bring this slip and required test materials on test day.',
      'Follow all test rules and supervisor instructions.',
      'Electronic devices are strictly prohibited.',
      'Complete the test booklet within the allocated time.',
    ]

    instructions.forEach((instruction, index) => {
      // Safety check to ensure we don't exceed page bounds
      if (yPos > pageHeight - margin - 30) {
        return
      }
      const lines = doc.splitTextToSize(`${index + 1}. ${instruction}`, contentWidth - 4)
      lines.forEach((line: string) => {
        if (yPos > pageHeight - margin - 30) {
          return
        }
        doc.text(line, margin + 2, yPos)
        yPos += 3.8
      })
    })

    // ============================================
    // QR CODE (Bottom Right)
    // ============================================
    const qrSize = 23
    const qrX = margin + contentWidth - qrSize - 5
    const qrY = pageHeight - margin - qrSize - 18

    try {
      // Generate QR code data URL
      const qrData = JSON.stringify({
        name: registration.name,
        fatherName: registration.fatherName,
        rollNumber: registration.rollNumber || 'PENDING',
        grade: registration.gradeName || `Grade ${registration.gradeId}`,
        testDate: testDate || 'To Be Announced',
        testTime: formattedTestTime,
        testVenue: testVenue || 'To Be Announced',
      })
      
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: qrSize * 4, // Higher resolution for better quality
        margin: 1,
        color: {
          dark: '#24744f', // Official primary green
          light: '#ffffff',
        },
      })

      // Add QR code to PDF
      doc.addImage(qrCodeDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)
      
      // QR Code label
      doc.setFontSize(6.5)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text('Verification Code', qrX + qrSize / 2, qrY + qrSize + 2.5, { align: 'center' })
    } catch (qrError) {
      console.warn('Failed to generate QR code:', qrError)
      // Continue without QR code if generation fails
    }

    // ============================================
    // FOOTER
    // ============================================
    const footerY = pageHeight - margin - 6
    
    // Footer line with accent color
    doc.setDrawColor(...accentColor)
    doc.setLineWidth(0.3)
    doc.line(margin, footerY - 4, margin + contentWidth, footerY - 4)
    
    // School contact info
    doc.setFontSize(6.5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    
    const contactInfo = [
      `Phone: ${SCHOOL_INFO.contact.phone}`,
      `Email: ${SCHOOL_INFO.contact.email}`,
    ]
    
    contactInfo.forEach((info, index) => {
      doc.text(info, margin, footerY + (index * 3))
    })
    
    // Generation timestamp (right side)
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      margin + contentWidth,
      footerY,
      { align: 'right' }
    )

    // ============================================
    // DECORATIVE ELEMENTS (Official Colors)
    // ============================================
    // Corner decorations with official colors
    const cornerSize = 2.5
    doc.setFillColor(...primaryColor)
    doc.rect(margin, margin, cornerSize, cornerSize, 'F')
    doc.rect(margin + contentWidth - cornerSize, margin, cornerSize, cornerSize, 'F')
    
    doc.setFillColor(...accentColor)
    doc.rect(margin, pageHeight - margin - cornerSize, cornerSize, cornerSize, 'F')
    doc.rect(margin + contentWidth - cornerSize, pageHeight - margin - cornerSize, cornerSize, cornerSize, 'F')

    // ============================================
    // SAVE PDF
    // ============================================
    const filename = `RollNumberSlip_${registration.rollNumber || registration.id}_${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(filename)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF. Please try again.')
  }
}
