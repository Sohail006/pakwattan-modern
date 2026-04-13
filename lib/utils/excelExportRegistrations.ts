import * as XLSX from 'xlsx'
import { RegistrationResponse } from '@/lib/api/registrations'
import { formatDate, formatTime } from '@/lib/utils'
import { getPaymentStatusDisplay, getReceiptStatusDisplay } from '@/lib/utils/paymentHelpers'

/**
 * Export registrations data to Excel file
 * @param registrations - Array of registration data to export
 * @param filename - Optional filename (default: Registrations_Export_YYYY-MM-DD.xlsx)
 * @param scholarshipTypeMap - Optional map of scholarship type ID to name for converting IDs to names
 */
export function exportRegistrationsToExcel(
  registrations: RegistrationResponse[],
  filename?: string,
  scholarshipTypeMap?: Map<number, string>
): void {
  try {
    if (!registrations || registrations.length === 0) {
      throw new Error('No registrations data to export')
    }

    // Validate XLSX is available
    if (!XLSX || !XLSX.utils) {
      throw new Error('Excel library not loaded. Please refresh the page and try again.')
    }

    // Prepare data for Excel
    const excelData = registrations.map((reg) => {
      // Format date of birth
      const dateOfBirth = reg.dob ? formatDate(reg.dob) : ''
      const registrationDate = reg.registrationDate ? formatDate(reg.registrationDate) : ''
      const testDate = reg.testDate ? formatDate(reg.testDate) : ''
      const testTime = reg.testTime ? formatTime(reg.testTime) : ''

      // Format payment status using the same logic as the table display
      const paymentStatusDisplay = getPaymentStatusDisplay(reg.paymentStatus, reg.paymentMethod)
      const receiptStatusDisplay = getReceiptStatusDisplay(
        reg.transactionReceiptUrl,
        reg.receiptVerificationStatus,
        reg.paymentMethod
      )
      const receiptVerifiedAt = reg.receiptVerifiedAt ? formatDate(reg.receiptVerifiedAt) : ''
      
      // Convert scholarship type ID to name if mapping is available
      let scholarshipTypeDisplay = ''
      if (reg.scholarshipType) {
        if (scholarshipTypeMap) {
          const scholarshipId = Number(reg.scholarshipType)
          scholarshipTypeDisplay = scholarshipTypeMap.get(scholarshipId) || reg.scholarshipType
        } else {
          scholarshipTypeDisplay = reg.scholarshipType
        }
      }

      return {
        'Roll Number': reg.rollNumber || 'Pending',
        'Name': reg.name,
        'Father Name': reg.fatherName,
        'Date of Birth': dateOfBirth,
        'Gender': reg.gender,
        'Grade': reg.gradeName || `Grade ${reg.gradeId}`,
        'Mobile': reg.mobile || '',
        'WhatsApp': reg.whatsApp || '',
        'Email': reg.email || '',
        'Form B/CNIC': reg.formBorCNIC || '',
        'Previous School': reg.previousSchoolName || '',
        'Apply for Scholarship': reg.applyForScholarship ? 'Yes' : 'No',
        'Scholarship Type': scholarshipTypeDisplay,
        'Payment Method': reg.paymentMethod,
        'Payment Status': paymentStatusDisplay,
        'Receipt Status': receiptStatusDisplay,
        'Receipt Verified By': reg.receiptVerifiedBy || '',
        'Receipt Verified At': receiptVerifiedAt,
        'Test Venue': reg.testVenue || '',
        'Test Date': testDate,
        'Test Time': testTime,
        'Test Marks': reg.testMarks ?? '',
        'Interview Remarks': reg.interviewRemarks || '',
        'Registration Date': registrationDate,
      }
    })

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Set column widths for better readability
    const columnWidths = [
      { wch: 15 }, // Roll Number
      { wch: 25 }, // Name
      { wch: 20 }, // Father Name
      { wch: 12 }, // Date of Birth
      { wch: 10 }, // Gender
      { wch: 15 }, // Grade
      { wch: 15 }, // Mobile
      { wch: 15 }, // WhatsApp
      { wch: 30 }, // Email
      { wch: 20 }, // Form B/CNIC
      { wch: 30 }, // Previous School
      { wch: 18 }, // Apply for Scholarship
      { wch: 20 }, // Scholarship Type
      { wch: 15 }, // Payment Method
      { wch: 15 }, // Payment Status
      { wch: 15 }, // Receipt Status
      { wch: 20 }, // Receipt Verified By
      { wch: 15 }, // Receipt Verified At
      { wch: 30 }, // Test Venue
      { wch: 12 }, // Test Date
      { wch: 12 }, // Test Time
      { wch: 12 }, // Test Marks
      { wch: 45 }, // Interview Remarks
      { wch: 15 }, // Registration Date
    ]
    worksheet['!cols'] = columnWidths

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations')

    // Sanitize filename - remove invalid characters for file names
    const sanitizeFilename = (name: string): string => {
      return name
        .replace(/[<>:"/\\|?*]/g, '') // Remove invalid file characters
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .substring(0, 200) // Limit length
    }

    // Generate filename with timestamp
    let finalFilename: string
    if (filename) {
      // Sanitize the provided filename
      const sanitized = sanitizeFilename(filename)
      finalFilename = `${sanitized}.xlsx`
    } else {
      const timestamp = new Date().toISOString().split('T')[0]
      const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '-')
      finalFilename = `Registrations_Export_${timestamp}_${time}.xlsx`
    }

    // Write file and trigger download
    XLSX.writeFile(workbook, finalFilename)
  } catch (error) {
    console.error('Error in exportRegistrationsToExcel:', error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred while exporting to Excel.')
  }
}

