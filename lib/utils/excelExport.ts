import * as XLSX from 'xlsx'
import { Student } from '@/lib/api/students'
import { formatDate } from '@/lib/utils'

/**
 * Export students data to Excel file
 * @param students - Array of student data to export
 * @param filename - Optional filename (default: Students_Export_YYYY-MM-DD.xlsx)
 */
export function exportStudentsToExcel(
  students: Student[],
  filename?: string
): void {
  try {
    if (!students || students.length === 0) {
      throw new Error('No students data to export')
    }

    // Validate XLSX is available
    if (!XLSX || !XLSX.utils) {
      throw new Error('Excel library not loaded. Please refresh the page and try again.')
    }

    // Prepare data for Excel
    const excelData = students.map((student) => {
      // Format date of birth
      const dateOfBirth = student.dateOfBirth ? formatDate(student.dateOfBirth) : ''

      // Format created date
      const createdAt = student.createdAt ? formatDate(student.createdAt) : ''

      return {
        'Student ID': student.id,
        'Name': student.name,
        'Father Name': student.fatherName,
        'Email': student.email,
        'Phone': student.phone || '',
        'WhatsApp': student.whatsApp || '',
        'Gender': student.gender,
        'Date of Birth': dateOfBirth,
        'Status': student.status,
        'Grade': student.gradeName || student.grade?.name || `Grade ${student.gradeId}`,
        'Section': student.sectionName || student.section?.name || `Section ${student.sectionId}`,
        'Campus': student.campusName || student.campus?.name || `Campus ${student.campusId}`,
        'Session': student.sessionName || student.session?.name || `Session ${student.sessionId}`,
        'Guardian Name': student.guardianName || student.guardian?.fullName || '',
        'Guardian Email': student.guardian?.email || '',
        'Guardian Phone': student.guardian?.phone || '',
        'Guardian Relation': student.guardian?.relation || '',
        'Address': student.address || '',
        'Previous School': student.previousSchool || '',
        'Created Date': createdAt,
      }
    })

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Set column widths for better readability
    const columnWidths = [
      { wch: 10 }, // Student ID
      { wch: 20 }, // Name
      { wch: 20 }, // Father Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 15 }, // WhatsApp
      { wch: 10 }, // Gender
      { wch: 12 }, // Date of Birth
      { wch: 12 }, // Status
      { wch: 10 }, // Grade
      { wch: 10 }, // Section
      { wch: 15 }, // Campus
      { wch: 15 }, // Session
      { wch: 25 }, // Guardian Name
      { wch: 30 }, // Guardian Email
      { wch: 15 }, // Guardian Phone
      { wch: 15 }, // Guardian Relation
      { wch: 40 }, // Address
      { wch: 30 }, // Previous School
      { wch: 12 }, // Created Date
    ]
    worksheet['!cols'] = columnWidths

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students')

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
      finalFilename = `Students_Export_${timestamp}_${time}.xlsx`
    }

    // Write file and trigger download
    XLSX.writeFile(workbook, finalFilename)
  } catch (error) {
    console.error('Error in exportStudentsToExcel:', error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred while exporting to Excel.')
  }
}
