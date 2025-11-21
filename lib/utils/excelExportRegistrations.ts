import * as XLSX from 'xlsx'
import { RegistrationResponse } from '@/lib/api/registrations'
import { formatDate, formatTime } from '@/lib/utils'

/**
 * Export registrations data to Excel file
 * @param registrations - Array of registration data to export
 * @param filename - Optional filename (default: Registrations_Export_YYYY-MM-DD.xlsx)
 */
export function exportRegistrationsToExcel(
  registrations: RegistrationResponse[],
  filename?: string
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
        'Boarder/Day Scholar': reg.boarderDayScholar,
        'Apply for Scholarship': reg.applyForScholarship ? 'Yes' : 'No',
        'Scholarship Type': reg.scholarshipType || '',
        'Payment Method': reg.paymentMethod,
        'Test Venue': reg.testVenue || '',
        'Test Date': testDate,
        'Test Time': testTime,
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
      { wch: 15 }, // Boarder/Day Scholar
      { wch: 18 }, // Apply for Scholarship
      { wch: 20 }, // Scholarship Type
      { wch: 15 }, // Payment Method
      { wch: 30 }, // Test Venue
      { wch: 12 }, // Test Date
      { wch: 12 }, // Test Time
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

